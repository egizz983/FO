/**
 * State Inspector - Dynamically expose and edit farmingState variables
 * Automatically generates UI fields for any exposed state paths
 * Supports exact paths and wildcard patterns (e.g., 'companion.*')
 */

window.StateInspector = (function() {
    // =====================
    // CONFIGURATION
    // =====================
    // Define which state paths to expose to users
    // Can be exact paths or wildcard patterns (ending with .*)
    const EXPOSED_SECTIONS = {
        'Parsed Crop Counts': [
            'gmoCropCounts.200',
            'gmoCropCounts.1000',
            'gmoCropCounts.2500',
            'gmoCropCounts.10000',
            'gmoCropCounts.100000'
        ],
        'Talents': 'talents.*'
    };

    // Track rendered fields for syncing
    const renderedFields = new Map(); // path -> input element

    // =====================
    // PRIVATE HELPERS
    // =====================

    /**
     * Expand wildcard patterns to actual state paths
     * 'companion.*' -> ['companion.babaMummy_0', 'companion.potato_19', ...]
     */
    function expandWildcardPaths(pattern) {
        if (!pattern.endsWith('.*')) return [pattern]; // Exact path

        const prefix = pattern.slice(0, -2); // Remove '.*'
        const obj = window.StateManager.getState(prefix);

        if (obj && typeof obj === 'object') {
            return Object.keys(obj).map(key => `${prefix}.${key}`);
        }
        return [];
    }

    /**
     * Get all exposed paths expanded
     */
    function getAllExposedPaths() {
        const paths = [];
        Object.values(EXPOSED_SECTIONS).forEach(section => {
            if (Array.isArray(section)) {
                paths.push(...section);
            } else {
                paths.push(...expandWildcardPaths(section));
            }
        });
        return paths;
    }

    /**
     * Get friendly label for a state path
     */
    function getPathLabel(path) {
        const parts = path.split('.');
        const lastPart = parts[parts.length - 1];
        // Convert camelCase to Title Case
        return lastPart
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    /**
     * Get input type based on state value
     */
    function getInputType(value) {
        if (typeof value === 'boolean') return 'checkbox';
        if (typeof value === 'number') return 'number';
        return 'text';
    }

    /**
     * Extract value from input element based on type
     */
    function getFieldValue(input, inputType) {
        if (inputType === 'checkbox') {
            return input.checked ? 1 : 0;
        } else if (inputType === 'number') {
            const val = parseFloat(input.value);
            return isNaN(val) ? 0 : val;
        }
        return input.value;
    }

    /**
     * Set input element value based on type
     */
    function setFieldValue(input, value, inputType) {
        if (inputType === 'checkbox') {
            input.checked = value === 1 || value === true;
        } else if (inputType === 'number') {
            input.value = value || 0;
        } else {
            input.value = value || '';
        }
    }

    // =====================
    // PUBLIC API
    // =====================

    /**
     * Render the State Inspector UI
     * Creates dynamic input fields for all exposed paths
     */
    function renderInspector() {
        const container = document.getElementById('state-inspector-container');
        if (!container) {
            console.warn('[StateInspector] Container #state-inspector-container not found');
            return;
        }

        container.innerHTML = ''; // Clear

        Object.entries(EXPOSED_SECTIONS).forEach(([sectionTitle, sectionPaths]) => {
            const paths = Array.isArray(sectionPaths)
                ? sectionPaths
                : expandWildcardPaths(sectionPaths);

            if (paths.length === 0) return;

            // Create section
            const section = document.createElement('div');
            section.className = 'inspector-section';
            section.innerHTML = `<h5>${sectionTitle}</h5>`;

            // Create field for each path
            paths.forEach(path => {
                const value = window.StateManager.getState(path);
                const inputType = getInputType(value);
                const label = getPathLabel(path);

                const fieldDiv = document.createElement('div');
                fieldDiv.className = 'inspector-field';

                let inputHTML = '';
                if (inputType === 'checkbox') {
                    const checked = value === 1 || value === true ? 'checked' : '';
                    inputHTML = `<input type="checkbox" class="inspector-input" data-state-path="${path}" ${checked}>`;
                } else if (inputType === 'number') {
                    inputHTML = `<input type="number" class="inspector-input" data-state-path="${path}" value="${value || 0}" min="0">`;
                } else {
                    inputHTML = `<input type="text" class="inspector-input" data-state-path="${path}" value="${value || ''}">`;
                }

                fieldDiv.innerHTML = `
                    <label>${label}:</label>
                    ${inputHTML}
                    <span class="inspector-value">${value}</span>
                `;

                section.appendChild(fieldDiv);

                // Track field
                const input = fieldDiv.querySelector('.inspector-input');
                renderedFields.set(path, input);

                // Wire to state
                input.addEventListener('change', () => {
                    const newValue = getFieldValue(input, inputType);
                    window.StateManager.updateState(path, newValue);
                });

                // Real-time updates for number inputs
                if (inputType === 'number') {
                    input.addEventListener('input', () => {
                        const newValue = getFieldValue(input, inputType);
                        const valueSpan = fieldDiv.querySelector('.inspector-value');
                        valueSpan.textContent = newValue;
                    });
                }
            });

            container.appendChild(section);
        });

        console.log('[StateInspector] Rendered inspector with', renderedFields.size, 'fields');

        // Setup state listeners to sync when values change
        setupStateListeners();
    }

    /**
     * Setup listeners to sync inspector fields when state changes
     */
    function setupStateListeners() {
        getAllExposedPaths().forEach(path => {
            window.StateManager.onStateChange(path, (newValue) => {
                syncFieldValue(path, newValue);
            });
        });
    }

    /**
     * Sync a single field with state value
     */
    function syncFieldValue(path, value) {
        const input = renderedFields.get(path);
        if (!input) return;

        const inputType = getInputType(value);
        setFieldValue(input, value, inputType);

        // Update display value
        const fieldDiv = input.closest('.inspector-field');
        if (fieldDiv) {
            const valueSpan = fieldDiv.querySelector('.inspector-value');
            if (valueSpan) {
                valueSpan.textContent = value;
            }
        }
    }

    /**
     * Sync all fields with current state
     * Useful after JSON loads or state changes
     */
    function syncAllFields() {
        getAllExposedPaths().forEach(path => {
            const value = window.StateManager.getState(path);
            syncFieldValue(path, value);
        });
        console.log('[StateInspector] Synced all fields with state');
    }

    /**
     * Add a new exposed path dynamically
     */
    function addExposedPath(section, path) {
        if (!EXPOSED_SECTIONS[section]) {
            EXPOSED_SECTIONS[section] = [];
        }
        if (typeof EXPOSED_SECTIONS[section] === 'string') {
            // Convert wildcard to array
            EXPOSED_SECTIONS[section] = expandWildcardPaths(EXPOSED_SECTIONS[section]);
        }
        if (Array.isArray(EXPOSED_SECTIONS[section]) && !EXPOSED_SECTIONS[section].includes(path)) {
            EXPOSED_SECTIONS[section].push(path);
        }
    }

    /**
     * Get configuration (for debugging)
     */
    function getConfig() {
        return EXPOSED_SECTIONS;
    }

    // =====================
    // EXPORT PUBLIC API
    // =====================
    return {
        renderInspector,
        syncAllFields,
        addExposedPath,
        getConfig
    };
})();
