// ======================
// APP-LEVEL DATA & OPTIMIZER INSTANCE
// Depends on: models.js (FarmingOptimizer class), state.js (window.farmingState)
// ======================

const optimizer = new FarmingOptimizer(); // main optimizer instance that holds state and logic

const farmingBonuses = [
    { name: "Evolution",    totalLabel: "Total Evolution chance", totalValue: "245%" },
    { name: "Overgrowth",   totalLabel: "Total Overgrowth",      totalValue: "320%" },
    { name: "Crop Value",   totalLabel: "Max Crop Value",        totalValue: "185%" },
    { name: "Growth Speed", totalLabel: "Total Growth Speed",    totalValue: "420%" },
    { name: "Soil EXP",     totalLabel: "Total EXP Multiplier",  totalValue: "280%" }
];

const companionsList = [
    { id: "babaMummy_0",  name: "King Doot",           bonus: "All Divinities from World 5 count as Active",      imageKey: "kingDoot" },
    { id: "potato_19",    name: "Mashed Potato",        bonus: "+5% Ballot Bonus Multi",                           imageKey: "mashedPotato" },
    { id: "rift2_1",      name: "Rift Slug",            bonus: "+25 Lv for all Talents",                           imageKey: "riftSlug" },
    { id: "w7a8_39",      name: "Pufferblob",           bonus: "+50% Meritocracy Bonus Multi",                     imageKey: "pufferblob" },
    { id: "Crystal6_41",  name: "Crystal Cuttlefish",   bonus: "+40% Ballot Bonus Multi",                          imageKey: "crystalCuttlefish" },
    { id: "w7b11_55",     name: "Pirate Deckhand",      bonus: "×1.15 ALL Research Grid bonuses",                  imageKey: "pirateDeckhand" },
    { id: "rift4_88",     name: "Rift Hivemind",        bonus: "+50% Prisma Bubble bonus & +5 Prisma Bubbles",     imageKey: "riftHivemind" },
    { id: "poppy_161",    name: "Poppy",                bonus: "2x bonuses from Bonus Ballot & Multi Meritocracy", imageKey: "poppy" },
    { id: "w6b2b_162",    name: "Wickerlight Spirit",   bonus: "All meals 5x cheaper & 1.25x higher bonuses",      imageKey: "wickerlightSpirit" },
    { id: "w7b7_147",     name: "Mantaray",             bonus: "All Button bonuses in W7 are 1.50x bigger",        imageKey: "mantaray" },
    { id: "reindeer_27",  name: "Spirit Reindeer",      bonus: "2.00x Gold Ball Shop Bonuses",                     imageKey: "spiritReindeer" }
];

const labItemsList = [
    { id: 'lab-chemistry-set',    name: 'My 1st Chemistry Set',          statePath: 'labM.my1stChemistrySet',          imageKey: 'my1stChemistrySet' },
    { id: 'lab-stamp-book',       name: 'Certified Stamp Book',          statePath: 'labM.certifiedStampBook',          imageKey: 'certifiedStampBook' },
    { id: 'lab-spelunker-obol',   name: 'Spelunker Obol',               statePath: 'labM.spelunkerObol',               imageKey: 'spelunkerObol' },
    { id: 'lab-meal-black-diamond', name: 'Meal Black Diamond Rhinestone', statePath: 'labM.mealBlackDiamondRhinestone', imageKey: 'mealBlackDiamondRhinestone' }
];
