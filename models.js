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
            
            // Restore user selections after parsing JSON
            // This ensures user's companion/talent selections persist over the parsed defaults
            if (window.StatePersistence && window.StatePersistence.loadUserSelections) {
                window.StatePersistence.loadUserSelections();
            }
            
            this.recalculateAll();
            this.renderAll();
            
            // Mark JSON as successfully loaded - enables recalculations and input interactions
            if (window.StateManager && window.StateManager.markJsonLoaded) {
                window.StateManager.markJsonLoaded();
            }
            
            // Enable manual input fields now that JSON is loaded
            if (window.StateAutoWire && window.StateAutoWire.setInputsDisabled) {
                window.StateAutoWire.setInputsDisabled(false);
            }
            
            // Render State Inspector with parsed data
            if (window.StateInspector && window.StateInspector.renderInspector) {
                window.StateInspector.renderInspector();
                window.StateInspector.syncAllFields();
            }
            
            // Hide the "load JSON first" notice
            if (window.hideJsonLoadNotice) {
                window.hideJsonLoadNotice();
            }
            
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
        parseKillsLeftToAdvanceData(data, this.state); // kills left to advance (KLA_0 through KLA_9) progression data
        parseSkillLevelsData(data, this.state); // skill levels for all characters (SL_0 through SL_9 compared with SLpre_0 through SLpre_9)
        parseCharacterClassData(data, this.state); // character class IDs for all characters (CharacterClass_0 through CharacterClass_9)
        parseLv0Data(data, this.state); // level 0 player data (Lv0_0 through Lv0_6) for all characters
        
        // Initialize DNSM chip bonuses after all parsers complete
        if (window.DNSMInit) {
            window.DNSMInit();
        }
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
        
        // Update talent levels from all sources (called here after ALL parsers complete)
        if (window.UpdateTalentLevelsFromAllSources) {
            window.UpdateTalentLevelsFromAllSources();
        }
        
        // Run all calculations
        this.calculateAll();
        
        console.log("ℹ️ recalculateAll: Caches reset and calculations reinitialized");
    }

    // Placeholder
    calculateAll() {
       
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
    getBonus() {
        const level = this.currentLevel || 0;
        if (level <= 0) return 0;

        let bonus = LankRankUpgBonus(this.id, this.base, level);

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

    getBonus() {
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

