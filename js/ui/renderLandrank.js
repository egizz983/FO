// ======================
// LAND RANK OPTIMIZER UI
// Depends on: models.js (farmingState.landRank), renderFarming.js
// Exposes: renderLandrankGrid
// Called by: init.js (initAfterUI), models.js (renderAll)
// ======================

// Position fixed tooltips near their icon on mouseenter
document.addEventListener('mouseenter', function(e) {
    if (!(e.target instanceof Element)) return;
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
            slot.innerHTML = '<div class="landrank-slot-icon"></div><div class="landrank-slot-level">LV 0</div><div class="landrank-slot-threshold"></div>';
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
        const pct = upgrades?.[i]?.getBonusPercentOfMax?.() ?? null;
        const threshEl = slot.querySelector('.landrank-slot-threshold');
        if (threshEl) threshEl.textContent = pct !== null ? pct.toFixed(0) + '%' : '';
    });

    // Update stats panel
    const stats = window.farmingState?.landRank?.stats;
    const statsList = document.getElementById('landrank-stats-list');
    if (statsList && stats) {
        const rows = [
            { name: 'Plot Count',       val: stats.PlotCount       },
            { name: 'LandRank LV', val: stats.first, tip: 'Game uses the very first land rank level for all bonuses that are per rank.' },
            { name: 'Total Ranks',      val: stats.totalSum        },
            { name: 'Points Allocated', val: stats.pointsAllocated },
            { name: 'Points Available', val: stats.pointsAvailable },
            { name: 'OG Cap',           val: '30/' + (typeof getMaxOGCount === 'function' ? getMaxOGCount() : 0) },
            { name: 'Evo Chance Multi', val: (typeof calculateNextCropChance === 'function' ? calculateNextCropChance(999).toExponential(3) : '—') },
            { name: 'Crop Value Cap',       val: (typeof getCropValueCap === 'function' ? getCropValueCap().toFixed(0) : '—') },
            { name: 'Crop Value (uncapped)', val: (() => {
                if (typeof calculateCropsBonusValue !== 'function') return '—';
                const basket05 = window.farmingState?.market?.day?.find(u => u.index === 7)?.getBonus() || 0;
                const exotic28 = window.farmingState?.market?.exotic?.find(u => u.index === 48)?.getBonus() || 0;
                const exotic29 = window.farmingState?.market?.exotic?.find(u => u.index === 49)?.getBonus() || 0;
                const baseRoll = 1 + (basket05 + exotic28 + exotic29) / 100;
                return (calculateCropsBonusValue(0, 69420) * baseRoll).toFixed(0);
            })() },
            { name: 'CROPCount10k',   input: true, inputId: 'landrank-cropcnt10k',   val: window.farmingState?.gmoCropCounts?.['10000']  ?? 0, tip: 'Used to calculate crop value when having low crop count for value GMO' },
            { name: 'CROPCount100k',  input: true, inputId: 'landrank-cropcnt100k',  val: window.farmingState?.gmoCropCounts?.['100000'] ?? 0, tip: 'Used to calculate Super GMO bonus multiplier applied to all other GMOs' },
        ];
        statsList.innerHTML = rows.map(r =>
            `<div class="landrank-stat-row">
                <span class="landrank-stat-name">${r.name}${(r.tip)
                    ? `<span class="landrank-tooltip-wrap" style="margin-left:4px;">
                           <span class="landrank-tooltip-icon">?</span>
                           <span class="landrank-tooltip-box">${r.tip}</span>
                       </span>`
                    : ''}</span>
                ${r.input
                    ? `<input id="${r.inputId}" type="number" min="0" value="${r.val}" style="width:60px;background:var(--bg-primary,#12121f);color:var(--text-primary,#eee);border:1px solid var(--border-color,#444);border-radius:4px;padding:1px 4px;font-size:0.75rem;text-align:right;">`
                    : `<span class="landrank-stat-val">${r.val ?? 0}</span>`}
            </div>`
        ).join('');

        // Wire up CROPCount10k input
        const cnt10kInput = document.getElementById('landrank-cropcnt10k');
        if (cnt10kInput) {
            cnt10kInput.addEventListener('change', () => {
                const v = Math.max(0, parseInt(cnt10kInput.value, 10) || 0);
                cnt10kInput.value = v;
                window.farmingState.gmoCropCounts['10000'] = v;
                if (typeof renderLandrankGrid === 'function') renderLandrankGrid();
            });
        }

        // Wire up CROPCount100k input
        const cnt100kInput = document.getElementById('landrank-cropcnt100k');
        if (cnt100kInput) {
            cnt100kInput.addEventListener('change', () => {
                const v = Math.max(0, parseInt(cnt100kInput.value, 10) || 0);
                cnt100kInput.value = v;
                window.farmingState.gmoCropCounts['100000'] = v;
                if (typeof renderLandrankGrid === 'function') renderLandrankGrid();
            });
        }
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
        caps[g] = (val !== '' && val != null) ? (parseInt(val, 10) || 0) : 0;
    });
    return caps;
}

