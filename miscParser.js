
window.parseMiscBonusesData = function(data, state = window.farmingState) {
    state.playerData = data || {};
    let tempLevel = 0; // temp level from json data to be used in formulas
    // ======================
    // HELPER FUNCTIONS
    // ======================
    
    const safeGet = (arr, ...keys) => {
        let val = arr;
        for (let k of keys) {
            if (val === null || val === undefined) return 0;
            val = val[k] ?? val[String(k)];
            if (val === null || val === undefined) return 0;
        }
        return Number(val) || 0;
    };

    const parseJsonField = (fieldName) => {
        let data = state.playerData[fieldName];
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.warn(`⚠️ Failed to parse ${fieldName} as JSON`);
                return [];
            }
        }
        return data || [];
    };

    // ======================
    // PARSE ALL STRINGIFIED FIELDS
    // ======================
    let taskZZ2      = parseJsonField("TaskZZ2");
    let holes        = parseJsonField("Holes");
    let research     = parseJsonField("Research");
    let lab          = parseJsonField("LAB");
    let sailing      = parseJsonField("Sailing");
    let ninja        = parseJsonField("Ninja");
    let optLacc      = parseJsonField("OptLacc");
    let gemPurchased = parseJsonField("GemItemsPurchased");
    let upgVault     = parseJsonField("UpgVault");
    let meals        = parseJsonField("Meals");
    let Arcane       = parseJsonField("Arcane");
    let ArcadeUpg    = parseJsonField("ArcadeUpg");
    let lv0_0        = parseJsonField("Lv0_0");

    
    state.miscBonuses.ogTaffyDisc            = safeGet(ninja, 107, 11) === 1 ? 1.5 : 1.0; // sneaking Taffy Disc OG chance
    state.miscBonuses.crystalSneeking        = safeGet(ninja, 107, 8) === 1 ? 1.3 : 1.0; // sneaking  Crystal Comb  Bigger Summoning Winner Bonuses	
    state.miscBonuses.ogMeritShop            = safeGet(taskZZ2, 5, 2);  // Merit Shop Overgrowth raw level
    state.miscBonuses.evoMonumentWisdom      = safeGet(holes, 15, 24); // x Farming Crop Evo Chance stores level
    state.miscBonuses.wisdomBonusLevel       = safeGet(holes, 15, 29); ; //x Wisdom Bonuses Multiplier , stores level
    state.miscBonuses.evoCropEvoStamp        = safeGet(state.playerData.StampLv, 1, 47); // evo stamp
    state.miscBonuses.evoSacrificeHarvest    = safeGet(state.playerData.Grimoire, 14); //Sacrifice Harvest grimoire upgrade level
    
    // Skill Mastery 200
    let thisCharFarming = safeGet(state.playerData.Lv0_1, 16);
    let totalFarmingLevels = thisCharFarming * 10;
    state.miscBonuses.evoSkillMastery200     = totalFarmingLevels >= 200 ? 1.15 : 1.0;

    state.miscBonuses.evoSkullShop           = safeGet(optLacc, 229); //Skull Shop evo
    state.miscBonuses.evoMajigerLamp         = safeGet(holes, 21, 7); // lamp evo holes
    
    // Bettah Stickahs Zuperbits
    const gamingStr = (state.playerData.Gaming && state.playerData.Gaming[12]) || "";
    state.miscBonuses.bettahStickahsZuperbits = String(gamingStr).includes("管") ? 1.2 : 1.0;

    state.miscBonuses.evoStickers            = safeGet(research, 9, 4); // Farming Stickers count

    // Black Diamond Rhinestone (Lab)
    const lab16 = safeGet(lab, 14, 16);
    const lab17 = safeGet(lab, 14, 17);
    if (lab16 === 1 && lab17 === 1) {
        state.lab.mealBlackDiamondRhinestone = 1.24;
    } else if (lab16 === 1) {
        state.lab.mealBlackDiamondRhinestone = 1.16;
    } else {
        state.lab.mealBlackDiamondRhinestone = 1.0;
    }

    state.miscBonuses.godshardSetBonus       = String(optLacc[379] || "").includes("GODSHARD_SET") ? 1.15 : 1.0; //Godshard SetBonus -  OptLacc[379]
    state.miscBonuses.evoButton              = safeGet(optLacc, 594); //Evolution Button (raw hold press count)
    state.miscBonuses.vaultOvertuneLevel     = safeGet(upgVault, 42); //Vault Overtune (raw level) multi to vial bonus


    // Croppius Evolvius Bonus Vault upgrade evo chance
    tempLevel = safeGet(upgVault, 78);
    state.miscBonuses.croppiusEvolviusBonus  = 1 + 0.1 * tempLevel + 0.01 * Math.floor((tempLevel + 5) / 12);

    // ======================
    // MEALS
    // ======================
    state.meals.evoBillJackPepper = safeGet(meals, 0, 62); // Bill Jack Pepper (+5% Crop Evolution per level, additive)
    state.meals.evoNyanborgir     = safeGet(meals, 0, 66); // Nyanborgir (raw level only — multiplicative scaling based on Summoning Lv )

    // ======================
    // SUMMONING RELATED
    // ======================
    state.summoning.emperorBonusKills          = safeGet(optLacc, 369); //Emperor Bonuses (raw kill count only)
    state.summoning.vicarOfTheEmperorLevel     = safeGet(Arcane, 48); // Vicar of the Emperor //Arcane[48] 
    state.summoning.emperorBonusesArcadeLevel  = safeGet(ArcadeUpg, 51); // Emperor Bonuses ( arcade )// ArcadeUpg[51]level max 100 +1 (101) if super 
    state.summoning.kingOfAllWinnersPurchases  = safeGet(gemPurchased, 11); // King Of All Winners (raw purchase count only) bonus to summoner bonus 
    state.summoning.endlessSummoningWaves      = safeGet(optLacc, 319); // endless summoning battle count // OptLacc[319]
    // ======================
    // LEVELS
    // ======================
    state.levels.farming   = safeGet(lv0_0, 16); //Farming level Lv0_0[16]
    state.levels.summoning = safeGet(lv0_0, 18); //Summoning level Lv0_0[18]


    console.log(`✅ parseMiscBonusesData completed`);


    return true;
};


