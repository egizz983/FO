// ====================== DEATH BRINGER TALENT FORMULAS ======================

// Utility objects for game engine compatibility
const c = {
    asNumber: (val) => val == null ? 0 : Number(val),
    randomFloat: () => Math.random()
};



 // ====================== LandRank FORMULAS ======================
/**
 Land Rank bonus formula 
 */
function LankRankUpgBonus(t, base, level) { // engine formula 
    // Common part used in BOTH branches common = dankranks * exotic bonus 
    const common = 
    getTalentNumber(1,207) *
    (farmingState.market?.exotic?.find(u => u.index === 34)?.getBonus?.().toMulti() ?? 1);


    // Special case for t = 4, 9, 14, 19
    if (4 === t || 9 === t || 14 === t || 19 === t) {
        return common * base * level;
    }

    // Normal case for all other t values
    return common * (1.7 * base * level) / (level + 80);
}


/**
 * @param {number} t - Type parameter
 * @param {number} level - Current level
 * @returns {number} Percentage of max bonus (0-100), or 0 for linear growth cases
 */
function getLandRankUpgBonusPercentOfMax(t, level) {
    level = Math.max(0, c.asNumber(level));
    
    // Special cases with linear growth (no asymptotic maximum)
    if (t === 4 || t === 9 || t === 14 || t === 19) {
        // Linear growth has no completion percentage, return 0 or undefined
        return 0;
    }
    const percentOfMax = (level / (level + 80)) * 100;
    
    return Math.min(100, percentOfMax); // Cap at 100% for safety
}

/**

 * @param {number} t - Type parameter
 * @param {number} threshold - Target percentage threshold (0-100)
 * @returns {number} Level needed to reach threshold, -1 for special cases, or Infinity if threshold >= 100
 */
