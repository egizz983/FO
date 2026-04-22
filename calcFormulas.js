// ====================== DEATH BRINGER TALENT FORMULAS ======================

// Utility objects for game engine compatibility
const c = {
    asNumber: (val) => val == null ? 0 : Number(val)
};

/**
 * Dank Ranks - Global multiplier to ALL Land Rank Database bonuses
 */


function calculateDankRanksMultiplier(level) {
    return 1 + 2 * (level / (level + 200));
}


/**
 * Agricultural 'preciation - Additive % to Farming EXP and Land Rank EXP
 */
function calculateAgriculturalAppreciationMultiplier(level) {
    return 1 + (2 * level) / 100;
}

/**
 * Mass Irrigation - Multiplicative Crop Evolution Chance
 */
function calculateMassIrrigationMultiplier(level) {
    return 1 + 50 * (level / (level + 300));
}
 // ====================== DEATH BRINGER Grimoire FORMULAS ======================
/**
 * Sacrifice of Harvest 
 */
function calculateSacrificeOfHarvestMultiplier(level) {
    return 1 + 0.05 * level;
}


 // ====================== LandRank FORMULAS ======================
/**
 Land Rank bonus formula 
 */
function LankRankUpgBonus(t, base, level) { // engine formula 
    // Common part used in BOTH branches common = dankranks * exotic bonus 
    const common = 
    calculateDankRanksMultiplier(farmingState.talents?.dankRanks || 0) *
    (farmingState.market?.exotic?.find(u => u.index === 34)?.getBonus?.(true) ?? 1);


    // Special case for t = 4, 9, 14, 19
    if (4 === t || 9 === t || 14 === t || 19 === t) {
        return common * base * level;
    }

    // Normal case for all other t values
    return common * (1.7 * base * level) / (level + 80);
}






 // ====================== Summoner battle multipliers Formulas ======================


// Emperorbonus regular summoner bonus multi formula onlu works for bonus 8 
function getEmperorSummonerMultiplier(isMulti = false) {
    // Ensure farmingState exists
    if (!window.farmingState) window.farmingState = {};
    if (!window.farmingState.summoning) window.farmingState.summoning = {};
    
    //  rawPoint: +1 at 32 kills, then +1 every 48 kills (80, 128, 176, ...)
    const emperorKills = window.farmingState.summoning.emperorBonusKills || 0;
    let rawPoint = emperorKills >= 32 
        ? 1 + Math.floor((emperorKills - 32) / 48) 
        : 0;
    
    const vicarBonus  = (window.farmingState.summoning.vicarOfTheEmperorLevel || 0) / 100;
    const arcadeLevel = window.farmingState.summoning.emperorBonusesArcadeLevel || 0;
    const arcadeBonus = (arcadeLevel >= 101) ? 0.8 : (arcadeLevel * 0.004);

    const totalBonus  = 1 + vicarBonus + arcadeBonus;
    const effective   = Math.floor(rawPoint * totalBonus);
    
    if (isMulti) {
        // Return multiplier form: (1 + effective/100)
        const result = 1 + (effective / 100);
        window.farmingState.summoning.multi_emperor_SummoningWinnerBonus = result;
        return result;
    } else {
        // Return flat form: just the effective percentage value
        return effective;
    }
}

 // ====================== Vial Multi formula ======================
function getVialMultiplier() {

    const base = 1 + (0.02 * vial_CountLevel13) + (0.10 * farming_vaultOvertuneLevel);
    const chemistryBonus = (lab_my_1st_Chemistry_Set === 1) ? 2 : 1;

    multi_vialMultiplier = base * chemistryBonus;
}

 // ====================== Button Formulas W7 ======================
//Button evo chance formula
function getButtonCropEvoMultiplier() {
    if (farming_evo_button < 36) {
        return 1;
    }
    
    const diff = farming_evo_button - 36;
    const fullBatches = Math.floor(diff / 45);
    const remainder = diff % 45;
    const partial = Math.min(5, remainder + 1);
    
    const C = 5 * fullBatches + partial;
    farming_evo_button = 1 + C * 0.25;
}
 // ====================== Alchemy bubbles ======================


