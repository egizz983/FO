// =====================================================================
// IMAGE LINKS REPOSITORY
// =====================================================================

window.imageLinks = {
    
    // =====================================================================
    // COMPANIONS
    // =====================================================================
    companions: {
        spiritReindeer: "https://idleontoolbox.com/afk_targets/Spirit_Reindeer.png",
        poppy: "https://idleontoolbox.com/afk_targets/Poppy.png",
        wickerlightSpirit: "https://idleontoolbox.com/afk_targets/Wickerlight_Spirit.png",
        mantaray: "https://idleontoolbox.com/afk_targets/Mantaray.png",
        riftHivemind: "https://idleontoolbox.com/afk_targets/Rift_Hivemind.png",
        pirateDeckhand: "https://idleontoolbox.com/afk_targets/Pirate_Deckhand.png",
        crystalCuttlefish: "https://idleontoolbox.com/afk_targets/Crystal_Cuttlefish.png",
        pufferblob: "https://idleontoolbox.com/afk_targets/Pufferblob.png",
        mashedPotato: "https://idleontoolbox.com/afk_targets/Mashed_Potato.png",
        riftSlug: "https://idleontoolbox.com/afk_targets/Rift_Slug.png",
        kingDoot: "https://idleontoolbox.com/afk_targets/King_Doot.png"
    },
    lab: {
        my1stChemistrySet: "https://idleontoolbox.com/data/LabBonus10.png", 
        certifiedStampBook: "https://idleontoolbox.com/data/LabBonus7.png", 
        spelunkerObol: "https://idleontoolbox.com/data/LabBonus8.png",
        mealBlackDiamondRhinestone: "https://idleontoolbox.com/data/ConsoleJwl16.png",   
        Pure_Opal_Navette: "https://idleontoolbox.com/data/ConsoleJwl19.png",   // Pure Opal Navette 
    },
    landrank: {
        // Keys match LandRankUpgrade id (0–19). Fill in URLs when available.
        0:  "https://idleontoolbox.com/data/RankUpg0.png",  // Evolution Boost
        1:  "https://idleontoolbox.com/data/RankUpg1.png",  // Production Boost
        2:  "https://idleontoolbox.com/data/RankUpg2.png",  // Soil Exp Boost
        3:  "https://idleontoolbox.com/data/RankUpg3.png",  // Evolution Megaboost
        4:  "https://idleontoolbox.com/data/RankUpg4.png",  // Seed of Stealth
        5:  "https://idleontoolbox.com/data/RankUpg5.png",  // Farmtastic Boost
        6:  "https://idleontoolbox.com/data/RankUpg6.png",  // Soil Exp Megaboost
        7:  "https://idleontoolbox.com/data/RankUpg7.png",  // Overgrowth Boost
        8:  "https://idleontoolbox.com/data/RankUpg8.png",  // Production Megaboost
        9:  "https://idleontoolbox.com/data/RankUpg9.png",  // Seed of Loot
        10: "https://idleontoolbox.com/data/RankUpg10.png",  // Evolution Superboost
        11: "https://idleontoolbox.com/data/RankUpg11.png",  // Overgrowth Megaboost
        12: "https://idleontoolbox.com/data/RankUpg12.png",  // Farmtastic Megaboost
        13: "https://idleontoolbox.com/data/RankUpg13.png",  // Soil Exp Superboost
        14: "https://idleontoolbox.com/data/RankUpg14.png",  // Seed of Damage
        15: "https://idleontoolbox.com/data/RankUpg15.png",  // Evolution Ultraboost
        16: "https://idleontoolbox.com/data/RankUpg16.png",  // Farmtastic Superboost
        17: "https://idleontoolbox.com/data/RankUpg17.png",  // Production Superboost
        18: "https://idleontoolbox.com/data/RankUpg18.png",  // Overgrowth Superboost
        19: "https://idleontoolbox.com/data/RankUpg19.png",  // Seed of Stats
    }
};

// =====================================================================
// HELPER FUNCTION - Get image URL by category and name
// =====================================================================

window.getImageUrl = function(category, imageName) {
    if (!window.imageLinks[category]) {
        console.warn(`[getImageUrl] Category "${category}" not found`);
        return "";
    }
    
    if (!window.imageLinks[category][imageName]) {
        console.warn(`[getImageUrl] Image "${imageName}" not found in category "${category}"`);
        return "";
    }
    
    return window.imageLinks[category][imageName];
};

// =====================================================================
// DEBUG FUNCTION - List all available images
// =====================================================================
window.debugImageLinks = function() {
    console.log("%c📸 IMAGE LINKS REPOSITORY", "color:#ff6600; font-size:15px; font-weight:bold;");
    
    for (const [category, images] of Object.entries(window.imageLinks)) {
        console.log(`\n📁 ${category.toUpperCase()}`);
        for (const [name, url] of Object.entries(images)) {
            console.log(`   ✓ ${name}: ${url}`);
        }
    }
};
