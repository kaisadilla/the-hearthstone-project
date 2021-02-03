const ALL_EXPANSIONS_OPTION = `<option value="all">(All)</option>`;
const CARD_FLAG_DISPLAY = 0b111111;

function buildExpMenu () {
    // check that 'expansions' contains some key that we always expect, such as "EXPERT1".
    if (isDataLoaded(expansions) && expansions != undefined && expansions["EXPERT1"] != undefined) {
        _buildMenuFromExp(expansions);
    }
    else{
        setTimeout(buildExpMenu, 100);
    }
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

    // consts used to assign data to card objects for filters.
    const dataClass = {
        DEMONHUNTER: 0,
        DRUID: 1,
        HUNTER: 2,
        MAGE: 3,
        PALADIN: 4,
        PRIEST: 5,
        ROGUE: 6,
        SHAMAN: 7,
        WARLOCK: 8,
        WARRIOR: 9,
        NEUTRAL: 10,
    }
    const dataRarity = {
        FREE: 0,
        COMMON: 0,
        RARE: 1,
        EPIC: 2,
        LEGENDARY: 3,
        undefined: 0,
    }
    const dataType = {
        MINION: 0,
        SPELL: 1,
        WEAPON: 2,
        HERO: 3,
        undefined: 0
    }
    const dataRace = {
        undefined: 0,
        ALL: 1,
        BEAST: 2,
        DEMON: 3,
        DRAGON: 4,
        ELEMENTAL: 5,
        MECHANICAL: 6,
        MURLOC: 7,
        PIRATE: 8,
        TOTEM: 9,
    }

    for (let c of collectibleCards) {

        if ((chosenExp === "all" || c["set"] === chosenExp) && c["text"] !== undefined) {
            gallery.append(`
                <a class="gallery-card-item" href="card-data.html?card=${c["id"]}" target="_blank" data-id="${c["id"]}">
                    <img class="card-showcase" src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${c["id"]}.png" alt="${c["name"]}"
                    data-flags="${CARD_FLAG_DISPLAY}"
                    data-name="${c["name"]}"
                    data-cardclass="${dataClass[c["cardClass"]]}"
                    data-cost="${c["cost"] > 10 ? 10 : c["cost"]}"
                    data-rarity="${dataRarity[c["rarity"]]}"
                    data-type="${dataType[c["type"]]}"
                    data-race="${dataRace[c["race"]]}"
                    />
                </a>`);
            
            list.append(`
                <a class="list-card-item" href="card-data.html?card=${c["id"]}" target="_blank">
                    <div class="card-token"
                    data-flags="${CARD_FLAG_DISPLAY}"
                    data-name="${c["name"]}"
                    data-cardclass="${dataClass[c["cardClass"]]}"
                    data-cost="${c["cost"] > 10 ? 10 : c["cost"]}"
                    data-rarity="${dataRarity[c["rarity"]]}"
                    data-type="${dataType[c["type"]]}"
                    data-race="${dataRace[c["race"]]}"
                    >
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
                        <span class="card-exp">${getExpSymbol(c["set"])}</span>
                        <div class="card-class">
                            <img class="class-button class-icon" src="img/class-${c["cardClass"]}.png" />
                            <span class="class-label">${getClassName(c["cardClass"])}</span>
                        </div>
                        <div class="card-desc">
                            <span title='${stripTags(c["text"])}'>${normalizeCardText(c["text"])}</span>
                        </div>
                    </div>
                </a>
            `);
        }
    }
    _applyFilters();
}

let filterNames = {
    name: 0,
    cardClass: 1,
    cost: 2,
    rarity: 3,
    type: 4,
    race: 5
}
let filters = {
    cardClass: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
    },
    cost: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
    },
    rarity: {
        0: false,
        1: false,
        2: false,
        3: false
    },
    type: {
        0: false,
        1: false,
        2: false,
        3: false
    },
    race: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
    },

    // returns true if all the options in this filter are false.
    isUnused (filter) {
        for (let key in this[filter]) {
            if (this[filter][key] === true) return false;
        }
        return true;
    }
}

function filterByName () {
    let query = $("#search-query").val();

    for (let c of $(".card-container-list > a")) __filterByName(c);
    for (let c of $(".card-container-gallery > a")) __filterByName(c);

    function __filterByName (card) {
        let jCard = $(card);
        let jChild = $(jCard.children()[0]);
        let cardName = jChild.data("name"); // lowercase because HTML attributes are case-insensitive.
        let cardFlags = jChild.attr("data-flags"); // MEGA-WARNING: Retrieving this with jChild.data("flags") will not work properly.

        if (cardName.toLowerCase().includes(query)) {
            cardFlags |= 1 << filterNames["name"];
            jChild.attr("data-flags", cardFlags);
        }
        else {
            cardFlags &= ~(1 << filterNames["name"])
            jChild.attr("data-flags", cardFlags);
        }

        if (cardFlags == CARD_FLAG_DISPLAY) {
            jCard.removeClass("hidden");
        }
        else {
            jCard.addClass("hidden");
        }
    }
}

function filterByClass (obj, val) {
    _filterCardsByAttribute(obj, "cardClass", val);
}

function filterByCost (obj, val) {
    _filterCardsByAttribute(obj, "cost", val);
}

function filterByRarity (obj, val) {
    _filterCardsByAttribute(obj, "rarity", val);
}

function filterByType (obj, val) {
    _filterCardsByAttribute(obj, "type", val);
}

function filterByRace (obj, val) {
    _filterCardsByAttribute(obj, "race", val);
}

/**
 * Applies all the filters as they are chosen.
 */
function _applyFilters () {
    filterByName();
    for (let key in filters) {
        for (let c of $(".card-container-list > a")) _filterCard(c, key);
        for (let c of $(".card-container-gallery > a")) _filterCard(c, key);
    }
}

/**
 * Updates the flag on all the cards according to the filter given, and then displays the cards that have all flags.
 * @param {*} trigger The DOM object that called this method.
 * @param {string} filterName The name of the filter to use.
 * @param {number} value The value to filter.
 */
function _filterCardsByAttribute (trigger, filterName, value) {
    let jTrigger = $(trigger);

    filters[filterName][value] = !filters[filterName][value];

    if (jTrigger.hasClass("chosen")) jTrigger.removeClass("chosen");
    else jTrigger.addClass("chosen");

    for (let c of $(".card-container-list > a")) _filterCard(c, filterName);
    for (let c of $(".card-container-gallery > a")) _filterCard(c, filterName);
}
    
function _filterCard (card, filterName) {
    let jCard = $(card);
    let jChild = $(jCard.children()[0]);
    let cardValue = jChild.data(filterName.toLowerCase()); // lowercase because HTML attributes are case-insensitive.
    let cardFlags = jChild.attr("data-flags"); // MEGA-WARNING: Retrieving this with jChild.data("flags") will not work properly.

    if (filters.isUnused(filterName) || filters[filterName][cardValue]) {
        cardFlags |= 1 << filterNames[filterName];
        jChild.attr("data-flags", cardFlags);
    }
    else {
        cardFlags &= ~(1 << filterNames[filterName])
        jChild.attr("data-flags", cardFlags);
    }

    if (cardFlags == CARD_FLAG_DISPLAY) {
        jCard.removeClass("hidden");
    }
    else {
        jCard.addClass("hidden");
    }
}

function _buildMenuFromExp (expansions) {
    let expMenu = $("#exp-menu");

    expMenu.append(ALL_EXPANSIONS_OPTION);
    for (let e in expansions) {
        expMenu.append(`<option value="${e}">${expansions[e]["name"]}</option>`);
    }
}