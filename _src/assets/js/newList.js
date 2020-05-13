'user strict';
import { infoArray } from './api.js';
function createNewList() {
    const newObjectList = {
        title: 'Título tarjeta',
        cards: [
            {
                id: '',
                title: 'Título de la tarea',
                description: 'Lorem ipsum dolor sit amet',
                tags: [
                    'JS',
                    'Css',
                    'Html']
            }
        ]
    };
    infoArray.push(newObjectList);
    createHtml();

}


export { createNewList };
