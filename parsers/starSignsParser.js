// ======================
// STAR SIGNS (StarSg)
// ======================

window.parseStarSignsData = function(data, state = window.farmingState) {
    state.playerData = data || {};

    let starSgStr = state.playerData.StarSg;

    if (typeof starSgStr !== "string" || !starSgStr.trim()) {
        console.warn("⚠️ StarSg field is missing or empty");
        return false;
    }

    let starSg;
    try {
        starSg = JSON.parse(starSgStr);
    } catch (e) {
        console.warn("⚠️ Failed to parse StarSg as JSON");
        return false;
    }

    if (typeof starSg !== "object" || starSg === null) {
        console.warn("⚠️ StarSg is not a valid object");
        return false;
    }

    // Create star sign map based on unlocked star signs
    const unlockedStarSignNames = Object.keys(starSg);
    let tempstarmap = [];
    const starCustomlist = window.StarSigns;

    // Loop through all star signs in the custom list
    if (starCustomlist && Array.isArray(starCustomlist)) {
        for (let n = 0; n < starCustomlist.length; n++) {
            let starSignName = starCustomlist[n];
            
            // Extract name from array if it's an array, or use directly if it's a string
            if (Array.isArray(starSignName)) {
                starSignName = starSignName[0]; // First element is the name
            }

            // Check if this star sign is unlocked in StarSg
            if (starSignName && unlockedStarSignNames.includes(starSignName)) {
                tempstarmap.push(n); // Push the index
            }
        }
    }

    // Helper function to find star sign index
    const findStarSignIndex = (targetName) => {
        for (let i = 0; i < starCustomlist.length; i++) {
            let name = starCustomlist[i];
            if (Array.isArray(name)) {
                name = name[0];
            }
            if (name === targetName) {
                return i;
            }
        }
        return -1;
    };

    // Assign state values for unlocked star signs
    const seraphCosmosIndex = findStarSignIndex("Seraph_Cosmos");
    state.starSigns.seraphCosmos = (seraphCosmosIndex !== -1 && tempstarmap.includes(seraphCosmosIndex)) ? 1 : 0;

    const ogSignalaisIndex = findStarSignIndex("O.G._Signalais");
    state.starSigns.ogSignalais = (ogSignalaisIndex !== -1 && tempstarmap.includes(ogSignalaisIndex)) ? 1 : 0;

    const cropiovoMinorIndex = findStarSignIndex("Cropiovo_Minor");
    state.starSigns.cropiovoMinor = (cropiovoMinorIndex !== -1 && tempstarmap.includes(cropiovoMinorIndex)) ? 1 : 0;


    const pvtStarSigns = [];
    let successCount = 0;

    for (let i = 0; i < 10; i++) {
        const key = `PVtStarSign_${i}`;
        let pvtData = state.playerData[key];

        if (!pvtData) {
            pvtStarSigns[i] = [];
            successCount++;
            continue;
        }

        // Convert to string if needed
        const pvtStr = String(pvtData).trim();

        // Parse comma-separated format: "58,61,46," → [58, 61, 46]
        const pvtArray = pvtStr
            .split(',')
            .map(val => {
                const trimmed = val.trim();
                // Replace underscore with 0, otherwise parse as number
                return trimmed === '_' ? 0 : parseInt(trimmed, 10) || 0;
            })
            .filter(val => val !== null && val !== undefined); // Remove any invalid values

        pvtStarSigns[i] = pvtArray;
        successCount++;
    }

    state.PersonalValueMap.starSigns = pvtStarSigns;

    console.log(`✅ parseStarSignsData completed (Seraph: ${state.starSigns.seraphCosmos}, OG Signalais: ${state.starSigns.ogSignalais}, Cropiovo: ${state.starSigns.cropiovoMinor}, PVtStarSign: ${successCount}/10 characters)`);
    return true;
};