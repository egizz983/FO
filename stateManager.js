/**
 * State Manager - Centralized reactive state mutation system
 * Handles state updates, event listeners, and full page re-renders
 */

window.StateManager = (function() {
    // =====================
    // PRIVATE STATE
    // =====================
    const listeners = {}; // { 'path': [{ callback, debounce }] }
    const debouncedCallbacks = {}; // Track debounce timers
    let isRecalculating = false; // Prevent recursive recalculations
    let isJsonLoaded = false; // Flag: JSON data has been loaded and parsed

    // =====================
    // UTILITY FUNCTIONS
    // =====================

    /**
     * Safely get a value from nested object using dot notation
     * @param {Object} obj - Object to read from
     * @param {String} path - Dot notation path (e.g., 'companion.w7b11_55')
     * @returns {*} Value at path or undefined
     */
    function getNestedValue(obj, path) {
        const keys = path.split('.');
        let current = obj;
        for (let key of keys) {
            if (current === null || current === undefined) return undefined;
            current = current[key];
        }
        return current;
    }

    /**
     * Safely set a value in nested object using dot notation
     * @param {Object} obj - Object to write to
     * @param {String} path - Dot notation path
     * @param {*} value - Value to set
     * @returns {Boolean} Success flag
     */
    function setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;

        // Navigate/create nested structure
        for (let key of keys) {
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }

        current[lastKey] = value;
        return true;
    }

    /**
     * Validate state path exists in farmingState
     * @param {String} path - Dot notation path
     * @returns {Boolean} Valid flag
     */
    function isValidPath(path) {
        return getNestedValue(window.farmingState, path) !== undefined;
    }

    // =====================
    // PUBLIC API
    // =====================

    /**
     * Read state value safely
     * @param {String} path - Dot notation path (e.g., 'companion.w7b11_55')
     * @returns {*} State value
     */
    function getState(path) {
        if (!path) return window.farmingState;
        return getNestedValue(window.farmingState, path);
    }

    /**
     * Update state value and trigger listeners
     * @param {String} path - Dot notation path
     * @param {*} value - New value
     * @param {Object} options - { debounce: ms }
     */
    function updateState(path, value, options = {}) {
        // Validation
        if (typeof path !== 'string' || !path) {
            console.warn('[StateManager] Invalid path:', path);
            return false;
        }

        if (!isValidPath(path)) {
            console.warn('[StateManager] Path does not exist in farmingState:', path);
            return false;
        }

        // Special handling for talent updates (read-only getters)
        // talents.talent205, talents.talent206, talents.talent207 are getter functions
        // They read from playerDatabase.TalentPoints, so we update that instead
        if (path.startsWith('talents.talent') && (path === 'talents.talent205' || path === 'talents.talent206' || path === 'talents.talent207')) {
            const talentId = parseInt(path.split('.talent')[1]);
            if (window.setTalentLevel) {
                window.setTalentLevel(talentId, value);
                console.log(`[StateManager] Called setTalentLevel for ${path} = ${value}`);
                // Still trigger listeners so recalculation happens
                triggerStateChange(path, undefined, value, options.debounce || 0);
                return true;
            }
        }

        // Get old value
        const oldValue = getNestedValue(window.farmingState, path);

        // Skip if no change
        if (oldValue === value) {
            return false;
        }

        // Update state
        setNestedValue(window.farmingState, path, value);
        console.log(`[StateManager] Updated: ${path} = ${value} (was ${oldValue})`);

        // Trigger listeners with debounce
        triggerStateChange(path, oldValue, value, options.debounce || 0);

        return true;
    }

    /**
     * Update multiple state values from JSON parse
     * @param {Object} data - Parsed JSON data
     */
    function updateStateFromJson(data) {
        if (!data || typeof data !== 'object') {
            console.error('[StateManager] Invalid JSON data');
            return false;
        }

        try {
            // Call existing parsers (they update window.farmingState directly)
            // This wrapper is for consistency and future extensibility
            return true;
        } catch (e) {
            console.error('[StateManager] updateStateFromJson failed:', e);
            return false;
        }
    }

    /**
     * Register a listener for state changes
     * @param {String|String[]} paths - Single path or array of paths to listen for
     * @param {Function} callback - Function(newValue, oldValue, path)
     * @param {Object} options - { debounce: ms, throttle: ms }
     */
    function onStateChange(paths, callback, options = {}) {
        if (typeof paths === 'string') {
            paths = [paths];
        }

        if (!Array.isArray(paths)) {
            console.warn('[StateManager] onStateChange: paths must be string or array');
            return;
        }

        paths.forEach(path => {
            if (!listeners[path]) {
                listeners[path] = [];
            }
            listeners[path].push({ callback, debounce: options.debounce || 0 });
            console.log(`[StateManager] Listener registered for: ${path}`);
        });
    }

    /**
     * Unregister a listener
     * @param {String} path - Path to stop listening
     * @param {Function} callback - Callback to remove
     */
    function offStateChange(path, callback) {
        if (listeners[path]) {
            listeners[path] = listeners[path].filter(l => l.callback !== callback);
        }
    }

    /**
     * Internal: Trigger all listeners for a path
     * @param {String} path - Path that changed
     * @param {*} oldValue - Previous value
     * @param {*} newValue - New value
     * @param {Number} debounceMs - Global debounce time
     */
    function triggerStateChange(path, oldValue, newValue, debounceMs = 0) {
        if (!listeners[path]) return;

        listeners[path].forEach(listener => {
            const delay = listener.debounce || debounceMs;

            if (delay > 0) {
                // Debounce: cancel previous timer
                if (debouncedCallbacks[path + listener.callback]) {
                    clearTimeout(debouncedCallbacks[path + listener.callback]);
                }

                debouncedCallbacks[path + listener.callback] = setTimeout(() => {
                    listener.callback(newValue, oldValue, path);
                }, delay);
            } else {
                // Immediate execution
                listener.callback(newValue, oldValue, path);
            }
        });
    }

    /**
     * Full page recalculation and re-render
     * Called whenever any mutable state changes
     */
    function triggerFullRecalculation() {
        // Guard: Skip recalculation if JSON hasn't been loaded yet
        if (!isJsonLoaded) {
            console.warn('[StateManager] JSON data not loaded yet. Skipping recalculation. User must load JSON first.');
            return;
        }

        // Prevent recursive calls
        if (isRecalculating) {
            console.warn('[StateManager] Recalculation already in progress, skipping');
            return;
        }

        isRecalculating = true;
        console.log('[StateManager] Starting full recalculation...');

        try {
            // Reset any caches
            if (window.resetWinBonusCache) {
                window.resetWinBonusCache();
            }

            // Force reinitialization of dependent functions
            if (window.getWinBonus) {
                window.getWinBonus(10);
            }

            // Run all rendering functions
            if (window.renderFarmingBonuses) {
                window.renderFarmingBonuses();
            }

            if (window.updateFarmingLevelDisplay) {
                window.updateFarmingLevelDisplay();
            }

            console.log('[StateManager] Full recalculation completed ✓');
        } catch (e) {
            console.error('[StateManager] Full recalculation failed:', e);
        } finally {
            isRecalculating = false;
        }
    }

    /**
     * Register full recalculation for specific state paths
     * Call this once during app initialization
     */
    function registerRecalculationTriggers() {
        const mutablePaths = [
            // Companions
            'companion.babaMummy_0',
            'companion.potato_19',
            'companion.rift2_1',
            'companion.w7a8_39',
            'companion.Crystal6_41',
            'companion.w7b6b_54',
            'companion.w7b11_55',
            'companion.rift4_88',
            'companion.poppy_161',
            'companion.w6b2b_162',
            'companion.w7b7_147',
            'companion.reindeer_27',
            // Talents (getter functions - handled specially in updateState)
            'talents.talent205',
            'talents.talent206',
            'talents.talent207',
            // Lab
            'lab.my1stChemistrySet',
            'lab.certifiedStampBook',
            'lab.spelunkerObol',
            'lab.mealBlackDiamondRhinestone',
            // Parsed crop counts (user can override for debugging)
            'gmoCropCounts.200',
            'gmoCropCounts.1000',
            'gmoCropCounts.2500',
            'gmoCropCounts.10000',
            'gmoCropCounts.100000'
        ];

        // Register all mutable paths to trigger full recalculation
        onStateChange(mutablePaths, triggerFullRecalculation, { debounce: 100 });

        console.log('[StateManager] Recalculation triggers registered for', mutablePaths.length, 'paths');
    }

    /**
     * Mark that JSON data has been successfully loaded
     * Call this from models.js after JSON parsing is complete
     * Enables full recalculations and input interactions
     */
    function markJsonLoaded() {
        isJsonLoaded = true;
        console.log('[StateManager] ✓ JSON marked as loaded. Recalculations now enabled.');
    }

    /**
     * Check if JSON has been loaded
     * @returns {Boolean} True if JSON loaded, false otherwise
     */
    function isJsonDataLoaded() {
        return isJsonLoaded;
    }

    // =====================
    // EXPORT PUBLIC API
    // =====================
    return {
        getState,
        updateState,
        updateStateFromJson,
        onStateChange,
        offStateChange,
        triggerStateChange,
        triggerFullRecalculation,
        registerRecalculationTriggers,
        markJsonLoaded,
        isJsonDataLoaded
    };
})();

console.log('[StateManager] Initialized ✓');
