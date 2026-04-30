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
    },
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
