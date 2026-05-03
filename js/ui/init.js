// ======================
// ENTRY POINTS & INITIALISATION
// Depends on: appData.js (optimizer), renderSettings.js, renderFarming.js,
//             stateManager.js, statePersistence.js, stateAutoWire.js, stateInspector.js
// Exposes: window.loadJsonData, window.hideJsonLoadNotice, window.initAfterUI
// Called by: index.html LOAD button (loadJsonData), uiLoader.js (initAfterUI),
//            models.js (hideJsonLoadNotice)
// ======================

window.loadJsonData = function() {
    const input = document.getElementById('json-paste').value.trim();
    if (!input) {
        alert('Please paste your JSON data first!');
        return;
    }

    try {
        const match = input.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("No JSON object found");

        const success = optimizer.loadPlayerData(match[0]);

        if (success) {
            debugFarmingVariables();
            alert('✅ JSON loaded successfully!');
        }
    } catch (e) {
        console.error(e);
        alert('Invalid JSON!\n\n' + e.message);
    }
};

window.hideJsonLoadNotice = function() {
    const notice = document.getElementById('json-load-notice');
    if (notice) {
        notice.style.display = 'none';
        console.log('[UI] JSON load notice hidden - inputs enabled');
    }
};

window.initAfterUI = function() {
    // Initialize state management systems
    window.StateManager.registerRecalculationTriggers();
    window.StatePersistence.setupAutoSave();
    window.StatePersistence.loadUserSelections();
    window.StateAutoWire.wireAllInputs();

    // Disable all manual input fields until JSON is loaded
    window.StateAutoWire.setInputsDisabled(true);

    // Initialize State Inspector
    if (window.StateInspector && window.StateInspector.renderInspector) {
        window.StateInspector.renderInspector();
    }

    // Render UI and sync inputs with state
    renderLabItems();
    renderCompanions();
    window.syncManualInputs();
    renderFarmingBonuses();
    setupManualInputs();

    console.log('[UI] Ready');
};
