
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
    let lab          = parseJsonField("Lab");
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
    let cards1       = parseJsonField("Cards1");
    let weeklyBoss   = parseJsonField("WeeklyBoss");
    let Ribbon       = parseJsonField("Ribbon");
    let compass       = parseJsonField("Compass");
    let dream        = parseJsonField("Dream");

    // ======================
    //  PARSE  ARRAY
    // ======================
    state.research = research;
    state.spelunk = spelunk;
    state.compass = compass;
    state.pristineCharms = ninja[107];
    state.vaultupg = upgVault;
    state.ArcadeUpg = ArcadeUpg;
    state.grimoire = parseJsonField("Grimoire");
    state.optionsListAccount = optLacc;
    state.GemItemsPurchased = gemPurchased;
    state.divinity = parseJsonField("Divinity");
    state.CauldronInfo = parseJsonField("CauldronInfo");
    state.arcane = Arcane;
    state.atoms = parseJsonField("Atoms");
    state.meals = meals;
    state.towerinfo = parseJsonField("Tower");
    state.lab = lab;

    // ======================
    // PARSE HIGHEST CHARACTER LEVEL (Lv0_0 to Lv0_9 at index [0])
    // ======================
    state.levels.highestCharacterLevel = parseHighestCharacterLevel(state.playerData);

    state.miscBonuses.ogTaffyDisc            = safeGet(ninja, 107, 11) === 1 ? 1.5 : 1.0; // sneaking Taffy Disc OG chance
    state.miscBonuses.crystalSneeking        = safeGet(ninja, 107, 8) === 1 ? 1.3 : 1.0; // sneaking  Crystal Comb  Bigger Summoning Winner Bonuses	
    state.miscBonuses.ogMeritShop            = safeGet(taskZZ2, 5, 2);  // Merit Shop Overgrowth raw level
    state.holes.hole15[24]                   = safeGet(holes, 15, 24); // Parse Holes[15][24]
    state.holes.hole15[29]                   = safeGet(holes, 15, 29); // Parse Holes[15][29]
    state.holes.hole4[0]                     = safeGet(holes, 4, 0); // Parse Holes[4][0]
    state.holes.hole6[0]                     = safeGet(holes, 6, 0); // Parse Holes[6][0]
    state.holes.hole21[8]                    = safeGet(holes, 21, 8); // Parse Holes[21][8]
    state.holes.hole11[29]                   = safeGet(holes, 11, 29); // Parse Holes[11][29]
    state.holes.hole11[30]                   = safeGet(holes, 11, 30); // Parse Holes[11][30]
    state.miscBonuses.evoCropEvoStamp        = safeGet(state.playerData.StampLv, 1, 47); // evo stamp
    state.miscBonuses.evoSacrificeHarvest    = safeGet(state.playerData.Grimoire, 14); //Sacrifice Harvest grimoire upgrade level
    state.miscBonuses.Writhing_Grimoire      = safeGet(state.playerData.Grimoire, 36); // Writhing Grimoire level
    state.miscBonuses.EquinoxSymbol         = safeGet(state.playerData.Dream, 12); // Equinox Symbol level Dream[12]
    // Skill Mastery 200
    let thisCharFarming = safeGet(state.playerData.Lv0_1, 16);
    let totalFarmingLevels = thisCharFarming * 10; 
    state.miscBonuses.evoSkillMastery200     = totalFarmingLevels >= 200 ? 1.15 : 1.0;

    state.miscBonuses.evoSkullShop           = safeGet(optLacc, 229); //Skull Shop evo
    state.miscBonuses.evoMajigerLamp         = safeGet(holes, 21, 8); // lamp evo holes
    state.miscBonuses.zenitmarketLampLevel   = safeGet(spelunk, 45, 2); // Zenit Market Lamp Level
    state.miscBonuses.EventShopOwned         = optLacc[311] || ""; // Event Shop Owned - OptLacc[311] (string identifier for event shop items owned)
    state.miscBonuses.sushiBonus             = safeGet(sushi, 5, 35); // Sushi[5][35] bonus

    let sushi5Raw = sushi[5];

    if (typeof sushi5Raw === "string") {
        try {
            sushi5Raw = JSON.parse(sushi5Raw);
        } catch (e) {
            console.error("Failed to parse sushi[5]", e);
            sushi5Raw = [];
        }
    }

    const uniqueSushiCount = Array.isArray(sushi5Raw)
        ? sushi5Raw.flat(Infinity)
            .filter(v => typeof v === "number" && v !== -1)
            .length
        : 0;

    state.miscBonuses.uniquesushicount = uniqueSushiCount;
    
    // Gaming[12] - string containing gaming items/stickers owned
    state.miscBonuses.gaming12array = (state.playerData.Gaming && state.playerData.Gaming[12]) || "";
    
    state.miscBonuses.evoStickers            = safeGet(research, 9, 4); // Farming Stickers count

    // Black Diamond Rhinestone (Lab)
    state.miscBonuses.mealBlackDiamondRhinestone = safeGet(lab, 14, 16);

    state.miscBonuses.godshardSetBonus       = String(optLacc[379] || "").includes("GODSHARD_SET") ? 15 : 0; //Godshard SetBonus (15% if set equipped, 0% otherwise) -  OptLacc[379]
    state.miscBonuses.emperorSetBonus        = String(optLacc[379] || "").includes("EMPEROR_SET") ? 20 : 0; //Emperor SetBonus (20% if set equipped, 0% otherwise) -  OptLacc[379]
    state.miscBonuses.kattlekrukSetBonus     = String(optLacc[379] || "").includes("KATTLEKRUK_SET") ? 5 : 0; //Kattlekruk SetBonus +5 max lvl -  OptLacc[379]
    state.miscBonuses.evoButtonPressCount              = safeGet(optLacc, 594); //Evolution Button (raw hold press count)
    state.miscBonuses.meritocracybonusid     = safeGet(optLacc, 453); //Meritocracy Bonus ID - OptLacc[453]
    state.miscBonuses.meritocracycanvote     = safeGet(optLacc, 472); //Meritocracy Can Vote flag - OptLacc[472]
    state.miscBonuses.clamworksLevel         = safeGet(optLacc, 464); //Clamworks level - OptLacc[464]


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
    state.summoning.arcadebonus59             = safeGet(ArcadeUpg, 59); // ArcadeUpg[59] level max 100 +1 (101) if super
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
    state.cards = [cards0, cards1]; // Store both Cards0 and Cards1 arrays
    state.miscBonuses.jellofishcard = safeGet(cards0, "w7b5"); // Jello Fish Card quantity/level Cards0[w7b5]
    
    // ======================
    // DREAM
    // ======================
    // Check if WeeklyBoss["d_73"] is unlocked (value = -1)
    state.miscBonuses.dream_d_73 = safeGet(weeklyBoss, "h", "d_73") === -1 ? 1 : 0; // Dream d_73 unlock flag (1 if unlocked, 0 otherwise)
    state.miscBonuses.dream_d_71 = safeGet(weeklyBoss, "h", "d_71") === -1 ? 1 : 0; // Dream d_71 unlock flag (1 if unlocked, 0 otherwise)
    state.miscBonuses.dream_d_72 = safeGet(weeklyBoss, "h", "d_72") === -1 ? 1 : 0; // Dream d_72 unlock flag (1 if unlocked, 0 otherwise)
    state.miscBonuses.dream_d_76 = safeGet(weeklyBoss, "h", "d_76") === -1 ? 1 : 0; // Dream d_76 unlock flag (1 if unlocked, 0 otherwise)
    
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


