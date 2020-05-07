'user strict';

import { infoArray } from './api.js';

console.log(infoArray)
let listHtml = '';

function createList() {

    for (let index = 0; index < infoArray.length; index++) {
        listHtml += `<p>Culo</p>`
        listHtml += `<form class="app-list-form align-middle p-1 position-relative">`;
        listHtml += `<input`;
        listHtml += `class="app-list-input form-control form-control-sm"`;
        listHtml += `placeholder = "Tareas importantes"`;
        listHtml += `type = "text"`;
        listHtml += `value = "@@title"`;
        listHtml += `title = "Editar el título de la lista"`;
        listHtml += `/>`;
        listHtml += `<div class="app-list-options" >`;
        listHtml += `<span class="pl-2 pr-2 text-white-50 fas fa-ellipsis-v"></span>`;
        listHtml += `<div class="app-list-btns btn-group btn-group-sm" >`;
        listHtml += `<button `;
        listHtml += `type = "button"`;
        listHtml += `class="btn btn-light text-muted border shadow-sm" `;
        listHtml += `title = "Borrar esta tarjeta"`;
        listHtml += `> `;
        listHtml += `<span class="fas fa-trash-alt"></span>`;
        listHtml += `</button >`;
        listHtml += `<button`;
        listHtml += `type = "button"`;
        listHtml += `class="btn btn-light text-muted border shadow-sm app-list-move-left"`;
        listHtml += `title = "Mover esta lista hacia la izquierda"`;
        listHtml += `> `;
        listHtml += ` <span class="fas fa-arrow-left"></span> `;
        listHtml += ` </button > `;
        listHtml += `<button `;
        listHtml += `type = "button"`;
        listHtml += `class="btn btn-light text-muted border shadow-sm app-list-move-right"`;
        listHtml += `title = "Mover esta lista hacia la derecha"`;
        listHtml += `> `;
        listHtml += `< span class="fas fa-arrow-right" ></span >`;
        listHtml += `</button >`;
        listHtml += `</div > `;
        listHtml += `</div >`;
        listHtml += `</form >`;
    }
}


export { createList };