// ======================
// ALLOCATION MODE (radio group: none / manual / threshold)
// ======================
function toggleAllocMode() {
    const mode = document.querySelector('input[name="alloc-mode"]:checked')?.value ?? 'none';
    const manualSection = document.getElementById('manual-alloc-section');
    if (manualSection) manualSection.style.display = mode === 'manual' ? 'block' : 'none';
    if (mode === 'manual') renderManualAllocationInputs();

    // Disable standalone inputs superseded by manual group caps
    const isManual = mode === 'manual';
    const farmExpInput = document.getElementById('rule-farmexp-points');
    const utilityRow   = document.getElementById('rule-utility-upgrades')?.closest('label');
    if (farmExpInput) { farmExpInput.disabled = isManual; farmExpInput.style.opacity = isManual ? '0.4' : '1'; }
    if (utilityRow)   { utilityRow.style.opacity = isManual ? '0.4' : '1';
                        utilityRow.querySelector('input').disabled = isManual; }
}

// Legacy alias so any existing calls still work
function toggleManualAllocation() { toggleAllocMode(); }

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
// EVOLUTION CAP
// ======================

// Selected evo state
const _evoCap = { cropType: null, cropId: null };

function toggleEvolutionCap() {
    const enabled = document.getElementById('rule-evolution-cap')?.checked;
    const section = document.getElementById('evolution-cap-section');
    if (section) section.style.display = enabled ? 'block' : 'none';
    if (!enabled) {
        closeCropPickerPanel();
        removeEvolutionCapStat();
    } else {
        updateEvolutionCapStat();
    }
}

function closeCropPickerPanel() {
    const panel = document.getElementById('crop-picker-panel');
    if (panel) panel.style.display = 'none';
}

// Opens the side panel and populates it with crop type images
function openCropTypePicker() {
    if (!window.cropTypes) return;
    const panel = document.getElementById('crop-picker-panel');
    const title = document.getElementById('crop-picker-title');
    const grid  = document.getElementById('crop-picker-grid');
    if (!panel || !grid) return;

    title.textContent = 'Select Crop Type';
    grid.innerHTML = '';

    const typeNames = ['Basic', 'Earthy', 'Bulbo', 'Sushi', 'Mushie', 'Glassy', 'Medal'];
    window.cropTypes.forEach((ct, i) => {
        const item = document.createElement('div');
        item.className = 'crop-picker-item';
        if (ct.image) {
            const img = document.createElement('img');
            img.src = ct.image;
            img.referrerPolicy = 'no-referrer';
            item.appendChild(img);
        }
        const lbl = document.createElement('span');
        lbl.textContent = typeNames[i] ?? `Type ${i}`;
        item.appendChild(lbl);
        item.addEventListener('click', () => selectCropType(i, typeNames[i] ?? `Type ${i}`, ct.image));
        grid.appendChild(item);
    });

    panel.style.display = 'flex';
}

function selectCropType(typeIndex, typeName, imgSrc) {
    _evoCap.cropType = typeIndex;
    _evoCap.cropId   = null;

    // Update type button
    const btn = document.getElementById('evo-type-btn');
    btn.innerHTML = '';
    if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.referrerPolicy = 'no-referrer';
        btn.appendChild(img);
    }
    btn.appendChild(document.createTextNode(typeName));

    // Reset and enable crop button
    const cropBtn = document.getElementById('evo-crop-btn');
    cropBtn.textContent = '— select —';
    cropBtn.disabled = false;

    closeCropPickerPanel();
    updateEvolutionCapStat();
}

