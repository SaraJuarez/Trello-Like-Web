'user strict';
import { infoArray } from './api.js';
import { createHtml } from './main.js';

function moveList(ev) {
    let arrowClicked = ev.currentTarget;
    const idFormParent = ev.currentTarget.form.id;

    // listMoved me devuelve la tarjeta que he movido en un array
    let listMoved = infoArray.splice(idFormParent, 1)
    console.log(listMoved)
    let positionToMove = arrowClicked.classList.contains('app-list-move-left') ? idFormParent - 1 : idFormParent + 1
        ;
    infoArray.splice(positionToMove, 0, listMoved[0])
    createHtml();
}

export { moveList };