window.calculateBubbleBonus = function(level, x1, x2, percentFromMax = 100) {


    level = Math.max(0, Number(level) || 0);
    percentFromMax = Math.max(0, Math.min(100, Number(percentFromMax) || 100));

    // Raw decay formula used by the game
    const rawBonus = (x1 * level) / (level + x2);

    // Apply % from Maximum Bonus (this is what the wiki's second input does)
    const finalBonus = rawBonus * (percentFromMax / 100);
    return finalBonus;
}

//Kills Left To Advance formula 
window.calculateKillsLeftToAdvance = function() {
    let totalCompletedSlots = 0;
    const state = window.farmingState;
    
    // Loop through all 10 characters (0-9)
    for (let characterIndex = 0; characterIndex < 10; characterIndex++) {
        const characterKey = `character_${characterIndex}`;
        const characterData = state.killsLeftToAdvance[characterKey];
        
        // If character data exists and is an array
        if (Array.isArray(characterData)) {
            // Check indices 251 through 263 (13 slots)
            for (let s = 0; s < 13; s++) {
                const index = 251 + s;
                const entry = characterData[index];
                
                // Check if entry exists, is an array, and first element is < 1 (completed)
                if (Array.isArray(entry) && entry[0] < 1) {
                    totalCompletedSlots++;
                }
            }
        }
    }
    
    return totalCompletedSlots;
};




//misc functions


window.getBubblePercentFromMax = function(rawBonus) { // must pass alchemy_CropChapterbonus or alchemy_CroppiusMapperbonus
    // This function is designed specifically for your two bubbles

    // Crop Chapter max = 12
    if (typeof alchemy_CropChapterBubblebonus !== "undefined" && rawBonus === alchemy_CropChapterBubblebonus) {
        return Number(((rawBonus / 12) * 100).toFixed(2));
    }

    // Croppius Mapper max = 5
    if (typeof alchemy_CroppiusMapperBubblebonus !== "undefined" && rawBonus === alchemy_CroppiusMapperBubblebonus) {
        return Number(((rawBonus / 5) * 100).toFixed(2));
    }

    console.warn("Unknown bubble - please use getPercentFromMax(rawBonus, maxBonus) instead");
    return 0;
};




// GMO formulas 
function calculateEvoGMO(evoGmoLevel, cropCount200) {
  const base = 1 + (evoGmoLevel * 0.8) / 100;
  return Math.pow(base, cropCount200);

}

function calculateGMOBonus(cropCount100k) { // speed,value ,exp ,super GMO bonus only (not evo)
  return 1 + (this.level * this.base * cropCount100k) / 100;
}


function calculateCombined(evoGmoLevel, superGmoLevel, cropCount200, cropCount100k) {
  const superGmoBonus = calculateSuperGMO(superGmoLevel, cropCount100k);
  const evoGmoBonus = calculateEvoGMO(evoGmoLevel, cropCount200);
  return superGmoBonus * evoGmoBonus;
}