// Opens the side panel and populates it with crops for the selected type
function openCropPicker() {
    if (_evoCap.cropType === null || !window.cropArray) return;
    const crops = window.cropArray[_evoCap.cropType];
    if (!crops) return;

    const panel = document.getElementById('crop-picker-panel');
    const title = document.getElementById('crop-picker-title');
    const grid  = document.getElementById('crop-picker-grid');
    if (!panel || !grid) return;

    title.textContent = 'Select Crop';
    grid.innerHTML = '';

    crops.forEach((crop, id) => {
        const item = document.createElement('div');
        item.className = 'crop-picker-item';
        if (crop.image) {
            const img = document.createElement('img');
            img.src = crop.image;
            img.referrerPolicy = 'no-referrer';
            item.appendChild(img);
        }
        const lbl = document.createElement('span');
        lbl.textContent = crop.name ?? `Crop ${id}`;
        item.appendChild(lbl);
        item.addEventListener('click', () => selectCrop(id, crop.name ?? `Crop ${id}`, crop.image));
        grid.appendChild(item);
    });

    panel.style.display = 'flex';
}

function selectCrop(cropId, cropName, imgSrc) {
    _evoCap.cropId = cropId;

    const btn = document.getElementById('evo-crop-btn');
    btn.innerHTML = '';
    if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.referrerPolicy = 'no-referrer';
        btn.appendChild(img);
    }
    btn.appendChild(document.createTextNode(cropName));

    closeCropPickerPanel();
    updateEvolutionCapStat();
}

// Returns { cropType, cropId, chance, multiplierNeeded } or null if rule is disabled
function getEvolutionCap() {
    if (!document.getElementById('rule-evolution-cap')?.checked) return null;
    const { cropType, cropId } = _evoCap;
    const chance = parseFloat(document.getElementById('evolution-cap-chance')?.value);
    if (cropType === null || cropId === null || isNaN(chance) || chance <= 0) return null;
    const multiplierNeeded = getMultiplierNeededForChance(chance, cropType, cropId);
    return { cropType, cropId, chance, multiplierNeeded };
}

function updateEvolutionCapStat() {
    const statsList = document.getElementById('landrank-stats-list');
    if (!statsList) return;

    // Remove existing cap row if present
    removeEvolutionCapStat();

    const cap = getEvolutionCap();
    if (!cap) return;

    const row = document.createElement('div');
    row.className = 'landrank-stat-row';
    row.id = 'evo-cap-stat-row';
    row.innerHTML =
        `<span class="landrank-stat-name">Evolution Cap</span>` +
        `<span class="landrank-stat-val" style="font-size:0.7rem;">${cap.multiplierNeeded.toExponential(3)}</span>`;
    statsList.appendChild(row);
}

