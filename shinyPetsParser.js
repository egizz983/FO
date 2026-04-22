// ======================
// SHINY PETS (Breeding array) - Infinite Stars + Meal Bonus
// ======================

// Cumulative days required for shiny pet levels (capped at level 20)
const SHINY_CUMULATIVE_DAYS = [
    0,         // lvl 0 (placeholder)
    0,         // 1
    3,         // 2
    11,        // 3
    33,        // 4
    85,        // 5
    200,       // 6
    448,       // 7
    964,       // 8
    2013,      // 9
    4107,      // 10
    8227,      // 11
    16234,     // 12
    31633,     // 13
    60989,     // 14
    116500,    // 15 (116.5 K)
    220900,    // 16 (220.9 K)
    415800,    // 17 (415.8 K)
    778000,    // 18 (778 K)
    1400000,   // 19 (1.4 M)
    2700000    // 20 (2.7 M)
];

function getShinyPetLevel(totalExp) {
    totalExp = Number(totalExp) || 0;
    // Find the highest level where cumulative days <= total exp
    for (let lvl = SHINY_CUMULATIVE_DAYS.length - 1; lvl >= 1; lvl--) {
        if (totalExp >= SHINY_CUMULATIVE_DAYS[lvl]) {
            return lvl;
        }
    }
    return 1; // minimum level
}

window.parseShinyPetsData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let breeding = state.playerData.Breeding;

    // Parse breeding data if it's passed as a string
    if (typeof breeding === "string") {
        try { 
            breeding = JSON.parse(breeding); 
        } catch (e) { 
            console.warn("⚠️ Failed to parse Breeding as JSON");
            return false; 
        }
    }

    if (!Array.isArray(breeding) || breeding.length < 25) {
        console.warn("⚠️ Breeding array is missing or too short");
        return false;
    }

    // Safe way to pull numeric values from the nested array
    const safeGet = (arr, group, index) => {
        try {
            return Number(arr[group]?.[index]) || 0;
        } catch (e) {
            return 0;
        }
    };

    // === Infinite Star Shiny Pets ===
    let totalStars = 0;
    const infiniteStarPets = [
        [22, 1], [22, 6], [22, 9],   // Breeding[22]
        [24, 2], [24, 8], [24, 13]   // Breeding[24]
    ];

    infiniteStarPets.forEach(([group, idx]) => {
        const exp = safeGet(breeding, group, idx);
        const level = getShinyPetLevel(exp);
        totalStars += level * 2;          // +2 stars per level
    });

    state.shinyPets.infiniteStars = totalStars;

    // === Shiny Meal Bonus Pets ===
    const redMushroomExp = safeGet(breeding, 22, 4);
    const sheepieExp     = safeGet(breeding, 24, 0);

    const redLevel   = getShinyPetLevel(redMushroomExp);
    const sheepLevel = getShinyPetLevel(sheepieExp);

    state.shinyPets.mealBonus = redLevel + sheepLevel;   // +1% per level each

    console.log(`✅ parseShinyPetsData completed (infiniteStars: ${totalStars}, mealBonus: ${state.shinyPets.mealBonus})`);
    return true;
};