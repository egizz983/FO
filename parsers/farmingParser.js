
window.parseFarmingData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let farmCrop = state.playerData.FarmCrop;
    if (typeof farmCrop === "string") {
        try { farmCrop = JSON.parse(farmCrop); } catch (e) { farmCrop = {}; }
    }

    if (farmCrop && typeof farmCrop === "object" && !Array.isArray(farmCrop)) {
        const cropAmounts = Object.values(farmCrop).map(val => Number(val) || 0);
        state.gmoCropCounts["200"]     = cropAmounts.filter(c => c >= 200).length;
        state.gmoCropCounts["1000"]    = cropAmounts.filter(c => c >= 1000).length;
        state.gmoCropCounts["2500"]    = cropAmounts.filter(c => c >= 2500).length;
        state.gmoCropCounts["10000"]   = cropAmounts.filter(c => c >= 10000).length;
        state.gmoCropCounts["100000"]  = cropAmounts.filter(c => c >= 100000).length;
    } else {
        console.warn("⚠️ FarmCrop data not found in JSON");
    }

    console.log(`✅ parseFarmingData completed ( crop counts)`);
    return true;
};


window.parseLandRankData = function(data, state = window.farmingState) {
    state.playerData = data || {};
    let farmRank = state.playerData.FarmRank;
    if (typeof farmRank === "string") {
        try { farmRank = JSON.parse(farmRank); } catch (e) { return false; }
    }

    if (Array.isArray(farmRank) && farmRank.length >= 3) {
        const ranks = farmRank[0];
        const allocated = farmRank[2];

        state.landRank.stats.totalSum = ranks.reduce((a, b) => a + b, 0);
        const unlockedPlots = ranks.filter(r => r > 0).length;
        state.landRank.stats.average = unlockedPlots > 0 ? state.landRank.stats.totalSum / unlockedPlots : 0;
        state.landRank.stats.first = farmRank[0][0] || 0;

        for (let i = 0; i < allocated.length && i < state.landRank.upgrades.length; i++) {
            state.landRank.upgrades[i].currentLevel = allocated[i] || 0;
        }

        state.landRank.stats.pointsAllocated = state.landRank.upgrades.reduce((sum, u) => sum + (u.currentLevel || 0), 0);
        state.landRank.stats.pointsAvailable = state.landRank.stats.totalSum - state.landRank.stats.pointsAllocated;

        console.log(`✅ parseLandRankData completed `);
        return true;
    }
    return false;
};


window.parseFarmUpgData = function(data, state = window.farmingState) {
    state.playerData = data || {};
    let farmUpg = state.playerData.FarmUpg;

    if (typeof farmUpg === "string") {
        try { farmUpg = JSON.parse(farmUpg); } catch (e) { return false; }
    }

    if (Array.isArray(farmUpg) && farmUpg.length >= 54) {
        // Day Market (2–9)
        state.market.day.forEach(upgrade => {
            upgrade.currentLevel = (farmUpg[upgrade.index] || 0);
        });

        // Night Market (10–17)
        state.market.night.forEach(upgrade => {
            upgrade.currentLevel = (farmUpg[upgrade.index] || 0);
        });

        // Exotic Market

        // Exotic Market ( 20–53)
        state.market.exotic.forEach(upgrade => {
            upgrade.currentLevel = (farmUpg[upgrade.index] || 0);
        });

        console.log(`✅ parseFarmUpgData completed`);
        return true;
    } else {
        console.warn("⚠️ FarmUpg data not found or too short");
        return false;
    }
};


