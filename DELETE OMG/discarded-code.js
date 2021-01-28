
    
    /*$(".card-showcase").each((_, obj) => {
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
    });*/

    

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
