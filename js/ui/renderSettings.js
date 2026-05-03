// ======================
// SETTINGS PANEL RENDERERS
// Depends on: appData.js (labItemsList, companionsList), state.js (window.farmingState),
//             stateManager.js (window.StateManager)
// Exposes: renderLabItems, renderCompanions, setupManualInputs, window.syncManualInputs
// Called by: init.js (initAfterUI), models.js (renderAll → renderCompanions,
//            loadPlayerData → window.syncManualInputs)
// ======================

function renderLabItems() {
    const labContainer = document.getElementById('lab-items-grid');
    if (!labContainer) return;

    labContainer.innerHTML = '';

    labItemsList.forEach(item => {
        const imageUrl = window.getImageUrl('lab', item.imageKey);
        const labItem = document.createElement('div');
        labItem.className = 'lab-item';

        const isSelected = window.farmingState[item.statePath.split('.')[0]][item.statePath.split('.')[1]] === 1;
        if (isSelected) {
            labItem.classList.add('selected');
        }

        labItem.innerHTML = `
            <div class="lab-checkbox-wrapper">
                <input type="checkbox" id="${item.id}" class="lab-checkbox" ${isSelected ? 'checked' : ''}>
            </div>
            <div class="lab-checkmark">✓</div>
            <div class="lab-image">
                <img src="${imageUrl}" alt="${item.name}" onerror="this.style.opacity='0.5'">
            </div>
            <div class="lab-name">${item.name}</div>
        `;

        labItem.addEventListener('click', function(e) {
            e.preventDefault();
            const checkbox = labItem.querySelector(`#${item.id}`);
            checkbox.checked = !checkbox.checked;
            labItem.classList.toggle('selected');
            const newValue = checkbox.checked ? 1 : 0;
            window.StateManager.updateState(item.statePath, newValue);
            console.log(`Lab item ${item.name} toggled: ${checkbox.checked}`);
        });

        labContainer.appendChild(labItem);
    });
}

function renderCompanions() {
    const companionsContainer = document.getElementById('companions-list');
    if (!companionsContainer) return;

    companionsContainer.innerHTML = '';

    companionsList.forEach(companion => {
        const imageUrl = window.getImageUrl('companions', companion.imageKey);

        const companionItem = document.createElement('div');
        companionItem.className = 'companion-item';

        const isSelected = window.farmingState.companion[companion.id] === 1;
        if (isSelected) {
            companionItem.classList.add('selected');
        }

        companionItem.innerHTML = `
            <div class="companion-checkbox-wrapper">
                <input type="checkbox" id="companion-${companion.id}" class="companion-checkbox" ${isSelected ? 'checked' : ''}>
            </div>
            <div class="companion-checkmark">✓</div>
            <div class="companion-image">
                <img src="${imageUrl}" alt="${companion.name}" onerror="this.style.opacity='0.5'">
            </div>
            <div class="companion-info">
                <div class="companion-name">${companion.name}</div>
                <div class="companion-bonus">${companion.bonus}</div>
            </div>
        `;

        companionItem.addEventListener('click', function(e) {
            e.preventDefault();
            const checkbox = companionItem.querySelector(`#companion-${companion.id}`);
            checkbox.checked = !checkbox.checked;
            companionItem.classList.toggle('selected');
            const newValue = checkbox.checked ? 1 : 0;
            window.StateManager.updateState('companion.' + companion.id, newValue);
            console.log(`Companion ${companion.name} toggled: ${checkbox.checked}`);
        });

        companionsContainer.appendChild(companionItem);
    });
}

function setupManualInputs() {
    // Talents handled by StateInspector auto-wiring via data-state-path
    // Lab items handled by renderLabItems() click handlers

    const votingInput = document.getElementById('voting-bonus-29');
    if (votingInput) votingInput.addEventListener('input', () => {
        const value = parseFloat(votingInput.value) || 0;
        window.StateManager.updateState('miscBonuses.votingBonus29', value);
    });

    const tomeInput = document.getElementById('tome-total-points');
    if (tomeInput) tomeInput.addEventListener('input', () => {
        const value = parseFloat(tomeInput.value) || 0;
        window.StateManager.updateState('miscBonuses.tometotalpoints', value);
    });
}

// Exposed on window so models.js can call window.syncManualInputs()
window.syncManualInputs = function() {
    renderLabItems();

    const votingInput = document.getElementById('voting-bonus-29');
    if (votingInput) {
        votingInput.value = window.farmingState.miscBonuses.votingBonus29 || 0;
    }

    const tomeInput = document.getElementById('tome-total-points');
    if (tomeInput) {
        tomeInput.value = window.farmingState.miscBonuses.tometotalpoints || 0;
    }

    console.log('[UI] Manual inputs synced with state');
};