function removeEvolutionCapStat() {
    document.getElementById('evo-cap-stat-row')?.remove();
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

    const allocMode    = document.querySelector('input[name="alloc-mode"]:checked')?.value ?? 'none';
    const utilityMaxed = document.getElementById('rule-utility-upgrades')?.checked ?? false;

    // ── Step 1: Reset all upgrade levels to 0 ──
    upgrades.forEach(u => { u.currentLevel = 0; });
    let pointsLeft = stats.totalSum;

    // ── Pool variables — assigned differently by mode ──
    let farmExpPool, evoPool, ogPool, soilPool;

    // Helper to allocate Production group greedily (shared by both modes)
    const _runProductionGreedy = (pool, capTarget = Infinity) => {
        const productionIds = [1, 8, 17];
        const savedCnt10k   = window.farmingState.gmoCropCounts['10000'];
        const savedCnt100k  = window.farmingState.gmoCropCounts['100000'];
        window.farmingState.gmoCropCounts['10000']  = stats.PlotCount || 0;
        window.farmingState.gmoCropCounts['100000'] = stats.PlotCount || 0;
        const _b = window.farmingState.market.day?.find(u => u.index === 7)?.getBonus() || 0;
        const _e28 = window.farmingState.market.exotic?.find(u => u.index === 48)?.getBonus() || 0;
        const _e29 = window.farmingState.market.exotic?.find(u => u.index === 49)?.getBonus() || 0;
        const _roll = 1 + (_b + _e28 + _e29) / 100;
        const _cv   = () => calculateCropsBonusValue(0, 69420) * _roll;
        let rem = pool;
        if (rem > 0 && upgrades[1].currentLevel === 0) { upgrades[1].currentLevel = 1; rem--; }
        if (typeof calculateCropsBonusValue === 'function') {
            let safety = 0;
            while (rem > 0 && safety++ < 100000) {
                if (_cv() >= capTarget) break;
                const base = _cv(); let bestId = -1, bestDelta = 0;
                for (const id of productionIds) {
                    upgrades[id].currentLevel++;
                    const delta = _cv() - base;
                    upgrades[id].currentLevel--;
                    if (delta > bestDelta) { bestDelta = delta; bestId = id; }
                }
                if (bestId === -1 || bestDelta <= 0) break;
                upgrades[bestId].currentLevel++; rem--;
            }
        }
        window.farmingState.gmoCropCounts['10000']  = savedCnt10k;
        window.farmingState.gmoCropCounts['100000'] = savedCnt100k;
    };

    if (allocMode === 'manual') {
        // ── Manual mode: pools come directly from per-group user inputs ──
        const caps  = getManualCaps() ?? {};
        const clamp = (v) => { const n = Math.min(v || 0, pointsLeft); pointsLeft -= n; return n; };

        // Utility: spend capped pool across utility upgrades (still respect maxLV per upgrade)
        const utilityPool = clamp(caps['Utility'] ?? 0);
        if (utilityPool > 0) {
            const maxLV = typeof getLandRank5thColumnMaxLV === 'function' ? getLandRank5thColumnMaxLV() : 1;
            let rem = utilityPool;
            for (const u of upgrades.filter(u => u.group === 'Utility')) {
                if (rem <= 0) break;
                const alloc = Math.min(maxLV, rem);
                u.currentLevel = alloc; rem -= alloc;
            }
        }

        // Production: greedy, no cap target (user controls the pool size)
        const productionPool = clamp(caps['Production'] ?? 0);
        if (productionPool > 0) _runProductionGreedy(productionPool, Infinity);

        // Remaining pools directly from caps
        farmExpPool = clamp(caps['FarmExp']    ?? 0);
        evoPool     = clamp(caps['Evolution']  ?? 0);
        ogPool      = clamp(caps['Overgrowth'] ?? 0);
        soilPool    = clamp(caps['SoilExp']    ?? 0);
        pointsLeft  = 0;

    } else {
        // ── Auto mode ──

        // Step 2: Utility upgrades — max if checkbox checked
        if (utilityMaxed) {
            const maxLV = typeof getLandRank5thColumnMaxLV === 'function' ? getLandRank5thColumnMaxLV() : 1;
            for (const u of upgrades.filter(u => u.group === 'Utility')) {
                const alloc = Math.min(maxLV, pointsLeft);
                u.currentLevel = alloc; pointsLeft -= alloc;
            }
        }

        // Step 3: Crop value — greedy until >= cap/2
        const cropValueCap    = typeof getCropValueCap === 'function' ? getCropValueCap() : Infinity;
        const cropValueTarget = cropValueCap / 2;
        // capture pointsLeft before so we know how many production consumed
        const pointsBeforeProd = pointsLeft;
        _runProductionGreedy(pointsLeft, cropValueTarget);
        // _runProductionGreedy mutates upgrades but not pointsLeft directly;
        // re-derive pointsLeft from what was actually allocated
        const prodAllocated = [1, 8, 17].reduce((s, id) => s + (upgrades[id].currentLevel || 0), 0);
        pointsLeft = pointsBeforeProd - prodAllocated;

        // Step 4a: Farm Exp carve-off (standalone input)
        const farmExpInput = parseInt(document.getElementById('rule-farmexp-points')?.value, 10) || 0;
        farmExpPool = Math.min(farmExpInput, pointsLeft);
        pointsLeft -= farmExpPool;

        // Step 4b: Split remaining 3 ways
        const basePool  = Math.floor(pointsLeft / 3);
        const remainder = pointsLeft % 3;
        evoPool  = basePool + (remainder > 0 ? 1 : 0);
        ogPool   = basePool + (remainder > 1 ? 1 : 0);
        soilPool = basePool;
        pointsLeft = 0;
    }

    // ── Step 5: Evolution greedy (IDs 0, 3, 10, 15) ──
    // Score = calculateNextCropChance(999) — multiplicative interactions handled automatically.
    const evoUpgIds  = upgrades.filter(u => u.group === 'Evolution').map(u => u.id);
    const evoCap     = typeof getEvolutionCap === 'function' ? getEvolutionCap() : null;
    const evoCapVal  = evoCap ? evoCap.multiplierNeeded : Infinity;

    if (typeof calculateNextCropChance === 'function') {
        let safetyNet = 0;
        while (evoPool > 0 && safetyNet++ < 100000) {
            const score = calculateNextCropChance(999);
            if (score >= evoCapVal) break;
            const base = score;
            let bestId = -1, bestDelta = 0;
            for (const id of evoUpgIds) {
                upgrades[id].currentLevel++;
                const delta = calculateNextCropChance(999) - base;
                upgrades[id].currentLevel--;
                if (delta > bestDelta) { bestDelta = delta; bestId = id; }
            }
            if (bestId === -1 || bestDelta <= 0) break;
            upgrades[bestId].currentLevel++;
            evoPool--;
        }
        // If evo hit cap early, split leftover evo points evenly into OG and soil pools
        if (evoPool > 0) {
            const half = Math.floor(evoPool / 2);
            ogPool   += half;
            soilPool += evoPool - half;
            evoPool   = 0;
        }
    }

    // ── Step 6: OG greedy (IDs 7, 11, 18) ──
    // Score = calculateNextOGChance(0) — feeds getLandRankUpgBonusTOTAL(3) internally.
    const ogUpgIds  = upgrades.filter(u => u.group === 'Overgrowth').map(u => u.id);
    const OG_MAX    = 30;

    if (typeof calculateNextOGChance === 'function') {
        let safetyNet = 0;
        while (ogPool > 0 && safetyNet++ < 100000) {
            if (typeof getMaxOGCount === 'function' && getMaxOGCount() >= OG_MAX) break;
            const base = calculateNextOGChance(0);
            let bestId = -1, bestDelta = 0;
            for (const id of ogUpgIds) {
                upgrades[id].currentLevel++;
                const delta = calculateNextOGChance(0) - base;
                upgrades[id].currentLevel--;
                if (delta > bestDelta) { bestDelta = delta; bestId = id; }
            }
            if (bestId === -1 || bestDelta <= 0) break;
            upgrades[bestId].currentLevel++;
            ogPool--;
        }
    }

    // ── Step 7: Soil Exp greedy (IDs 2, 6, 13) ──
    // Score = chainBonus × landRankBonus, matching processSoilRank factors.
    const soilUpgIds  = upgrades.filter(u => u.group === 'SoilExp').map(u => u.id);
    const _soilScore  = () =>
        (1 + (upgrades[2].getBonus() * (stats.first || 0)) / 100) *
        getLandRankUpgBonusTOTAL(2).toMulti();

    if (typeof getLandRankUpgBonusTOTAL === 'function') {
        let safetyNet = 0;
        while (soilPool > 0 && safetyNet++ < 100000) {
            const base = _soilScore();
            let bestId = -1, bestDelta = 0;
            for (const id of soilUpgIds) {
                upgrades[id].currentLevel++;
                const delta = _soilScore() - base;
                upgrades[id].currentLevel--;
                if (delta > bestDelta) { bestDelta = delta; bestId = id; }
            }
            if (bestId === -1 || bestDelta <= 0) break;
            upgrades[bestId].currentLevel++;
            soilPool--;
        }
    }

    // ── Step 8: Farm Exp greedy (IDs 5, 12, 16) — all treated as additive ──
    const farmExpUpgIds = upgrades.filter(u => u.group === 'FarmExp').map(u => u.id);
    const _farmExpScore = () => farmExpUpgIds.reduce((sum, id) => sum + upgrades[id].getBonus(), 0);

    if (farmExpPool > 0) {
        let safetyNet = 0;
        while (farmExpPool > 0 && safetyNet++ < 100000) {
            const base = _farmExpScore();
            let bestId = -1, bestDelta = 0;
            for (const id of farmExpUpgIds) {
                upgrades[id].currentLevel++;
                const delta = _farmExpScore() - base;
                upgrades[id].currentLevel--;
                if (delta > bestDelta) { bestDelta = delta; bestId = id; }
            }
            if (bestId === -1 || bestDelta <= 0) break;
            upgrades[bestId].currentLevel++;
            farmExpPool--;
        }
    }

    // ── Update stats ──
    stats.pointsAllocated = upgrades.reduce((sum, u) => sum + (u.currentLevel || 0), 0);
    stats.pointsAvailable = stats.totalSum - stats.pointsAllocated;

    renderLandrankGrid();
    console.log(`[LandRank Optimizer] Mode: ${allocMode} | Utility maxed: ${utilityMaxed} | Points left: ${pointsLeft}`);
}
