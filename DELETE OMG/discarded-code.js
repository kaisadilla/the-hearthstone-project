/*


<!-- discard

            <div class="card-token">
                <div class="card-cost">5</div>
                <div class="card-name">
                    <img class="tile" src="https://art.hearthstonejson.com/v1/tiles/AT_001.png" />
                    <span class="tile-fade-out"></span>
                    <span class="caption">Scavenger's Ingenuity</span>
                </div>
                <div class="card-stats">
                    <div class="card-atk">12</div>
                    <div class="card-hp">12</div>
                </div>
                <span class="card-exp">TGT</span>
                <div class="card-class">
                    <img class="class-button class-icon" src="img/class-mage.png" alt="mage" />
                    <span class="class-label">Mage</span>
                </div>
                <div class="card-desc">
                    <span>This is a very long description that will fill up all the space and will need to be cropped or else we riot I guess.</span>
                </div>
            </div>

        <div class="card-info-table">
            <div class="card-name">
                <img class="tile" src="https://art.hearthstonejson.com/v1/tiles/EX1_016.png" />
                <span class="tile-fade-out"></span>
                <span class="caption">Sylvanas Windrunner</span>
            </div>
        </div>

        
    <aside class="aside-tools">
        <span class="title" id="card-name">card-name</span>
        <span class="section">Card</span>
        <div class="card-showcase" id="card-image">
            <img class="tile" src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/EX1_016.png" />
        </div>
        <div class="legend-info-icon" id="card-class">
            <span class="legend">Class</span>
            <div class="value">
                <span>Mage</span>
                <img class="class-button" src="img/class-mage.png" alt="demon_hunter" />
            </div>
        </div>
        <span class="section">Information</span>
        <div class="legend-info" id="card-cost">
            <span class="legend">Cost</span>
            <span class="value">6</span>
        </div>
        <div class="legend-info" id="card-type">
            <span class="legend">Type</span>
            <span class="value">Minion</span>
        </div>
        <div class="legend-info" id="card-race">
            <span class="legend">Race</span>
            <span class="value">–</span>
        </div>
        <div class="legend-info" id="card-attack">
            <span class="legend">Attack</span>
            <span class="value">5</span>
        </div>
        <div class="legend-info" id="card-health">
            <span class="legend">Health</span>
            <span class="value">5</span>
        </div>
        <div class="info" id="card-text">
            <span><b>Deathrattle:</b> Gain control of a random enemy minion.</span>
        </div>
        <div class="legend-info" id="card-rarity">
            <span class="legend">Rarity</span>
            <span class="value">Common</span>
        </div>
        <div class="legend-info" id="card-exp">
            <span class="legend">Set</span>
            <span class="value">TGT</span>
        </div>
        <div class="legend-info" id="card-artist">
            <span class="legend">Artist</span>
            <span class="value">Zoltan Boros</span>
        </div>
        <div class="info flavor" id="card-flavor">
            <span>"hehe" – she said.</span>
        </div>
    </aside>

-->
*/
    
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

