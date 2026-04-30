// ======================
// SHINY PETS (Breeding array) - Infinite Stars + Meal Bonus
// ======================

// Cumulative days required for shiny pet levels (capped at level 20)
const SHINY_CUMULATIVE_DAYS = [
    0,         // lvl 0
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
    116500,    // 15 
    220900,    // 16
    415800,    // 17
    778000,    // 18
    1400000,   // 19
    2700000    // 20
];

function getShinyPetLevel(totalExp) {
    totalExp = Number(totalExp) || 0;

    for (let lvl = SHINY_CUMULATIVE_DAYS.length - 1; lvl >= 1; lvl--) {
        if (totalExp >= SHINY_CUMULATIVE_DAYS[lvl]) {
            return lvl;
        }
    }
    return 1; 
}

window.parseShinyPetsData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let breeding = state.playerData.Breeding;


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

    state.shinyPets.infiniteStars = totalStars+5; //5 default base value

    // === Shiny Meal Bonus Pets ===
    const redMushroomExp = safeGet(breeding, 22, 4);
    const sheepieExp     = safeGet(breeding, 24, 0);

    const redLevel   = getShinyPetLevel(redMushroomExp);
    const sheepLevel = getShinyPetLevel(sheepieExp);

    state.shinyPets.mealBonus = redLevel + sheepLevel;   // +1% per level each

    console.log(`✅ parseShinyPetsData completed (infiniteStars: ${totalStars}, mealBonus: ${state.shinyPets.mealBonus})`);
    return true;
};