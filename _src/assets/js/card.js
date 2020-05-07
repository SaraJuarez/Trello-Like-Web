'user strict';

import { infoArray } from './api.js';

let infoCards = [];
let infoArrayCard = [];
function createHtmlCard() {

    console.log(infoArray)
    for (let index = 0; index < infoArray.length; index++) {
        infoCards = infoArray[index].cards;
    }
    console.log(infoCards)
    infoArrayCard = infoCards.map(card =>
        `
        <div>
          <span class="badge badge-secondary bg-success">${card.title}</span>
          <span class="badge badge-secondary bg-success">Css</span>
          <span class="badge badge-secondary bg-success">Html</span>
        </div>
      
        <div>
          <h3 class="h6">${card.title}</h3>
        </div>
      
        <div class="text-black-50">
          <small class="pr-2 fas fa-align-left"></small>
          <small class="far fa-check-square"></small>
          <small title="Subtareas completadas: 3 de 5">3/5</small>
        </div>
      
        <div class="app-card-btns btn-group-vertical btn-group-sm">
          <button type="button" class="btn btn-light text-muted border shadow-sm app-card-move-up" title="Mover esta tarjeta hacia abajo">
            <span class="fas fa-arrow-up"></span>
          </button>
          <button type="button" class="btn btn-light text-muted border shadow-sm app-card-move-down" title="Mover esta tarjeta hacia arriba">
            <span class="fas fa-arrow-down"></span>
          </button>
        </div>
      
      `)
}
function paintCard() {
    let htmlCard = document.querySelector('.js-card');
    htmlCard.innerHTML = infoArrayCard;
    console.log('ejecutando paintCard');
}

export { createHtmlCard };
export { paintCard };