window.getWinBonus = function(t, isMulti = false) {
    // Make sure the container exists
    if (!window.farmingState) window.farmingState = {};
    if (!window.farmingState.summoning) window.farmingState.summoning = {};

    // Reference to your new storage location
    let SummWinBonus = window.farmingState.summoning.SummWinBonus;

    // === ONE-TIME INITIALIZATION ===
    if (t !== -1 && (SummWinBonus === undefined || SummWinBonus === null)) {
        SummWinBonus = new Array(32).fill(0);
        window.farmingState.summoning.SummWinBonus = SummWinBonus;   // save it

        const customLists = window.SummonEnemies;
        const summonList = window.farmingState.summoning.summonList;

        // Loop 1: Bonuses from current player's summons (skip rifts)
        if (summonList && customLists) {
            for (let e = 0, s = summonList.length; e < s; e++) {
                const summonName = String(summonList[e]);
                if (summonName.indexOf("rift") === -1) {
                    const o = customLists[0].indexOf(summonName);

                    if (o !== -1) {
                        const slot = Math.round(c.asNumber(customLists[5][o]) - 1);
                        const bonus = c.asNumber(customLists[7][o]);
                        if (slot >= 0 && slot < 32) {
                            SummWinBonus[slot] += bonus;
                        }
                    }
                }
            }
        }

        // Loop 2: Extra bonuses from endlessSummoningWaves (OptLacc[319])
        const optCount = 0 | c.asNumber(window.farmingState.summoning.endlessSummoningWaves);
        
        if (optCount > 0 && customLists) {
            for (let e = 0; e < optCount; e++) {
                const idx = e - 40 * Math.floor(e / 40);
                const o = Math.round(c.asNumber(customLists[9][idx]) - 1);
                const bonus = c.asNumber(customLists[10][idx]);
                if (o >= 0 && o < 32) {
                    SummWinBonus[o] += bonus;
                }
            }
        }
    }

    // === RETURN LOGIC ===
    if (t === -1) return isMulti ? 1 : 0;
    if (SummWinBonus === undefined || SummWinBonus === null) return isMulti ? 1 : 0;

    const base = c.asNumber(SummWinBonus[0 | t]);

    // Special raw-return cases
    if (t === 20 || t === 22 || t === 24 || t === 31) {
        return isMulti ? (base / 100 + 1) : base;
    }

    // Common multipliers
    const pristine = window.farmingState.miscBonuses?.crystalSneeking || 1;
    const gem      = (10 * (window.farmingState.summoning?.kingOfAllWinnersPurchases || 0)) / 100;
    const sailing  = 25 * (window.farmingState.sailing?.winzLanternLevel || 0);
    const merit    = Math.min(10, window.farmingState.summoning?.meritShopLevel || 0);
    const ach379   = window.farmingState.achievements?.spectreStars === -1 ? 1 : Math.max(0, window.farmingState.achievements?.spectreStars || 0);
    const ach373   = window.farmingState.achievements?.regalisMyBeloved === -1 ? 1 : Math.max(0, window.farmingState.achievements?.regalisMyBeloved || 0);
    const godshard = window.farmingState.miscBonuses?.godshardSetBonus || 0;
    const emperor  = getEmperorSummonerMultiplier();
    const win31    = getWinBonus(31);

    if (t === 19) {
        const result = 3.5 * base *
               pristine *
               (1 + gem) *
               (1 + (sailing + merit + ach379 + ach373 + godshard) / 100);
        return isMulti ? (result / 100 + 1) : result;
    }

    if (t >= 20 && t <= 33) {
        const result = base *
               pristine *
               (1 + gem) *
               (1 + (sailing + merit + ach379 + ach373 + win31 + emperor + godshard) / 100);
        return isMulti ? (result / 100 + 1) : result;
    }

    // Default case (t = 10 and everything else)
    const result = 3.5 * base *
           pristine *
           (1 + gem) *
           (1 + (sailing + merit + ach379 + ach373 + win31 + emperor + godshard) / 100);
    

    
    return isMulti ? (result / 100 + 1) : result;
}

// Reset cache when new data is loaded
window.resetWinBonusCache = function() {
    if (window.farmingState?.summoning) {
        window.farmingState.summoning.SummWinBonus = null;
        console.log(`[resetWinBonusCache] Cache cleared. Next call to getWinBonus will reinitialize.`);
    }
}




//=======================Holes Lamp bonus return formula=======================================

/**
 * Get Lamp Bonus from Holes Magic Lamp
 * Formula: 20 × Holes[21][8] × (1 + ZenithMarketBonus/100)
 * ZenithMarketBonus = zenitmarketLampLevel (from Spelunk[45][2])
 */
window.getLampBonus = function(isMulti = false) {
    const evoMajigerLamp = window.farmingState?.miscBonuses?.evoMajigerLamp || 0;
    const zenitmarketLampLevel = window.farmingState?.miscBonuses?.zenitmarketLampLevel || 0;
    const zenithMarketBonus = Math.floor(1 * zenitmarketLampLevel);
    
    const result = 20 * evoMajigerLamp * (1 + zenithMarketBonus / 100);
    
    return isMulti ? result / 100 + 1 : result;
};





//=======================Sushi multi return formula=======================================

/**
 * Get Sushi Bonus
 * Returns 100 (or 2x as multiplier) if Sushi[5][35] is unlocked
 */
window.getSushiBonus = function(isMulti = false) {
    const sushiBonus = window.farmingState?.miscBonuses?.sushiBonus || 0;
    const base = sushiBonus > -1 ? 100 : 0;
    
    return isMulti ? base / 100 + 1 : base;
};  

//===================Alchemy bubble and vial multi each other and adds to other multi ===========================================



// Next goes 3 multi alchemy bubble * alchemy bubble * vial multi

//====================Card multi return formula ==========================================



