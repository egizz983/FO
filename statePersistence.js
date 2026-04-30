/**
 * State Persistence - localStorage save/load for user selections
 * Only persists manually controlled state (companions, talents, lab, crop counts)
 * NOT parsed JSON data (farm data, land ranks, market upgrades, etc.)
 */

window.StatePersistence = (function() {
    const STORAGE_KEY = 'farmingOptimizerUserSelections';

    // =====================
    // WHITELIST: Paths to persist
    // Only these properties should be saved to localStorage
    // =====================
    const WHITELIST = {
        // Companion selections (user chooses which to activate)
        'companion.babaMummy_0': true,
        'companion.potato_19': true,
        'companion.rift2_1': true,
        'companion.w7a8_39': true,
        'companion.Crystal6_41': true,
        'companion.w7b6b_54': true,
        'companion.w7b11_55': true,
        'companion.rift4_88': true,
        'companion.poppy_161': true,
        'companion.w6b2b_162': true,
        'companion.w7b7_147': true,
        'companion.reindeer_27': true,

        // Lab item toggles (manual selections)
        'lab.my1stChemistrySet': true,
        'lab.certifiedStampBook': true,
        'lab.spelunkerObol': true,
        'lab.mealBlackDiamondRhinestone': true,

        // Misc bonuses (only manual ones)
        'miscBonuses.votingBonus29': true,
        'miscBonuses.tometotalpoints': true
    };

    // =====================
    // UTILITY FUNCTIONS
    // =====================


    function shouldPersist(path) {
        return WHITELIST[path] === true;
    }


    function getNestedValue(obj, path) {
        const keys = path.split('.');
        let current = obj;
        for (let key of keys) {
            if (current === null || current === undefined) return undefined;
            current = current[key];
        }
        return current;
    }


    function setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;

        for (let key of keys) {
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }

        current[lastKey] = value;
    }

    // =====================
    // PUBLIC API
    // =====================


    function saveUserSelections() {
        try {
            const toSave = {};

            // Extract only whitelisted paths
            Object.keys(WHITELIST).forEach(path => {
                const value = getNestedValue(window.farmingState, path);
                if (value !== undefined) {
                    toSave[path] = value;
                }
            });

            // Save to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
            console.log('[StatePersistence] Saved user selections:', Object.keys(toSave).length, 'items');
            return true;
        } catch (e) {
            console.warn('[StatePersistence] Failed to save:', e.message);
            return false;
        }
    }


    function loadUserSelections() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                console.log('[StatePersistence] No saved selections found');
                return false;
            }

            const selections = JSON.parse(stored);
            let restored = 0;

  
            Object.entries(selections).forEach(([path, value]) => {
                if (shouldPersist(path)) {
                    setNestedValue(window.farmingState, path, value);
                    restored++;
                }
            });

            console.log('[StatePersistence] Restored user selections:', restored, 'items');
            return true;
        } catch (e) {
            console.warn('[StatePersistence] Failed to load:', e.message);
            return false;
        }
    }

    function clearSavedSelections() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            console.log('[StatePersistence] Cleared all saved selections');
            return true;
        } catch (e) {
            console.warn('[StatePersistence] Failed to clear:', e.message);
            return false;
        }
    }

 
    function setupAutoSave() {
        // Listen to all whitelisted paths
        const pathsToListen = Object.keys(WHITELIST);
        window.StateManager.onStateChange(pathsToListen, (newValue, oldValue, path) => {
            saveUserSelections();
        }, { debounce: 500 }); // Debounce saves to avoid too frequent localStorage writes

        console.log('[StatePersistence] Auto-save registered for', pathsToListen.length, 'paths');
    }


    function getStorageInfo() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return 'No saved selections';
            }
            const data = JSON.parse(stored);
            return {
                itemCount: Object.keys(data).length,
                data: data,
                sizeBytes: stored.length
            };
        } catch (e) {
            return 'Error reading storage: ' + e.message;
        }
    }

    // =====================
    // EXPORT PUBLIC API
    // =====================
    return {
        saveUserSelections,
        loadUserSelections,
        clearSavedSelections,
        setupAutoSave,
        getStorageInfo,
        shouldPersist,
        WHITELIST
    };
})();

console.log('[StatePersistence] Initialized ✓');
