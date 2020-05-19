'use strict';

// menu
let menuTagsContainer = document.querySelector('.js-menu-tags')
console.log(menuTagsContainer)
function createMenu() {
  menuTagsContainer = '';
  let titleElement = document.createElement('h5');
  titleElement.setAttribute('class', 'h5');
  menuTagsContainer.appendChild(titleElement)

}


const toggleMenu = () => {
  document.querySelector('.js-menu').classList.toggle('show');
  createMenu();
};

document.querySelectorAll('.js-menu-btn').forEach(btn => {
  btn.addEventListener('click', toggleMenu);
});