// Card w7b5 // jello fish multi card requirements for each level 1500000/4500000/7500000/24000000/688500000/21967500000 . each level +50%
// 1 + (50*Cards0[w7b5]) / 100





//================================Meal multi return formula==============================

//Cooking meal bonus multi formula (CookingMealBonusMultioo)
// return (
//   (1 + (p._customBlock_MainframeBonus(116) + p._customBlock_Breeding("ShinyBonusS", "Nah", 20, -1)) / 100) *
//   (1 + m._customBlock_Summoning("WinBonus", 26, 0) / 100) *
//   (1 + (25 * m._customBlock_Companions(162)) / 100)
// );

// // Meal bonus calculation formula 
// this._DN = 
//   p._customBlock_CookingR("CookingMealBonusMultioo", 0, 0) *
//   m._customBlock_Summoning("RibbonBonus", 
//     a.engine.getGameAttribute("Ribbon")[
//       Math.round(28 + (this._GenINFO[74] + n))
//     ], 
//     0
//   ) *
//   a.engine.getGameAttribute("Meals")[0][this._DN5] *
//   a.engine.getGameAttribute("CustomLists").h.MealINFO[this._DN5][2]


  //Final Meal Bonus=CookingMealBonusMultioo×RibbonBonus×MealLevel×MealBase



  //Ribon bonus formula t = ribbon level
//   if ("RibbonBonus" == e)
//   return (
//     1 +
//     (Math.floor(
//       5 * t + Math.floor(t / 2) * (4 + 6.5 * Math.floor(t / 5)),
//     ) +
//       (Math.floor(t / 4) * (m._customBlock_GetSetBonus("EMPEROR_SET", "Bonus", 0, 0) / 4) +
//         Math.floor(t / 10) * m._customBlock_Dreamstuff("CloudBonus", 73))
//     ) / 100
//   );

//WeeklyBoss["d_73"] = -1 // check if unlocked for ribon bonus if WeeklyBoss["d_73"] = null or undefined then not unlocked 

//==============================================================


//=====================Vial multi return formula=========================================

//Vault bonus formula , where t = upgrade index
// c.asNumber(a.engine.getGameAttribute("UpgVault")[Math.round(t)]) * 
// c.asNumber(a.engine.getGameAttribute("CustomLists").h.UpgradeVault[0 | t][5]) * 
// (1 + m._customBlock_Summoning("VaultUpgBonus", 89, 0) / 100)
//UpgVault[78] * 8 * (1 + (UpgVault[89] *1)/100)
//==============================================================



//===================MonumentROGbonuses(2,4) return formula ===
//HolesInfo[37][x] // where x 24 = 4 where x 29 = 250 
//---------------------------------------------------
// HoleozDN = 1 + (holes[15][29]/100) + (25 × Holes[4][0]/100)

// IF HolesInfo[37][24] < 30:
//   return holes[15][24] × HolesInfo[37][24] × max(1, HoleozDN)

// ELSE (HolesInfo[37][24] >= 30):
//   return 0.1 × ceil((holes[15][24] / (250 + holes[15][24])) × 10 × HolesInfo[37][24] × max(1, HoleozDN))
//==============================================================

//===================Stamp return formula ===
// Evo stamp base 5 * level * (1 + Certified Stamp Book Node(1) + Liqorice Rolle(0.25) + Exalted bonus)) 


//Compass[4] contains b48  // if yes stamp is exalted and then uses stamp multi formula to know its multi



// Stamp doubler multi formula

//StampExalted_double = 1 + m._customBlock_Windwalker("StampDoubler", 0, 0) / 100

// if ("StampDoubler" == e)
//                 return (
//                   100 +
//                   (m._customBlock_AtomCollider("AtomBonuses", 12, 0) +
//                     (m._customBlock_Ninja("PristineBon", 20, 0) +
//                       (m._customBlock_Windwalker("CompassBonus", 76, 0) +
//                         (m._customBlock_GetSetBonus(
//                           "EMPEROR_SET",
//                           "Bonus",
//                           0,
//                           0,
//                         ) +
//                           (20 *
//                             m._customBlock_Summoning("EventShopOwned", 18, 0) +
//                             (m._customBlock_GamingStatType(
//                               "PaletteBonus",
//                               23,
//                               0,
//                             ) +
//                               (m._customBlock_FarmingStuffs(
//                                 "ExoticBonusQTY",
//                                 49,
//                                 0,
//                               ) +
//                                 Math.round(
//                                   c.asNumber(
//                                     a.engine.getGameAttribute("Spelunk")[4][3],
//                                   ),
//                                 ))))))) +
//                     (m._customBlock_Thingies("LegendPTS_bonus", 36, 0) +
//                       m._customBlock_SushiStuff("RoG_BonusQTY", 17, 0)))
//                 );

