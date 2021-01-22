let collectibleCards;
let expansions;

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