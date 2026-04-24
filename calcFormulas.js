// ====================== DEATH BRINGER TALENT FORMULAS ======================

// Utility objects for game engine compatibility
const c = {
    asNumber: (val) => val == null ? 0 : Number(val),
    randomFloat: () => Math.random()
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
    (farmingState.market?.exotic?.find(u => u.index === 34)?.getBonus?.().toMulti() ?? 1);


    // Special case for t = 4, 9, 14, 19
    if (4 === t || 9 === t || 14 === t || 19 === t) {
        return common * base * level;
    }

    // Normal case for all other t values
    return common * (1.7 * base * level) / (level + 80);
}


function getLandRankUpgBonusTOTAL(t) {

    const bonus = (id) => window.farmingState.landRank.upgrades[id]?.getBonus() || 0;

    switch (t) {
        case 0:
            return (
                (1 + bonus(3) / 100) *
                (1 + bonus(10) / 100) *
                (1 + bonus(15) / 100)
            );

        case 1:
            return bonus(8) + bonus(17);

        case 2:
            return bonus(6) + bonus(13);

        case 3:
            return bonus(7) + bonus(11) + bonus(18);

        case 4:
            return bonus(5) + bonus(12) + bonus(16);

        default:
            return 1;
    }
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

//Kills Left To Advance formula W6 only
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

//Tome count total - 5000 every 2000 
function calculateTomeScorePer2000() {
    const tomeScore = window.farmingState?.miscBonuses?.tometotalpoints || 0;
    return Math.floor(Math.max(0, (tomeScore - 5000) / 2000));
} 

/**
 * Cleaned-up version of x._customBlock_ArbitraryCode5Inputs
 */
function ArbitraryCode5Inputs(type, x1, x2, level) {
    // The last two parameters (a, s) from the original are unused placeholders

    x1 = Number(x1) || 0;
    x2 = Number(x2) || 0;
    level = Number(level) || 0;

    switch (type) {
        case "add":
            return x2 !== 0
                ? (((x1 + x2) / x2 + 0.5 * (level - 1)) / (x1 / x2)) * level * x1
                : x1 * level;

        case "addLower":
            return x1 + x2 * (level + 1);

        case "addDECAY":
            return level < 50001
                ? x1 * level
                : x1 * Math.min(50000, level) +
                      ((level - 50000) / (level - 50000 + 150000)) * x1 * 50000;

        case "decay":
            return (x1 * level) / (level + x2);

        case "decayLower":
            return (x1 * (level + 1)) / (level + 1 + x2) - (x1 * level) / (level + x2);

        case "decayMulti":
            return 1 + (x1 * level) / (level + x2);

        case "decayMultiLower":
            return (x1 * (level + 1)) / (level + 1 + x2) - (x1 * level) / (level + x2);

        case "bigBase":
            return x1 + x2 * level;

        case "bigBaseLower":
            return x2;

        case "intervalAdd":
            return x1 + Math.floor(level / x2);

        case "intervalAddLower":
            return Math.max(Math.floor((level + 1) / x2), 0) - Math.max(Math.floor(level / x2), 0);

        case "reduce":
            return x1 - x2 * level;

        case "reduceLower":
            return x1 - x2 * (level + 1);

        case "PtsSpentOnGuildBonus":
            return (
                (((x1 + x2) / x2 + 0.5 * (level - 1)) / (x1 / x2)) * level * x1 - x2 * level
            );

        default:
            console.warn(`Unknown formula type: ${type}`);
            return 0;
    }
}

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



//Summoner win bonus - returns flat percentage bonus
window.getWinBonus = function(t) {
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
    if (t === -1) return 0;
    if (SummWinBonus === undefined || SummWinBonus === null) return 0;

    const base = c.asNumber(SummWinBonus[0 | t]);

    // Special raw-return cases
    if (t === 20 || t === 22 || t === 24 || t === 31) {
        return base;
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
        return result;
    }

    if (t >= 20 && t <= 33) {
        const result = base *
               pristine *
               (1 + gem) *
               (1 + (sailing + merit + ach379 + ach373 + win31 + emperor + godshard) / 100);
        return result;
    }

    // Default case (t = 10 and everything else)
    const result = 3.5 * base *
           pristine *
           (1 + gem) *
           (1 + (sailing + merit + ach379 + ach373 + win31 + emperor + godshard) / 100);

    return result;
}

// Reset cache when new data is loaded
window.resetWinBonusCache = function() {
    if (window.farmingState?.summoning) {
        window.farmingState.summoning.SummWinBonus = null;
        console.log(`[resetWinBonusCache] Cache cleared. Next call to getWinBonus will reinitialize.`);
    }
}


/**
 * Get Lamp Bonus from Holes Magic Lamp - returns flat percentage bonus
 * Formula: 20 × Holes[21][8] × (1 + ZenithMarketBonus/100)
 * ZenithMarketBonus = zenitmarketLampLevel (from Spelunk[45][2])
 */
window.getLampBonus = function() {
    const evoMajigerLamp = window.farmingState?.holes.hole21?.[8] || 0;
    const zenitmarketLampLevel = window.farmingState?.miscBonuses?.zenitmarketLampLevel || 0;
    const zenithMarketBonus = Math.floor(1 * zenitmarketLampLevel);
    
    const result = 20 * evoMajigerLamp * (1 + zenithMarketBonus / 100);
    
    return result;
};


function getRoGBonusQTY(t, i=0) { // sushi bonus

    if (window.farmingState?.miscBonuses?.uniquesushicount > t || i === 99) {
        return c.asNumber(
            window.Research[37][0 | t]
        );
    } else {
        return 0;
    }
}


function getMeritocBonusz(t) {

    const specialAccountValue = window.farmingState?.miscBonuses?.meritocracybonusid; // meritocracy bonus current id 
    if (t === specialAccountValue) {
        const ninjaInfo = window.NinjaInfo[41];
        const index = Math.round(1 + 3 * t);

        const baseValue = c.asNumber(ninjaInfo[index]);
        const multiplier = getMeritocBonuszMulti();

        return baseValue * multiplier;
    }
    return 0;
};

function getMeritocBonuszMulti() {
    // Check if KillsLeft2Advance is still > 0
    const killsLeft = c.asNumber(
        window.farmingState?.killsLeftToAdvance?.character_0?.[250]?.[0] || 0
    );

    if (killsLeft > 0) {
        return 0;
    }

    // Main formula
    const companionBonus161 = window.CompanionDB[161][2]* window.farmingState.companion.poppy_161;
    const voteBonus = window.farmingState?.miscBonuses?.meritocracycanvote; // 
    const eventshopS = window.farmingState?.miscBonuses?.EventShopOwned || 0; // EventShopOwned
    const baseMultiplier = Math.min(
        1,
        Math.max(0.25, 0.25 + voteBonus)
    );
    const clamworksLevel = window.farmingState?.miscBonuses?.clamworksLevel || 0;

    const extraBonuses =
        5 * (clamworksLevel > 3 ? 1 : 0) +
        (window.farmingState.companion.w7a8_39 * window.CompanionDB[38][2]) +
        getLegendPTS_bonus(24) +
        getArcadeBonus(59, window.farmingState?.summoning?.arcadebonus59) +
        20 * stringSearch(23, eventshopS) +
        getRoGBonusQTY(51);

    return (1 + companionBonus161 / 100) * (baseMultiplier + extraBonuses / 100);
};

function getLegendPTS_bonus(t) {
    const spelunkIndex = 0 | t;   // same as original (fast integer conversion)

    const baseValue = c.asNumber(
        window.farmingState.spelunk[18][spelunkIndex]
    );

    const talentMultiplier = c.asNumber(
        window.LegendTalents[spelunkIndex][2]
    );

    return Math.round(baseValue * talentMultiplier);
};

function getArcadeBonus(e,level) {
    const dnsm = a.engine.getGameAttribute("DNSM");
    const arcadeIndex = 0 | e; // same as Math.floor(e) — used everywhere in original

    let multiplier = 1;
    // Double the bonus if this upgrade is at level 101
    if (level === 101) {
        multiplier = 2 * c.asNumber(multiplier);
    }

    // Double the bonus again if Companion 27 is active
    if (window.farmingState?.companion?.reindeer_27 === 1) {
        multiplier = 2 * c.asNumber(multiplier);
    }

    return multiplier * x._customBlock_ArbitraryCode5Inputs(
        "" + h.string(window.ArcadeShopInfo[arcadeIndex][3]),
        c.asNumber(window.ArcadeShopInfo[arcadeIndex][1]),
        c.asNumber(window.ArcadeShopInfo[arcadeIndex][2]),
        c.asNumber(level),
        0,
        0
    );
};

// _customBlock_CauldronStats = function (e, t, i, s) 
// CauldronBonus" == e
// "VialBonus" == e

// Vials base bonus function
window.getVialBonus = function(i, level) {
    let customlist = window.AlchemyDescription?.[3]?.[0 | i];

    // Safety check: if customlist doesn't exist, return 0
    if (!customlist) {
        console.warn(`[getVialBonus] No customlist found for vial index ${i}`);
        return 0;
    }

    let riftBonus = 0;
    if (34 < c.asNumber(window.farmingState.miscBonuses.riftlevel)) {
        riftBonus = 2 * window.farmingState.alchemy.countLevel13;
    }

    const totalBonus = riftBonus + window.getVaultUpgBonus(42,window.farmingState.miscBonuses.vaultOvertuneLevel); 
    const dnzz = totalBonus / 100;
    const merit = getMeritocBonusz(20) / 100; // need to update this 

    var arbitraryResult = ArbitraryCode5Inputs(
        "" + String(customlist[3]),
        c.asNumber(customlist[1]),
        c.asNumber(customlist[2]),
        c.asNumber(level)
    );



    if (window.farmingState.lab.my1stChemistrySet) {
        const result = 2 * (1 + dnzz) * (1 + merit) * arbitraryResult;

        return result;
    } else {
        const result = (1 + dnzz) * (1 + merit) * arbitraryResult;
        return result;
    }
};

// VaultUpgbonus
window.getVaultUpgBonus = function (t, level) {

  const mult = c.asNumber(window.UpgradeVault[0 | t]?.[5]);

  // Simple upgrades that only do level × multiplier (no extra bonus)
  const simpleUpgrades = new Set([
    1, 6, 7, 8, 9, 13, 32, 33, 36, 40, 42, 43, 44, 49, 51, 52, 53, 57, 61,
    64, 70, 73, 74, 76, 79, 85, 86, 88, 89, 999,
  ]);

  if (simpleUpgrades.has(t)) {
    return level * mult;
  }

  let bonusId = 0;
  let bonuslevel = 0;
  if (t < 32) {
    bonusId = 32;
    bonuslevel = window.farmingState.miscBonuses.vaultMasteryLevel;
  } else if (t < 61) {
    bonusId = 61;
    bonuslevel = window.farmingState.miscBonuses.vaultMastery2Level;
  } else if (t < 89) {
    bonusId = 89;
    bonuslevel = window.farmingState.miscBonuses.vaultMasteryIIILevel;
  } else {
    return 0;
  }

  const bonus = window.getVaultUpgBonus(bonusId, bonuslevel);

  // Special case: upgrade 0
  if (t === 0) {
    const extra =
      Math.max(0, level - 25) +
      (Math.max(0, level - 50) + Math.max(0, level - 100));

    return (level * mult + extra) * (1 + bonus / 100);
  }

  // Special case: upgrade 60
  if (t === 60) {
    const extra =
      Math.max(0, level - 25) +
      (Math.max(0, level - 50) +
        (2 * Math.max(0, level - 100) +
          (3 * Math.max(0, level - 200) +
            (5 * Math.max(0, level - 300) +
              (7 * Math.max(0, level - 400) +
                10 * Math.max(0, level - 450))))));

    const tierBonus = 1 + Math.floor(level / 25) / 5;

    return (level * mult + extra) * tierBonus * (1 + bonus / 100);
  }

  return level * mult * (1 + bonus / 100);
};





//====================Card multi return formula ==========================================

/**
 * Get Card Bonus based on card quantity and multiplier type
 * Card w7b5 (Jello Fish) thresholds: 1 (lvl 1), 1500000 (lvl 2), 4500000 (lvl 3), 7500000 (lvl 4), 24000000 (lvl 5), 688500000 (lvl 6), 21967500000 (lvl 7)
 * Each level grants +50% bonus 
 * Level 0: 0 cards (no bonus)
 */
function getCardBonus(cardQuantity = 0) {
    const thresholds = [1, 1500000, 4500000, 7500000, 24000000, 688500000, 21967500000];
    let level = 0;
    
    // Determine card level based on quantity
    for (let i = 0; i < thresholds.length; i++) {
        if (cardQuantity >= thresholds[i]) {
            level = i + 1;
        } else {
            break;
        }
    }
    
    // Calculate bonus: +50% per level
    const bonusPercent = level * 50;
    

    return bonusPercent; // Flat: return % value

}


/**
 * Clean version of p._customBlock_MainframeBonus(e)
 * Returns the current Mainframe / Lab / Jewel bonus value for the given ID `e`.
 * - e < 100   → Base Lab Mainframe bonuses (from LabMainBonus list)
 * - e >= 100  → Jewel-related bonuses (from JewelDesc list)

 */
function getMainframeBonus(e) {
  const labMainBonus = window.LabMainBonus;

  // 1. Early safety check for invalid IDs
  if (e >= labMainBonus.length && e < 100) {
    return 0;
  }



  // 3. DEFAULT CALCULATION (no cache or empty cache) — this is where all the complex logic lives

  if (e < 100) {
    // ==================== BASE LAB MAINFRAME BONUSES (e < 100) ====================

    const baseValue4 = c.asNumber(labMainBonus[0 | e][4]); // default column used for most IDs
    const baseValue5 = c.asNumber(labMainBonus[0 | e][5]); // special column used for overridden IDs

    // Special overridden IDs that get extra recursive bonuses added
    if (e === 9) {
      return baseValue5 + getMainframeBonus(113);
    }
    if (e === 0) {
      return (
        baseValue5 +
        getMainframeBonus(101)
      ) * 5; // total pets found place holder 5
    }
    if (e === 3) {
      return baseValue5 + getMainframeBonus(107);
    }
    if (e === 11) {
      return baseValue5 + getMainframeBonus(117);
    }
    if (e === 13) {
      return baseValue5;
    }
    if (e === 15) {
      return baseValue5 + getMainframeBonus(118);
    }
    if (e === 17) {
      return baseValue5 + getMainframeBonus(120);
    }
    if (e === 8) {
      // Special case: Spelunker Obol must be unlocked to return a bonus
      if (!window.farmingState.spelunkerObol) {
        return 0;
      }
      return baseValue5 + getMainframeBonus(119) / 100;
    }

    // All other base Lab bonuses just return the normal [4] value
    return baseValue4;
  } else {
    // ==================== JEWEL BONUSES (e >= 100) ====================

    // const pixelHelper = a.engine.getGameAttribute("PixelHelperActor")[22]
    //   .behaviors.getBehavior("ActorEvents_548");

    // const genInfo92 = n.__cast(pixelHelper, eb)._GenINFO[92];

    // const jewelIndex = (e - 100) | 0;
    // const adjustedUnlockIndex = (e - 100 + labMainBonus.length) | 0;

    // // Is this specific jewel bonus unlocked?
    // const isUnlocked = 1 === genInfo92[adjustedUnlockIndex];

    // if (!isUnlocked) {
    //   return 0;
    // }

    const jewelBase = c.asNumber(window.JewelDesc[jewelIndex][12]);

    // Special doubled jewel cases (only when certain prerequisite Mainframe bonuses are active)
    if (e === 100) {
      return (0 < getMainframeBonus(101) && 0 < getMainframeBonus(102))
        ? 2 * jewelBase * getMainframeBonus(8)
        : jewelBase * getMainframeBonus(8);
    }
    if (e === 103) {
      return (0 < getMainframeBonus(104) && 0 < getMainframeBonus(105) && 0 < getMainframeBonus(106))
        ? 2 * jewelBase * getMainframeBonus(8)
        : jewelBase * getMainframeBonus(8);
    }
    if (e === 110) {
      return (0 < getMainframeBonus(107) && 0 < getMainframeBonus(108) && 0 < getMainframeBonus(109))
        ? 2 * jewelBase * getMainframeBonus(8)
        : jewelBase * getMainframeBonus(8);
    }
    if (e === 112) {
      return (
        0 < getMainframeBonus(111) &&
        0 < getMainframeBonus(113) &&
        0 < getMainframeBonus(114) &&
        0 < getMainframeBonus(115)
      )
        ? 2 * jewelBase * getMainframeBonus(8)
        : jewelBase * getMainframeBonus(8);
    }
    if (e === 119) {
      return jewelBase; // no multiplier for this one
    }

    // All other jewel bonuses (including your 116)
    return jewelBase * getMainframeBonus(8);
  }
}


//================================Meal multi return formula==============================

function getMealBonus(index,ribbonLevel,meallevel) {
    return getCookingMealBonusMultiplier() * getRibbonBonus(ribbonLevel) * meallevel * window.MealINFO[index][2];
}


function getCookingMealBonusMultiplier() {
  // Part 1: Mainframe bonus (ID 116) + special Shiny Breeding bonus
  const mainframeAndBreeding = window.farmingState.mealBlackDiamondRhinestone
    ? (getMainframeBonus(116) + window.farmingState.shinyPets.mealBonus)
    : window.farmingState.shinyPets.mealBonus;

  // Part 2: Summoning WinBonus (ID 26)
  const summoningBonus = window.getWinBonus(26);

  // Part 3: Companions bonus (ID 162), scaled by 25
  const companionsBonus = 25 * window.farmingState.companion.w6b2b_162;

  // Final formula (exactly the same math as the original)
  return (
    (1 + mainframeAndBreeding / 100) *
    (1 + summoningBonus / 100) *
    (1 + companionsBonus / 100)
  );
}


function getRibbonBonus(t) {
  const baseCalc = Math.floor(
    5 * t + Math.floor(t / 2) * (4 + 6.5 * Math.floor(t / 5))
  );

  const emperorBonus = window.farmingState.miscBonuses.emperorSetBonus / 4; //emperorSetBonus default = 20
  const setContribution = Math.floor(t / 4) * emperorBonus;

  const cloudContribution = Math.floor(t / 10) * window.farmingState.miscBonuses.dream_d_73; //dream_d_73 is either 1 or 0

  return 1 + (baseCalc + setContribution + cloudContribution) / 100;
}

//===================MonumentROGbonuses(2,4) return formula ===

function getmonumentROGbonuses(t, i) { // 2,4 ( 24 , 2,9 (29) )


  let holeozDN = 1;                                 // default starting value
  
  if (9 !== i) {
    // 1. Apply MonumentROGbonuses
    holeozDN = 1 + getmonumentROGbonuses(t, 9) / 100;

    // 2. Add CosmoBonusQTY on top of the previous value
    holeozDN += 25* window.farmingState.holes.hole4[0]  / 100;
  }

  const index = Math.round(10 * t + i);
  const holelevel = c.asNumber(window.farmingState.holes.hole15[index]);
  const infovalue = c.asNumber(window.HolesInfo[37][index]);

  return 30 > infovalue
    ? holelevel * infovalue *  Math.max(1, holeozDN)
    : 0.1 * Math.ceil((holelevel / (250 + holelevel)) * 10 * infovalue * Math.max(1, holeozDN)
      );
}


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

function grimoireUpgBonus() {// hardcoded for sacraficeharverst only 

  const base = window.farmingState.miscBonuses.evoSacrificeHarvest * 5;
  return base * (1 + (window.farmingState.miscBonuses.Writhing_Grimoire * 1) / 100);
}


//==============================================================
//===================Skullshop evo multi formula =========================================
function getKillroyBonus() {
    return 1 + (window.farmingState.miscBonuses.evoSkullShop  / (300 + window.farmingState.miscBonuses.evoSkullShop )) * 9;
}


//=====================rift skill mastery formula=========================================
// 1.15× (multiplicative at 200 total Farming levels) Lv0_1[16] > 200 ? 1.15 : 1
function getSkillMasteryBonus() {

    return window.farmingState.levels.farming >= 200 ? 1.15 : 1;
}


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



//===============================Button evo bonus  (its bugged its using wrong multi)================================
//final formula (1+ getButtonBonuses(5,OptLacc[594]) / 100) // t should be 7 but game uses 5 replace when fixed.

// === Button_BonusPerTime
function Button_BonusPerTime(t) {
    return Number("2 3 2 2 4 5 4 25 5".split(" ")[0 | t]);
}

// === Button_BonusMULTI
function Button_BonusMULTI() {
    return (
        (1 + (50 * window.farmingState.companion.w7b7_147) / 100) *
        (1 + getGridBonus(125, 0) / 100)
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

function stringSearch(t,savedString) {
    const searchKey = String(window.Number2Letter(0 | t));
    return savedString.indexOf(searchKey) !== -1 ? 1 : 0;
}

function getStickerBonus(t) {

    const Research = window.farmingState.research;
    const eventShopS = String(window.farmingState.miscBonuses.EventShopOwned);
    const GamingArrayS = String(window.farmingState.miscBonuses.gaming12array);

    // First multiplier:
    // (1 + (Grid_Bonus(68, mode=2) + 30 * EventShopOwned) / 100)
    const multi1 = 1 + (
        getGridBonus(68,2) +
        30 * stringSearch(37, eventShopS)
    ) / 100;

    // Second multiplier:
    // (1 + (20 * SuperBitType) / 100)
    const multi2 = 1 + (
        20 * stringSearch(62, GamingArrayS)
    ) / 100;

    // Base values
    const researchValue9 = (Research && Research[9]) ? c.asNumber(Research[9][0 | t]) : 0;
    const researchValue25 = (window.Research && window.Research[25]) ? c.asNumber(window.Research[25][0 | t]) : 0;

    // Final result
    return multi1 * multi2 * researchValue9 * researchValue25;
}

              
function getGridBonus(t, i) {
    // Mode 1: raw value (most basic call)
    if (i === 1) {
        return Math.round(
            c.asNumber(
                window.farmingState.research[0][0 | t]
            )
        );
    }

    // Mode 2: special override cases (only used for specific t values)
    if (i === 2) {
        if (31 == t) {
            return 25 * c.asNumber(
                window.farmingState.research[0][0 | t]
            );
        }
        if (67 == t || 68 == t || 107 == t) {
            const researchArray = window.farmingState.research[11];
            const arrayLength = Array.isArray(researchArray) ? researchArray.length : 0;
            return getGridBonus(t,0) * Math.max(1, arrayLength);
        }
        if (94 == t) {
            return getGridBonus(t,0) *
                   m._customBlock_ResearchStuff("TotalObsLVs", 0, 0); // researcg exo
        }
        if (112 == t) {
            return getGridBonus(t,0) *
                   m._customBlock_ResearchStuff("TotalOccurrencesFound", 0, 0); // research exp gain 
        }
        if (151 == t) {
            return a.engine.getGameAttribute("OptionsListAccount")[500]; // spelunking related 
        }
        if (168 == t) {
            return getGridBonus(t,0) * Math.floor( m._customBlock_Minehead("GlimboTotalTrades", 0, 0) / 100 );
        }
        // fallback for any other t when i=2
        return getGridBonus(t,0);
    }

    // Default case (i = 0 or omitted) - this is the normal calculation used everywhere else
    const Research = window.farmingState.research;
    const ResGridSquares = window.ResGridSquares;

    // Safety checks for undefined arrays
    if (!Research || !Research[0] || !ResGridSquares) {
        return 0;
    }

    const base = c.asNumber(ResGridSquares[0 | t]?.[2]) * c.asNumber(Research[0][0 | t]);

    const globalMulti = Math.max(
        1,
        getGridBonusAllmulti()
    );

    if (-1 == Research[1]?.[0 | t]) {
        // No specific upgrade applied to this grid slot
        return base * globalMulti;
    } else {
        // A specific upgrade from another research is applied
        const upgradeIdx = Research[1][0 | t];
        const extraPercent = c.asNumber(window.Research[5][0 | upgradeIdx]) / 100;

        return base * (1 + extraPercent) * globalMulti;
    }
}


function getGridBonusAllmulti() {

    const Research = window.farmingState.research;

    // Base companion bonus
    const companions55 = window.CompanionDB[55][2] * window.farmingState.companion.w7b11_55; // grid bonus companion x1.15

    // Research-based bonus (capped at 5%)
    const researchBonus = 5 * Math.min(
        1,
        c.asNumber(Research[0][173]) * 1 // placeholder1 used to check doot if active 1 if not 0 results stil lame capped at 5% 
    );

    // Cloud bonuses + Sushi bonus
    const cloud71 = window.farmingState.miscBonuses.dream_d_71;
    const cloud72 = window.farmingState.miscBonuses.dream_d_72;
    const cloud76 = window.farmingState.miscBonuses.dream_d_76;
    const sushi53 = getRoGBonusQTY(53);

    // Sum all the percentage contributions
    const totalPercent = companions55 + researchBonus + cloud71 + cloud72 + cloud76 + sushi53;

    // Final multiplier = 1 + (total % / 100)
    return 1 + (totalPercent / 100);
}

//===================Crop Value 

function getCropValueCap() {
    
    const exotic23 = farmingState.market.exotic.find(u => u.index === 23+20)?.getBonus() || 0;
    const exotic24 = farmingState.market.exotic.find(u => u.index === 24+20)?.getBonus() || 0;
    const exotic25 = farmingState.market.exotic.find(u => u.index === 25+20)?.getBonus() || 0;


    const hardCap = 10000 * (1 + (exotic23 + exotic24 + exotic25) / 100);


    return hardCap;
}


            /**
 * Calculates the final Crop Value Multiplier (the "crop value multi cap")
 * This is the exact logic from m._customBlock_FarmingStuffs("CropsBonusValue", t, i)
 *
 * @param {number} plotIndex - Plot index (t in original code)
 * @param {number} mode      - Special flag: 69420 = deterministic (tooltip/max), anything else = normal harvest roll with RNG
 * @returns {number} Final capped crop value multiplier
 */

function calculateCropsBonusValue(plotIndex, mode) {


    // ──────────────────────────────────────────────────────────────
    // 2. COMMON FACTORS (used in both deterministic and random paths)
    // ──────────────────────────────────────────────────────────────
    const landRankBonusTotal = getLandRankUpgBonusTOTAL(1); // 8+17 landrank bonus flat
    const basket99_6         = window.farmingState.market.night?.find(u => u.index === 16)?.getBonus() || 1; // value gmo
    const lankRankBonus      = window.farmingState.landRank.upgrades[1]?.getBonus() || 0;
    const currentFarmRank    = window.farmingState.landRank.stats.first || 0; // should be plot index but we use first plot rank
    const votingBonus        = window.farmingState.miscBonuses.votingBonus29 || 0;
    const rankMultiplier = 1 + (lankRankBonus * currentFarmRank + votingBonus) / 100;
    const landFactor = 1 + landRankBonusTotal / 100;
    const basketFactor = Math.max(1, basket99_6);


    // ──────────────────────────────────────────────────────────────
    // CALCULATE UNCAPPED VALUE
    // ──────────────────────────────────────────────────────────────
    let uncapped;

    if (mode === 69420) {
        

        uncapped = Math.round(
            landFactor *
            basketFactor *
            rankMultiplier
        );
        
    } else {
        

        const basket05     = window.farmingState.market.day?.find(u => u.index === 5+2)?.getBonus() || 0; // product doubler bonus 
        const exotic28     = window.farmingState.market.exotic?.find(u => u.index === 28+20)?.getBonus() || 0; //exotic 28 bonus
        const exotic29     = window.farmingState.market.exotic?.find(u => u.index === 29+20)?.getBonus() || 0; //exotic 29 bonus

        
        const randomRoll = c.randomFloat(); // 0 ≤ randomRoll < 1
    
        const baseRoll = 1 + (basket05 + exotic28 + exotic29) / 100;
        const rolledValue = Math.floor(baseRoll + randomRoll);
        
        uncapped = Math.round(
            Math.max(1, rolledValue) *
            landFactor *
            basketFactor *
            rankMultiplier
        );
       
    }

    return uncapped;
}