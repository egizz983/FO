// ======================
// FARMING OPTIMIZER 
// ======================
class FarmingOptimizer {
    constructor() {
        this.state = window.farmingState;
    }

    // Main entry point called from index
    loadPlayerData(jsonString) {
        try {
            const data = JSON.parse(jsonString);   
            this.parseAll(data);
            this.recalculateAll();
            this.renderAll();
            console.log("✅ FarmingOptimizer.loadPlayerData completed successfully");
            return true;
        } catch (e) {
            console.error("❌ FarmingOptimizer load failed:", e);
            return false;
        }
    }

    parseAll(data) {
        //farming data
        parseFarmingData(data, this.state); // crop counts for gmo
        parseLandRankData(data, this.state); // landrank levels , avarage , total sum
        parseFarmUpgData(data, this.state);  // market upgrade levels ( day / night / exotic)
        parseCauldronData(data, this.state); // alchemy bubbles + vials
        parseAchievementsData(data, this.state); // farming-related achievements (Regalis, Spectre Stars, Evo & OG achievements)
        parseMiscBonusesData(data, this.state); // various misc bonuses (Taffy Disc, Crystal Sneeking, Merit Shop OG, Monument Wisdom, Wisdom Bonus Level, Crop Evo Stamp, Sac Harvest)
        parseShinyPetsData(data, this.state); // shiny pet levels for infinite star and meal bonus calculations
        parseStarSignsData(data, this.state); // star sign positions for infinite star activation
    }

    // Reset all caches and reinitialize calculations
    recalculateAll() {
        // Reset WinBonus cache
        if (window.resetWinBonusCache) {
            window.resetWinBonusCache();
        }
        
        // Force reinitialization of dependent functions
        if (window.getWinBonus) {
            window.getWinBonus(10);
        }
        
        console.log("ℹ️ recalculateAll: Caches reset and calculations reinitialized");
    }

    // Placeholder
    calculateAll() {
        // calculateAllFarmingMultipliers();   // will be called here once updated
        console.log("ℹ️ calculateAll called (currently does nothing - add your calc function)");
    }

    renderAll() {
        renderFarmingBonuses();
        updateFarmingLevelDisplay();
    }
}

// ======================
// ======================
// LAND RANK UPGRADE CLASS 
// ======================
class LandRankUpgrade {
    constructor(data) {
        Object.assign(this, data);
    }

//Fnctions
    getBonus(multi = false) {
        const level = this.currentLevel || 0;
        if (level <= 0) return 0;

        let bonus = LankRankUpgBonus(this.id, this.base, level);

        // Special case for index 0 (Evolution Boost - scales with first plot rank)
        if (this.id === 0) {
            bonus = bonus * (window.farmingState.landRank.stats.first || 0) + (window.farmingState.miscBonuses.votingBonus29 || 0);
        }

        if (multi) {
            return 1 + bonus / 100;
        }

        return bonus;
    }
    getRawLevel() { return this.currentLevel || 0; }
    getName()     { return this.name; }
}

// ======================
// EXOTIC MARKET UPGRADE CLASS 
// ======================
class ExoticMarketUpgrade {
    constructor(data) {
        Object.assign(this, data);
    }

    getBonus(forceMultiplier = false) {
        const level = this.currentLevel || 0;
        if (level <= 0) return 0;

        let bonus = 0;

        if (this.calcType === "diminishing") {
            bonus = this.base * (level / (1000 + level));
        } 
        else if (this.calcType === "linear") {
            bonus = this.base * level;
        }

        if (this.perLevel === true) {
            const farmingLevel = window.farmingState.levels.farming || 0;
            let threshold = 0;

            switch (this.index) {
                case 24: threshold = 50;  break; // Geneology I
                case 25: threshold = 100; break; // Geneology II
                case 26: threshold = 150; break; // Geneology III
                case 27: threshold = 200; break; // Geneology IV
                case 28: threshold = 250; break; // Geneology V
            }

            const levelsAboveThreshold = Math.max(0, farmingLevel - threshold);
            bonus *= levelsAboveThreshold;   
        }

        if (forceMultiplier || this.isMultiplier) {
            bonus = 1 + (bonus / 100);
        }

        return bonus;
    }

    getRawLevel() { return this.currentLevel || 0; }
    getName()     { return this.name; }
}




// ======================
// MARKET UPGRADE CLASS (Day + Night)
// ======================
class MarketUpgrade {
    constructor(data) {
        Object.assign(this, data);
    }

    getBonus() {
        const level = this.currentLevel || 0;
        if (level <= 0) return 0;

        let bonus = 0;

        if (this.calcType === "unlock") {
            bonus = level;                          
        } 
        else if (this.calcType === "linear") {
            bonus = level * (this.param || 0);

            if (this.isMultiplier) {
                bonus += 1;                         
            }
        }


        if (this.perLevel === true) {
            const state = window.farmingState;
            let cropCount = 0;

            switch (this.index) {
                case 11: // Evolution GMO → special exponential formula
                    cropCount = state.gmoCropCounts["200"] || 0;
                    bonus = Math.pow(1 + level * (this.param || 0) / 100, cropCount);
                    break;

                case 12: // Speed GMO
                    cropCount = state.gmoCropCounts["1000"] || 0;
                    bonus = 1 + (level * (this.param || 0) * cropCount) / 100;
                    break;

                case 14: // EXP GMO
                    cropCount = state.gmoCropCounts["2500"] || 0;
                    bonus = 1 + (level * (this.param || 0) * cropCount) / 100;
                    break;

                case 16: // Value GMO
                    cropCount = state.gmoCropCounts["10000"] || 0;
                    bonus = 1 + (level * (this.param || 0) * cropCount) / 100;
                    break;

                case 17: // Super GMO → returns its own multiplier ONLY
                    cropCount = state.gmoCropCounts["100000"] || 0;
                    bonus = 1 + (level * (this.param || 0) * cropCount) / 100;
                    return bonus;   // Super GMO does NOT multiply itself
            }

            // Apply Super GMO multiplier to EVERY other GMO 
            if (this.index !== 17) {
                const superGMO = state.market.night.find(u => u.index === 17);
                if (superGMO && superGMO.currentLevel > 0) {
                    const superMultiplier = superGMO.getBonus();   
                    bonus *= superMultiplier;
                }
            }

            return bonus;
        }


        return bonus;
    }

    getRawLevel() { return this.currentLevel || 0; }
    getName()     { return this.name; }
}

