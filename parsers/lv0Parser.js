// lv0Parser.js - Parser for Level 0 (Lv0) player data
// Parses all 10 character levels (Lv0_0 through Lv0_9) from Savedata.json
// Each array contains player level-related variables and farming level data for each character

window.parseLv0Data = function(data, state = window.farmingState) {
    state.playerData = data || {};

    // Array of Lv0 character indices to parse (Lv0_0 through Lv0_9)
    const lv0Categories = ["Lv0_0", "Lv0_1", "Lv0_2", "Lv0_3", "Lv0_4", "Lv0_5", "Lv0_6", "Lv0_7", "Lv0_8", "Lv0_9"];

    let successCount = 0;

    for (let i = 0; i < lv0Categories.length; i++) {
        const lv0Key = lv0Categories[i];

        try {
            let lv0Data = state.playerData[lv0Key];

            // Handle if data is stored as JSON string
            if (typeof lv0Data === "string") {
                try {
                    lv0Data = JSON.parse(lv0Data);
                } catch (e) {
                    console.warn(`⚠️ Failed to parse ${lv0Key} as JSON string:`, e.message);
                    state.playerDatabase.Lv0[i] = [];
                    continue;
                }
            }

            // Validate that lv0Data is an array
            if (Array.isArray(lv0Data)) {
                state.playerDatabase.Lv0[i] = lv0Data;
                successCount++;
            } else {
                console.warn(`⚠️ ${lv0Key} is not an array, skipping`);
                state.playerDatabase.Lv0[i] = [];
            }
        } catch (error) {
            console.error(`❌ Error parsing ${lv0Key}:`, error);
            state.playerDatabase.Lv0[i] = [];
        }
    }

    if (successCount > 0) {
        console.log(`✅ parseLv0Data completed - Parsed ${successCount}/10 character level arrays`);
        return true;
    } else {
        console.warn(`⚠️ parseLv0Data found no Lv0 data to parse`);
        return false;
    }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Helper function to get a specific character's level data
window.getCharacterLv0 = function(characterIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid character index: ${characterIndex}. Must be 0-9`);
        return null;
    }
    
    return state.playerDatabase.Lv0[characterIndex] || [];
};

// Helper function to get a specific value from a character's level data
window.getCharacterLv0Value = function(characterIndex, valueIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid character index: ${characterIndex}. Must be 0-9`);
        return null;
    }
    
    const characterData = state.playerDatabase.Lv0[characterIndex];
    
    if (!characterData || !Array.isArray(characterData)) {
        return null;
    }
    
    return characterData[valueIndex] !== undefined ? characterData[valueIndex] : null;
};

// Helper function to get the count of entries for a specific character
window.getCharacterLv0Length = function(characterIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid character index: ${characterIndex}. Must be 0-9`);
        return 0;
    }
    
    const characterData = state.playerDatabase.Lv0[characterIndex];
    return characterData ? characterData.length : 0;
};

// Helper function to debug/display all Lv0 data
window.debugLv0 = function(state = window.farmingState) {
    console.log("%c🔍 LV0 DATA DUMP", "color:#ff9900; font-size:15px; font-weight:bold;");
    
    for (let i = 0; i < 10; i++) {
        const characterData = state.playerDatabase.Lv0[i];
        const length = characterData ? characterData.length : 0;
        console.log(`📊 character_${i}: ${length} values`);
    }
    
    console.dir(state.playerDatabase.Lv0, { depth: null });
};
