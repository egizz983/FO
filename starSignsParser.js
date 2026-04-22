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

    // Get the ordered list of star sign names (position is based on key order)
    const starSignOrder = Object.keys(starSg);

    //  returns 1-based position of a star sign (or a very high number if not found)
    const getPosition = (name) => {
        const index = starSignOrder.indexOf(name);
        return index === -1 ? 9999 : index + 1;
    };

    const infiniteStars = state.shinyPets.infiniteStars || 0;

    // Activate only if player has enough infinite stars to reach this position
    state.starSigns.seraphCosmos  = (getPosition("Seraph_Cosmos")  <= infiniteStars) ? 1 : 0;
    state.starSigns.ogSignalais   = (getPosition("O.G._Signalais") <= infiniteStars) ? 1 : 0;
    state.starSigns.cropiovoMinor = (getPosition("Cropiovo_Minor") <= infiniteStars) ? 1 : 0;

    console.log(`✅ parseStarSignsData completed (Seraph: ${state.starSigns.seraphCosmos}, OG Signalais: ${state.starSigns.ogSignalais}, Cropiovo: ${state.starSigns.cropiovoMinor})`);
    return true;
};