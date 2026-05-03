// ======================
// LAND RANK OPTIMIZER UI
// Depends on: models.js (farmingState.landRank), renderFarming.js
// Exposes: renderLandrankGrid
// Called by: init.js (initAfterUI), models.js (renderAll)
// ======================

function renderLandrankGrid() {
    const grid = document.getElementById('landrank-grid');
    if (!grid) return;

    const upgrades = window.farmingState?.landRank?.upgrades;
    const count = Array.isArray(upgrades) ? upgrades.length : 20;

    // Rebuild grid only if slot count changed (e.g. first render vs data load)
    if (grid.children.length !== count) {
        grid.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const slot = document.createElement('div');
            slot.className = 'landrank-slot';
            slot.dataset.index = i;
            slot.innerHTML = '<div class="landrank-slot-icon"></div><div class="landrank-slot-level">LV 0</div>';
            slot.addEventListener('click', () => selectLandrankSlot(slot));
            grid.appendChild(slot);
        }
    }

    // Update level labels on every render (reflects loaded data)
    const slots = grid.querySelectorAll('.landrank-slot');
    slots.forEach((slot, i) => {
        const level = upgrades?.[i]?.currentLevel ?? 0;
        slot.querySelector('.landrank-slot-level').textContent = 'LV ' + level;
        const icon = slot.querySelector('.landrank-slot-icon');
        const imgUrl = window.imageLinks?.landrank?.[i];
        icon.innerHTML = (level >= 1 && imgUrl) ? `<img src="${imgUrl}" alt="">` : '';
    });

    // Update stats panel
    const stats = window.farmingState?.landRank?.stats;
    const statsList = document.getElementById('landrank-stats-list');
    if (statsList && stats) {
        const rows = [
            { name: 'LandRank LV',        val: stats.first           },
            { name: 'Total Ranks',         val: stats.totalSum        },
            { name: 'Points Allocated',    val: stats.pointsAllocated },
            { name: 'Points Available',    val: stats.pointsAvailable },
        ];
        statsList.innerHTML = rows.map(r =>
            `<div class="landrank-stat-row">
                <span class="landrank-stat-name">${r.name}</span>
                <span class="landrank-stat-val">${r.val ?? 0}</span>
            </div>`
        ).join('');
    }
}

function selectLandrankSlot(slot) {
    const grid = document.getElementById('landrank-grid');
    grid.querySelectorAll('.landrank-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');

    const i = +slot.dataset.index;
    const upgrade = window.farmingState?.landRank?.upgrades?.[i];
    const bonus = upgrade?.getBonus() ?? 0;
    const formattedDesc = upgrade?.desc
        ? upgrade.desc.replace('+%', `+${bonus.toFixed(2)}%`)
        : 'Bonus data not yet loaded.';

    document.getElementById('landrank-info-name').textContent = upgrade?.name ?? 'Slot ' + (i + 1);
    document.getElementById('landrank-info-desc').textContent = formattedDesc;
}
