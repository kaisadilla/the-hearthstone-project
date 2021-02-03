const MAX_CARDS = 30;
const MAX_NORMAL_COPIES = 2;
const MAX_LEGENDARY_COPIES = 1;

let isDeckEditable = false;
let deckClass = "MAGE";
let deck = [
    "AT_001",
    "AT_002",
    "AT_002",
    "AT_009",
    "AT_003",
    "AT_003",
    "AT_005",
    "AT_012",
    "AT_005",
    "AT_021",
];

function doStuff () {
    // check that 'expansions' contains some key that we always expect, such as "EXPERT1".
    if (isDataLoaded(collectibleCards) && isDataLoaded != undefined) {
        console.log("Cards in the deck:");
        console.log(deck);
        _displayDeck();
        isDeckEditable = true;
    }
    else {
        setTimeout(doStuff, 200);
    }
}

// drag and drop

function allowDrop (ev) {
    ev.preventDefault();
}

function dragDeckCard (ev) {
    ev.dataTransfer.setData("operation", "deleteCard");
    ev.dataTransfer.setData("card-id", $(ev.target).attr("data-id"));
    $("#deck-card-drop-area").removeClass("hidden");
}

function dragDeckCardEnd (ev) {
    $("#deck-card-drop-area").addClass("hidden");
}

function dropDeckCard (ev) {
    if (ev.dataTransfer.getData("operation") === "deleteCard") {
        let removedCard = ev.dataTransfer.getData("card-id");
        let removedIndex = deck.findIndex(c => c === removedCard);
        deck.splice(removedIndex, 1);
        _displayDeck();
    }
}

function dropGalleryCard (ev) {
    if (ev.dataTransfer.getData("operation") === "addCard") {
        let potentialCard = ev.dataTransfer.getData("card-id");
        let wasAdded = _tryAddCard(potentialCard);

        if (wasAdded) {
            _displayDeck();
        }
        else {
            // little animation to warn the user that the card was not added.
            $("#deck-cards").addClass("display-warning");
            setTimeout(() => $("#deck-cards").removeClass("display-warning"), 100);
        }
    }
}

function displayExpansionDraggable () {
    displayExpansion();
    $(".gallery-card-item").each((i, el) => {
        $(el).attr("href", "javascript:void(0)");
        $(el).attr("target", "_self");

        $(el).attr("draggable", true);
        $(el).on("dragstart", ev => {
            ev.originalEvent.dataTransfer.setData("operation", "addCard");
            ev.originalEvent.dataTransfer.setData("card-id", $(ev.target).attr("data-id"));
            $("#deck-cards").addClass("display-border");
        });
        $(el).on("dragend", ev => {
            $("#deck-cards").removeClass("display-border");
        })
    });
}

/**
 * Displays the cards in the deck in the webpage.
 */
function _displayDeck () {
    _sortDeck(); // the deck must be sorted for it to be displayed correctly (all repeated cards grouped instead of showing twice).

    let jDeckCards = $("#deck-cards");
    jDeckCards.empty();
    
    for (let i = 0; i < deck.length; i++) {
        let cardId = deck[i];
        let card = getCardById(cardId);
        let isLegendary = card.rarity === "LEGENDARY";
        let areTwo = deck[i + 1] === cardId;

        jDeckCards.append(`
            <div class="card-token-reduced draggable" data-id="${cardId}" draggable="true" ondragstart="dragDeckCard(event)" ondragend="dragDeckCardEnd(event)">
                <div class="card-cost rarity-${card["rarity"].toLowerCase()}">${card["cost"]}</div>
                <div class="card-name">
                    <img class="tile" src="https://art.hearthstonejson.com/v1/tiles/${cardId}.png" />
                    <span class="tile-fade-out"></span>
                    <span class="caption">${card["name"]}</span>
                </div>
                ${areTwo ? `<div class="card-amount">2</div>` : ""}
                ${isLegendary ? `<div class="card-amount">★</div>` : ""}
            </div>
        `);
        
        i += areTwo;
    }

    console.log(deck);
}

/**
 * Tries to add a card to the deck. Returns true if the card was added, or false if it wasn't.
 */
function _tryAddCard (id) {
    if (!isDeckEditable || deck.length >= MAX_CARDS) {
        return false;
    }
    else {
        if (getCardById(id).rarity === "LEGENDARY") {
            if (deck.filter(c => c === id).length >= MAX_LEGENDARY_COPIES) {
                return false;
            }
            else {
                deck.push(id);
                _sortDeck();
                return true;
            }
        }
        else {
            if (deck.filter(c => c === id).length >= MAX_NORMAL_COPIES) {
                return false;
            }
            else {
                deck.push(id);
                _sortDeck();
                return true;
            }
        }
    }
}

/**
 * Sorts the deck by the cost of each card first, and alphabetically second.
 */
function _sortDeck () {
    deck.sort ( (a, b) => {
        let cardA = getCardById(a);
        let cardB = getCardById(b);
        if (cardA["cost"] > cardB["cost"]) {
            return 1;
        }
        else if (cardA["cost"] < cardB["cost"]) {
            return -1;
        }
        else {
            return cardA["name"] > cardB["name"];
        }
    });
}