// ======================
// LAND RANK OPTIMIZER UI
// Depends on: models.js (farmingState.landRank), renderFarming.js
// Exposes: renderLandrankGrid
// Called by: init.js (initAfterUI), models.js (renderAll)
// ======================

// Position fixed tooltips near their icon on mouseenter
document.addEventListener('mouseenter', function(e) {
    const icon = e.target.closest('.landrank-tooltip-icon');
    if (!icon) return;
    const box = icon.parentElement?.querySelector('.landrank-tooltip-box');
    if (!box) return;
    const rect = icon.getBoundingClientRect();
    box.style.left = Math.max(4, rect.left - 210) + 'px';
    box.style.top  = (rect.top + window.scrollY - (box.offsetHeight / 2) + rect.height / 2) + 'px';
    // After initial paint, re-center vertically
    requestAnimationFrame(() => {
        box.style.top = Math.max(4, rect.top + window.scrollY - (box.offsetHeight / 2) + rect.height / 2) + 'px';
    });
}, true);

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
            { name: 'LandRank LV', val: stats.first, tip: 'Game uses the very first land rank level for all bonuses that are per rank.' },
            { name: 'Total Ranks',      val: stats.totalSum        },
            { name: 'Points Allocated', val: stats.pointsAllocated },
            { name: 'Points Available', val: stats.pointsAvailable },
        ];
        statsList.innerHTML = rows.map(r =>
            `<div class="landrank-stat-row">
                <span class="landrank-stat-name">${r.name}${r.tip
                    ? `<span class="landrank-tooltip-wrap" style="margin-left:4px;">
                           <span class="landrank-tooltip-icon">?</span>
                           <span class="landrank-tooltip-box">${r.tip}</span>
                       </span>`
                    : ''}</span>
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

// ======================
// THRESHOLD RULE
// ======================

function renderManualAllocationInputs() {
    const container = document.getElementById('manual-alloc-inputs');
    if (!container) return;
    const upgrades = window.farmingState?.landRank?.upgrades;
    if (!upgrades) {
        container.innerHTML = '<span class="landrank-rule-sub" style="padding:4px 0;">Load data first</span>';
        return;
    }
    const groups = [...new Set(upgrades.map(u => u.group))];
    container.innerHTML = groups.map(g =>
        `<div class="landrank-manual-row">
            <span class="landrank-manual-label">${g}</span>
            <input type="number" class="landrank-manual-input" id="manual-cap-${g}" min="0" placeholder="—" title="Max points for ${g}">
        </div>`
    ).join('');
}

// Helper to read manual caps; returns null per group if unchecked or empty
function getManualCaps() {
    const mode = document.querySelector('input[name="alloc-mode"]:checked')?.value;
    if (mode !== 'manual') return null;
    const upgrades = window.farmingState?.landRank?.upgrades ?? [];
    const groups = [...new Set(upgrades.map(u => u.group))];
    const caps = {};
    groups.forEach(g => {
        const val = document.getElementById(`manual-cap-${g}`)?.value;
        caps[g] = val !== '' && val != null ? parseInt(val, 10) : Infinity;
    });
    return caps;
}

// ======================
// ALLOCATION MODE (radio group: none / manual / threshold)
// ======================
function toggleAllocMode() {
    const mode = document.querySelector('input[name="alloc-mode"]:checked')?.value ?? 'none';
    const manualSection    = document.getElementById('manual-alloc-section');
    const thresholdSection = document.getElementById('threshold-section');
    if (manualSection)    manualSection.style.display    = mode === 'manual'    ? 'block' : 'none';
    if (thresholdSection) thresholdSection.style.display = mode === 'threshold' ? 'block' : 'none';
    if (mode === 'manual')    renderManualAllocationInputs();
    if (mode === 'threshold') renderThresholdInputs();
}

// Legacy aliases so any existing calls still work
function toggleManualAllocation() { toggleAllocMode(); }
function toggleThreshold()         { toggleAllocMode(); }

function renderThresholdInputs() {
    const container = document.getElementById('threshold-inputs');
    if (!container) return;
    const upgrades = window.farmingState?.landRank?.upgrades;
    if (!upgrades) {
        container.innerHTML = '<span class="landrank-rule-sub" style="padding:4px 0;">Load data first</span>';
        return;
    }
    const groups = [...new Set(upgrades.map(u => u.group))];
    container.innerHTML = groups.map(g =>
        `<div class="landrank-threshold-row">
            <span class="landrank-manual-label">${g}</span>
            <input type="number" class="landrank-manual-input" id="threshold-priority-${g}" min="1" max="6" placeholder="—">
            <input type="number" class="landrank-manual-input" id="threshold-cap-${g}"      min="0" max="100" placeholder="—">
        </div>`
    ).join('');
}

// Helper to read threshold settings; returns null if unchecked
function getThresholds() {
    const mode = document.querySelector('input[name="alloc-mode"]:checked')?.value;
    if (mode !== 'threshold') return null;
    const upgrades = window.farmingState?.landRank?.upgrades ?? [];
    const groups = [...new Set(upgrades.map(u => u.group))];
    const thresholds = {};
    groups.forEach(g => {
        const pVal = document.getElementById(`threshold-priority-${g}`)?.value;
        const tVal = document.getElementById(`threshold-cap-${g}`)?.value;
        thresholds[g] = {
            priority:  pVal !== '' && pVal != null ? parseInt(pVal, 10)  : null,
            threshold: tVal !== '' && tVal != null ? parseInt(tVal, 10)  : Infinity,
        };
    });
    return thresholds;
}

// ======================
// RESET / DEFAULT BUTTONS
// ======================
function resetLandrankUpgrades() {
    const upgrades = window.farmingState?.landRank?.upgrades;
    const stats    = window.farmingState?.landRank?.stats;
    if (!upgrades || !stats) { alert('Load player data first.'); return; }

    upgrades.forEach(u => { u.currentLevel = 0; });
    stats.pointsAllocated = 0;
    stats.pointsAvailable = stats.totalSum;

    renderLandrankGrid();
}

function defaultLandrankUpgrades() {
    const playerData = window.farmingState?.playerData;
    if (!playerData) { alert('Load player data first.'); return; }

    // Re-runs parser on existing class instances — safe, only updates currentLevel
    const fn = window.parseLandRankData ?? parseLandRankData;
    if (typeof fn === 'function') fn(playerData);

    renderLandrankGrid();
}

// ======================
// GREEDY MARGINAL GAIN OPTIMIZER
// Ruleset TBD — stub ready for implementation
// ======================
function runLandrankOptimizer() {
    const upgrades = window.farmingState?.landRank?.upgrades;
    const stats    = window.farmingState?.landRank?.stats;
    if (!upgrades || !stats) {
        alert('Load player data before optimizing.');
        return;
    }
    // TODO: implement greedy marginal gain algorithm once ruleset is provided
    console.log('[LandRank Optimizer] Button clicked — awaiting ruleset implementation.');
}
