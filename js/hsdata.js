let collectibleCards;
let expansions;

/*let classIds = [
    "DEMONHUNTER",
    "DRUID",
    "HUNTER",
    "MAGE",
    "PALADIN",
    "PRIEST",
    "ROGUE",
    "SHAMAN",
    "WARLOCK",
    "WARRIOR",
    "NEUTRAL",
]*/

function loadData () {
    _writeCollectibleCards();
    _writeExp();
}

function isDataLoaded () {
    return typeof collectibleCards !== "undefined";
}

function getCardById (id) {
    return collectibleCards.find(e => e.id === id);
}

function getClassName (className) {
    if (className === "DEMONHUNTER") return "Demon hunter";
    if (className === "DRUID")       return "Druid";
    if (className === "HUNTER")      return "Hunter";
    if (className === "MAGE")        return "Mage";
    if (className === "PALADIN")     return "Paladin";
    if (className === "PRIEST")      return "Priest";
    if (className === "ROGUE")       return "Rogue";
    if (className === "SHAMAN")      return "Shaman";
    if (className === "WARLOCK")     return "Warlock";
    if (className === "WARRIOR")     return "Warrior";
    if (className === "NEUTRAL")     return "Neutral";
    return className;
}

function getTypeName (type) {
    if (type === "MINION") return "Minion";
    if (type === "SPELL")  return "Spell";
    if (type === "WEAPON") return "Weapon";
    if (type === "HERO")   return "Hero";
    return type;
}

function getRaceName (race) {
    if (race === "ALL")        return "All";
    if (race === "BEAST")      return "Beast";
    if (race === "DEMON")      return "Demon";
    if (race === "DRAGON")     return "Dragon";
    if (race === "ELEMENTAL")  return "Elemental";
    if (race === "MECHANICAL") return "Mech";
    if (race === "MURLOC")     return "Murloc";
    if (race === "PIRATE")     return "Pirate";
    if (race === "TOTEM")      return "Totem";
    return race;
}

function getRarityName (rarity) {
    if (rarity === "FREE")      return "Basic";
    if (rarity === "COMMON")    return "Common";
    if (rarity === "RARE")      return "Rare";
    if (rarity === "EPIC")      return "Epic";
    if (rarity === "LEGENDARY") return "Legendary";
    return rarity;
}

function getExpSymbol (expName) {
    return expansions[expName]["symbol"];
}

// TODO: Fix this
function stripTags (text) {
    if (typeof text === "string") {
        return normalizeCardText(text).replace(/<[^>]*>/, "");
    }
    else {
        return text;
    }
}

function normalizeCardText (text) {
    if (typeof text === "string") {
        return text.replace("$", "").replace("#", "").replace("[x]", "").replace(`'`, `"`);
    }
    else {
        return text;
    }
}

function _writeCollectibleCards () {
    $.ajax({
        dataType: "json",
        url: URL_CARD_COLLECTIBLE,
        success: res => { collectibleCards = res }
    })
}

function _writeExp () {
    $.ajax({
        dataType: "json",
        url: URL_EXPANSIONS,
        success: res => { expansions = res; }
    })
}

function $_GET (param) {
    let res = null;

    location.search.substr(1).split("&").forEach(p => {
        let paramData = p.split("=");
        if (paramData[0] === param) {
            res = decodeURIComponent(paramData[1]);
        }
    })
    
    return res;
}