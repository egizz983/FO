// ======================
// FARMING BONUS CALCULATIONS & RENDERERS
// Depends on: appData.js (farmingBonuses), state.js (window.farmingState),
//             calcFormulas.js (all calc helpers), UIbreakdowns.js (window.getFarmingBreakdowns)
// Exposes: renderGroups, renderFarmingBonuses, renderBonusViewport, updateFarmingLevelDisplay
// Called by: init.js (initAfterUI), models.js (renderAll → renderFarmingBonuses,
//            updateFarmingLevelDisplay), navigation.js (view switch)
// ======================

function renderGroups(container, groupedData) {
    if (!groupedData || !groupedData.groups) return;

    groupedData.groups.forEach(group => {
        const groupWrapper = document.createElement('div');
        groupWrapper.className = 'bonus-group';

        if (group.name) {
            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';
            const totalValue = typeof group.total === 'function' ? group.total() : group.total;
            groupHeader.innerHTML = `<div style="display: flex; justify-content: space-between; align-items: center;"><h4 style="margin: 0;">${group.name}</h4><span class="group-total" style="font-weight: 700; color: var(--sub-value);">${totalValue || ''}</span></div>`;
            groupWrapper.appendChild(groupHeader);
        }

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'group-items';

        if (group.items && group.items.length > 0) {
            group.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'sub-breakdown';
                itemDiv.innerHTML = `
                    <div class="item-name">${item.label}</div>
                    <div class="item-bonus">${item.value}</div>
                    <div class="item-threshold">${item.threshold || '-'}</div>
                `;
                itemsContainer.appendChild(itemDiv);
            });
        }

        groupWrapper.appendChild(itemsContainer);
        container.appendChild(groupWrapper);
    });
}

function calculateEvolutionTotal() {
    const state = window.farmingState;

    const marketDay = farmingState.market.day.find(u => u.index === 6)?.getBonus() || 1;
    const summonerWinBonusTotal = window.getWinBonus(10).toMulti();
    const holeLampBonusTotal = window.getLampBonus().toMulti();
    const monumentTotal = getmonumentROGbonuses(2, 4).toMulti();
    const sushiBonusTotal = getRoGBonusQTY(35).toMulti();
    const cropChapterBubbleTotal = (window.calculateBubbleBonus(state.alchemy.cropChapterBubblebonus, 12, 50) * window.calculateTomeScorePer2000()).toMulti();
    const croppiusMapperTotal = (window.calculateBubbleBonus(state.alchemy.croppiusMapperBubblebonus, 5, 70) * window.calculateKillsLeftToAdvance()).toMulti();
    const flavorgilVial = getVialBonus(66, window.farmingState.alchemy.flavorgilBonus).toMulti();
    const cardBonusTotal = getCardBonus(window.farmingState.miscBonuses.jellofishcard).toMulti();
    const billJackPepperTotal = window.getMealBonus(62, state.meals.evoBillJackPepperRibbonLevel, state.meals.evoBillJackPepper).toMulti();
    const nyanborgirTotal = (window.getMealBonus(66, state.meals.evoNyanborgirRibbonLevel, state.meals.evoNyanborgir) * Math.ceil((c.asNumber(state.levels.summoning) + 1) / 50)).toMulti();
    const vaultUpgradeTotal = window.getVaultUpgBonus(78).toMulti();
    const evoStamp = getStampBonusOfType(1, 47, window.farmingState.miscBonuses.evoCropEvoStamp).toMulti();
    const grimoireTotal = grimoireUpgBonus().toMulti();
    const achievementTotal = (5 * (state.achievements.farmingEvoLilOvergrowth === -1 ? 1 : 0)).toMulti();
    const killroybonus = getKillroyBonus();
    const marketNight = farmingState.market.night.find(u => u.index === 11)?.getBonus() || 1;
    const skillMasteryBonus = getSkillMasteryBonus();
    const starsign = (getStarSigns(65) * window.farmingState.levels.farming).toMulti();
    const landRanksTotal = getLandRankUpgBonusTOTAL(0) || 1;
    const landrankUpg0 = (farmingState.landRank.upgrades[0].getBonus() * farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29).toMulti();
    const massIrrigationBonus = getTalentNumber(1, 205);
    const exoticMultipliers = state.market.exotic
        .filter(u => u.group === "Evolution" && u.isMultiplier)
        .reduce((prod, u) => prod * u.getBonus().toMulti(), 1);
    const exoticAdditives = state.market.exotic
        .filter(u => u.group === "Evolution" && !u.isMultiplier)
        .reduce((sum, u) => sum + u.getBonus(), 0).toMulti();
    const buttonBonus = getButtonBonuses(5, window.farmingState.miscBonuses.evoButtonPressCount).toMulti();
    const stickerBonus = getStickerBonus(4).toMulti();

    let result = marketDay;
    result *= summonerWinBonusTotal;
    result *= holeLampBonusTotal;
    result *= monumentTotal;
    result *= sushiBonusTotal;
    result *= cropChapterBubbleTotal;
    result *= croppiusMapperTotal;
    result *= flavorgilVial;
    result *= cardBonusTotal;
    result *= billJackPepperTotal;
    result *= nyanborgirTotal;
    result *= vaultUpgradeTotal;
    result *= evoStamp;
    result *= grimoireTotal;
    result *= achievementTotal;
    result *= killroybonus;
    result *= marketNight;
    result *= skillMasteryBonus;
    result *= starsign;
    result *= landRanksTotal;
    result *= landrankUpg0;
    result *= massIrrigationBonus;
    result *= exoticMultipliers;
    result *= exoticAdditives;
    result *= buttonBonus;
    result *= stickerBonus;

    return result.toExponential(4);
}

