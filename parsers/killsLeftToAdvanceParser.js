// killsLeftToAdvanceParser.js - Parser for KillsLeftToAdvance (KLA) data
// Parses all 10 farming categories (KLA_0 through KLA_9) from Savedata.json
// Each category contains progression/evolution data for the respective farming category

window.parseKillsLeftToAdvanceData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    // Array of KLA categories to parse (KLA_0 through KLA_9)
    const klaCategories = ["KLA_0", "KLA_1", "KLA_2", "KLA_3", "KLA_4", "KLA_5", "KLA_6", "KLA_7", "KLA_8", "KLA_9"];

    let successCount = 0;

    for (let i = 0; i < klaCategories.length; i++) {
        const klaKey = klaCategories[i];

        try {
            let klaData = state.playerData[klaKey];

            // Handle if data is stored as JSON string
            if (typeof klaData === "string") {
                try {
                    klaData = JSON.parse(klaData);
                } catch (e) {
                    console.warn(`⚠️ Failed to parse ${klaKey} as JSON string:`, e.message);
                    state.playerDatabase.KillsLeftToAdvance[i] = [];
                    continue;
                }
            }

            // Validate that klaData is an array
            if (Array.isArray(klaData)) {
                state.playerDatabase.KillsLeftToAdvance[i] = klaData;
                successCount++;
            } else {
                console.warn(`⚠️ ${klaKey} is not an array, skipping`);
                state.playerDatabase.KillsLeftToAdvance[i] = [];
            }
        } catch (error) {
            console.error(`❌ Error parsing ${klaKey}:`, error);
            state.playerDatabase.KillsLeftToAdvance[i] = [];
        }
    }

    if (successCount > 0) {
        console.log(`✅ parseKillsLeftToAdvanceData completed - Parsed ${successCount}/10 categories`);
        return true;
    } else {
        console.warn(`⚠️ parseKillsLeftToAdvanceData found no KLA data to parse`);
        return false;
    }
};

// Helper function to get a specific character's data
window.getKLACharacter = function(characterIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid KLA character index: ${characterIndex}. Must be 0-9`);
        return null;
    }
    
    return state.playerDatabase.KillsLeftToAdvance[characterIndex] || [];
};

// Helper function to get length of a specific character's data
window.getKLACharacterLength = function(characterIndex, state = window.farmingState) {
    const characterData = window.getKLACharacter(characterIndex, state);
    return characterData ? characterData.length : 0;
};

// Helper function to debug/display all KLA data
window.debugKillsLeftToAdvance = function(state = window.farmingState) {
    console.log("%c🔍 KILLS LEFT TO ADVANCE (KLA) DATA DUMP", "color:#ff9900; font-size:15px; font-weight:bold;");
    
    for (let i = 0; i < 10; i++) {
        const characterData = state.playerDatabase.KillsLeftToAdvance[i];
        console.log(`📊 character_${i} (KLA_${i}): ${Array.isArray(characterData) ? characterData.length : 0} entries`);
    }
    
    console.dir(state.playerDatabase.KillsLeftToAdvance, { depth: null });
};
