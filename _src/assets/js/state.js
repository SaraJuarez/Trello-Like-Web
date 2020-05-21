'user strict';

const filter = (data, filterText) => {
    filterText = filterText.toLowerCase();
    return data.map(list => {
        const newList = { ...list };
        newList.cards = newList.cards.filter(
            card => card.title.toLowerCase().includes(filterText) === true
        );
        return newList;
    });
};

const handleListName = (data, listId, text) => {
    let listIndex = getListIndex(data, listId)
    data[listIndex].title = text;

}

const deleteListButton = (data, listId) => {
    const deleteList = data.splice(listId, 1);
}

const moveListLeft = (data, parentId) => {
    let listMoved = data.splice(parentId, 1);
    let positionToMove = parseInt(parentId) - 1;
    data.splice(positionToMove, 0, listMoved[0])

}

const moveListRight = (data, parentId) => {
    let listMoved = data.splice(parentId, 1);
    let positionToMove = parseInt(parentId) + 1;
    data.splice(positionToMove, 0, listMoved[0])
}

const createNewCard = (data, parentId, element) => {
    let parentIdNumber = parseInt(parentId)
    let listIndex = getListIndex(data, parentIdNumber)
    // debugger;
    data[listIndex].cards.push({
        id: getNewId(),
        title: 'Nueva tarjeta',
        description: '',
        tags: []
    })

}

const getNewId = () => {
    return Date.now();
}

const moveCardUp = (data, element) => {
    let parentDiv = element.parentNode;
    let parentArticle = parentDiv.parentNode;
    let cardId = parentArticle.id;
    let cardIdNumber = parseInt(cardId)
    let columnParent = parentArticle.parentNode;
    let listParent = columnParent.parentNode;
    let listId = listParent.id
    let cardIndex = getCardIndex(data, listId, cardIdNumber)
    let cardMoved = data[listId].cards.splice(cardIndex, 1);
    data[listId].cards.splice(cardIndex - 1, 0, cardMoved[0])
}

const moveCardDown = (data, element) => {

    let parentDiv = element.parentNode;
    let parentArticle = parentDiv.parentNode;
    let cardId = parentArticle.id;
    let cardIdNumber = parseInt(cardId)
    let columnParent = parentArticle.parentNode;
    let listParent = columnParent.parentNode;
    let listId = listParent.id
    let listIdNumber = parseInt(listId)
    let cardIndex = getCardIndex(data, listIdNumber, cardIdNumber)
    let cardMoved = data[listId].cards.splice(cardIndex, 1);
    data[listId].cards.splice(cardIndex + 1, 0, cardMoved[0])
}

const changeCardName = (data, listId, cardId, text) => {
    let listIndex = getListIndex(data, listId)
    let cardIndex = getCardIndex(data, listIndex, cardId)
    data[listIndex].cards[cardIndex].title = text;
}

const changeCardDescription = (data, listId, cardId, text) => {
    let listIndex = getListIndex(data, listId)
    let cardIndex = getCardIndex(data, listIndex, cardId)
    data[listIndex].cards[cardIndex].description = text;
}

const getCardIndex = (data, listIndex, cardId) => {
    for (let index = 0; index < data.length; index++) {
        let list = data[listIndex];
        let cardIndex = list.cards.findIndex(card => card.id === cardId);
        if (cardIndex >= 0) {
            return cardIndex;
        }
    }
}

const getListIndex = (data, listId) => {

    for (let index = 0; index < data.length; index++) {
        let listIdNumber = parseInt(listId)
        let listIndex = data.findIndex(list => list.id === listIdNumber)
        if (listIndex >= 0) {
            return listIndex
        }

    }
}


export default {
    handleListName,
    deleteListButton,
    moveListLeft,
    moveListRight,
    createNewCard,
    moveCardUp,
    moveCardDown,
    getCardIndex,
    getListIndex,
    changeCardName,
    changeCardDescription,
    filter
};