const ALL_EXPANSIONS_OPTION = `<option value="all">(All)</option>`;

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
    const dataTribe = {
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
                <a href="card-data.html?card=${c["id"]}" target="_blank">
                    <img class="card-showcase" src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${c["id"]}.png" alt="${c["name"]}"
                    data-flags="${0b111111}"
                    data-name="${c["name"]}"
                    data-class="${c["cardClass"]}"
                    data-cost="${c["cost"]}"
                    data-rarity="${dataRarity[c["rarity"]]}"
                    data-type="${dataType[c["type"]]}"
                    data-race="${dataTribe[c["tribe"]]}"
                    />
                </a>`);
            
            list.append(`
                <a href="card-data.html?card=${c["id"]}" target="_blank">
                    <div class="card-token"
                    data-flags="${0b111111}"
                    data-name="${c["name"]}"
                    data-class="${c["cardClass"]}"
                    data-cost="${c["cost"]}"
                    data-rarity="${dataRarity[c["rarity"]]}"
                    data-type="${dataType[c["type"]]}"
                    data-race="${dataTribe[c["tribe"]]}"
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

let filterNames = {
    name: 0,
    cardClass: 1,
    cost: 2,
    rarity: 3,
    type: 4,
    tribe: 5
}
let filters = {
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
    tribe: {
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

function filterByRarity (obj, val) {
    filterCardsByAttribute (obj, "rarity", val);
}

function filterByType (obj, val) {
    filterCardsByAttribute (obj, "type", val);
}

function filterByTribe (obj, val) {
    filterCardsByAttribute (obj, "tribe", val);
}

/**
 * Updates the flag on all the cards according to the filter given, and then displays the cards that have all flags.
 * @param {*} trigger The DOM object that called this method.
 * @param {*} filterName The name of the filter to use.
 * @param {*} value The value to filter.
 */
function filterCardsByAttribute (trigger, filterName, value) {
    let jTrigger = $(trigger);

    filters[filterName][value] = !filters[filterName][value];

    if (jTrigger.hasClass("chosen")) jTrigger.removeClass("chosen");
    else jTrigger.addClass("chosen");

    for (let c of $(".card-container-list > a")) __filterCard(c);
    for (let c of $(".card-container-gallery > a")) __filterCard(c);
    
    function __filterCard (card) {
        let jCard = $(card);
        let jChild = $(jCard.children()[0]);
        let cardValue = jChild.data(filterName);
        let cardFlags = jChild.attr("data-flags"); // MEGA-WARNING: Retrieving this with jChild.data("flags") will not work properly.

        if (filters.isUnused(filterName) || filters[filterName][cardValue]) {
            cardFlags |= 1 << filterNames[filterName];
            jChild.attr("data-flags", cardFlags);
        }
        else {
            cardFlags &= ~(1 << filterNames[filterName])
            jChild.attr("data-flags", cardFlags);
        }

        if (cardFlags == 0b111111) {
            jCard.removeClass("hidden");
        }
        else {
            jCard.addClass("hidden");
        }
    }
}

/*function filterRarity (rarity, obj) {
    filterCardsByAttribute("rarity", {filter: rarityFilter}, rarity, obj);
}

function filterCardsByAttribute (filterName, filterObj, value, trigger) {
    let jTrigger = $(trigger);

    filter ^= 1 << value;
    if (jTrigger.hasClass("chosen")) jTrigger.removeClass("chosen");
    else jTrigger.addClass("chosen");

    for (let c of $(".card-container-list > a")) __filterCard(c);
    for (let c of $(".card-container-gallery > a")) __filterCard(c);
    
    function __filterCard (c) {
        let card = $(c);
        let cardValue = $(card.children()[0]).data(filterName);
        if (!filter || (filter & (1 << cardValue))) {
            card.removeClass("hidden");
        }
        else {
            card.addClass("hidden");
        }
    }
}*/

/*let classFilter = 0b00000000000; // this is clearly flexing
const classIds = {
    DEMONHUNTER: 0x1,
    DRUID: 0x2,
    HUNTER: 0x4,
    MAGE: 0x8,
    PALADIN: 0x10,
    PRIEST: 0x20,
    ROGUE: 0x40,
    SHAMAN: 0x80,
    WARLOCK: 0x100,
    WARRIOR: 0x200,
    NEUTRAL: 0x400,
}

function filterClass (classIndex) {
    classFilter ^= 1 << classIndex;

    let classButtons = $("#class-buttons > a > img");

    for (let i = 0; i < Object.keys(classIds).length; i++) {
        if ((classFilter & (1 << i)) != 0) {
            $(classButtons[i]).attr("data-toggled", "true");
        }
        else {
            $(classButtons[i]).attr("data-toggled", "false");
        }
    }

    for (let c of $(".card-container-list > a")) {
        __filterCard(c);
    }

    for (let c of $(".card-container-gallery > a")) {
        __filterCard(c);
    }

    function __filterCard (c) {
        let card = $(c);
        let id = $(card.children()[0]).data("class");
        if (!classFilter || (classFilter & classIds[id])) {
            card.removeClass("hidden");
        }
        else {
            card.addClass("hidden");
        }
    }
}

let manaFilter = 0b00000000000;

function filterMana (mana) {
    manaFilter ^= 1 << mana;

    let costButtons = $("#cost-buttons > a > div");

    for (let i = 0; i < 11; i++) {
        if ((manaFilter & (1 << i)) != 0) {
            $(costButtons[i]).attr("data-toggled", "true");
        }
        else {
            $(costButtons[i]).attr("data-toggled", "false");
        }
    }

    for (let c of $(".card-container-list > a")) {
        __filterCard(c);
    }

    for (let c of $(".card-container-gallery > a")) {
        __filterCard(c);
    }
    function __filterCard (c) {
        let card = $(c);
        let cost = $(card.children()[0]).data("cost");
        if (cost > 10) cost = 10; // cards with cost higher than 10 are grouped into the "10+" filter.
        if (!manaFilter || (manaFilter & (1 << cost))) {
            card.removeClass("hidden");
        }
        else {
            card.addClass("hidden");
        }
    }
}

let rarityFilter = 0b0000;

function filterRarity (rarity, obj) {
    let chosenA = $(obj);

    rarityFilter ^= 1 << rarity;

    if (chosenA.hasClass("chosen")) {
        chosenA.removeClass("chosen");
    }
    else {
        chosenA.addClass("chosen");
    }

    for (let c of $(".card-container-list > a")) {
        __filterCard(c);
    }

    for (let c of $(".card-container-gallery > a")) {
        __filterCard(c);
    }
    function __filterCard (c) {
        let card = $(c);
        let rarity = $(card.children()[0]).data("rarity");
        if (!rarityFilter || (rarityFilter & (1 << rarity))) {
            card.removeClass("hidden");
        }
        else {
            card.addClass("hidden");
        }
    }
}

function filterRarity (rarity, obj) {
    filterCardsByAttribute("rarity", {filter: rarityFilter}, rarity, obj);
}

function filterCardsByAttribute (filterName, filterObj, value, trigger) {
    let jTrigger = $(trigger);

    filter ^= 1 << value;
    if (jTrigger.hasClass("chosen")) jTrigger.removeClass("chosen");
    else jTrigger.addClass("chosen");

    for (let c of $(".card-container-list > a")) __filterCard(c);
    for (let c of $(".card-container-gallery > a")) __filterCard(c);
    
    function __filterCard (c) {
        let card = $(c);
        let cardValue = $(card.children()[0]).data(filterName);
        if (!filter || (filter & (1 << cardValue))) {
            card.removeClass("hidden");
        }
        else {
            card.addClass("hidden");
        }
    }
}*/

function _buildMenuFromExp (expansions) {
    let expMenu = $("#exp-menu");

    expMenu.append(ALL_EXPANSIONS_OPTION);
    for (let e in expansions) {
        expMenu.append(`<option value="${e}">${expansions[e]["name"]}</option>`);
    }
}