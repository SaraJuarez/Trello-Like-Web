// 'user strict';

const createNewList = (data) => {
    const newObjectList = {
        title: 'Título tarjeta',
        id: getNewListId(),
        cards: [
            {
                id: getNewListId(),
                title: 'Título de la tarea',
                description: 'Lorem ipsum dolor sit amet',
                tags: [
                    'JS',
                    'Css',
                    'Html']
            }
        ]
    };
    data.push(newObjectList);
}
const getNewListId = () => {
    return Date.now();
}

export default {
    createNewList
}

