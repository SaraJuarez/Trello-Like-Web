'user strict';

import { infoArray } from './api.js';

let htmlList = document.querySelector('.app-list');
let infoArrayList = [];

function createHtmlList() {
    console.log(infoArray);
    infoArrayList = infoArray.map(item =>

        ` <div class="p-1 rounded-sm bg-primary shadow">
        <form class="app-list-form align-middle p-1 position-relative">
            <input class="app-list-input form-control form-control-sm" placeholder="Tareas importantes"
                type="text" value="${item.title}" title="Editar el título de la lista" />
            <div class="app-list-options">
                <span class="pl-2 pr-2 text-white-50 fas fa-ellipsis-v"></span>

                <div class="app-list-btns btn-group btn-group-sm">
                    <button type="button" class="btn btn-light text-muted border shadow-sm"
                        title="Borrar esta tarjeta">
                        <span class="fas fa-trash-alt"></span>
                    </button>
                    <button type="button"
                        class="btn btn-light text-muted border shadow-sm app-list-move-left"
                        title="Mover esta lista hacia la izquierda">
                        <span class="fas fa-arrow-left"></span>
                    </button>
                    <button type="button"
                        class="btn btn-light text-muted border shadow-sm app-list-move-right"
                        title="Mover esta lista hacia la derecha">
                        <span class="fas fa-arrow-right"></span>
                    </button>
                </div>
            </div>
        </form>


        <article class="js-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm" title="Abrir la tarjeta">
        </article>


        <button
            type="button"
            class="ml-1 btn btn-primary btn-sm text-white-50"
            title="Añadir una nueva tarjeta"
        >
            <span class="fas fa-plus"></span>
            Añadir otra tarjeta
        </button>
         `

    )

    // htmlList.innerHTML = infoArrayList;


};

function paintList() {
    htmlList.innerHTML = infoArrayList;

}

export { createHtmlList };
export { paintList };

