
// =============================================
// FARMING BREAKDOWNS
// =============================================

window.getFarmingBreakdowns = function() {
    return {
        "Evolution": [
            { 
                label: "Land Ranks", 
                value: "×" + farmingState.landRank.upgrades
                    .filter(u => u.group === "Evolution")
                    .reduce((prod, u) => prod * u.getBonus().toMulti(), 1)
                    .toFixed(2),
                
                children: farmingState.landRank.upgrades
                    .filter(u => u.group === "Evolution")
                    .map(u => ({
                        label: u.name,
                        value: "+" + u.getBonus().toFixed(2) + "%"
                    }))
            },
                        { 
                label: "Market", 
                value: "×" + (
                    // 1. Day Market 
                    farmingState.market.day
                        .filter(u => u.group === "Evolution")
                        .reduce((prod, u) => prod * u.getBonus(), 1) *

                    // 2. Night Market (includes Evolution GMO × Super GMO – the huge number)
                    farmingState.market.night
                        .filter(u => u.group === "Evolution")
                        .reduce((prod, u) => prod * u.getBonus(), 1) *

                    // 3. Exotic multipliers (Sproutluck I–IV)
                    farmingState.market.exotic
                        .filter(u => u.group === "Evolution" && u.isMultiplier)
                        .reduce((prod, u) => prod * u.getBonus(), 1) *

                    // 4. Exotic additives (Geneology I–V) convert to multiplier
                    farmingState.market.exotic
                        .filter(u => u.group === "Evolution" && !u.isMultiplier)
                        .reduce((sum, u) => sum + u.getBonus(), 0).toMulti()
                ).toExponential(4),   
                
                children: [
                    { 
                        label: "Day Market", 
                        value: "x" + (farmingState.market.day
                            .filter(u => u.group === "Evolution")
                            .reduce((sum, u) => sum + (u.getBonus() - 1), 0) ).toFixed(2) ,
                        children: farmingState.market.day
                            .filter(u => u.group === "Evolution")
                            .map(u => ({
                                label: u.name,
                                value: "x" + ((u.getBonus() - 1) ).toFixed(2) 
                            }))
                    },
                    { 
                        label: "Night Market", 
                        value: "×" + farmingState.market.night
                            .filter(u => u.group === "Evolution")
                            .reduce((prod, u) => prod * u.getBonus(), 1)
                            .toExponential(4),
                        children: farmingState.market.night
                            .filter(u => u.group === "Evolution")
                            .map(u => ({
                                label: u.name,
                                value: "×" + u.getBonus().toExponential(4)
                            }))
                    },
                                        { 
                        label: "Exotic Market", 
                        value: "×" + (
                            // Exotic multipliers 
                            farmingState.market.exotic
                                .filter(u => u.group === "Evolution" && u.isMultiplier)
                                .reduce((prod, u) => prod * u.getBonus().toMulti(), 1) *

                            // Exotic additives convert to multiplier
                            farmingState.market.exotic
                                .filter(u => u.group === "Evolution" && !u.isMultiplier)
                                .reduce((sum, u) => sum + u.getBonus(), 0).toMulti()
                        ).toFixed(3),
                        
                        children: farmingState.market.exotic
                            .filter(u => u.group === "Evolution")
                            .map(u => ({
                                label: u.name,
                                value: u.isMultiplier 
                                    ? "×" + u.getBonus().toMulti().toFixed(3)
                                    : "+" + u.getBonus().toFixed(2) + "%"
                            }))
                    }
                ]
            },
            {
                label: "Alchemy",
                value: "×[placeholder]",
                children: [
                    {
                        label: "Crop Chapter Bubble",
                        value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.cropChapterBubblebonus, 12, 50) * window.calculateTomeScorePer2000()).toMulti()).toFixed(2)
                    },
                    {
                        label: "Croppius Mapper Bubble",
                        value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.croppiusMapperBubblebonus, 5, 70) * window.calculateKillsLeftToAdvance()).toMulti()).toFixed(2)
                    },
                    {
                        label: "Vials(Flavorgil)",
                        value: "×[placeholder]"
                    }
                ]
            },
            {
                label: "Meal Bonuses",
                value: "×" + (
                    window.getMealBonus(62, farmingState.meals.evoBillJackPepperRibbonLevel, farmingState.meals.evoBillJackPepper).toMulti() *
                    (window.getMealBonus(66, farmingState.meals.evoNyanborgirRibbonLevel, farmingState.meals.evoNyanborgir) * Math.ceil((c.asNumber(farmingState.levels.summoning) + 1) / 50)).toMulti()
                ).toFixed(2),
                children: [
                    {
                        label: "Bill Jack Pepper",
                        value: "×" + window.getMealBonus(62, farmingState.meals.evoBillJackPepperRibbonLevel, farmingState.meals.evoBillJackPepper).toMulti().toFixed(2)
                    },
                    {
                        label: "Nyanborgir",
                        value: "×" + (window.getMealBonus(66, farmingState.meals.evoNyanborgirRibbonLevel, farmingState.meals.evoNyanborgir) * Math.ceil((c.asNumber(farmingState.levels.summoning) + 1) / 50)).toMulti().toFixed(2)
                    }
                ]
            },
            { label: "SummonerWinBonus", value: "×" + window.getWinBonus(10,).toMulti().toFixed(2) },
            { label: "Hole Lamp Bonus", value: "×" + window.getLampBonus().toMulti().toFixed(2) },
            { label: "Sushi Bonus", value: "×" + window.getSushiBonus().toMulti().toFixed(2) },
            { label: "Card Bonus", value: "×" + getCardBonus(window.farmingState.miscBonuses.jellofishcard).toMulti().toFixed(2) },
            { label: "Vault Upgrade", value: "×" + window.getVaultUpgBonus(78,window.farmingState.miscBonuses.croppiusEvolviusBonus).toMulti().toFixed(2) },
            { label: "Wisdom Monument", value: "×" + getmonumentROGbonuses(2,4).toMulti().toFixed(2) },
            { label: "Stamp", value: "×1" },
            { label: "Grimoire", value: "×1" },
            { label: "Achievement", value: "×1" },
            { label: "KillRoy", value: "×1" },
            { label: "Skill Mastery", value: "×1" },
            { label: "StarSigns", value: "×1" },
            { label: "Talent", value: "×1" },
            { label: "Sticker", value: "×1" },
            { label: "Button", value: "×1" }
        ],

        "Overgrowth": [
            { 
                label: "Land Ranks", 
                value: "+" + farmingState.landRank.upgrades
                    .filter(u => u.group === "Overgrowth")
                    .reduce((sum, u) => sum + u.getBonus(calculateDankRanksMultiplier(farmingState.talents.dankRanks), farmingState.market.exotic.find(u => u.name === "Plump Database").getBonus()), 0) .toFixed(2) + "%", 
                
                children: farmingState.landRank.upgrades
                    .filter(u => u.group === "Overgrowth")
                    .map(u => ({
                        label: u.name,
                        value: "+" + u.getBonus(calculateDankRanksMultiplier(farmingState.talents.dankRanks), farmingState.market.exotic.find(u => u.name === "Plump Database").getBonus()).toFixed(2) + "%"
                    }))
            },
            { label: "Land Ranks", value: "PLACEHOLDER%" },
            { label: "Market", value: "×PLACEHOLDER%" }
        ],

        "Crop Value": [
            { label: "Uncapped Value this has Random Modifier",
              value: "×" + window.calculateCropsBonusValue(0, 0),//69420
            children: [
                { 
                    label: "Land Ranks", 
                    value: "×" + Math.round(
                        getLandRankUpgBonusTOTAL(1).toMulti() *
                        (1 + (farmingState.landRank.upgrades[1].getBonus() * farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29) / 100)
                    ).toFixed(2),
                    children: [
                        {
                            label: "Production Boost",
                            value: "×" + (farmingState.landRank.upgrades[1].getBonus() * farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29).toMulti().toFixed(2)
                        },
                        {
                            label: "Production Megaboost",
                            value: "×" + farmingState.landRank.upgrades[8].getBonus().toMulti().toFixed(2)
                        },
                        {
                            label: "Production Superboost",
                            value: "×" + farmingState.landRank.upgrades[17].getBonus().toMulti().toFixed(2)
                        }
                    ]
                },
                {
                    label: "Market",
                    value: (function() {
                        const basket05 = window.farmingState.market.day?.find(u => u.index === 5+2)?.getBonus() || 0;
                        const exotic28 = window.farmingState.market.exotic?.find(u => u.index === 28+20)?.getBonus() || 0;
                        const exotic29 = window.farmingState.market.exotic?.find(u => u.index === 29+20)?.getBonus() || 0;
                        const basketFactor = window.farmingState.market.night?.find(u => u.index === 16)?.getBonus() || 1;
                        const randomRoll = c.randomFloat();
                        const baseRoll = 1 + (basket05 + exotic28 + exotic29) / 100;
                        const rolledValue = Math.floor(baseRoll + randomRoll);
                        return "×" + Math.round(Math.max(1, rolledValue) * basketFactor).toFixed(2);
                    })(),
                    children: [
                        {
                            label: "Product Doubler",
                            value: "+" + (farmingState.market.day.find(u => u.index === 5+2)?.getBonus() || 0).toFixed(2) + "%"
                        },
                        {
                            label: "Value GMO",
                            value: "x" + (farmingState.market.night.find(u => u.index === 16)?.getBonus() || 0).toFixed(2)
                        },
                        {
                            label: "Double Petal I",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 28+20)?.getBonus() || 0).toFixed(2) + "%"
                        },
                        {
                            label: "Double Petal II",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 29+20)?.getBonus() || 0).toFixed(2) + "%"
                        }
                    ]
                }
            ]
            }, 
            {
                label: "Uncapped Value - 2x chance",
                value: "×" + window.calculateCropsBonusValue(0, 69420),//69420
            },
            { 
                label: "Max Cap Sources", 
                value: "+" + (
                    (farmingState.market.exotic.find(u => u.index === 43)?.getBonus() || 0) +
                    (farmingState.market.exotic.find(u => u.index === 44)?.getBonus() || 0) +
                    (farmingState.market.exotic.find(u => u.index === 45)?.getBonus() || 0)
                ).toFixed(2) + "%",
                children: [
                    {
                        label: "Stalk Value I",
                        value: "+" + (farmingState.market.exotic.find(u => u.index === 43)?.getBonus() || 0).toFixed(2) + "%"
                    },
                    {
                        label: "Stalk Value II",
                        value: "+" + (farmingState.market.exotic.find(u => u.index === 44)?.getBonus() || 0).toFixed(2) + "%"
                    },
                    {
                        label: "Stalk Value III",
                        value: "+" + (farmingState.market.exotic.find(u => u.index === 45)?.getBonus() || 0).toFixed(2) + "%"
                    }
                ]
            } 
        ],

        "Growth Speed": [
            { label: "Market", value: "PLACEHOLDER%" },
            { label: "SummoningBonus", value: "PLACEHOLDER%" }
        ],

        "Soil EXP": [
            { label: "Land Ranks", value: "PLACEHOLDER%" },
            { label: "Market", value: "PLACEHOLDER%" }
        ]
    };
};