//Full formula for stamp
//5 × your_StampB48_level × (exalted doubler) × 2 (Mainframe) × (1 + Pristine %)

//==============================================================

//===================GrimoireUpgbonus(14) ===

// m._customBlock_Summoning("GrimoireUpgBonus", 14, 0) == Grimoire[14] × 5 × (1 + (Grimoire[36] × 1) / 100)

//CustomLists.GrimoireUpg[14][5] = 5 
//CustomLists.GrimoireUpg[36][5] = 1
//(1+ (Grimoire[14] × CustomLists.GrimoireUpg[14][5] × (1 + (Grimoire[36] × CustomLists.GrimoireUpg[36][5]) / 100) / 100)

//==============================================================
//===================achievement 355 bonus formula ===

//(1 + (5 * p._customBlock_AchieveStatus(355)) / 100)  // pretty much = to 1.05 if achievement unlocked

//==============================================================
//===================Skullshop evo multi formula =========================================
//Math.max(1,m._customBlock_RandomEvent("KillroyBonuses", 1, 0),)

// m._customBlock_RandomEvent("KillroyBonuses", 1, 0) = 1 + 9 × (OptionsListAccount[229] / (300 + OptionsListAccount[229]))



//===================BasketUpgQTY", 99) formula=========================================
// Math.max(
//   1,
//   m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1)
// )


//m._customBlock_FarmingStuffs("BasketUpgQTY", 99, 1) =calculateEvoGMO(evoGmoLevel, cropCount200) * calculateGMOBonus(cropCount100k // evogmo * super gmo)




//=====================rift skill mastery formula=========================================
// 1.15× (multiplicative at 200 total Farming levels) Lv0_1[16] > 200 ? 1.15 : 1



//=====================Star sign bonus formula=========================================

//                      (1 +
//                         (c.asNumber(
//                           a.engine.getGameAttribute("DNSM").h.StarSigns.h[65],
//                         ) *
//                           c.asNumber(a.engine.getGameAttribute("Lv0")[16])) / 
//                           100)



/**
 * Calculates the final value for DNSM.h.StarSigns.h[65]
 * ( in _customBlock_StarSigns)
 *
 * Node 65 always gives a base of +3.
 * The full Seraph_Cosmos multiplier is then applied only if you have Seraph_Cosmos unlocked.
 */
function calculateStarSign65({
  hasSeraphCosmos = false,     // true if "Seraph_Cosmos" is in StarSignsUnlocked
  starChipBonus = 0,           // r._customBlock_chipBonuses("star")
  meritocBonus22 = 0,          // m._customBlock_Summoning2("MeritocBonusz", 22, 0)
  arcane40 = 0,                // Arcane[40] holds level 
  summoningLevel = 0,          // Lv0[18] (your Summoning level)
  enabledStarSigns = 0         // m._customBlock_RiftStuff("enabledStarSigns", 0)
}) {
  const base = 3;   // hardcoded bonus from star sign node 65

  // No Seraph_Cosmos → just return the raw base
  if (!hasSeraphCosmos) {
    return base;
  }

  // 1. Star Chip multiplier
  const chipMultiplier = Math.max(
    1,
    Math.min(
      2,
      1 + starChipBonus * Math.floor((999 + enabledStarSigns) / 1000)
    )
  );

  // 2. Meritoc multiplier
  const meritocMultiplier = 1 + meritocBonus22 / 100;

  // 3. Exponential multiplier (1.1× per 20 Summoning levels, upgraded by Arcane[40])
  const basePerLevel = 1.1 + Math.min(arcane40, 10) / 100;
  const exponent = Math.ceil((summoningLevel + 1) / 20);
  const expMultiplier = Math.min(5, Math.pow(basePerLevel, exponent));

  // Total Seraph_Cosmos multiplier
  const totalMultiplier = chipMultiplier * meritocMultiplier * expMultiplier;

  // Final stored value
  return base * totalMultiplier;
}



