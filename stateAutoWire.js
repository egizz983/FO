/**
 * State Auto-Wire - Automatically wire HTML inputs to state management
 * Any input with data-state-path attribute auto-connects to StateManager
 */

window.StateAutoWire = (function() {
    // =====================
    // PUBLIC API
    // =====================

    /**
     * Find and wire all inputs with data-state-path attribute
     * Call after DOM is ready
     */
    function wireAllInputs() {
        const inputs = document.querySelectorAll('[data-state-path]');
        console.log(`[StateAutoWire] Found ${inputs.length} inputs to wire`);

        inputs.forEach(input => {
            wireInput(input);
        });
    }

    /**
     * Wire a single input element to state
     * @param {HTMLElement} input - Input to wire
     */
    function wireInput(input) {
        const path = input.getAttribute('data-state-path');
        if (!path) return;

        const inputType = input.type.toLowerCase();

        // Get initial value from state
        const currentValue = window.StateManager.getState(path);
        if (currentValue !== undefined) {
            if (inputType === 'checkbox') {
                input.checked = currentValue === 1 || currentValue === true;
            } else {
                input.value = currentValue;
            }
        }

        // Wire change event
        input.addEventListener('change', (e) => {
            onInputChange(e, path, inputType);
        });

        // Also wire input event for real-time updates (numbers, text)
        if (inputType !== 'checkbox' && inputType !== 'radio') {
            input.addEventListener('input', (e) => {
                onInputChange(e, path, inputType);
            });
        }

        console.log(`[StateAutoWire] Wired: ${path} (${inputType})`);
    }

    /**
     * Handle input change event
     * @param {Event} event - Change event
     * @param {String} path - State path
     * @param {String} inputType - Input type
     */
    function onInputChange(event, path, inputType) {
        const input = event.target;
        let value = input.value;

        // Type conversion
        if (inputType === 'checkbox') {
            value = input.checked ? 1 : 0;
        } else if (inputType === 'number' || inputType === 'range') {
            value = parseFloat(value) || 0;
            
            // Clamp to min/max if specified
            const min = parseFloat(input.getAttribute('min'));
            const max = parseFloat(input.getAttribute('max'));
            if (!isNaN(min)) value = Math.max(value, min);
            if (!isNaN(max)) value = Math.min(value, max);
        }

        // Update state (triggers listeners)
        window.StateManager.updateState(path, value);
    }

    /**
     * Manually set input value and trigger update
     * @param {String} path - State path
     * @param {*} value - New value
     */
    function setInputValue(path, value) {
        const input = document.querySelector(`[data-state-path="${path}"]`);
        if (!input) {
            console.warn(`[StateAutoWire] No input found for path: ${path}`);
            return false;
        }

        const inputType = input.type.toLowerCase();

        if (inputType === 'checkbox') {
            input.checked = value === 1 || value === true;
        } else {
            input.value = value;
        }

        // Trigger change event
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }

    /**
     * Get all wired input values as object
     * @returns {Object} { path: value, ... }
     */
    function getAllInputValues() {
        const inputs = document.querySelectorAll('[data-state-path]');
        const values = {};

        inputs.forEach(input => {
            const path = input.getAttribute('data-state-path');
            const inputType = input.type.toLowerCase();

            if (inputType === 'checkbox') {
                values[path] = input.checked ? 1 : 0;
            } else {
                values[path] = input.value;
            }
        });

        return values;
    }

    /**
     * Disable/enable all wired inputs
     * @param {Boolean} disabled - Disable flag
     */
    function setInputsDisabled(disabled) {
        const inputs = document.querySelectorAll('[data-state-path]');
        inputs.forEach(input => {
            input.disabled = disabled;
        });
    }

    // =====================
    // EXPORT PUBLIC API
    // =====================
    return {
        wireAllInputs,
        wireInput,
        setInputValue,
        getAllInputValues,
        setInputsDisabled
    };
})();

console.log('[StateAutoWire] Initialized ✓');