function calculateOverGrowthTotal() {
    const state = window.farmingState;
    const nightmarket = Math.max(1, window.farmingState.market.night?.find(u => u.index === 13)?.getBonus()).toMulti();
    const pristinecharm = (50 * (window.farmingState?.pristineCharms?.[11] || 0)).toMulti();
    const starsignsOG = getStarSigns(67).toMulti();
    const meritshop = (2 * window.farmingState.miscBonuses.ogMeritShop).toMulti();
    const achievement = (15 * (window.farmingState.achievements.farmingOgBigTimeLandOwner == -1 ? 1 : 0)).toMulti();
    const landranktotal = getLandRankUpgBonusTOTAL(3).toMulti();
    const exotic46 = farmingState.market.exotic.find(u => u.index === 46)?.getBonus().toMulti();
    const exotic47 = farmingState.market.exotic.find(u => u.index === 47)?.getBonus().toMulti();
    let result = Math.pow(0.4, 1) * OGMulti() * 1000;
    return (result).toFixed(1);
}

function calculateSoilExpTotal() {
    const basketBonus   = window.farmingState?.market?.day?.find(u => u.index === 9)?.getBonus().toMulti();
    const prevPlotRank  = c.asNumber(window.farmingState.landRank.stats.first);
    const chainBonus    = 1 + (window.farmingState.landRank.upgrades[2].getBonus() * prevPlotRank) / 100;
    const landRankBonus = getLandRankUpgBonusTOTAL(2).toMulti();
    return basketBonus * chainBonus * landRankBonus;
}

function renderFarmingBonuses() {
    const buttonsContainer = document.getElementById('bonus-buttons-container');
    const viewport = document.getElementById('bonus-viewport');
    if (!buttonsContainer || !viewport) return;

    const evolutionTotal  = calculateEvolutionTotal();
    const overgrowthTotal = "×" + calculateOverGrowthTotal();
    const cropValueCap    = window.getCropValueCap().toFixed(0);
    const growthSpeedTotal = "×" + window.calculateGrowthRate().toFixed(2);
    const soilExpTotal    = "×" + calculateSoilExpTotal().toFixed(2);

    const bonusesWithCalculated = farmingBonuses.map(bonus =>
        bonus.name === "Evolution"    ? { ...bonus, totalValue: evolutionTotal }
      : bonus.name === "Overgrowth"   ? { ...bonus, totalValue: overgrowthTotal }
      : bonus.name === "Crop Value"   ? { ...bonus, totalValue: cropValueCap }
      : bonus.name === "Growth Speed" ? { ...bonus, totalValue: growthSpeedTotal }
      : bonus.name === "Soil EXP"     ? { ...bonus, totalValue: soilExpTotal }
      : bonus
    );

    buttonsContainer.innerHTML = bonusesWithCalculated.map((bonus, index) => `
        <button class="bonus-tab-button ${index === 0 ? 'active' : ''}" data-bonus-name="${bonus.name}">
            ${bonus.name}
        </button>
    `).join('');

    document.querySelectorAll('.bonus-tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.bonus-tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedBonus = bonusesWithCalculated.find(b => b.name === button.dataset.bonusName);
            renderBonusViewport(selectedBonus);
        });
    });

    renderBonusViewport(bonusesWithCalculated[0]);
}

function renderBonusViewport(bonus) {
    const viewport = document.getElementById('bonus-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="total-row mb-4">
            <span class="sub-name">${bonus.totalLabel}:</span>
            <span class="sub-value">${bonus.totalValue}</span>
        </div>
        <div class="column-header">
            <span class="col-name">Name</span>
            <span class="col-bonus">Bonus</span>
            <span class="col-threshold">Threshold</span>
        </div>
        <div class="breakdown" id="breakdown-${bonus.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}"></div>
    `;

    const breakdownContainer = document.getElementById(`breakdown-${bonus.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    const breakdowns = window.getFarmingBreakdowns();
    const groupedData = breakdowns[bonus.name] || {};
    renderGroups(breakdownContainer, groupedData);
}

function updateFarmingLevelDisplay() {
    const farmingEl   = document.getElementById('farming-level-value');
    const summoningEl = document.getElementById('summoning-level-value');
    if (farmingEl)   farmingEl.textContent   = window.farmingState.levels.farming   || 0;
    if (summoningEl) summoningEl.textContent = window.farmingState.levels.summoning || 0;
}
