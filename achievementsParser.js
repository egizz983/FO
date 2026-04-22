
// ======================
// FARMING ACHIEVEMENTS (AchieveReg)
// ======================

window.parseAchievementsData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let achieveReg = state.playerData.AchieveReg;

    if (typeof achieveReg === "string") {
        try { 
            achieveReg = JSON.parse(achieveReg); 
        } catch (e) { 
            console.warn("⚠️ Failed to parse AchieveReg as JSON");
            return false; 
        }
    }

    if (!achieveReg || !Array.isArray(achieveReg)) {
        console.warn("⚠️ AchieveReg array not found or invalid");
        return false;
    }

    // Populate the new centralized achievements section
    state.achievements.regalisMyBeloved          = Number(achieveReg[373]) || 0;   // 1.01× Winners Bonus
    state.achievements.spectreStars              = Number(achieveReg[374]) || 0;   // 1.01× Winners Bonus
    state.achievements.farmingEvoLilOvergrowth   = Number(achieveReg[355]) || 0;   // 1.05× Crop Evolution chance
    state.achievements.farmingOgBigTimeLandOwner = Number(achieveReg[365]) || 0;   // 1.15× Overgrowth chance

    console.log(`✅ parseAchievementsData completed`);
    return true;
};