//===============================Land Rank upgrade bonus total ================================
//Returns Math.max(1, (1 + EvolutionMegaboostBonus / 100) * (1 + EvolutionSuperboostBonus / 100) * (1 + EvolutionUltraBoostBonus / 100))


//===============================Getbonus2(1,205) ================================ // manual input
// Death bringer talent Mass Irigation

//===============================Land Rank upgrade Evolution Boost per rank ================================ VotingBonus(29) require manual input 

            // (1 +
            //             (m._customBlock_FarmingStuffs(
            //               "LankRankUpgBonus",
            //               0,
            //               0,
            //             ) *
            //               c.asNumber(
            //                 a.engine.getGameAttribute("FarmRank")[0][0],
            //               ) +
            //               m._customBlock_Summoning("VotingBonusz", 29, 0)) /
            //               100)


//Full formula , uses (Evolution boost % * first plot rank level  + voting bonus % )/ 100 + 1
 //1 + (LandRankUpgBonus(0) * FarmRank[0][0] + VotingBonus(29)) / 100 


//===============================All exotic multis ================================
// all exotic multis multiply each other and other multis 

//===============================Exotic evo chance per leve or flat %  ================================
// all adds up to a single multi 

//===============================Button evo bonus  (its bugged its using wrong multi)================================
//final formula (1+ getButtonBonuses(5,OptLacc[594]) / 100) // t should be 7 but game uses 5 replace when fixed.

// === Button_BonusPerTime
function Button_BonusPerTime(t) {
    return Number("2 3 2 2 4 5 4 25 5".split(" ")[0 | t]);
}

// === Button_BonusMULTI
function Button_BonusMULTI() {
    return (
        (1 + m._customBlock_Companions(147) / 100) *
        (1 + m._customBlock_ResearchStuff("Grid_Bonus", 125, 0) / 100)
    );
}

// === Main function
function getButtonBonuses(t, totalButtonUpgrades) {
    const N = Math.floor(totalButtonUpgrades);                    // OptionsListAccount[594]

    let Button_Bonsuz = [0, 0, 0, 0, 0, 0, 0, 0, 0];


    for (let s = 0; s < N; s++) {
        const group = Math.floor(s / 5);
        const slot  = group % 9;   


        Button_Bonsuz[slot] += Button_BonusPerTime(slot) * Button_BonusMULTI();
    }

    // Return the requested slot 
    return Button_Bonsuz[0 | t];
}


//===============================Stickerbonus(4) ================================ Manual input for now .
// _customBlock_Summoning("EventShopOwned", 37, 0) // OptionsListAccount[311] containst string  Number2Letter[37]
// _customBlock_GamingStatType("SuperBitType", 62, 0) // need to check if Gaming[12] have Number2Letter[62] 
// _customBlock_ResearchStuff("Grid_Bonus", 68, 2) // ("Grid_Bonus", 68, 0) * Research[11].length
// _customBlock_ResearchStuff("Grid_Bonus", 68, 0){

//   return 
//   -1 == a.engine.getGameAttribute("Research")[1][0 | 68]
//     ?   // ← Path A: not upgraded
//         c.asNumber( CustomLists.h.ResGridSquares[68][2] ) *
//         c.asNumber( Research[0][68] ) *
//         Math.max(1, m._customBlock_ResearchStuff("Grid_Bonus_Allmulti", 0, 0))

//     :   // ← Path B: upgraded
//         c.asNumber( CustomLists.h.ResGridSquares[68][2] ) *
//         c.asNumber( Research[0][68] ) *
//         (1 + 
//           c.asNumber( CustomLists.h.Research[5][ Research[1][68] ] ) / 100
//         ) *
//         Math.max(1, m._customBlock_ResearchStuff("Grid_Bonus_Allmulti", 0, 0));
// }




              // if ("StickerBonus" == e)
              //   return (
              //     (1 + (m._customBlock_ResearchStuff("Grid_Bonus", 68, 2) + 30 * m._customBlock_Summoning("EventShopOwned", 37, 0)) / 100) *  
              //     (1 + (20 * m._customBlock_GamingStatType("SuperBitType", 62, 0)) / 100) * 
              //     c.asNumber(a.engine.getGameAttribute("Research")[9][4]) * 40
              //   );


              