'use strict';

// edit

// import { createNewList } from './newList.js';

const modalElement = document.querySelector('.js-edit');

// abrir tarjeta en la modal

const open = (data, cardIndex, listId) => {
  let list = data[listId]
  let card = list.cards[cardIndex]

  let cardTitle = document.querySelector('.app-edit-title');
  cardTitle.value = card.title;
  let cardDescription = document.querySelector('.app-edit-textarea');
  cardDescription.innerHTML = card.description;
  let tags = card.tags;
  renderTags(tags);
  let cardListTitle = document.querySelector('.js-edit-list-title');
  cardListTitle.innerHTML = list.title;
}

const deleteCard = (data, cardIndex, listId) => {
  let deleteCard = data[listId].cards.splice(cardIndex, 1);
  document.querySelector('.js-edit').classList.toggle('show');
}

const close = (ev) => {

}

const renderTags = tags => {
  let tagsContainer = document.querySelector('.js-edit-tags')
  tagsContainer.innerHTML = '';
  for (let index = 0; index < tags.length; index++) {
    let tagElement = document.createElement('span');
    tagElement.setAttribute('class', 'badge badge-secondary bg-success')
    tagElement.innerHTML = tags[index];
    tagsContainer.appendChild(tagElement)
  }
}








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


  // // evento para añadir nueva lista
  // let newListButton = document.querySelector('.new-list-btn ');
  // newListButton.addEventListener('click', createNewList)
}

export { createEvents };
export default {
  open,
  deleteCard
};

