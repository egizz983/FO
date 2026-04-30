// skillLevelsParser.js - Parser for Skill Levels data
// Parses all 10 character skill levels (SL_0 through SL_9) and previous levels (SLpre_0 through SLpre_9)
// Compares current vs previous levels and stores the maximum for each character
// Also maintains backward compatibility by computing the highest level across all characters

window.parseSkillLevelsData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    // Array of character indices to parse
    const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    let successCount = 0;
    const highestAcrossCharacters = {}; // For backward compatibility

    for (let i = 0; i < characters.length; i++) {
        const charIndex = characters[i];
        const slKey = `SL_${charIndex}`;
        const slpreKey = `SLpre_${charIndex}`;

        try {
            let slData = state.playerData[slKey];
            let slpreData = state.playerData[slpreKey];

            // Parse JSON strings if needed
            if (typeof slData === "string") {
                try {
                    slData = JSON.parse(slData);
                } catch (e) {
                    console.warn(`⚠️ Failed to parse ${slKey} as JSON string:`, e.message);
                    state.playerDatabase.TalentPoints[i] = {};
                    continue;
                }
            }

            if (typeof slpreData === "string") {
                try {
                    slpreData = JSON.parse(slpreData);
                } catch (e) {
                    console.warn(`⚠️ Failed to parse ${slpreKey} as JSON string:`, e.message);
                    slpreData = {};
                }
            }

            // Ensure both are objects
            slData = slData || {};
            slpreData = slpreData || {};

            // Merge both objects and take maximum value for each key
            const mergedLevels = {};
            
            // Get all unique keys from both objects
            const allKeys = new Set([...Object.keys(slData), ...Object.keys(slpreData)]);
            
            for (const key of allKeys) {
                const slValue = parseInt(slData[key]) || 0;
                const slpreValue = parseInt(slpreData[key]) || 0;
                // Store the maximum value
                const maxValue = Math.max(slValue, slpreValue);
                mergedLevels[key] = maxValue;
                
                // Track highest value across all characters for backward compatibility
                if (maxValue > 0) {
                    if (highestAcrossCharacters[key] === undefined) {
                        highestAcrossCharacters[key] = maxValue;
                    } else {
                        highestAcrossCharacters[key] = Math.max(highestAcrossCharacters[key], maxValue);
                    }
                }
            }

            state.playerDatabase.TalentPoints[i] = mergedLevels;
            successCount++;
            
        } catch (error) {
            console.error(`❌ Error parsing ${slKey} and ${slpreKey}:`, error);
            state.playerDatabase.TalentPoints[i] = {};
        }
    }

    // For backward compatibility: populate skillLevels with highest across all characters
    state.skillLevels = highestAcrossCharacters;

    // NOTE: UpdateTalentLevelsFromAllSources() is called from models.js recalculateAll()
    // after ALL parsers have completed, to ensure state is fully populated

    if (successCount > 0) {
        console.log(`✅ parseSkillLevelsData completed - Parsed ${successCount}/10 characters`);
        return true;
    } else {
        console.warn(`⚠️ parseSkillLevelsData found no skill level data to parse`);
        return false;
    }
};

// Helper function to get a specific character's skill levels
window.getCharacterSkillLevels = function(characterIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid character index: ${characterIndex}. Must be 0-9`);
        return null;
    }
    
    return state.playerDatabase.TalentPoints[characterIndex] || {};
};

// Helper function to get a specific skill level for a character
window.getCharacterSkillLevel = function(characterIndex, skillIndex, state = window.farmingState) {
    const characterLevels = window.getCharacterSkillLevels(characterIndex, state);
    if (!characterLevels) return 0;
    
    return characterLevels[skillIndex] || 0;
};

// Helper function to get the highest level among all characters for a specific skill
window.getHighestCharacterLevel = function(skillIndex, state = window.farmingState) {
    let maxLevel = 0;
    
    for (let i = 0; i < 10; i++) {
        const level = window.getCharacterSkillLevel(i, skillIndex, state);
        if (level > maxLevel) {
            maxLevel = level;
        }
    }
    
    return maxLevel;
};

// Helper function to debug/display all skill levels data
window.debugSkillLevels = function(state = window.farmingState) {
    console.log("%c🔍 SKILL LEVELS DATA DUMP", "color:#0066ff; font-size:15px; font-weight:bold;");
    
    for (let i = 0; i < 10; i++) {
        const characterLevels = state.playerDatabase.TalentPoints[i];
        const keyCount = characterLevels ? Object.keys(characterLevels).length : 0;
        console.log(`📊 character_${i}: ${keyCount} skill indices`);
    }
    
    console.dir(state.playerDatabase.TalentPoints, { depth: null });
};

// ==========================================
// CHARACTER CLASS PARSER
// ==========================================
// Parses all 10 character class arrays (CharacterClass_0 through CharacterClass_9)
// Character class IDs are stored as simple integer properties in savedata.json
// Structure: CharacterClass_0, CharacterClass_1, ... CharacterClass_9 (each contains a single numeric value)
// Stores results in state.playerDatabase.CharacterClass[] array

window.parseCharacterClassData = function(data, state = window.farmingState) {
    state.playerData = data || {};
    
    // Initialize the CharacterClass array if not already present
    if (!state.playerDatabase.CharacterClass) {
        state.playerDatabase.CharacterClass = [];
    }
    
    // Array of character indices to parse
    const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let successCount = 0;
    
    for (let i = 0; i < characters.length; i++) {
        const charIndex = characters[i];
        const classKey = `CharacterClass_${charIndex}`;
        
        try {
            const classValue = state.playerData[classKey];
            
            // Validate that the value exists and is a number
            if (classValue !== undefined && classValue !== null) {
                const classId = parseInt(classValue);
                
                if (!isNaN(classId)) {
                    state.playerDatabase.CharacterClass[i] = classId;
                    successCount++;
                } else {
                    console.warn(`⚠️ ${classKey} is not a valid number: ${classValue}`);
                    state.playerDatabase.CharacterClass[i] = 0;
                }
            } else {
                console.warn(`⚠️ ${classKey} not found in savedata`);
                state.playerDatabase.CharacterClass[i] = 0;
            }
        } catch (error) {
            console.error(`❌ Error parsing ${classKey}:`, error);
            state.playerDatabase.CharacterClass[i] = 0;
        }
    }
    
    if (successCount > 0) {
        console.log(`✅ parseCharacterClassData completed - Parsed ${successCount}/10 character classes`);
        return true;
    } else {
        console.warn(`⚠️ parseCharacterClassData found no character class data to parse`);
        return false;
    }
};

// Helper function to get a specific character's class
window.getCharacterClass = function(characterIndex, state = window.farmingState) {
    if (characterIndex < 0 || characterIndex > 9) {
        console.error(`❌ Invalid character index: ${characterIndex}. Must be 0-9`);
        return null;
    }
    
    return state.playerDatabase.CharacterClass ? state.playerDatabase.CharacterClass[characterIndex] || 0 : 0;
};

// Helper function to debug/display all character class data
window.debugCharacterClasses = function(state = window.farmingState) {
    console.log("%c📋 CHARACTER CLASS DATA DUMP", "color:#ff6600; font-size:15px; font-weight:bold;");
    
    for (let i = 0; i < 10; i++) {
        const classId = state.playerDatabase.CharacterClass ? state.playerDatabase.CharacterClass[i] : 0;
        console.log(`🎭 Character_${i}: Class ID ${classId}`);
    }
    
    console.dir(state.playerDatabase.CharacterClass, { depth: null });
};
