
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
    let spelunk      = parseJsonField("Spelunk");
    let sushi        = parseJsonField("Sushi");
    let rift         = parseJsonField("Rift");
    let cards0       = parseJsonField("Cards0");
    let weeklyBoss   = parseJsonField("WeeklyBoss");
    let Ribbon       = parseJsonField("Ribbon");

    
    state.miscBonuses.ogTaffyDisc            = safeGet(ninja, 107, 11) === 1 ? 1.5 : 1.0; // sneaking Taffy Disc OG chance
    state.miscBonuses.crystalSneeking        = safeGet(ninja, 107, 8) === 1 ? 1.3 : 1.0; // sneaking  Crystal Comb  Bigger Summoning Winner Bonuses	
    state.miscBonuses.ogMeritShop            = safeGet(taskZZ2, 5, 2);  // Merit Shop Overgrowth raw level
    state.holes.hole15[24]                   = safeGet(holes, 15, 24); // Parse Holes[15][24]
    state.holes.hole15[29]                   = safeGet(holes, 15, 29); // Parse Holes[15][29]
    state.holes.hole4[0]                     = safeGet(holes, 4, 0); // Parse Holes[4][0]
    state.holes.hole21[8]                    = safeGet(holes, 21, 8); // Parse Holes[21][8]
    state.miscBonuses.evoCropEvoStamp        = safeGet(state.playerData.StampLv, 1, 47); // evo stamp
    state.miscBonuses.evoSacrificeHarvest    = safeGet(state.playerData.Grimoire, 14); //Sacrifice Harvest grimoire upgrade level
    state.miscBonuses.Writhing_Grimoire      = safeGet(state.playerData.Grimoire, 36); // Writhing Grimoire level
    
    // Skill Mastery 200
    let thisCharFarming = safeGet(state.playerData.Lv0_1, 16);
    let totalFarmingLevels = thisCharFarming * 10;
    state.miscBonuses.evoSkillMastery200     = totalFarmingLevels >= 200 ? 1.15 : 1.0;

    state.miscBonuses.evoSkullShop           = safeGet(optLacc, 229); //Skull Shop evo
    state.miscBonuses.evoMajigerLamp         = safeGet(holes, 21, 8); // lamp evo holes
    state.miscBonuses.zenitmarketLampLevel   = safeGet(spelunk, 45, 2); // Zenit Market Lamp Level
    state.miscBonuses.sushiBonus             = safeGet(sushi, 5, 35); // Sushi[5][35] bonus
    
    // Bettah Stickahs Zuperbits
    const gamingStr = (state.playerData.Gaming && state.playerData.Gaming[12]) || "";
    state.miscBonuses.bettahStickahsZuperbits = String(gamingStr).includes("管") ? 1.2 : 1.0;

    state.miscBonuses.evoStickers            = safeGet(research, 9, 4); // Farming Stickers count

    // Black Diamond Rhinestone (Lab)
    state.miscBonuses.mealBlackDiamondRhinestone = safeGet(lab, 14, 16);

    state.miscBonuses.godshardSetBonus       = String(optLacc[379] || "").includes("GODSHARD_SET") ? 15 : 0; //Godshard SetBonus (15% if set equipped, 0% otherwise) -  OptLacc[379]
    state.miscBonuses.emperorSetBonus        = String(optLacc[379] || "").includes("EMPEROR_SET") ? 20 : 0; //Emperor SetBonus (20% if set equipped, 0% otherwise) -  OptLacc[379]
    state.miscBonuses.evoButton              = safeGet(optLacc, 594); //Evolution Button (raw hold press count)
    state.miscBonuses.vaultMasteryLevel      = safeGet(upgVault, 32); //Vault Mastery (raw level) 1.65× multiplier to vault upgrades
    state.miscBonuses.vaultMastery2Level     = safeGet(upgVault, 61); //Vault Mastery II (raw level) 2.00× multiplier to green highlight vault upgrades
    state.miscBonuses.vaultMasteryIIILevel   = safeGet(upgVault, 89); //Vault Mastery III (raw level) tier bonus for upgrades 61-89
    state.miscBonuses.vaultOvertuneLevel     = safeGet(upgVault, 42); //Vault Overtune (raw level) multi to vial bonus


    // Croppius Evolvius Bonus Vault upgrade evo chance
    state.miscBonuses.croppiusEvolviusBonus  = safeGet(upgVault, 78);

    // ======================
    // MEALS
    // ======================
    state.meals.evoBillJackPepper = safeGet(meals, 0, 62); // Bill Jack Pepper (+5% Crop Evolution per level, additive)
    state.meals.evoNyanborgir     = safeGet(meals, 0, 66); // Nyanborgir (raw level only — multiplicative scaling based on Summoning Lv )
    state.meals.evoBillJackPepperRibbonLevel = safeGet(state.playerData.Ribbon, 90); // Ribbon level for Bill Jack Pepper  Ribbon[MealIndex+28] 90
    state.meals.evoNyanborgirRibbonLevel = safeGet(state.playerData.Ribbon, 94); // Ribbon level for Nyanborgir  Ribbon[MealIndex+28] 94
    // ======================
    // SUMMONING RELATED
    // ======================
    state.summoning.emperorBonusKills          = safeGet(optLacc, 369); //Emperor Bonuses (raw kill count only)
    state.summoning.vicarOfTheEmperorLevel     = safeGet(Arcane, 48); // Vicar of the Emperor //Arcane[48] 
    state.summoning.emperorBonusesArcadeLevel  = safeGet(ArcadeUpg, 51); // Emperor Bonuses ( arcade )// ArcadeUpg[51]level max 100 +1 (101) if super 
    state.summoning.kingOfAllWinnersPurchases  = safeGet(gemPurchased, 11); // King Of All Winners (raw purchase count only) bonus to summoner bonus 
    state.summoning.endlessSummoningWaves      = safeGet(optLacc, 319); // endless summoning battle count // OptLacc[319]
    state.summoning.meritShopLevel             = safeGet(taskZZ2, 5, 4); // Merit Shop Summoning bonus level // TaskZZ2[5][4]

    // ======================
    // SAILING BONUSES
    // ======================
    state.sailing.winzLanternLevel = safeGet(sailing, 3, 32); // Winz Lantern artifact level
    
    // ======================
    // RIFT
    // ======================
    state.miscBonuses.riftlevel = safeGet(rift, 0); // Rift level Rift[0]
    
    // ======================
    // CARDS
    // ======================
    state.miscBonuses.jellofishcard = safeGet(cards0, "w7b5"); // Jello Fish Card quantity/level Cards0[w7b5]
    
    // ======================
    // DREAM
    // ======================
    // Check if WeeklyBoss["d_73"] is unlocked (value = -1)
    state.miscBonuses.dream_d_73 = safeGet(weeklyBoss, "h", "d_73") === -1 ? 1 : 0; // Dream d_73 unlock flag (1 if unlocked, 0 otherwise)
    
    state.levels.farming   = safeGet(lv0_0, 16); //Farming level Lv0_0[16]
    state.levels.summoning = safeGet(lv0_0, 18); //Summoning level Lv0_0[18]

    // ======================
    // SUMMON LIST
    // ======================
    let summonData = parseJsonField("Summon");
    state.summoning.summonList = Array.isArray(summonData) && summonData[1] ? summonData[1] : [];

    console.log(`✅ parseMiscBonusesData completed`);


    return true;
};


