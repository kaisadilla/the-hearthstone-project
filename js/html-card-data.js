function fillCardData () {
    if (isDataLoaded(collectibleCards)){
        _fillCardData();
    }
    else{
        setTimeout(fillCardData, 100);
    }
}

function _fillCardData () {
    let cardId = $_GET("card");
    let card = getCardById(cardId);
    document.title = `${card["name"]} – the Hearthstone project`;

    $("#card-name").text(card["name"]);
    $("#card-image > img").attr("src", `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card["id"]}.png` );
    $("#card-class > .value > span").text(getClassName(card["cardClass"]));
    $("#card-class > .value > img").attr("src", `img/class-${card["cardClass"]}.png`);
    $("#card-cost > .value").text(card["cost"]);
    $("#card-type > .value").text(getTypeName(card["type"]));
    $("#card-race > .value").text(getRaceName(card["race"]));
    $("#card-text > span").html(normalizeCardText(card["text"]));
    $("#card-rarity > .value").text(getRarityName(card["rarity"]));
    $("#card-exp > .value").text(getExpSymbol(card["set"]));
    $("#card-artist > .value").text(card["artist"]);
    $("#card-flavor > span").text(card["flavor"]);

    if (card["type"] == "MINION") {
        $("#card-attack > .value").text(card["attack"]);
        $("#card-health > .value").text(card["health"]);
    }
    else if (card["type"] == "WEAPON") {
        $("#card-attack > .legend").text("Damage");
        $("#card-attack > .value").text(card["attack"]);
        $("#card-health > .legend").text("Durability");
        $("#card-health > .value").text(card["durability"]);
    }
    else if (card["type"] == "HERO") {
        $("#card-attack").addClass("hidden");
        $("#card-health > .legend").text("Armor");
        $("#card-health > .value").text(card["armor"]);
    }
    else {
        $("#card-attack").addClass("hidden");
        $("#card-health").addClass("hidden");
    }

    // attack / health
}
