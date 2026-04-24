// ======================
// ALCHEMY BUBBLES + VIALS 
// ======================

window.parseCauldronData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let cauldronInfo = state.playerData.CauldronInfo;

    if (typeof cauldronInfo === "string") {
        try { 
            cauldronInfo = JSON.parse(cauldronInfo); 
        } catch (e) { 
            console.warn("⚠️ Failed to parse CauldronInfo as JSON");
            return false; 
        }
    }

    if (!Array.isArray(cauldronInfo) || cauldronInfo.length < 5) {
        console.warn("⚠️ CauldronInfo array is missing or too short");
        return false;
    }

    // === Alchemy Bubbles ===
    // Crop Chapter (CauldronInfo[0]["29"]) - store raw level
    const powerCauldron = cauldronInfo[0];
    if (powerCauldron && typeof powerCauldron === "object") {
        const level = Number(powerCauldron["29"]) || 0;
        state.alchemy.cropChapterBubblebonus = level;
    }

    // Croppius Mapper (CauldronInfo[3]["25"]) - store raw level
    const kazamCauldron = cauldronInfo[3];
    if (kazamCauldron && typeof kazamCauldron === "object") {
        const level = Number(kazamCauldron["25"]) || 0;
        state.alchemy.croppiusMapperBubblebonus = level;
    }

    // === Vials (CauldronInfo[4]) ===
    const vials = cauldronInfo[4];
    if (vials && typeof vials === "object") {
        // Ricecakorade Vial +2% Farming Speed per level
        state.alchemy.ricecakoradeBonus = (Number(vials["64"]) || 0) ;

        // Flavorgil Vial +7% Crop Evolution chance per level
        state.alchemy.flavorgilBonus = (Number(vials["66"]) || 0) ;

        // Count vials at level 13 or higher
        state.alchemy.countLevel13 = Object.keys(vials)
            .filter(key => key !== "length" && Number(vials[key]) >= 13)
            .length;
    }

    console.log(`✅ parseCauldronData completed (Alchemy Bubbles + Vials loaded into state.alchemy)`);
    return true;
};