// ======================
// HIGHEST CHARACTER LEVEL PARSER
// ======================
/**
 * Parses character levels from all 10 character arrays (Lv0_0 through Lv0_9)
 * Returns the highest character level at index [0] across all characters
 * 
 * Note: Each Lv0_X array contains the character's levels at different indices
 * Lv0_X[0] = Character Level
 */
function parseHighestCharacterLevel(playerData) {
    let maxCharacterLevel = 0;

    // Loop through all 10 characters (Lv0_0 to Lv0_9)
    for (let char = 0; char < 10; char++) {
        const fieldName = `Lv0_${char}`;
        let charLevelData = playerData[fieldName];

        // Parse if stringified
        if (typeof charLevelData === "string") {
            try {
                charLevelData = JSON.parse(charLevelData);
            } catch (e) {
                console.warn(`⚠️ Failed to parse ${fieldName} as JSON`);
                continue;
            }
        }

        // If not an array, skip
        if (!Array.isArray(charLevelData)) {
            continue;
        }

        // Get character level at index [0]
        const charLevel = Number(charLevelData[0]) || 0;

        // Track the maximum
        if (charLevel > maxCharacterLevel) {
            maxCharacterLevel = charLevel;
        }
    }

    console.log(`✅ Parsed Highest Character Level - found max level: ${maxCharacterLevel}`);
    return maxCharacterLevel;
}


