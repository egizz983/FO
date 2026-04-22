
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
                    .reduce((prod, u) => prod * u.getBonus(true), 1)
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
                    (1 + farmingState.market.exotic
                        .filter(u => u.group === "Evolution" && !u.isMultiplier)
                        .reduce((sum, u) => sum + u.getBonus(), 0) / 100)
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
                                .reduce((prod, u) => prod * u.getBonus(), 1) *

                            // Exotic additives convert to multiplier
                            (1 + farmingState.market.exotic
                                .filter(u => u.group === "Evolution" && !u.isMultiplier)
                                .reduce((sum, u) => sum + u.getBonus(), 0) / 100)
                        ).toFixed(3),
                        
                        children: farmingState.market.exotic
                            .filter(u => u.group === "Evolution")
                            .map(u => ({
                                label: u.name,
                                value: u.isMultiplier 
                                    ? "×" + u.getBonus().toFixed(3)
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
                        value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.cropChapterBubblebonus, 12, 50) * window.calculateTomeScorePer2000()) / 100 + 1).toFixed(2)
                    },
                    {
                        label: "Croppius Mapper Bubble",
                        value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.croppiusMapperBubblebonus, 5, 70) * window.calculateKillsLeftToAdvance()) / 100 + 1).toFixed(2)
                    },
                    {
                        label: "Vials(Flavorgil)",
                        value: "×[placeholder]"
                    }
                ]
            },
            { label: "SummonerWinBonus", value: "×" + window.getWinBonus(10, true).toFixed(2) },
            { label: "Hole Lamp Bonus", value: "×" + window.getLampBonus(true).toFixed(2) },
            { label: "Sushi Bonus", value: "×" + window.getSushiBonus(true).toFixed(2) },
            { label: "Meal", value: "86042.55" },
            { label: "Final Multiplier", value: "×62.8" }
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
            { label: "Base Value", value: "100%" },
            { label: "Final Multiplier", value: "×420%" }
        ],

        "Crop Value": [
            { label: "Base Value", value: "100%" },
            { label: "Final Multiplier", value: "×185%" }
        ],

        "Growth Speed": [
            { label: "Base Value", value: "100%" },
            { label: "Final Multiplier", value: "×420%" }
        ],

        "Soil EXP": [
            { label: "Base Value", value: "100%" },
            { label: "Final Multiplier", value: "×280%" }
        ]
    };
};