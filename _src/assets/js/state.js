'user strict';

const handleListName = (data, listId, text) => {
    data[listId].title = text;

}

const deleteListButton = (data, listId) => {
    const deleteList = data.splice(listId, 1);
}

const moveListLeft = (data, parentId) => {
    let listMoved = data.splice(parentId, 1);
    let positionToMove = parentId - 1;
    data.splice(positionToMove, 0, listMoved[0])

}

const moveListRight = (data, parentId) => {
    let listMoved = data.splice(parentId, 1);
    let positionToMove = parentId + 1;
    data.splice(positionToMove, 0, listMoved[0])
}

const createNewCard = (data, parentId, element) => {
    let previousCardId = element.previousSibling.id;
    let stringIntoNumber = parseInt(previousCardId)
    let newCardId = stringIntoNumber + 1;


    let newCardObject = {
        "id": newCardId,
        "title": "Título tarjeta",
        "description": "Lorem ipsum dolor sit amet",
        "tags": [
            "JS",
            "Css",
            "Html"
        ]
    }
    data[parentId].cards.push(newCardObject)
}


const moveCardUp = (data, element) => {
    let parentDiv = element.parentNode;
    let parentArticle = parentDiv.parentNode;
    let cardId = parentArticle.id;
    console.log(cardId)
    let parentForm = parentArticle.previousSibling;
    let listId = parentForm.id;
    console.log(listId)


    // let cardMoved = data[listId].cards.splice(cardId, 1);
    // let positionToMove = cardId - 1;
    // data.splice(positionToMove, 0, cardMoved[0]);



}



const moveCardDown = () => {
    console.log('mover tarjeta abajo')
}

export default {
    handleListName,
    deleteListButton,
    moveListLeft,
    moveListRight,
    createNewCard,
    moveCardUp,
    moveCardDown
};