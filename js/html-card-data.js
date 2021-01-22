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
    console.log(cardId);
}
