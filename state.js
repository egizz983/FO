// Updated farmingVariables.js - restructured into centralized window.farmingState object
// All original detailed comments preserved exactly as they appeared in the source file.
// All array definitions (LandRankUpgrade, MarketUpgrade, ExoticMarketUpgrade) are copied verbatim.
// All variable values and structures are unchanged.

window.farmingState = {
    playerData: {},           // Full JSON (kept for future steps)

    // ======================
    // Talents
    // ======================
    talents: {
        //Talents level manual input 
        dankRanks: 0,      // × ALL Land Rank Database bonuses (multiplicative to Evo, Overgrowth, Production, Soil EXP, etc.)
        massIrrigation: 0,      // × Crop Evo chance (scales with talent points, multiplicative)
        agriculturalAppreciation: 0 // +% Land Rank EXP (account-wide, additive, scales with talent points)
    },

    // ======================
    // Lab manual input
    // ======================
    lab: {
        my1stChemistrySet: 0, // check if active  , doubles vial bonus 
        certifiedStampBook: 0, // check if active doubles stamp bonus
        spelunkerObol: 0, // check if active 1.5x jewel bonus
        mealBlackDiamondRhinestone: 0,   // Black Diamond Rhinestone (LAB[14][16] ) 
    },

    // ======================
    // Achievements
    // ======================
    achievements: {
        // 1.01× multipliers (Regalis & Spectre Stars)
        regalisMyBeloved: 0,   // AchieveReg[373] → 1.01× (unlocked = -1) 	1.01x larger Winners Bonuses from Summoning
        spectreStars: 0,   // AchieveReg[379] → 1.01× (unlocked = -1) 1.01x larger Winners Bonuses from Summoning
        farmingEvoLilOvergrowth: 0,   // AchieveReg[355] → 1.05× Crop Evolution chance
        farmingOgBigTimeLandOwner: 0,   // AchieveReg[365] → 1.15× Overgrowth chance 
        checkoutTakeout: 0   // AchieveReg[291]  +5max level
    },

    // ======================
    // GMO CROP COUNTS
    // ======================
    gmoCropCounts: {
        "200": 0,     // crops with 200+ → used by Evolution GMO
        "1000": 0,    // crops with 1000+ → used by Speed GMO
        "2500": 0,    //  crops with 2500+ → EXP GMO
        "10000": 0,   // crops with 10000+ → used by Value GMO
        "100000": 0    // crops with 100000+ → used by Super GMO
    },

    // ======================
    // LAND RANK SUMMARY STATS
    // ======================
    landRank: {
        stats: {
            totalSum:  0,     // landRank_totalLandRankSum
            average:   0,      // landRank_averageLandRank
            first:     0      // FarmRank[0][0] → rank of first plot (used for evolution boost calculations per rank
        },
        upgrades: [
            new LandRankUpgrade({ id: 0,  unlock: 1,    group: "Evolution",  name: "Evolution Boost",       base: 250,   perRank: true,  multi: false, currentLevel: 0, desc: "Increases next crop chance by +% per rank of the land plot" }),
            new LandRankUpgrade({ id: 1,  unlock: 5,    group: "Production", name: "Production Boost",      base: 5,     perRank: true,  multi: false, currentLevel: 0, desc: "Boosts value of crops harvested by +% per rank of the land plot" }),
            new LandRankUpgrade({ id: 2,  unlock: 20,   group: "SoilExp",    name: "Soil Exp Boost",        base: 25,    perRank: true,  multi: false, currentLevel: 0, desc: "Each land gains +% extra Rank EXP per rank of the previous land" }),
            new LandRankUpgrade({ id: 3,  unlock: 30,   group: "Evolution",  name: "Evolution Megaboost",   base: 600,   perRank: false, multi: true,  currentLevel: 0, desc: "Increases next crop chance by +% multiplicatively!" }),
            new LandRankUpgrade({ id: 4,  unlock: 60,   group: "Seed",       name: "Seed of Stealth",       base: 2,     perRank: false, multi: false, currentLevel: 0, desc: "Increases the Stealth of all Ninja Twins by +% per Farming Level" }),
            new LandRankUpgrade({ id: 5,  unlock: 80,   group: "FarmExp",    name: "Farmtastic Boost",      base: 90,    perRank: false, multi: false, currentLevel: 0, desc: "Increases Farming Skill EXP gained by +%" }),
            new LandRankUpgrade({ id: 6,  unlock: 125,  group: "SoilExp",    name: "Soil Exp Megaboost",    base: 200,   perRank: false, multi: false, currentLevel: 0, desc: "All plots of land gain +% more Rank EXP" }),
            new LandRankUpgrade({ id: 7,  unlock: 180,  group: "Overgrowth", name: "Overgrowth Boost",       base: 120,   perRank: false, multi: false, currentLevel: 0, desc: "Increases chance for Overgrowth by +%" }),
            new LandRankUpgrade({ id: 8,  unlock: 250,  group: "Production", name: "Production Megaboost",  base: 100,   perRank: false, multi: false, currentLevel: 0, desc: "Increases the amount of crops harvested by +%" }),
            new LandRankUpgrade({ id: 9,  unlock: 400,  group: "Seed",       name: "Seed of Loot",          base: 10,    perRank: false, multi: false, currentLevel: 0, desc: "Increases the Drop Rarity of all characters by +%" }),
            new LandRankUpgrade({ id: 10, unlock: 500,  group: "Evolution",  name: "Evolution Superboost",  base: 3000,  perRank: false, multi: true,  currentLevel: 0, desc: "Increases next crop chance by +% multiplicatively!" }),
            new LandRankUpgrade({ id: 11, unlock: 600,  group: "Overgrowth", name: "Overgrowth Megaboost",  base: 340,   perRank: false, multi: false, currentLevel: 0, desc: "Increases chance for Overgrowth by +%" }),
            new LandRankUpgrade({ id: 12, unlock: 700,  group: "FarmExp",    name: "Farmtastic Megaboost",  base: 110,   perRank: false, multi: false, currentLevel: 0, desc: "Increases Farming Skill EXP gained by +%" }),
            new LandRankUpgrade({ id: 13, unlock: 900,  group: "SoilExp",    name: "Soil Exp Superboost",   base: 520,   perRank: false, multi: false, currentLevel: 0, desc: "All plots of land gain +% more Rank EXP" }),
            new LandRankUpgrade({ id: 14, unlock: 1200, group: "Seed",       name: "Seed of Damage",        base: 20,    perRank: false, multi: false, currentLevel: 0, desc: "Gives a +% Total Damage bonus to all characters" }),
            new LandRankUpgrade({ id: 15, unlock: 1300, group: "Evolution",  name: "Evolution Ultraboost",  base: 40000, perRank: false, multi: true,  currentLevel: 0, desc: "Increases next crop chance by +% multiplicatively!" }),
            new LandRankUpgrade({ id: 16, unlock: 1500, group: "FarmExp",    name: "Farmtastic Superboost", base: 220,   perRank: false, multi: false, currentLevel: 0, desc: "Increases Farming Skill EXP gained by +%" }),
            new LandRankUpgrade({ id: 17, unlock: 1750, group: "Production", name: "Production Superboost", base: 600,   perRank: false, multi: false, currentLevel: 0, desc: "Increases the amount of crops harvested by +%" }),
            new LandRankUpgrade({ id: 18, unlock: 2000, group: "Overgrowth", name: "Overgrowth Superboost", base: 1500,  perRank: false, multi: false, currentLevel: 0, desc: "Increases chance for Overgrowth by +%" }),
            new LandRankUpgrade({ id: 19, unlock: 3500, group: "Seed",       name: "Seed of Stats",         base: 5,     perRank: false, multi: false, currentLevel: 0, desc: "Gives a +% All Stat bonus to your characters" })
        ]
    },

    // ======================
    // DAY MARKET UPGRADES 
    // ======================
    market: {
        day: [
            new MarketUpgrade({ index: 2,  name: "Land Plots",          calcType: "linear",     param: 1,     isMultiplier: false, unit: "plots",   currentLevel: 0, perLevel: false, description: "You get (1/Lvl) extra plots of land to plant crops in.", group: "Misc" }),
            new MarketUpgrade({ index: 3,  name: "Stronger Vines",      calcType: "linear",     param: 0.02,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "+(2%/Lvl) chance for +1 crop when fully grown.", group: "Production" }),
            new MarketUpgrade({ index: 4,  name: "Nutritious Soil",     calcType: "linear",     param: 0.01,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "+(1%/Lvl) growth speed for all land.", group: "GrowthSpeed" }),
            new MarketUpgrade({ index: 5,  name: "Smarter Seeds",       calcType: "linear",     param: 0.03,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "+(3%/Lvl) farming EXP gain from all sources.", group: "FarmExp" }),
            new MarketUpgrade({ index: 6,  name: "Biology Boost",       calcType: "linear",     param: 0.15,  isMultiplier: true, unit: "%",       currentLevel: 0, perLevel: false, description: "+(15%/Lvl) chance of crop evolution, or 'next crop' chance.", group: "Evolution" }),
            new MarketUpgrade({ index: 7,  name: "Product Doubler",     calcType: "linear",     param: 3,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "+(3%/Lvl) chance for crops to be worth 2x when collected.", group: "Production" }),
            new MarketUpgrade({ index: 8,  name: "More Beenz",          calcType: "linear",     param: 0.02,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "+(2%/Lvl) magic beans gained when trading in crops.", group: "Misc" }),
            new MarketUpgrade({ index: 9,  name: "Rank Boost",          calcType: "linear",     param: 0.03,  isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: false, description: "Plots earn +(3%/Lvl) more Rank XP when a crop is collected.", group: "SoilExp" })
        ],

        // ======================
        // NIGHT MARKET UPGRADES
        // ======================
        night: [
            new MarketUpgrade({ index: 10, name: "Overgrowth",          calcType: "unlock",     param: 0,     isMultiplier: false, unit: "",        currentLevel: 0, perLevel: false, description: "Unlocks Overgrowth (OG). Each OG doubles crop value ~ EXP.", group: "Overgrowth" }),
            new MarketUpgrade({ index: 11, name: "Evolution GMO",       calcType: "linear",     param: 0.8, isMultiplier: true,  unit: "x",       currentLevel: 0, perLevel: true,  description: "(0.008x/Lvl) crop evolution chance per crop you have 200 of.", group: "Evolution" }),
            new MarketUpgrade({ index: 12, name: "Speed GMO",           calcType: "linear",     param: 0.3, isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: true,  description: "+(0.3%/Lvl) growth speed per crop you have 1000 of.", group: "GrowthSpeed" }),
            new MarketUpgrade({ index: 13, name: "OG Fertilizer",       calcType: "linear",     param: 1,  isMultiplier: true,  unit: "x",       currentLevel: 0, perLevel: false, description: "(0.01x/Lvl) higher chance for Overgrowth to occur.", group: "Overgrowth" }),
            new MarketUpgrade({ index: 14, name: "EXP GMO",             calcType: "linear",     param: 1,  isMultiplier: true,  unit: "x",       currentLevel: 0, perLevel: true,  description: "+(1%/Lvl) farming EXP gain per crop you have 2500 of.", group: "FarmExp" }),
            new MarketUpgrade({ index: 15, name: "Land Rank",           calcType: "unlock",     param: 0,     isMultiplier: false, unit: "",        currentLevel: 0, perLevel: false, description: "Each plot now gets Rank Xp when a crop is collected.", group: "SoilExp" }),
            new MarketUpgrade({ index: 16, name: "Value GMO",           calcType: "linear",     param: 0.02,isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: true,  description: "+(0.02%/Lvl) crop value per crop you have 10000 of.", group: "Production" }),
            new MarketUpgrade({ index: 17, name: "Super GMO",           calcType: "linear",     param: 0.5, isMultiplier: false, unit: "%",       currentLevel: 0, perLevel: true,  description: "+(0.5%/Lvl) all 'GMO' bonuses per crop you have 100K.", group: "Misc" })
        ],

        // ======================
        // EXOTIC MARKET UPGRADES 
        // ======================
        exotic: [
            new ExoticMarketUpgrade({ index: 20, name: "Sproutluck I",        calcType: "diminishing", base: 500,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x crop evolution chance", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 21, name: "Sproutluck II",       calcType: "diminishing", base: 600,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x crop evolution chance", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 22, name: "Sproutluck III",      calcType: "diminishing", base: 700,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x crop evolution chance", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 23, name: "Sproutluck IV",       calcType: "diminishing", base: 800,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x crop evolution chance", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 24, name: "Geneology I",         calcType: "diminishing", base: 6,    isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: true,  description: "% crop evolution chance per Farming LV above 50", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 25, name: "Geneology II",        calcType: "diminishing", base: 12,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: true,  description: "% crop evolution chance per Farming LV above 100", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 26, name: "Geneology III",       calcType: "diminishing", base: 20,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: true,  description: "% crop evolution chance per Farming LV above 150", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 27, name: "Geneology IV",        calcType: "diminishing", base: 28,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: true,  description: "% crop evolution chance per Farming LV above 200", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 28, name: "Geneology V",         calcType: "diminishing", base: 50,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: true,  description: "% crop evolution chance per Farming LV above 250", group: "Evolution" }),
            new ExoticMarketUpgrade({ index: 29, name: "Stableroot I",        calcType: "diminishing", base: 350,  isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Land Rank EXP gain for all plots", group: "SoilExp" }),
            new ExoticMarketUpgrade({ index: 30, name: "Stableroot II",       calcType: "diminishing", base: 250,  isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Land Rank EXP gain for all plots", group: "SoilExp" }),
            new ExoticMarketUpgrade({ index: 31, name: "Stableroot III",      calcType: "diminishing", base: 400,  isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Land Rank EXP gain for all plots", group: "SoilExp" }),
            new ExoticMarketUpgrade({ index: 32, name: "Vigouroot I",         calcType: "diminishing", base: 100,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x Land Rank EXP gain for all plots", group: "SoilExp" }),
            new ExoticMarketUpgrade({ index: 33, name: "Vigouroot II",        calcType: "diminishing", base: 130,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x Land Rank EXP gain for all plots", group: "SoilExp" }),
            new ExoticMarketUpgrade({ index: 34, name: "Plump Database",      calcType: "diminishing", base: 60,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% higher bonuses from the Land Rank Database", group: "LandRank" }),
            new ExoticMarketUpgrade({ index: 43, name: "Stalk Value I",       calcType: "diminishing", base: 50,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% higher Crop Value max cap", group: "Production Cap" }),
            new ExoticMarketUpgrade({ index: 44, name: "Stalk Value II",      calcType: "diminishing", base: 70,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% higher Crop Value max cap", group: "Production Cap" }),
            new ExoticMarketUpgrade({ index: 45, name: "Stalk Value III",     calcType: "diminishing", base: 120,  isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% higher Crop Value max cap", group: "Production Cap" }),
            new ExoticMarketUpgrade({ index: 46, name: "Evergrow I",          calcType: "diminishing", base: 100,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x Overgrowth Chance for all crops", group: "Overgrowth" }),
            new ExoticMarketUpgrade({ index: 47, name: "Evergrow II",         calcType: "diminishing", base: 150,  isMultiplier: true,  unit: "x",  currentLevel: 0, perLevel: false, description: "x Overgrowth Chance for all crops", group: "Overgrowth" }),
            new ExoticMarketUpgrade({ index: 48, name: "Double Petal I",      calcType: "diminishing", base: 50,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% chance for crops to be worth 2x when harvested", group: "Production" }),
            new ExoticMarketUpgrade({ index: 49, name: "Double Petal II",     calcType: "diminishing", base: 70,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% chance for crops to be worth 2x when harvested", group: "Production" }),
            new ExoticMarketUpgrade({ index: 50, name: "Gogogrow",            calcType: "diminishing", base: 50,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Growth Speed for all land plots", group: "GrowthSpeed" }),
            new ExoticMarketUpgrade({ index: 51, name: "Bountiful I",         calcType: "diminishing", base: 50,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% chance for +1 crop when fully grown", group: "Production" }),
            new ExoticMarketUpgrade({ index: 52, name: "Bountiful II",        calcType: "diminishing", base: 60,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% chance for +1 crop when fully grown", group: "Production" }),
            new ExoticMarketUpgrade({ index: 53, name: "Bountiful III",       calcType: "diminishing", base: 70,   isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% chance for +1 crop when fully grown", group: "Production" }),
            new ExoticMarketUpgrade({ index: 68, name: "Prisma Petal",        calcType: "diminishing", base: 2,    isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Prisma Bubble Bonus (Not Farming Related)", group: "NonFarming" }),
            new ExoticMarketUpgrade({ index: 69, name: "Exalted Eldou",       calcType: "diminishing", base: 2,    isMultiplier: false, unit: "%",  currentLevel: 0, perLevel: false, description: "% Exalted Stamp Bonus (Not Farming Related)", group: "NonFarming" }),
        ]
    },

    summoning: {
        // Emperor bonus  to calculate regular battle bonus from emperor 
        emperorBonusKills: 0,   // OptLacc[369] kill count
        vicarOfTheEmperorLevel: 0,   // Vicar of the Emperor //Arcane[48] 
        emperorBonusesArcadeLevel: 0,   // Emperor Bonuses ( arcade )// ArcadeUpg[51]level max 100 +1 (101) if super 
        kingOfAllWinnersPurchases: 0,   // GemItemsPurchased[11] purchase count
        endlessSummoningWaves: 0,   // OptLacc[319] wave count
        meritShopLevel: 0,   // TaskZZ2[5][4] - Merit Shop Summoning Winner Bonus level (capped at 10 in calculations)
        // regular summoning battles
        meal_bonuses: 0,
        farming_speed: 1.0,
        crop_evo: 0,
        winner_bonuses: 1.0,
        SummWinBonus: null,
        summonList: []   // Parsed from Savedata.json Summon[1] - list of current player's summoned units
    },

    // ======================
    // SAILING BONUSES
    // ======================
    sailing: {
        winzLanternLevel: 0   // Sailing[3][32] - Winz Lantern artifact level (1 + 0.25x per level)
    },

    // ======================
    // MISC FARMING BONUSES (Ninja, TaskZZ2, Holes, StampLv, Grimoire, Lv0_1, OptLacc, Gaming, Research, LAB, Sailing, GemItemsPurchased, UpgVault)
    // ======================
    holes:{
        hole4: {
            0: 0   // Holes[4][0] monument bonus - Monumental Vibes level → (multiplier calculated later)
        },
        hole6:{
            0: 0,   // Holes[6][0] monument bonus - Monumental Vibes level → (multiplier calculated later)
        },
        hole11:{ // active div 
            29: 0,   
            30: 0    
        },
        hole15:{
            24: 0,   // Holes[15][24] evoMonumentWisdom - × Farming Crop Evo Chance (multiplicative, scales with waves)
            29: 0   // Holes[15][29] wisdomBonusLevel - Wisdom Bonus level → (multiplier calculated later)
        },
        hole21:{
            8: 0   // Holes[21][8] evoMajigerLamp - +% Next Crop Chance (additive) points invested
        }
    },
    miscBonuses: {
        // meritshop
        ogMeritShop: 0,     // +2% Overgrowth Chance per level (additive) TaskZZ2[5][2] 
        EventShopOwned: "",   // OptLacc[311] - string identifier for event shop items owned
        gaming12array: "",   // Gaming[12] - string identifier for gaming items/stickers owned
        //stamp
        evoCropEvoStamp: 0,   // +% Crop Evolution Chance (additive, scales with stamp level) StampLv[1][47]
        //other
        evoSacrificeHarvest: 0,   // +0.05× per talent level (multiplicative) Grimoire[14]
        Writhing_Grimoire: 0,   // Writhing Grimoire (Grimoire[36]) 
        evoSkillMastery200: 1.0, // 1.15× (multiplicative at 200 total Farming levels) Lv0_1[16] > 200 ? 1.15 : 1
        evoSkullShop: 0,   // × Crop Evolution Chance (multiplicative) OptLacc[229] 
        evoButtonPressCount: 0,   // Evolution Button  press count → OptLacc[594] (+0.25× per level multiplicative, calculated later)
        meritocracybonusid: 0, //OptLacc[453] 
        meritocracycanvote: 0, //OptLacc[472]
        clamworksLevel: 0,   // Clamworks level → OptLacc[464] 


        // Stickers
        evoStickers: 0,     // +% or × Crop Evolution Chance from all Farming Stickers (sporrious Stalk sticker) Research[9][4] 

        // Ninja Crystal Bonuses (simple 0/1 → multiplier)
        crystalSneeking: 1.0,   // 1.30× (multiplicative) Ninja[107][8]
        ogTaffyDisc: 1.0,   // 1.50× Higher Overgrowth Chance (multiplicative, Taffy Disc Pristine Charm) Ninja[107][11]

        // Set / Special Bonuses (simple string or flag checks)
        godshardSetBonus: 0,   // 15 (15% bonus) if OptLacc[379] contains "GODSHARD_SET", else 0
        emperorSetBonus: 0,   // 20 (20% bonus) if OptLacc[379] contains "EMPEROR_SET", else 0
        kattlekrukSetBonus: 0,   // +5 if OptLacc[379] contains "KATTLEKRUK_SET", else 0
        votingBonus29: 0,   // +% Crop Evolution Chance  "VOTING_BONUS_29"
        zenitmarketLampLevel: 0,   // Spelunk[45][2]
        sushiBonus: 0,   // Sushi[5][35] - Sushi multi bonus
        uniquesushicount: 0,   // Sushi[5]
        tometotalpoints: 0,   // Total points 
        riftlevel: 0,   // Rift[0] - Rift level

        //Cards
        jellofishcard: 0,   // Cards0[w7b5] - Jello Fish Card quantity/level
        //dream
        dream_d_73 : 0,   // WeeklyBoss["d_73"] //Ribbons give +1% extra multi every 10 Ranks!
        dream_d_71 : 0,   // WeeklyBoss["d_71"] // All Research Grid bonuses are +1% bigger
        dream_d_72 : 0,   // WeeklyBoss["d_72"] // All Research Grid bonuses are +1% bigger
        dream_d_76 : 0,   // WeeklyBoss["d_76"] // All Research Grid bonuses are +1% bigger
        EquinoxSymbol: 0,   // Dream[12] - +level
    },

    // ======================
    // SHINY PETS (Breeding array) - Infinite Stars + Meal Bonus
    // ======================
    shinyPets: {
        // Final variables for later calculations (used in formulas file)
        infiniteStars: 0,   // Total infinite stars (+2 per level per pet)
        mealBonus: 0   // Total meal bonus % (+1% per level from Red Mushroom + Sheepie)
    },

    // ======================
    // LEVELS
    // ======================
    levels: {
        farming: 0, // Farming level Lv0_0[16] (for Geneology exotic bonuses, etc.)
        summoning: 0, // Summoning level Lv0_0[18] (for Nyanborgir bonus scaling)
        highestCharacterLevel: 0 // Highest character level among all farming characters (for Nyanborgir bonus scaling)
    },

    // ======================
    // STAR SIGNS (StarSg) - Special Infinite Star Activation
    // ======================
    starSigns: {
        // Final variables (1 = active / enabled for farming bonuses, 0 = inactive)
        seraphCosmos: 0,   // Seraph_Cosmos active flag 1.10× Crop Evolution Chance per 20 summoning level / id 79
        ogSignalais: 0,   // O.G._Signalais active flag // 15% og chance / id 67
        cropiovoMinor: 0   // Cropiovo_Minor active flag // +3% evo per farming level / id 65
    },

    // ======================
    // Meals
    // ======================
    meals: {
        evoBillJackPepper: 0,          // +5% Crop Evolution Chance (additive, no scaling) Meals[0][62]
        evoNyanborgir: 0,              // +9% base (doubles at Summoning Lv 50, triples at 100, etc. — multiplicative scaling) Meals[0][66]
        evoBillJackPepperRibbonLevel: 0,   // Ribbon level for Bill Jack Pepper meal (max 5) Ribbon[MealIndex+28] 90
        evoNyanborgirRibbonLevel: 0   // Ribbon level for Nyanborgir meal (max 5) Ribbon[MealIndex+28] 94
    },

    // ======================
    // Alchemy Bubbles + Vials
    // ======================
    alchemy: {
        // Alchemy Bubbles
        cropChapterBubblebonus: 0,   // CauldronInfo[0]["29"]  → Crop Chapter x1=12 x2=50
        croppiusMapperBubblebonus: 0,   // CauldronInfo[3]["25"]  → Croppius Mapper x1=5 x2=70
        bigP: 0,   // CauldronInfo[3]["21"]  bigger minor link bonus

        // Vials
        ricecakoradeBonus: 0,   // CauldronInfo[4]["64"]  → +{2%/level} Farming Speed
        flavorgilBonus: 0,   // CauldronInfo[4]["66"]  → +{7%/level} Crop Evolution chance
        countLevel13: 0   // Total number of vials that are level 13 or higher
    },

    // ====================== ====================== ======================
    // Multi Variables
    // ====================== ====================== ======================
    multi: {
        emperorSummoningWinnerBonus: 1.0, // Calculated in CaclFormulas based on Emperor Bonuses, Arcade , AC vicar 
        vialMultiplier: 1.0 // Calculated in CalcFormulas based on all vial levels and bonuses
    },
    companion: {
        babaMummy_0: 0, // All_Divinities_from_World_5_count_as_Active (CompanionDB[0]) // King Doot
        potato_19: 0, // {5%_Ballot_Bonus_Multi_(World_2_feature) //Mashed Potato
        rift2_1: 0, // +25_Lv_for_all_Talents (CompanionDB[1]) // Rift Slug
        w7a8_39: 0, // +50%_Meritocracy_Bonus_Multi_(World_7_feature) //Pufferblob
        Crystal6_41: 0, // {40%_Ballot_Bonus_Multi_(World_2_feature) // Crystal Cuttlefish
        w7b6b_54: 0, // {1_new_Research_Shape,_shows_up_after_you_get_Research_LV._20
        w7b11_55: 0, // Multiplies_ALL_Research_Grid_bonuses_by_1.15x_(World_7_feature)//Pirate Deckhand
        rift4_88: 0, // {50%_Prisma_Bubble_bonus_multi_and_{5_Prisma_Bubbles //Rift Hivemind
        poppy_161: 0, // 2x_bonuses_from_Bonus_Ballot_and_Multi_Meritocracy //Poppy
        w6b2b_162: 0, // All_meals_are_5x_cheaper_to_level_up,_and_give_1.25x_higher_bonuses! //Wickerlight Spirit
        w7b7_147: 0, // All_bonuses_from_The_Button_in_W7_are_1.50x_bigger // Mantaray
        reindeer_27: 0, // 2.00x_Gold_Ball_Shop_Bonuses (CompanionDB[27]) //Spirit_Reindeer
    },
    playerDatabase: {
        Lv0: [],   // Parsed from Savedata.json Lv0_0[] - contains all player level-related variables and arrays, including farming level, summoning level, etc.
        KillsLeftToAdvance: [], // Parsed from Savedata.json KLA_0-9[] - contains all kills left to advance data for each farming character
        TalentPoints: [],  // Parsed from Savedata.json SL_0-9 vs SLpre_0-9[] - contains all talent point levels for each character (max of current vs previous)
        CharacterClass: [],  // Parsed from Savedata.json CharacterClass_0-9 - contains class identifiers for each character, used for class-specific bonuses and calculations
    },  
    PersonalValueMap:{
        starSigns: [],   // Parsed from Savedata.json PVtStarSign_0-9 - contains all star sign-related variables and arrays
    },
    DNSM: {
        ChipBbonusz: [],   
    },
    research: [],   // Parsed from Savedata.json Research[] - contains all 14 research grid arrays dynamically
    spelunk: [],   // Parsed from Savedata.json Spelunk[] - contains all spelunking-related variables and arrays
    compass: [],   // Parsed from Savedata.json Compass[4] - contains all compass-related variables and arrays
    pristineCharms: [],   // Parsed from Savedata.json Ninja[107] - contains all pristine charm levels and bonuses
    vaultupg: [],   // Parsed from Savedata.json UpgVault[] - contains all vault upgrade levels and bonuses
    ArcadeUpg: [],   // Parsed from Savedata.json ArcadeUpg[] - contains all arcade upgrade levels and bonuses
    grimoire: [],   // Parsed from Savedata.json Grimoire[] - contains all grimoire-related variables and arrays
    arcane: [],   // Parsed from Savedata.json Arcane[] - contains all arcane-related variables and arrays
    optionsListAccount: [],   // Parsed from Savedata.json OptLacc[] - contains all account-wide options and variables that affect farming bonuses
    GemItemsPurchased: [],   // Parsed from Savedata.json GemItemsPurchased[] - contains all gem item purchase counts and levels that affect farming bonuses
    divinity: [],   // Parsed from Savedata.json Divinity[] - contains all divinity-related variables and arrays
    CauldronInfo: [],   // Parsed from Savedata.json CauldronInfo[] - contains all alchemy bubble and vial levels and bonuses
    cards: [],   // Parsed from Savedata.json Cards0-1[] - contains all card-related variables and arrays
    atoms: [],   // Parsed from Savedata.json Atoms[] - contains all atom-related variables and arrays
    meals: [],   // Parsed from Savedata.json Meals[] - contains all meal-related variables and arrays
    towerinfo: [],   // Parsed from Savedata.json Tower[] - contains all tower-related variables and arrays 
    lab: [],   // Parsed from Savedata.json Lab[] - contains all lab-related variables and arrays
};

// ======================
// DYNAMIC DEBUG HELPER 
// ======================
// Updated to work with the new farmingState structure while preserving original intent and console output style

window.debugFarmingVariables = function() {

    console.log("%c🔍 VARIABLES DUMP (farmingState structure)", "color:#0f0; font-size:15px; font-weight:bold;");
    console.log(`📊 farmingState contains all farming-related data in nested format. Total top-level keys: ${Object.keys(window.farmingState).length}`);

    console.dir(window.farmingState, { depth: null });

};