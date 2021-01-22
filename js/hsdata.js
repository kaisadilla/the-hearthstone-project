let collectibleCards;
let expansions;

function loadData () {
    _writeCollectibleCards();
    _writeExp();
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