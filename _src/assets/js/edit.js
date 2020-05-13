'use strict';

// edit

import { createNewList } from './newList.js';
// mostrar u ocultar la modal

const toggleEdit = ev => {
  ev.stopPropagation();
  document.querySelector('.js-edit').classList.toggle('show');
  document.querySelector('.js-edit').classList.remove('d-none');
};

const preventEditClosing = ev => {
  ev.stopPropagation();
};

// le añade el evento a la tarjeta para mostrar la modal y otro para evitar la propagación del evento a elementos anidados

function createEvents() {
  document.querySelectorAll('.js-card, .js-edit-close').forEach(card => {
    card.addEventListener('click', toggleEdit);
  });

  document.querySelector('.js-edit-modal').addEventListener('click', preventEditClosing)


  // evento para añadir nueva lista
  let newListButton = document.querySelector('.new-list-btn ');
  newListButton.addEventListener('click', createNewList)
}

export { createEvents };

