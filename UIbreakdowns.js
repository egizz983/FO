
// =============================================
// FARMING BREAKDOWNS - GROUPED LAYOUT
// =============================================

window.getFarmingBreakdowns = function() {
    return {
        "Evolution": {
            groups: [
                {
                    name: "Day Market",
                    total: "Total:" + "×" + ((farmingState.market.day.find(u => u.index === 6)?.getBonus() || 0) ).toFixed(2),
                    items: [
                        { label: "Biology Boost", value: "×" + (farmingState.market.day.find(u => u.index === 6)?.getBonus() || 0).toFixed(2),threshold: "Linear" }
                    ]
                },
                {
                    name: "Summoning Win Bonus",
                    total: "Total:" + "×" + window.getWinBonus(10).toMulti().toFixed(2),
                    items: [
                        { label: "Crop Evo", value: "×" + window.getWinBonus(10).toMulti().toFixed(2) }
                    ]
                },
                {
                    name: "Hole A",
                    total: "Total:" + "×" + window.getLampBonus().toMulti().toFixed(2),
                    items: [
                        { label: "Lamp 6 Majigers", value: "×" + window.getLampBonus().toMulti().toFixed(2),threshold: "Linear" }
                    ]
                },
                {
                    name: "Hole B",
                    total: "Total:" + "×" + getmonumentROGbonuses(2,4).toMulti().toFixed(2),
                    items: [
                        { label: "Wisdom Monument", value: "×" + getmonumentROGbonuses(2,4).toMulti().toFixed(2) ,threshold: "Linear"}
                    ]
                },
                {
                    name: "Sushi",
                    total: "Total:" + "×" + getRoGBonusQTY(35).toMulti().toFixed(2),
                    items: [
                        { label: "Sushi T36", value: "×" + getRoGBonusQTY(35).toMulti().toFixed(2) , threshold:  getRoGBonusQTY(35) == 100 ? "100%" : "0%" }
                    ]
                },
                {
                    name: "Alchemy A",
                    total: "Total:" + "×" + ((window.calculateBubbleBonus(farmingState.alchemy.cropChapterBubblebonus, 12, 50) * window.calculateTomeScorePer2000()).toMulti()).toFixed(2),
                    items: [
                        { label: "Crop Chapter Bubble", value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.cropChapterBubblebonus, 12, 50) * window.calculateTomeScorePer2000()).toMulti()).toFixed(2) , threshold: getBubbleBonusPercentOfMax(0,29).toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Alchemy B",
                    total: "Total:" + "×" + ((window.calculateBubbleBonus(farmingState.alchemy.croppiusMapperBubblebonus, 5, 70) * window.calculateKillsLeftToAdvance()).toMulti()).toFixed(2),
                    items: [
                        { label: "Croppius Mapper Bubble", value: "×" + ((window.calculateBubbleBonus(farmingState.alchemy.croppiusMapperBubblebonus, 5, 70) * window.calculateKillsLeftToAdvance()).toMulti()).toFixed(2) , threshold: getBubbleBonusPercentOfMax(3,25).toFixed(2) + "%" }
                    ]
                },
                {
                     name: "Alchemy C",
                    total: "Total:" + "×" + getVialBonus(66,window.farmingState.alchemy.flavorgilBonus).toMulti().toFixed(2),
                    items: [
                        { label: "Flavorgil Bonus", value: "×" + getVialBonus(66,window.farmingState.alchemy.flavorgilBonus).toMulti().toFixed(2), threshold: getVialBonusPercentOfMax(66,window.farmingState.alchemy.flavorgilBonus).toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Cards",
                    total: "Total:" + "×" + getCardBonus(window.farmingState.miscBonuses.jellofishcard).toMulti().toFixed(2),
                    items: [
                        { label: "JelloFish", value: "×" + getCardBonus(window.farmingState.miscBonuses.jellofishcard).toMulti().toFixed(2), threshold: getCardBonusPercentOfMax(window.farmingState.miscBonuses.jellofishcard).toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Meals A",
                    total: "Total:" + "×" + window.getMealBonus(62, farmingState.meals.evoBillJackPepperRibbonLevel, farmingState.meals.evoBillJackPepper).toMulti().toFixed(2),
                    items: [
                        { label: "Bill Jack Pepper", value: "×" + window.getMealBonus(62, farmingState.meals.evoBillJackPepperRibbonLevel, farmingState.meals.evoBillJackPepper).toMulti().toFixed(2), threshold: "Linear"  }
                    ]
                },
                {
                    name: "Meal B",
                    total: "Total:" + "×" + (window.getMealBonus(66, farmingState.meals.evoNyanborgirRibbonLevel, farmingState.meals.evoNyanborgir) * Math.ceil((c.asNumber(farmingState.levels.summoning) + 1) / 50)).toMulti().toFixed(2),
                    items: [
                        { label: "Nyanborgir", value: "×" + (window.getMealBonus(66, farmingState.meals.evoNyanborgirRibbonLevel, farmingState.meals.evoNyanborgir) * Math.ceil((c.asNumber(farmingState.levels.summoning) + 1) / 50)).toMulti().toFixed(2), threshold: "Linear" }
                    ]
                },
                {
                    name: "Vault",
                    total: "Total:" + "×" + window.getVaultUpgBonus(78).toMulti().toFixed(2),
                    items: [
                        { label: "Croppius Evolvius", value: "×" + window.getVaultUpgBonus(78).toMulti().toFixed(2), threshold: "Linear" }
                    ]
                },
                {
                    name: "Stamp",
                    total: "Total:" + "×" + getStampBonusOfType(1,47,window.farmingState.miscBonuses.evoCropEvoStamp).toMulti().toFixed(2),
                    items: [
                        { label: "Stamp Evo Stamp", value: "×" + getStampBonusOfType(1,47,window.farmingState.miscBonuses.evoCropEvoStamp).toMulti().toFixed(2), threshold: "Quadratic" }
                    ]
                },
                {
                    name: "Grimoire",
                    total: "Total:" + "×" + grimoireUpgBonus().toMulti().toFixed(2),
                    items: [
                        { label: "Sacrifice of Harvest", value: "×" + grimoireUpgBonus().toMulti().toFixed(2), threshold: "Linear"  }
                    ]
                },
                {
                    name: "Achievement",
                    total: "Total:" + "×" + (5 * (window.farmingState.achievements.farmingEvoLilOvergrowth === -1 ? 1 : 0)).toMulti().toFixed(2),
                    items: [
                        { label: "Lil Overgrowth", value: "×" + (5 * (window.farmingState.achievements.farmingEvoLilOvergrowth === -1 ? 1 : 0)).toMulti().toFixed(2), threshold: window.farmingState.achievements.farmingEvoLilOvergrowth === -1 ? "100%" : "0%" }
                    ]
                },
                {
                    name: "KillRoy",
                    total: "Total:" + "×" + getKillroyBonus().toFixed(2),
                    items: [
                        { label: "Crop Evo Boost", value: "×" + getKillroyBonus().toFixed(2), threshold: getKillroyBonusPercentOfMax().toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Night Market",
                    total: "Total:" + "×" + (farmingState.market.night.find(u => u.index === 11)?.getBonus() || 0).toExponential(4),
                    items: [
                        { label: "Evo GMO", value: "×" + (farmingState.market.night.find(u => u.index === 11)?.getBonus() || 0).toExponential(4), threshold: "Linear" }
                    ]
                },
                {
                    name: "Rift",
                    total: "Total:" + "×" + getSkillMasteryBonus().toFixed(2),
                    items: [
                        { label: "Skill Mastery", value: "×" + getSkillMasteryBonus().toFixed(2), threshold: window.farmingState.levels.farming >= 200 ? "100%" : "0%" }
                    ]
                },
                {
                    name: "Star Sign",
                    total: "Total:" + "×" + (getStarSigns(65) * window.farmingState.levels.farming).toMulti().toFixed(2),
                    items: [
                        { label: "Cropiovo Minor", value: "×" + (getStarSigns(65) * window.farmingState.levels.farming).toMulti().toFixed(2), threshold:  "Linear" },
                    ]
                },
                {
                    name: "Land Rank A",
                    total: "Total:" + "×" + (farmingState.landRank.upgrades[3].getBonus().toMulti() * farmingState.landRank.upgrades[10].getBonus().toMulti() * (farmingState.landRank.upgrades[15]?.getBonus().toMulti() || 1)).toFixed(2),
                    items: [
                        { label: "Evolution Megaboost", value: "×" + farmingState.landRank.upgrades[3].getBonus().toMulti().toFixed(2), threshold: farmingState.landRank.upgrades[3].getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Evolution SuperBoost", value: "×" + farmingState.landRank.upgrades[10].getBonus().toMulti().toFixed(2), threshold: farmingState.landRank.upgrades[10].getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Evolution UltraBoost", value: "×" + farmingState.landRank.upgrades[15]?.getBonus().toMulti().toFixed(2), threshold: farmingState.landRank.upgrades[15]?.getBonusPercentOfMax().toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Land Rank B",
                    total: "Total:" + "×" + (farmingState.landRank.upgrades[0].getBonus() * farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29).toMulti().toFixed(2),
                    items: [
                        { label: "Evolution Boost", value: "×" + (farmingState.landRank.upgrades[0].getBonus() * farmingState.landRank.stats.first).toMulti().toFixed(2), threshold: farmingState.landRank.upgrades[0].getBonusPercentOfMax().toFixed(2) + "%"    },
                        { label: "Voting Ballot", value: "+" + window.farmingState.miscBonuses.votingBonus29.toFixed(2) + "%" , threshold: window.farmingState.miscBonuses.votingBonus29 != 0 ? "100%" : "0%" }
                    ]
                },
                {
                    name: "Talent",
                    total: "Total:" + "×" + getTalentNumber(1,205).toFixed(2),
                    items: [
                        { label: "Mass Irrigation", value: "×" + getTalentNumber(1,205).toFixed(2), threshold: getTalentNumberPercentOfMax(1,205).toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Exotic Group A",
                    total: "Total"  + (function() { return "×" + (farmingState.market.exotic.find(u => u.index === 20)?.getBonus() || 1).toMulti().toFixed(2); })(),
                    items: [
                        { label: "Sproutluck I", value: "×" + (farmingState.market.exotic.find(u => u.index === 20)?.getBonus() || 1).toMulti().toFixed(2), threshold: farmingState.market.exotic.find(u => u.index === 20)?.getBonusPercentOfMax().toFixed(2) + "%"  }
                    ]
                },
                {
                    name: "Exotic Group B",
                    total: "Total"  + (function() { return "×" + (farmingState.market.exotic.find(u => u.index === 21)?.getBonus() || 1).toMulti().toFixed(2); })(),
                    items: [
                        { label: "Sproutluck II", value: "×" + (farmingState.market.exotic.find(u => u.index === 21)?.getBonus() || 1).toMulti().toFixed(2), threshold: farmingState.market.exotic.find(u => u.index === 21)?.getBonusPercentOfMax().toFixed(2) + "%"  }
                    ]
                },
                {
                    name: "Exotic Group C",
                    total: "Total"  + (function() { return "×" + (farmingState.market.exotic.find(u => u.index === 22)?.getBonus() || 1).toMulti().toFixed(2); })(),
                    items: [
                        { label: "Sproutluck III", value: "×" + (farmingState.market.exotic.find(u => u.index === 22)?.getBonus() || 1).toMulti().toFixed(2), threshold: farmingState.market.exotic.find(u => u.index === 22)?.getBonusPercentOfMax().toFixed(2) + "%"  }
                    ]
                },
                {
                    name: "Exotic Group D",
                    total: "Total"  + (function() { return "×" + (farmingState.market.exotic.find(u => u.index === 23)?.getBonus() || 1).toMulti().toFixed(2); })(),
                    items: [
                        { label: "Sproutluck IV", value: "×" + (farmingState.market.exotic.find(u => u.index === 23)?.getBonus() || 1).toMulti().toFixed(2), threshold: farmingState.market.exotic.find(u => u.index === 23)?.getBonusPercentOfMax().toFixed(2) + "%"  }
                    ]
                },
                {
                    name: "Exotic Group E",
                    total: "Total"  + (function() { 
                        const gen1 = farmingState.market.exotic.find(u => u.index === 24)?.getBonus() || 0;
                        const gen2 = farmingState.market.exotic.find(u => u.index === 25)?.getBonus() || 0;
                        const gen3 = farmingState.market.exotic.find(u => u.index === 26)?.getBonus() || 0;
                        const gen4 = farmingState.market.exotic.find(u => u.index === 27)?.getBonus() || 0;
                        const gen5 = farmingState.market.exotic.find(u => u.index === 28)?.getBonus() || 0;
                        return "x" + (gen1 + gen2 + gen3 + gen4 + gen5).toMulti().toFixed(2);
                    })(),
                    items: [
                        { label: "Geneology I", value: "+" + (farmingState.market.exotic.find(u => u.index === 24)?.getBonus() || 0).toFixed(2) + "%", threshold: farmingState.market.exotic.find(u => u.index === 24)?.getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Geneology II", value: "+" + (farmingState.market.exotic.find(u => u.index === 25)?.getBonus() || 0).toFixed(2) + "%", threshold: farmingState.market.exotic.find(u => u.index === 25)?.getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Geneology III", value: "+" + (farmingState.market.exotic.find(u => u.index === 26)?.getBonus() || 0).toFixed(2) + "%", threshold: farmingState.market.exotic.find(u => u.index === 26)?.getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Geneology IV", value: "+" + (farmingState.market.exotic.find(u => u.index === 27)?.getBonus() || 0).toFixed(2) + "%", threshold: farmingState.market.exotic.find(u => u.index === 27)?.getBonusPercentOfMax().toFixed(2) + "%" },
                        { label: "Geneology V", value: "+" + (farmingState.market.exotic.find(u => u.index === 28)?.getBonus() || 0).toFixed(2) + "%", threshold: farmingState.market.exotic.find(u => u.index === 28)?.getBonusPercentOfMax().toFixed(2) + "%" }
                    ]
                },
                {
                    name: "Button",
                    total: "Total" + "×"+ getButtonBonuses(5,window.farmingState.miscBonuses.evoButtonPressCount).toMulti().toFixed(2),
                    items: [
                        { label: "Crop Evo(Engine error uses Spelunk value)", value: "×"+ getButtonBonuses(5,window.farmingState.miscBonuses.evoButtonPressCount).toMulti().toFixed(2), threshold:  "Linear" }
                    ]
                },
                {
                    name: "Stickers",
                    total: "Total" + "×" + getStickerBonus(4).toMulti().toFixed(2),
                    items: [
                        { label: "Sporrious Stalk", value: "×" + getStickerBonus(4).toMulti().toFixed(2), threshold: "Multiplicative" }
                    ]
                }
            ]
        },

        "Overgrowth": {
            groups: [
                {
                    name: "Land Ranks",
                    items: farmingState.landRank.upgrades
                        .filter(u => u.group === "Overgrowth")
                        .map(u => ({
                            label: u.name,
                            value: "+" + u.getBonus().toFixed(2) + "%"
                        }))
                },
                {
                    name: "Market",
                    items: [
                        { label: "Placeholder 1", value: "×PLACEHOLDER" },
                        { label: "Placeholder 2", value: "×PLACEHOLDER" }
                    ]
                }
            ]
        },

        "Crop Value": {
            groups: [
                {
                    name: "Uncapped Value",
                    items: [
                        {
                            label: "Uncapped Value (Random Modifier)",
                            value: "×" + window.calculateCropsBonusValue(0, 0)
                        },
                        {
                            label: "Uncapped - 2x Chance bonuses(Used for Display)",
                            value: "×" + window.calculateCropsBonusValue(0, 69420)
                        }
                    ]
                },
                {
                    name: "Land Ranks A",
                    total: "Total:" + "×" + getLandRankUpgBonusTOTAL(1).toMulti().toFixed(2),
                    items: [

                        {
                            label: "Production Megaboost",
                            value: "+" + farmingState.landRank.upgrades[8].getBonus().toFixed(2) + "%" , threshold: farmingState.landRank.upgrades[8].getBonusPercentOfMax().toFixed(2) + "%"
                        },
                        {
                            label: "Production Superboost",
                            value: "+" + farmingState.landRank.upgrades[17].getBonus().toFixed(2) + "%" , threshold: farmingState.landRank.upgrades[17].getBonusPercentOfMax().toFixed(2) + "%"
                        }
                    ]
                },
                {
                    name: "Land Ranks B",
                    total: "Total:" + "×" + (window.farmingState.landRank.upgrades[1]?.getBonus() * window.farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29).toMulti().toFixed(2),
                    items: [

                        {
                            label: "Production Megaboost",
                            value: "x" + (window.farmingState.landRank.upgrades[1]?.getBonus() * window.farmingState.landRank.stats.first + window.farmingState.miscBonuses.votingBonus29).toMulti().toFixed(2) , threshold: window.farmingState.landRank.upgrades[1]?.getBonusPercentOfMax().toFixed(2) + "%"
                        },
                        { label: "Voting Ballot", value: "+" + window.farmingState.miscBonuses.votingBonus29.toFixed(2) + "%", threshold: window.farmingState.miscBonuses.votingBonus29 != 0 ? "100%" : "0%" }


                    ]
                },
                {
                    name: "Night Market",
                    total: "Total:" + "×" + farmingState.market.night.find(u => u.index === 16)?.getBonus().toFixed(2),
                    items: [

                        {
                            label: "Value GMO",
                            value: "x" + farmingState.market.night.find(u => u.index === 16)?.getBonus().toFixed(2), threshold: "Linear"
                        }

                    ]
                },
                {
                    name: "Market",
                    total: "Total:" + "×" + ((farmingState.market.day.find(u => u.index === 5+2)?.getBonus() || 0) + (farmingState.market.exotic.find(u => u.index === 28+20)?.getBonus() || 0) + (farmingState.market.exotic.find(u => u.index === 29+20)?.getBonus() || 0)).toMulti().toFixed(2),
                    items: [
                        {
                            label: "Product Doubler",
                            value: "+" + (farmingState.market.day.find(u => u.index === 5+2)?.getBonus() || 0).toFixed(2) + "%" , threshold: "Linear"
                        },
                        {
                            label: "Double Petal I",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 28+20)?.getBonus() || 0).toFixed(2) + "%" , threshold: farmingState.market.exotic.find(u => u.index === 28+20)?.getBonusPercentOfMax().toFixed(2) + "%"
                        },
                        {
                            label: "Double Petal II",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 29+20)?.getBonus() || 0).toFixed(2) + "%" , threshold: farmingState.market.exotic.find(u => u.index === 29+20)?.getBonusPercentOfMax().toFixed(2) + "%"
                        }
                    ]
                },
                {
                    name: "Max Cap Sources",
                    items: [
                        {
                            label: "Stalk Value I",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 43)?.getBonus() || 0).toFixed(2) + "%" , threshold: farmingState.market.exotic.find(u => u.index === 43)?.getBonusPercentOfMax().toFixed(2) + "%"
                        },
                        {
                            label: "Stalk Value II",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 44)?.getBonus() || 0).toFixed(2) + "%" , threshold: farmingState.market.exotic.find(u => u.index === 44)?.getBonusPercentOfMax().toFixed(2) + "%"
                        },
                        {
                            label: "Stalk Value III",
                            value: "+" + (farmingState.market.exotic.find(u => u.index === 45)?.getBonus() || 0).toFixed(2) + "%" , threshold: farmingState.market.exotic.find(u => u.index === 45)?.getBonusPercentOfMax().toFixed(2) + "%"
                        }
                    ]
                }
            ]
        },

        "Growth Speed": {
            groups: [
                {
                    name: "Market",
                    items: [
                        { label: "Placeholder", value: "PLACEHOLDER%" }
                    ]
                },
                {
                    name: "Summoning",
                    items: [
                        { label: "Placeholder", value: "PLACEHOLDER%" }
                    ]
                }
            ]
        },

        "Soil EXP": {
            groups: [
                {
                    name: "Land Ranks",
                    items: [
                        { label: "Placeholder", value: "PLACEHOLDER%" }
                    ]
                },
                {
                    name: "Market",
                    items: [
                        { label: "Placeholder", value: "PLACEHOLDER%" }
                    ]
                }
            ]
        }
    };
};