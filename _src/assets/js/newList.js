// 'user strict';

const createNewList = (data) => {
    const newObjectList = {
        title: 'Título tarjeta',
        id: getNewId(),
        cards: [
            {
                id: getNewId(),
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
const getNewId = () => {
    return Date.now();
}

export default {
    createNewList
}

