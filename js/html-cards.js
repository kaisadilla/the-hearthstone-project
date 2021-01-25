const ALL_EXPANSIONS_OPTION = `<option value="all">(All)</option>`;

function buildExpMenu () {
    // check that 'expansions' contains some key that we always expect, such as "EXPERT1".
    if (isDataLoaded(expansions) && expansions["EXPERT1"] != undefined) {
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

    for (let c of collectibleCards) {
        if ((chosenExp === "all" || c["set"] === chosenExp) && c["text"] !== undefined) {
            gallery.append(`
                <a href="card-data.html?card=${c["id"]}" target="_blank">
                    <img class="card-showcase" src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${c["id"]}.png" alt="${c["name"]}"
                    data-name="${c["name"]}"
                    data-cost="${c["cost"]}"
                    data-class="${c["cardClass"]}"
                    />
                </a>`);
            
            list.append(`
                <a href="card-data.html?card=${c["id"]}" target="_blank">
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

function _buildMenuFromExp (expansions) {
    let expMenu = $("#exp-menu");

    expMenu.append(ALL_EXPANSIONS_OPTION);
    for (let e in expansions) {
        expMenu.append(`<option value="${e}">${expansions[e]["name"]}</option>`);
    }
}