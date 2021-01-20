const ALL_EXPANSIONS_OPTION = `<option value="all">(All)</option>`;

let collectibleCards;
let expansions;

function writeCollectibleCards () {
    $.ajax({
        dataType: "json",
        url: URL_CARD_COLLECTIBLE,
        success: res => { collectibleCards = res }
    })
}

function buildExpMenu () {
    $.ajax({
        dataType: "json",
        url: URL_EXPANSIONS,
        success: res => {
            expansions = res;
            _buildMenuFromExp(res)
        }
    })
}

function setDisplay (display) {
    if (display === "list") {
        $("#set-display-list").addClass("chosen");
        $("#set-display-gallery").removeClass("chosen");
        $("#card-list").removeClass("hidden");
        $("#card-gallery").addClass("hidden");
    }
    else if (display === "gallery") {
        $("#set-display-list").removeClass("chosen");
        $("#set-display-gallery").addClass("chosen");
        $("#card-list").addClass("hidden");
        $("#card-gallery").removeClass("hidden");
    }
}

function displayExpansion () {
    let chosenExp = $("#exp-menu :selected").val();
    let gallery = $("#card-gallery");
    let list = $("#card-list");

    gallery.empty();
    list.empty();

    for (let c of collectibleCards) {
        if (chosenExp === "all" || c["set"] === chosenExp) {
            gallery.append(`
                <img class="card-showcase" src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${c["id"]}.png" alt="${c["name"]}"
                data-name="${c["name"]}"
                data-cost="${c["cost"]}"
                data-class="${c["cardClass"]}"
                />`);
            
            list.append(`
                <div class="card-token" data-name="${c["name"]}" data-cost="${c["cost"]}" data-class="${c["cardClass"]}">
                    <div class="card-cost rarity-${c["rarity"].toLowerCase()}">${c["cost"]}</div>
                    <div class="card-name">
                        <img class="tile" src="https://art.hearthstonejson.com/v1/tiles/${c["id"]}.png" />
                        <span class="tile-fade-out"></span>
                        <span class="caption">${c["name"]}</span>
                    </div>
                    <div class="card-stats">
                        ${c["type"] === "MINION" ? `<div class="card-atk">${c["attack"]}</div>` : `<div class="card-void"></div>`}
                        ${c["type"] === "MINION" ? `<div class="card-hp">${c["health"]}</div>` : `<div class="card-void"></div>`}
                    </div>
                    <span class="card-exp">${_getExpSymbol(c["set"])}</span>
                    <div class="card-class">
                        <img class="class-button class-icon" src="img/class-${c["cardClass"]}.png" />
                        <span class="class-label">${_getClassName(c["cardClass"])}</span>
                    </div>
                    <div class="card-desc">
                        <span title='${_stripTags(c["text"])}'>${_normalizeCardText(c["text"])}</span>
                    </div>
                </div>
            `);
        }
    }
    filterCardsByName();
}

function filterCardsByName () {
    let query = $("#search-query").val();
    
    $(".card-showcase").each((_, obj) => {
        let c = $(obj);
        let cardName = c.data("name").toLowerCase();
        
        if (cardName.includes(query)) {
            c.removeClass("hidden");
        }
        else {
            c.addClass("hidden");
        }
    });

    $(".card-token").each((_, obj) => {
        let c = $(obj);
        let cardName = c.data("name").toLowerCase();

        if (cardName.includes(query)) {
            c.removeClass("hidden");
        }
        else {
            c.addClass("hidden");
        }
    });
}

// TODO: Fix this
function _stripTags (text) {
    if (typeof text === "string") {
        return _normalizeCardText(text).replace(/<[^>]*>/, "");
    }
    else {
        return text;
    }
}

function _normalizeCardText (text) {
    if (typeof text === "string") {
        return text.replace("$", "").replace("#", "").replace(`'`, `"`);
    }
    else {
        return text;
    }
}

function _buildMenuFromExp (expansions) {
    let expMenu = $("#exp-menu");

    expMenu.append(ALL_EXPANSIONS_OPTION);
    for (let e in expansions) {
        expMenu.append(`<option value="${e}">${expansions[e]["name"]}</option>`);
    }
}

function _getClassName (className) {
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
}

function _getExpSymbol (expName) {
    return expansions[expName]["symbol"];
}