function getLandRankUpgBonusLevelAtThreshold(t, threshold) {
    threshold = Math.max(0, Math.min(100, c.asNumber(threshold)));
    
    // Special cases with linear growth (no threshold applicable)
    if (t === 4 || t === 9 || t === 14 || t === 19) {
        return -1; // Not applicable for linear growth
    }
    
    // Handle edge cases
    if (threshold <= 0) {
        return 0;
    }
    
    if (threshold >= 100) {
        return Infinity; // Asymptotic limit, never truly reaches 100%
    }

    const p = threshold / 100;
    const level = (80 * p) / (1 - p);
    
    return Math.round(level);
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
    const totalBonus  = 1 + vicarBonus + (getArcadeBonus(51) / 100);

    
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

 // ====================== Vial Multi formula ================= =====
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



function getBubbleBonus(t, i) {

  const Clist = window.AlchemyDescription[Math.floor(t)][Math.floor(i)];
  const baseResult = ArbitraryCode5Inputs(
    "" + String(Clist[3]),
    c.asNumber(Clist[1]),
    c.asNumber(Clist[2]),
    c.asNumber(window.farmingState.CauldronInfo[t][i])
);

  if (isBubbleSuperr(t, i) === 1) {
    const prismaMultiplier = Math.max(
      1,
      getPrismaBonusMult()
    );
    return prismaMultiplier * baseResult;
  }

  return baseResult;
}

window.getBubbleBonusPercentOfMax = function(t, i) {
    const Clist = window.AlchemyDescription?.[Math.floor(t)]?.[Math.floor(i)];
    
    if (!Clist) return 0;
    
    const formula = String(Clist[3]);
    const paramA = c.asNumber(Clist[1]);
    const paramB = c.asNumber(Clist[2]);
    const currentLevel = c.asNumber(window.farmingState?.CauldronInfo?.[t]?.[i]) || 0;
    
    // For decay: bonus = (paramA * level) / (level + paramB), max (asymptote) = paramA
    if (formula === "decay") {
        if (paramA <= 0) return 0;
        const currentBonus = (paramA * currentLevel) / (currentLevel + paramB);
        const percentOfMax = (currentBonus / paramA) * 100;
        return Math.min(100, percentOfMax);
    }
    
    // For decayMulti: bonus = 1 + (paramA * level) / (level + paramB), max (asymptote) = 1 + paramA
    if (formula === "decayMulti") {
        if (paramA <= 0) return 0;
        const currentBonus = 1 + (paramA * currentLevel) / (currentLevel + paramB);
        const maxBonus = 1 + paramA;
        const percentOfMax = ((currentBonus - 1) / paramA) * 100;
        return Math.min(100, percentOfMax);
    }
    
    // For bigBase: bonus = paramA + paramB * level, unbounded growth
    if (formula === "bigBase") {
        return 0; // No fixed maximum for linear growth
    }
    
    // For intervalAdd: bonus = paramA + floor(level / paramB), unbounded growth
    if (formula === "intervalAdd") {
        return 0; // No fixed maximum
    }
    
    // For add: complex formula with no clear maximum
    if (formula === "add") {
        return 0;
    }
    
    // Other formulas not clearly invertible
    return 0;
};


window.getBubbleBonusLevelAtThreshold = function(t, i, targetBonus) {
    targetBonus = Math.max(0, Number(targetBonus) || 0);
    
    const Clist = window.AlchemyDescription?.[Math.floor(t)]?.[Math.floor(i)];
    
    if (!Clist) {
        console.warn(`[getBubbleBonusLevelAtThreshold] No Clist found for cauldron ${t}, bubble ${i}`);
        return -1;
    }
    
    const formula = String(Clist[3]);
    const paramA = c.asNumber(Clist[1]);
    const paramB = c.asNumber(Clist[2]);
    
    // For decay: bonus = (paramA * level) / (level + paramB)
    if (formula === "decay") {
        if (paramA <= 0) return Infinity;
        if (targetBonus <= 0) return 0;
        if (targetBonus >= paramA) return Infinity; // Asymptotic limit
        
        const level = (targetBonus * paramB) / (paramA - targetBonus);
        return Math.round(level);
    }
    
    // For decayMulti: bonus = 1 + (paramA * level) / (level + paramB)
    if (formula === "decayMulti") {
        if (paramA <= 0) return Infinity;
        if (targetBonus <= 1) return 0;
        if (targetBonus >= 1 + paramA) return Infinity;
        
        const adjustedThreshold = targetBonus - 1;
        const level = (adjustedThreshold * paramB) / (paramA - adjustedThreshold);
        return Math.round(level);
    }
    
    // For bigBase: bonus = paramA + paramB * level
    if (formula === "bigBase") {
        if (paramB <= 0) return Infinity;
        if (targetBonus <= paramA) return 0;
        
        const level = (targetBonus - paramA) / paramB;
        return Math.round(level);
    }
    
    // For intervalAdd: bonus = paramA + floor(level / paramB)
    if (formula === "intervalAdd") {
        if (paramB <= 0) return Infinity;
        if (targetBonus <= paramA) return 0;
        
        // level = (targetBonus - paramA - 1) * paramB + 1 (first level that reaches threshold)
        const level = (targetBonus - paramA - 1) * paramB + 1;
        return Math.max(0, Math.round(level));
    }
    
    // Other formulas not directly invertible
    return -1;
};

function getPrismaBonusMult() {
  const arcaneUpg = getArcaneUpgBonus(45, 0);
  const arcadeBonus = getArcadeBonus(54);
  const rogBonus = getRoGBonusQTY(23);
  const haveW6Trophy = (window.farmingState?.cards?.[1] && String(window.farmingState.cards[1] || "").includes("Trophy23")) ? 1 : 0;
  const paletteBonus = getPaletteBonus(28);
  const purpleSigils = getTotalSigils("purple");
  const exoticBonus = window.farmingState.market.exotic?.find(u => u.index === 48+20)?.getBonus?.() || 0;
  const legendPtsBonus = getLegendPTS_bonus(36);
  const companionsBonus = window.farmingState?.companion?.rift4_88 || 0;

  // Original deeply nested sum, now flattened for readability
  const total =
    arcaneUpg +
    (arcadeBonus +
      rogBonus +
      (haveW6Trophy +
        (paletteBonus + (0.2 * purpleSigils + exoticBonus)))) +
    (legendPtsBonus + 50 * companionsBonus);

  const result = 2 + total / 100;

  return Math.min(4, result);
}


function getPaletteBonus(t) {

    const spelunk = window.farmingState?.spelunk || [];
    const PaletteClist = window.GamingPalette;
    const gamingString = window.farmingState?.miscBonuses?.gaming12array || ""; 

    const spelunkVal = c.asNumber(spelunk[9][t]);
    const paletteMult = c.asNumber(PaletteClist[t][4]);
    const isSpecialFormula = c.asNumber(PaletteClist[t][5]) === 1;

    let bonus = isSpecialFormula
    ? (spelunkVal / (spelunkVal + 25)) * paletteMult
    : spelunkVal * paletteMult;


    // Global multipliers (applied to every entry)
    const legendBonus = getLegendPTS_bonus(10);
    const loreBonus = c.asNumber(spelunk[0][8]) >= 1 ? 1 : 0




    if (
        (stringSearch(49, gamingString) === 1 && t === 25) ||
        (stringSearch(51, gamingString) === 1 && t === 13) ||
        (stringSearch(52, gamingString) === 1 && t === 31) ||
        (stringSearch(54, gamingString) === 1 && t === 18) ||
        (stringSearch(58, gamingString) === 1 && t === 3) ||
        (stringSearch(61, gamingString) === 1 && t === 12)
        )  {
        const superBit59 = stringSearch(59, gamingString);
        bonus *= (2 + 0.5 * superBit59);
    }

    // Global multipliers (applied to every palette bonus)
    bonus *= (1 + legendBonus / 100);
    bonus *= (1 + 0.5 * loreBonus);

  return bonus;
}

function getTotalSigils(type) { // "green" or "purple"

  let minLevel = 3;                    // purple default
  if (type === "green" || type === "Green") {
    minLevel = 4;
  }

  let count = 0;
  const cauldronP2W = a.engine.getGameAttribute("CauldronP2W");

  // Check all 24 sigil slots (odd indices: 1, 3, 5, ..., 47)
  for (let i = 0; i < 24; i++) {
    const level = c.asNumber(cauldronP2W[4][1 + 2 * i]);
    if (level >= minLevel) {
      count++;
    }
  }

  return Math.round(c.asNumber(count));
}

function isBubbleSuperr(t,i) {
  const optionsString = window.farmingState.optionsListAccount[384] || ""; // default to empty string if not found
  const letter = window.Number2Letter(t); 
  const searchKey = letter + (Math.round(i) + ",");

  return optionsString.indexOf(searchKey) !== -1 ? 1 : 0;
}


//Kills Left To Advance formula W6 only
window.calculateKillsLeftToAdvance = function() {
    let totalCompletedSlots = 0;
    const state = window.farmingState;
    
    // Loop through all 10 characters (0-9)
    for (let characterIndex = 0; characterIndex < 10; characterIndex++) {
        const characterData = state.playerDatabase.KillsLeftToAdvance[characterIndex];
        
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


function getArcaneUpgBonus(t, i = 0) {
  const index = Math.floor(t); 

  // Special t values that skip the bonus multiplier
  const specialT = [3, 7, 8, 10, 13, 16, 20, 25, 26, 28, 33, 35, 39, 40, 43, 45, 48, 57, 58];

  const isSpecial = specialT.includes(index);

  // Common values used in both paths
  const arcaneVal = c.asNumber(window.farmingState.arcane[index] || 0);
  const upgVal = c.asNumber(
    window.ArcaneUpg[index][5]
  );

  // Handle the 999 special case first
  if (i == 999) {
    return isSpecial ? 0 : 69.42;
  }

  // Normal calculation
  const base = arcaneVal * upgVal;

  if (isSpecial) {
    return base;
  }

  // Non-special: apply bonus multiplier
  const bonusPct = getArcaneUpgBonus( 39, 0);
  return base * (1 + bonusPct / 100);
}

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
        window.farmingState?.playerDatabase?.KillsLeftToAdvance?.[0]?.[250]?.[0] || 0
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
        getArcadeBonus(59) +
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
        window.LegendTalents[spelunkIndex][2] // custom list
    );

    return Math.round(baseValue * talentMultiplier);
};

function getArcadeBonus(e) {
    const arcadeIndex = 0 | e; 
    const level = window.farmingState?.ArcadeUpg[arcadeIndex] || 0;
    let multiplier = 1;
    // Double the bonus if this upgrade is at level 101
    if (level === 101) {
        multiplier = 2 * c.asNumber(multiplier);
    }

    // Double the bonus again if Companion 27 is active
    if (window.farmingState?.companion?.reindeer_27 === 1) {
        multiplier = 2 * c.asNumber(multiplier);
    }

    return multiplier * ArbitraryCode5Inputs(
        "" + String(window.ArcadeShopInfo[arcadeIndex][3]),
        c.asNumber(window.ArcadeShopInfo[arcadeIndex][1]),
        c.asNumber(window.ArcadeShopInfo[arcadeIndex][2]),
        c.asNumber(level),
        0,
        0
    );
};



// Vials base bonus function
window.getVialBonus = function(i, level) {
    let customlist = window.AlchemyDescription?.[4]?.[0 | i];

    // Safety check: if customlist doesn't exist, return 0
    if (!customlist) {
        console.warn(`[getVialBonus] No customlist found for vial index ${i}`);
        return 0;
    }

    let riftBonus = 0;
    if (34 < c.asNumber(window.farmingState.miscBonuses.riftlevel)) {
        riftBonus = 2 * window.farmingState.alchemy.countLevel13;
    }

    const totalBonus = riftBonus + window.getVaultUpgBonus(42); 
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

window.getVialBonusPercentOfMax = function(level) {
    level = Math.max(0, c.asNumber(level));
    
    if (level <= 0) return 0;
    
    // Max level is 13, percentage = (level / 13) * 100
    const percentOfMax = (level / 13) * 100;
    return Math.min(100, percentOfMax);
};


window.getVialBonusLevelAtThreshold = function(i, targetBonus) {
    targetBonus = Math.max(0, Number(targetBonus) || 0);
    
    let customlist = window.AlchemyDescription?.[4]?.[0 | i];
    
    if (!customlist) {
        console.warn(`[getVialBonusLevelAtThreshold] No customlist found for vial index ${i}`);
        return -1;
    }
    
    const formula = String(customlist[3]);
    const paramA = c.asNumber(customlist[1]);
    const paramB = c.asNumber(customlist[2]);
    

    if (formula === "decay") {

        
        if (paramA <= 0) return Infinity;
        if (targetBonus <= 0) return 0;
        if (targetBonus >= paramA) return Infinity; // Asymptotic limit
        
        const level = (targetBonus * paramB) / (paramA - targetBonus);
        return Math.round(level);
    }
    

    if (formula === "decayMulti") {

        
        if (paramA <= 0) return Infinity;
        if (targetBonus <= 1) return 0;
        if (targetBonus >= 1 + paramA) return Infinity;
        
        const adjustedThreshold = targetBonus - 1;
        const level = (adjustedThreshold * paramB) / (paramA - adjustedThreshold);
        return Math.round(level);
    }

    if (formula === "bigBase") {

        
        if (paramB <= 0) return Infinity;
        if (targetBonus <= paramA) return 0;
        
        const level = (targetBonus - paramA) / paramB;
        return Math.round(level);
    }

    return -1;
};

// VaultUpgbonus
window.getVaultUpgBonus = function (t) {

  const mult = c.asNumber(window.UpgradeVault[0 | t]?.[5]);
  const vaultlevel = window.farmingState.vaultupg[t] || 0;
  // Simple upgrades that only do level × multiplier (no extra bonus)
  const simpleUpgrades = new Set([
    1, 6, 7, 8, 9, 13, 32, 33, 36, 40, 42, 43, 44, 49, 51, 52, 53, 57, 61,
    64, 70, 73, 74, 76, 79, 85, 86, 88, 89, 999,
  ]);

  if (simpleUpgrades.has(t)) {
    return vaultlevel * mult;
  }

  let bonusId = 0;

  if (t < 32) {
    bonusId = 32;
  } else if (t < 61) {
    bonusId = 61;
  } else if (t < 89) {
    bonusId = 89;
  } else {
    return 0;
  }

  const bonus = window.getVaultUpgBonus(bonusId);

  // Special case: upgrade 0
  if (t === 0) {
    const extra =
      Math.max(0, vaultlevel - 25) +
      (Math.max(0, vaultlevel - 50) + Math.max(0, vaultlevel - 100));

    return (vaultlevel * mult + extra) * (1 + bonus / 100);
  }

  // Special case: upgrade 60
  if (t === 60) {
    const extra =
      Math.max(0, vaultlevel - 25) +
      (Math.max(0, vaultlevel - 50) +
        (2 * Math.max(0, vaultlevel - 100) +
          (3 * Math.max(0, vaultlevel - 200) +
            (5 * Math.max(0, vaultlevel - 300) +
              (7 * Math.max(0, vaultlevel - 400) +
                10 * Math.max(0, vaultlevel - 450))))));

    const tierBonus = 1 + Math.floor(vaultlevel / 25) / 5;

    return (vaultlevel * mult + extra) * tierBonus * (1 + bonus / 100);
  }

  return vaultlevel * mult * (1 + bonus / 100);
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

function getCardBonusPercentOfMax(cardQuantity = 0) {
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
    
    // Max level is 7, percentage = (level / 7) * 100
    const percentOfMax = (level / 7) * 100;
    return Math.min(100, percentOfMax);
}


function getCardQuantityAtLevel(targetLevel) {
    const thresholds = [1, 1500000, 4500000, 7500000, 24000000, 688500000, 21967500000];
    targetLevel = Math.max(0, Math.min(7, Math.round(Number(targetLevel) || 0)));
    
    if (targetLevel <= 0) return 0;
    if (targetLevel > thresholds.length) return Infinity;
    
    // Return the threshold for the target level (index is level - 1)
    return thresholds[targetLevel - 1];
}


/**
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

      if (!window.farmingState.lab.spelunkerObol) {
        return 0;
      }
      return baseValue5 + getMainframeBonus(119) / 100;
    }

    return baseValue4;
  } else {
    // ==================== JEWEL BONUSES (e >= 100) ====================

    // const pixelHelper = a.engine.getGameAttribute("PixelHelperActor")[22]
    //   .behaviors.getBehavior("ActorEvents_548");

    // const genInfo92 = n.__cast(pixelHelper, eb)._GenINFO[92];

    const jewelIndex = (e - 100) | 0;
    // const adjustedUnlockIndex = (e - 100 + labMainBonus.length) | 0;

    // // Is this specific jewel bonus unlocked?
    // const isUnlocked = 1 === genInfo92[adjustedUnlockIndex];

    // if (!isUnlocked) {
    //   return 0;
    // }
    const multi = (window.farmingState.lab.spelunkerObol && e !== 119) ? getMainframeBonus(8) : 1; // Don't apply multiplier to ID 119 to avoid circular dependency
    const jewelBase = c.asNumber(window.JewelDesc[jewelIndex][12]);
    // Special doubled jewel cases (only when certain prerequisite Mainframe bonuses are active)
    if (e === 100) {
      return (0 < getMainframeBonus(101) && 0 < getMainframeBonus(102))
        ? 2 * jewelBase * multi
        : jewelBase * multi;
    }
    if (e === 103) {
      return (0 < getMainframeBonus(104) && 0 < getMainframeBonus(105) && 0 < getMainframeBonus(106))
        ? 2 * jewelBase * multi
        : jewelBase * multi;
    }
    if (e === 110) {
      return (0 < getMainframeBonus(107) && 0 < getMainframeBonus(108) && 0 < getMainframeBonus(109))
        ? 2 * jewelBase * multi
        : jewelBase * multi;
    }
    if (e === 112) {
      return (
        0 < getMainframeBonus(111) &&
        0 < getMainframeBonus(113) &&
        0 < getMainframeBonus(114) &&
        0 < getMainframeBonus(115)
      )
        ? 2 * jewelBase * multi
        : jewelBase * multi;
    }
    if (e === 119) {
        if(window.farmingState.lab.Pure_Opal_Navette){
            return jewelBase; // no multiplier for this one
        } else {
            return 0; // locked if Pure Opal Navette is not unlocked
        }
    }

    // All other jewel bonuses (including your 116)
    return jewelBase * multi;
  }
}


//================================Meal multi return formula==============================

function getMealBonus(index,ribbonLevel,meallevel) {
    return getCookingMealBonusMultiplier() * getRibbonBonus(ribbonLevel) * meallevel * window.MealINFO[index][2];
}


function getCookingMealBonusMultiplier() {
  // Part 1: Mainframe bonus (ID 116) + special Shiny Breeding bonus
  const mainframeAndBreeding = window.farmingState.lab.mealBlackDiamondRhinestone
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

function calculateStampDoublerBonus() {
    const eventshopString =window.farmingState?.miscBonuses?.EventShopOwned || "";

    return 100
        + getAtomBonuses(12, 0)
            + 20 * (window.farmingState?.pristineCharms?.[20] || 0) // Jellypick	+20% Stamp Doubler Bonus
            + getCompassBonus(76)
            + window.farmingState.miscBonuses.emperorSetBonus
            + 20 * stringSearch(18, eventshopString)
            + m.getPaletteBonus(23)
            + (window.farmingState.market.exotic?.find(u => u.index === 69)?.getBonus() || 0) 
            + Math.round(
                c.asNumber(
                    window.farmingState.spelunk[4][3]
                )
            )
            + getLegendPTS_bonus(36)
            + getRoGBonusQTY(17);
    
}

// get stamp bonus function refactored from engine code much cleaner takes 3 param instead of 1 ( stamp level could be avoided if parse entire stamp array)
function getStampBonusOfType(stampType,stampindex,stampLevel) {

    const CustomLists   = window.StampData;
    let StampBonus = 0;
    let exaltedMultiplier = 1;

    // Build the key used in Compass[4] (e.g. "A25", "B7", etc.)
    const compassKey = String(
        window.Number2Letter(Math.floor(stampindex / 1000))
    ) + String(Math.round(stampindex % 1000));

    if (window.farmingState.compass && window.farmingState.compass[4] && window.farmingState.compass[4].includes(compassKey)) {
        const doublerTalent = calculateStampDoublerBonus();
        exaltedMultiplier = 1 + doublerTalent / 100;
    }

    // ── Calculate raw bonus from this single stamp ──
    const stampDetails = CustomLists[stampType][stampindex];
    const rawBonus = ArbitraryCode5Inputs(
        String(stampDetails[1]),                    // base value
        c.asNumber(stampDetails[2]),                // scaling factor 1
        c.asNumber(stampDetails[3]),                // scaling factor 2
        Math.floor(stampLevel), // effective level
        0,
        0
    );

    // Add to running total (with exalted multiplier)
    StampBonus += exaltedMultiplier * rawBonus;

    // ─────────────────────────────────────────────────────────────
    // 6. APPLY GLOBAL MULTIPLIERS (talents, mainframe, vault, etc.)
    // ─────────────────────────────────────────────────────────────

    // Efficiency stamps get an extra talent multiplier
    if (stampType === 1) {
        const effTalent = getTalentNumber(1, 625);
        StampBonus *= Math.max(effTalent, 1);

    }

    
    // Mainframe Bonus (doubles Book A & B stamps under certain condition)
    if (getMainframeBonus(7) === 2 && stampType < 2) {
        StampBonus *= 2;
    }

    // Vault Upgrades affect Base stats
    if (stampType === 0) {
        const vaultBonus = getVaultUpgBonus(16); //16
        StampBonus *= (1 + vaultBonus / 100);
    }

    // Pristine Stamp bonus (only Books A & B)
    if (stampType < 2) {
        const pristineBonus = 25 * (window.farmingState?.pristineCharms?.[17] || 0); //Liqorice Rolle	1.25x Bigger Bonuses of Non Misc Stamps
        StampBonus *= (1 + pristineBonus / 100);

    }

    
    // ─────────────────────────────────────────────────────────────
    // 7. CACHE THE RESULT & RETURN
    // ─────────────────────────────────────────────────────────────
    const finalValue = StampBonus;


    return finalValue;
}


function getAtomBonuses(t, i) {


  // === Compute AtomBonCalc1 (excess tower levels) ===
  let atomBonCalc1 = 0;
  const towerInfo = window.farmingState.towerinfo || [];
  for (let s = 0; s < 9; s++) {
    const towerLevel = c.asNumber(towerInfo[9 + s]);
    if (towerLevel > 50) {
      atomBonCalc1 += towerLevel - 50;
    }
  }

  // === Compute AtomBonCalc2 (count of meals >= 30) ===
  let atomBonCalc2 = 0;
  const meals = window.farmingState.meals[0] || [];
  for (let s = 0; s < meals.length; s++) {
    if (c.asNumber(meals[s]) >= 30) {
      atomBonCalc2++;
    }
  }

  // === Base value ===
  const atoms = window.farmingState.atoms || [];
  const atomInfo = window.AtomInfo[t];

  let atomBonDN = c.asNumber(atoms[t]) * c.asNumber(atomInfo[4]);

  // === Special cases per t ===
  if (t === 0) {
    const optionsMultiplier = c.asNumber(
      window.farmingState.optionsListAccount[134]
    );
    atomBonDN = Math.min(90, atomBonDN * optionsMultiplier);
  } else if (t === 5) {
    atomBonDN = 2 * atomBonCalc1;
  } else if (t === 8) {
    atomBonDN = Math.pow(1 + atomBonDN / 100, atomBonCalc2);
  }

  return atomBonDN;
}

function getCompassBonus(t) {


  const compassValue = c.asNumber(window.farmingState.compass[0][t]);

  const compassUpg = window.CompassUpg[t];
  const upgMultiplier = c.asNumber(compassUpg[5]);

  // Special upgrade type?
  if (c.asNumber(compassUpg[9]) === 1) {
    const windwalkerBonus =
      getCompassBonus(39, 0) +
      getCompassBonus(80, 0);

    const windwalkerMult = 1 + windwalkerBonus / 100;
    return windwalkerMult * compassValue * upgMultiplier;
  }

  // Special case for t = 45
  if (t === 45) {
    const powerBonus = Math.pow(2, Math.floor(compassValue / 50));
    return compassValue * upgMultiplier * powerBonus;
  }

  // Normal case
  return compassValue * upgMultiplier;
}

//==============================================================

//===================GrimoireUpgbonus(14) ===

function getGrimoireUpgBonus(t) {
    const grimoire = window.farmingState.grimoire || [];
    const grimoireUpg = window.GrimoireUpg;

    const base = c.asNumber(grimoire[Math.round(t)]) *
                 c.asNumber(grimoireUpg[0 | t][5]);

    // These upgrade IDs do NOT receive the extra summoning multiplier
    const specialIds = [9, 11, 26, 36, 39, 17, 32, 45];

    return specialIds.includes(t)
        ? base
        : base * (1 + getGrimoireUpgBonus(36) / 100);
}


function grimoireUpgBonus() {// hardcoded for sacraficeharverst only 

  const base = window.farmingState.miscBonuses.evoSacrificeHarvest * 5;
  return base * (1 + (window.farmingState.miscBonuses.Writhing_Grimoire * 1) / 100);
}


//==============================================================
//===================Skullshop evo multi formula =========================================
function getKillroyBonus() {
    return 1 + (window.farmingState.miscBonuses.evoSkullShop  / (300 + window.farmingState.miscBonuses.evoSkullShop )) * 9;
}

function getKillroyBonusPercentOfMax() {
    const level = window.farmingState?.miscBonuses?.evoSkullShop || 0;
    
    if (level <= 0) return 0;
    
    // Percentage toward asymptotic max (10):
    // (9 * level) / (300 + level) is the bonus portion
    // Percentage = (level / (level + 300)) * 100
    const percentOfMax = (level / (level + 300)) * 100;
    return Math.min(100, percentOfMax);
}


function getKillroyBonusLevelAtThreshold(threshold) {
    threshold = Math.max(1, Math.min(10, Number(threshold) || 1));

    
    const adjustedThreshold = threshold - 1;
    
    if (adjustedThreshold <= 0) return 0;
    if (adjustedThreshold >= 9) return Infinity; // Can't reach bonus of 10 (asymptotic)
    
    const level = (adjustedThreshold * 300) / (9 - adjustedThreshold);
    return Math.round(level);
}


//=====================rift skill mastery formula=========================================
// 1.15× (multiplicative at 200 total Farming levels) Lv0_1[16] > 200 ? 1.15 : 1
function getSkillMasteryBonus() {

    return window.farmingState.levels.farming >= 200 ? 1.15 : 1;
}


//==============================Button evo bonus  (its bugged its using wrong multi)================================
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
        c.asNumber(Research[0][173]) * window.farmingState.companion.babaMummy_0 // placeholder1 used to check doot if active 1 if not 0 results stil lame capped at 5% 
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





//==========================================================================
//Talent level calculation ==============================================
//===========================================================================
function getHighesttalentlevelperID(talentId) {
    
    const idx = getCharacterIndexWithHighestTalent(talentId);
    if (idx === -1) return 0;
    return window.farmingState.playerDatabase.TalentPoints[idx][talentId] || 0;
}

// Get the character index (0-9) with the highest talent level for a given talent ID
function getCharacterIndexWithHighestTalent(talentId) {

    const playerDatabase = window.farmingState?.playerDatabase;
    
    // Safety check
    if (!playerDatabase || !playerDatabase.TalentPoints) {
        return -1; // Return -1 if no data available
    }
    
    let maxLevel = 0;
    let maxCharacterIndex = -1;
    
    // Loop through all 10 characters (0-9)
    for (let charIndex = 0; charIndex < 10; charIndex++) {
        const characterLevels = playerDatabase.TalentPoints[charIndex];
        
        // Skip if character array doesn't exist
        if (!characterLevels) {
            continue;
        }
        
        // Get the skill level for this talent ID
        const talentLevel = c.asNumber(characterLevels[talentId]) || 0;
        
        // Track the maximum and its character index
        if (talentLevel > maxLevel) {
            maxLevel = talentLevel;
            maxCharacterIndex = charIndex;
        }
    }
    
    return maxCharacterIndex;
}

/**
 * Updates talent level in playerDatabase.TalentPoints
 * Called by StateManager when user edits talent value in State Inspector
 * Finds character with highest talent level and updates it
 * 
 * @param {number} talentId - Talent ID (205, 206, or 207)
 * @param {number} newLevel - New talent level
 */
function setTalentLevel(talentId, newLevel) {
    const idx = getCharacterIndexWithHighestTalent(talentId);
    if (idx !== -1 && window.farmingState && window.farmingState.playerDatabase && window.farmingState.playerDatabase.TalentPoints) {
        window.farmingState.playerDatabase.TalentPoints[idx][talentId] = newLevel;
        console.log(`[TalentLevel] Updated talent ${talentId} to level ${newLevel} (character ${idx})`);
    } else {
        console.warn(`[TalentLevel] Could not update talent ${talentId}: character not found`);
    }
}




/**
 * Get talent bonus percentage of maximum (0-100)
 * Handles different formula types from ArbitraryCode5Inputs
 * 
 * @param {number} mode     - 1 = primary effect, other = secondary effect
 * @param {number} talentId - Talent ID
 * @returns {number} Percentage of max bonus (0-100), or 0 for linear/unbounded formulas
 */
function getTalentNumberPercentOfMax(mode, talentId) {
    const calcLevel = getHighesttalentlevelperID(talentId);
    
    if (calcLevel <= 0) return 0;

    const talentData = window.TalentDescriptions[Math.floor(talentId)][1];

    // Choose which formula + parameters to use
    let formula, paramA, paramB;
    if (mode === 1) {
        formula = String(talentData[2]);
        paramA = c.asNumber(talentData[0]);
        paramB = c.asNumber(talentData[1]);
    } else {
        formula = String(talentData[5]);
        paramA = c.asNumber(talentData[3]);
        paramB = c.asNumber(talentData[4]);
    }

    // For decay formulas: bonus asymptotically approaches paramA
    // Percentage = (calcLevel / (calcLevel + paramB)) * 100
    if (formula === "decay" || formula === "decayLower") {
        const percentOfMax = (calcLevel / (calcLevel + paramB)) * 100;
        return Math.min(100, percentOfMax);
    }

    // For decayMulti: bonus = 1 + (paramA * level) / (level + paramB)
    // Asymptotic max = 1 + paramA, so percentage based on level/(level+paramB)
    if (formula === "decayMulti" || formula === "decayMultiLower") {
        const percentOfMax = (calcLevel / (calcLevel + paramB)) * 100;
        return Math.min(100, percentOfMax);
    }

    // Linear formulas (add, bigBase, intervalAdd, reduce) have unbounded growth
    if (["add", "addLower", "bigBase", "bigBaseLower", "intervalAdd", "intervalAddLower", "reduce", "reduceLower", "PtsSpentOnGuildBonus"].includes(formula)) {
        return 0; // No asymptotic max
    }

    // addDECAY has decay after level 50000
    if (formula === "addDECAY") {
        if (calcLevel < 50001) {
            return 0; // Linear up to 50000, no asymptotic max
        } else {
            // After 50000: decays, approaches max
            const excessLevel = calcLevel - 50000;
            const decayPercent = (excessLevel / (excessLevel + 150000)) * 100;
            return Math.min(100, decayPercent);
        }
    }

    return 0; // Default for unknown formulas
}

/**
 * Get talent level needed to reach a specific bonus threshold
 * Handles different formula types from ArbitraryCode5Inputs
 * 
 * @param {number} mode      - 1 = primary effect, other = secondary effect
 * @param {number} talentId  - Talent ID
 * @param {number} threshold - Target bonus value
 * @returns {number} Level needed, Infinity if unreachable, -1 if not applicable
 */
function getTalentNumberLevelAtThreshold(mode, talentId, threshold) {
    threshold = Math.max(0, Number(threshold) || 0);

    const talentData = window.TalentDescriptions[Math.floor(talentId)][1];

    // Choose which formula + parameters to use
    let formula, paramA, paramB;
    if (mode === 1) {
        formula = String(talentData[2]);
        paramA = c.asNumber(talentData[0]);
        paramB = c.asNumber(talentData[1]);
    } else {
        formula = String(talentData[5]);
        paramA = c.asNumber(talentData[3]);
        paramB = c.asNumber(talentData[4]);
    }

    // ═══════════════════════════════════════════════════════════
    // DECAY FORMULAS: bonus = (paramA * level) / (level + paramB)
    // ═══════════════════════════════════════════════════════════
    if (formula === "decay") {
        // threshold = (paramA * level) / (level + paramB)
        // Solve: level = (threshold * paramB) / (paramA - threshold)
        
        if (paramA <= 0) return Infinity;
        if (threshold <= 0) return 0;
        if (threshold >= paramA) return Infinity; // Asymptotic limit
        
        const level = (threshold * paramB) / (paramA - threshold);
        return Math.round(level);
    }

    // ═══════════════════════════════════════════════════════════
    // DECAY MULTI FORMULAS: bonus = 1 + (paramA * level) / (level + paramB)
    // ═══════════════════════════════════════════════════════════
    if (formula === "decayMulti") {
        // threshold = 1 + (paramA * level) / (level + paramB)
        // threshold - 1 = (paramA * level) / (level + paramB)
        // Solve: level = ((threshold - 1) * paramB) / (paramA - (threshold - 1))
        
        if (paramA <= 0) return Infinity;
        if (threshold <= 1) return 0;
        if (threshold >= 1 + paramA) return Infinity; // Asymptotic limit
        
        const adjustedThreshold = threshold - 1;
        const level = (adjustedThreshold * paramB) / (paramA - adjustedThreshold);
        return Math.round(level);
    }

    // ═══════════════════════════════════════════════════════════
    // BIG BASE FORMULAS: bonus = paramA + paramB * level
    // ═══════════════════════════════════════════════════════════
    if (formula === "bigBase") {
        // threshold = paramA + paramB * level
        // Solve: level = (threshold - paramA) / paramB
        
        if (paramB <= 0) return Infinity;
        if (threshold <= paramA) return 0;
        
        const level = (threshold - paramA) / paramB;
        return Math.round(level);
    }

    // ═══════════════════════════════════════════════════════════
    // LINEAR FORMULAS: unbounded growth, level = threshold / paramB or similar
    // ═══════════════════════════════════════════════════════════
    if (formula === "intervalAdd") {
        // bonus = paramA + Math.floor(level / paramB)
        // Solve: level = (threshold - paramA) * paramB
        
        if (paramB <= 0) return Infinity;
        if (threshold <= paramA) return 0;
        
        const level = (threshold - paramA) * paramB;
        return Math.round(level);
    }

    if (["add", "addLower", "addDECAY", "reduce", "reduceLower", "decayLower", "decayMultiLower", "bigBaseLower", "intervalAddLower", "PtsSpentOnGuildBonus"].includes(formula)) {
        return -1; // Complex inversion or not applicable
    }

    return -1; // Unknown formula
}

/**
 * @param {number} mode     - 1 = primary effect (usually the one shown in-game)
 *                          - any other value = secondary effect (often the "per level" description)
 * @param {number} talentId - Talent ID (e.g. 625 for "Toilet Paper Postage")
 * @returns {number}        - The final talent bonus value
 */
function getTalentNumber(mode, talentId) { //


    const calcLevel =  getHighesttalentlevelperID(talentId);

    // No points invested → no bonus
    if (calcLevel <= 0) {
        return 0;
    }

    const talentData = window.TalentDescriptions[Math.floor(talentId)][1];

    // Choose which formula + parameters to use
    let formula, paramA, paramB;
    if (mode === 1) {
        // Primary effect
        formula = String(talentData[2]);
        paramA  = c.asNumber(talentData[0]);
        paramB  = c.asNumber(talentData[1]);
    } else {
        // Secondary effect
        formula = String(talentData[5]);
        paramA  = c.asNumber(talentData[3]);
        paramB  = c.asNumber(talentData[4]);
    }

    // Run the game's formula evaluator
    return ArbitraryCode5Inputs(
        formula,
        paramA,
        paramB,
        calcLevel
    );
}

/**
 * Updates all talent levels in TalentPoints for each character
 * by adding bonus levels from getAllTalentLV() to the current level
 * 
 * Called AFTER parsing playerDatabase.TalentPoints from savedata.json
 * Initial values from savedata + getAllTalentLV results = final value
 */
function UpdateTalentLevelsFromAllSources() {
    const playerDatabase = window.farmingState?.playerDatabase;

    // Safety check
    if (!playerDatabase || !playerDatabase.TalentPoints) {
        console.warn("[UpdateTalentLevelsFromAllSources] No TalentPoints found");
        return;
    }
    
    // Loop through all 10 characters (0-9)
    for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
        const characterTalents = playerDatabase.TalentPoints[playerIndex];
        
        // Skip if character object doesn't exist
        if (!characterTalents || typeof characterTalents !== 'object') {
            continue;
        }
        
        // Loop through all talent IDs in this character's object
        // characterTalents is { talentId: level, talentId: level, ... }
        for (const talentIdStr in characterTalents) {
            const talentId = parseInt(talentIdStr, 10);
            const currentLevel = characterTalents[talentId];
            
            // Skip if this talent ID is missing (undefined/null)
            if (currentLevel === undefined || currentLevel === null) {
                continue;
            }
            
            // Get bonus levels from all global sources
            const bonusLevels = getAllTalentLV(talentId, playerIndex);
            // Update talent level: current + bonus = final level
            characterTalents[talentId] = c.asNumber(currentLevel) + bonusLevels;

        }
    }
}

/**
 * Calculates the total EXTRA levels given to a talent from ALL global sources
 * (Super Talent points, other talents, achievements, familiars, divinity, etc.)
 *
 * @param {number} t - Talent ID 
 * @returns {number} Total bonus levels 
 */
function getAllTalentLV(tID,playerindex) { 
    const talentId = Math.floor(c.asNumber(tID));
    const farmingState = window.farmingState || {};
    const gamingString = farmingState.miscBonuses?.gaming12array || ""; // string that contains gaming related bonuses (e.g. "SuperBitType")

 
    // Is this talent banned from receiving any AllTalentLV bonus?
    const isBannedForAllLV =
        (talentId >= 49 && talentId <= 59) ||   // range 49–59
        talentId === 149 ||
        talentId === 374 ||
        talentId === 539 ||
        talentId === 505 ||
        talentId > 614;

    if (isBannedForAllLV) {
        return 0;
    }


    // checks if skill is super
    let spelunkMultiplier = 0;                   
    const spelunk = farmingState.spelunk;

    const slot1 = 20 + playerindex;
    const slot2 = 32 + playerindex;
    
    if ((spelunk[slot1] && spelunk[slot1].indexOf(talentId) !== -1) ||
        (spelunk[slot2] && spelunk[slot2].indexOf(talentId) !== -1)) {
        spelunkMultiplier = 1;
    }
    const superTalentPoints =  Math.round(50 + getLegendPTS_bonus(7) + getZenithMarketBonus(5) );

    // sum of Symbol of beyond talent across all 3 base classes P,R,G  + achievement
    const talentBonuses = 
        getTalentNumber(1, 149) +
        getTalentNumber(1, 374) +
        getTalentNumber(1, 539) +
        (farmingState.achievements?.checkoutTakeout == -1 ? 5 : 0);

    //Divinity
    let divMinorlink = 0;
    let otherBonuses = 0;
    
    // Only calculate divinity bonuses if required data is loaded
    if (window.AlchemyDescription && window.GodsInfo) {
        const holes = HolesCheckForArctis();
        const research173 = getGridBonus(173, 0) > 0 ? 1 : 0; // research 173 check
        const coralkid = farmingState.optionsListAccount?.[425] == 1 ? 1 : 0; // coral kit god selection check
        const personallink = farmingState.divinity?.[12 + playerindex] == 1 ? 1 : 0; // personal link check

        
        if(farmingState.companion.babaMummy_0 || research173 || coralkid || holes || personallink){ // no ES skill505 check
            divMinorlink = getDivMinorBonus(playerindex,1); // arctis godid is 1
        }

    }

    // Find the character with class 34 (Elementary Swordsman)
    let EScharacterIndex = -1;
    const characterClasses = farmingState.playerDatabase?.CharacterClass || [];
    for (let i = 0; i < characterClasses.length; i++) {
        if (c.asNumber(characterClasses[i]) === 34) {
            EScharacterIndex = i;
            break;
        }
    }

    // Get the level of that character
    const ESlevel = EScharacterIndex >= 0 
        ? c.asNumber(farmingState.playerDatabase.Lv0?.[EScharacterIndex]?.[0]) || 0
        : 0;
    
    // Only add family bonus if ClassFamilyBonuses is loaded
    const familyBonus = (window.ClassFamilyBonuses) 
        ? Math.floor(c.asNumber(getFamilyBonsues(34,ESlevel))) 
        : 0;

    
    // Break down otherBonuses into separate variables
    const rift2_1Bonus = (farmingState.companion?.rift2_1 ? 25 : 0);

    const equinoxSymbolBonus = c.asNumber(farmingState.miscBonuses?.EquinoxSymbol);

    const optionsListBonus = 5 * Math.floor((97 + c.asNumber(farmingState.optionsListAccount?.[232])) / 100);
    const grimoireUpgBonus39 = getGrimoireUpgBonus(39);
    const kattlekrukBonus = farmingState.miscBonuses.kattlekrukSetBonus;
    const arcaneBonus57 = Math.min(5, getArcaneUpgBonus(57,0));
    const superBitTypeBonus = Math.max(0, Math.floor(
        (farmingState.playerDatabase.Lv0?.[playerindex] 
            ? (c.asNumber(farmingState.playerDatabase.Lv0[playerindex][0]) - 500) / 100
            : 0
        ) * 
        stringSearch(47, gamingString) // SuperBitType check
    ));

    otherBonuses = 
        familyBonus +
        rift2_1Bonus +
        divMinorlink +
        equinoxSymbolBonus +
        optionsListBonus +
        grimoireUpgBonus39 +
        kattlekrukBonus +
        arcaneBonus57 +
        superBitTypeBonus;


    return Math.floor( spelunkMultiplier * superTalentPoints + talentBonuses + otherBonuses );
}


function HolesCheckForArctis() { // checks hole what div assigned

    const holes = window.farmingState.holes.hole11 || []; // Pocket divinity slots
    
    const cosmoQty = window.farmingState.holes.hole6[0] || 0; // CosmoBonusQTY (current level of poket divinity cosmos upgrade)

    for(let i = 0; i < cosmoQty; i++){
        if (holes[29 + i] === 1) {
            return 1;
        }
    }

    return 0;
}

function getDivMinorBonus(playerindex, godid) {

    // Safety checks for required data
    if (!window.AlchemyDescription || !window.GodsInfo) {
        return 0;
    }


    const bubbleClist = window.AlchemyDescription[2] ? window.AlchemyDescription[2][21] : null;

    // Safety check: ensure bubble data exists
    if (!bubbleClist || bubbleClist[1] === undefined || bubbleClist[2] === undefined) {
        return 0;
    }

    // Common values (used in both player paths)
    const alchMultiplier = getBubbleBonus(3,21) || 1;//yellow index 21

    const coralBonus = 1 + getCoralKidUpgBonus(3) / 100;

    // God minor bonus value (depends on godid)
    const godInfoData = window.GodsInfo[0 | godid];
    if (!godInfoData || godInfoData[13] === undefined) {
        return 0;
    }

    const godIndex = 0 | c.asNumber(godInfoData[13]);
    const godBonusData = window.GodsInfo[godIndex];
    if (!godBonusData || godBonusData[3] === undefined) {
        return 0;
    }
    
    const godBonus = c.asNumber(godBonusData[3]);

    
    let lv0 = playerindex === -1 ? 0 : window.farmingState.playerDatabase.Lv0?.[playerindex];

    // Safety check: if Lv0 data not available yet, return 0
    if (!lv0 || typeof lv0 !== 'object' || !lv0[14]) {
        return 0;
    }

    // Final formula (identical math in both original branches)
    return alchMultiplier * ((coralBonus * lv0[14]) / (60 + lv0[14])) * godBonus;
}


function getCoralKidUpgBonus(t) { // t = index in upgrade list
    const options = window.farmingState.optionsListAccount;
    const index = Math.round(427 + t);
    const value = c.asNumber(options[index]);

    switch (t) {
        case 0:
            return 10 * value;

        case 1:
            return Math.round(2 * value);

        case 2:
            return (value / (25 + value)) * 20;

        case 3:
            return Math.round(value);

        case 4:
            return Math.round(2 * value);

        default:
            // t ≥ 5 or any other value (original fallback)
            return (value / (40 + value)) * 100;
    }
}

function getZenithMarketBonus(t) {


  const zenithMarketValue = window.ZenithMarket[0 | t][4];
  const spelunkValue = window.farmingState.spelunk[45][0 | t];

  return Math.floor(
    c.asNumber(zenithMarketValue) * c.asNumber(spelunkValue)
  );
}

function getFamilyBonsues(fambonusID, level) { // id 34 

    // Safety check: ensure required data is loaded
    if (!window.ClassFamilyBonuses) {
        console.warn(`[getFamilyBonsues] Missing required data: ClassFamilyBonuses`);
        return 0;
    }

    const bonusData = window.ClassFamilyBonuses[0 | fambonusID];
    
    // Safety check: ensure bonus data exists
    if (!bonusData) {
        console.warn(`[getFamilyBonsues] No bonus data found for fambonusID ${fambonusID}`);
        return 0;
    }

    // ClassAccountBonus is optional - use it if available, otherwise default to 0
    const accountBaseLevel = (window.ClassAccountBonus && window.ClassAccountBonus[0 | fambonusID])
        ? c.asNumber(window.ClassAccountBonus[0 | fambonusID][1])
        : 0;
    
    const effectiveLevel = Math.max(0, Math.round(level - accountBaseLevel));

    return ArbitraryCode5Inputs(
        String(bonusData[3]),           // formula string
        c.asNumber(bonusData[1]),                 // param 1
        c.asNumber(bonusData[2]),                 // param 2
        effectiveLevel                            // effective level
    );

}



function getStarSigns(t) {

  const infinitestars = window.farmingState.shinyPets.infiniteStars || 0;
  let hasstarAssigned = false;
  const starSigns = window.farmingState?.PersonalValueMap?.starSigns || [];
  let Basestarbonus = 0;
    
    for (let i = 0; i < starSigns.length; i++) {
        const characterStarSigns = starSigns[i];
        
        if (Array.isArray(characterStarSigns) && characterStarSigns.includes(t)) {
            hasstarAssigned = true; // Found it
        }
    }

    // Switch for farming-related star signs
    // Check if star sign is unlocked OR assigned to this character
    switch(t) {
        case 65:  // Cropiovo_Minor
            if (window.farmingState.starSigns.cropiovoMinor === 1 || hasstarAssigned) {
                return Basestarbonus = 3 * getStarSigns(79);
            }
            return 0; // // Not unlocked(infinite star) or assigned
            
        case 67:  // O.G._Signalais
            if (window.farmingState.starSigns.ogSignalais === 1 || hasstarAssigned) {
                return Basestarbonus = 15 * getStarSigns(79);
            }
            return 0; // Not unlocked(infinite star) or assigned
            
        case 79:  // Seraph_Cosmos (multiplier only)
            if (window.farmingState.starSigns.seraphCosmos === 1 || hasstarAssigned) {
                const infiniteSCount = window.farmingState.shinyPets.infiniteStars || 0; // Your current infinite stars from pets
                const chipBonus = getChipBonus("star");
                const meritBonus = getMeritocBonusz(22);  //All of your Starsigns give x higher bonuses than normal
                const arcaneBonus = Math.min(10, c.asNumber(window.farmingState.arcane[40]));
                const levelBonus = c.asNumber(window.farmingState.levels.summoning) + 1;
                
                const multiplier = Math.max(1, Math.min(2, 1 + chipBonus * Math.floor((999 + infiniteSCount) / 1000))) * 
                (1 + meritBonus / 100) * Math.min(5, Math.pow(1.1 + arcaneBonus / 100, Math.ceil(levelBonus / 20)));

                return multiplier;
            }
            return 1; // Not unlocked or assigned, return neutral multiplier
    }

  return Basestarbonus;
}



function getChipBonus(e) {
  return c.asNumber(window.farmingState.DNSM?.ChipBbonusz?.[e] ?? 0);
}


function recalcChipBonuses() {

  // Ensure DNSM structure exists
  if (!window.farmingState.DNSM) {
    window.farmingState.DNSM = {};
  }
  if (!window.farmingState.DNSM.ChipBbonusz) {
    window.farmingState.DNSM.ChipBbonusz = {};
  }

  const ChipBbonusz = window.farmingState.DNSM.ChipBbonusz;
  const labData = window.farmingState.lab || [];
  const chipDesc = window.ChipDesc;
  const characterCount = window.farmingState.playerDatabase?.CharacterClass?.length || 0;

  for (let i = 0; i < characterCount; i++) {
    const playerChipRow = labData[1 + i];
    for (let f = 0; f < 7; f++) {
        const chipID = c.asNumber(playerChipRow[f]);

        if (chipID !== -1) {
        const bonusKeyRaw = chipDesc[chipID][10];
        const bonusKey = "" + String(bonusKeyRaw);

        const bonusValue = c.asNumber(chipDesc[chipID][11]);
``
        // Add to existing value (supports multiple chips giving the same bonus)
        const currentValue = c.asNumber(ChipBbonusz[bonusKey] ?? 0);
        ChipBbonusz[bonusKey] = currentValue + bonusValue;
        }
    }
  }
}
function DNSMInit(){
    recalcChipBonuses();
}

function calculateNextOGChance(t) {


    return (
        Math.pow( 0.4, 1 ) * // current og count // c.asNumber(farmPlot[plotIndex][5]) + 1
        Math.max(  1, window.farmingState.market.night?.find(u => u.index === 13)?.getBonus()  ) //*m._customBlock_FarmingStuffs("BasketUpgQTY", 1, 3)
        (1 + (50 *(window.farmingState?.pristineCharms?.[11] || 0)) / 100) *   // 
        (1 + c.asNumber(getStarSigns(67)) / 100) *
        (1 + (2 * c.asNumber(window.farmingState.miscBonuses.ogMeritShop)) / 100) *
        (1 + (15 * (window.farmingState.achievements.farmingOgBigTimeLandOwner == -1 ? 1 : 0) / 100)) *
        (1 + getLandRankUpgBonusTOTAL(3) / 100) *
        (1 + window.farmingState.market.exotic.find(u => u.index === 46)?.getBonus() / 100) * 
        (1 + window.farmingState.market.exotic.find(u => u.index === 47)?.getBonus() / 100)
    );
}

function calculateOGMulti(t) {


    const farmPlot = a.engine.getGameAttribute("FarmPlot");
    const plotIndex = 0 | t; // keep original fast integer conversion

    return Math.min(
        1e9,
        Math.max(
            1,
            Math.pow(
                2,
                c.asNumber(farmPlot[plotIndex][5]) // holds current OG count
            )
        )
    );
}