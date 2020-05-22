'use strict';

// menu

// esta funcionalidad está pensada para unas tags estáticas, lo ideal sería reformularlo para que lo haga de forma automática
let menuTagsContainer = document.querySelector('.js-menu-tags')

function createMenu(data) {
  menuTagsContainer.innerHTML = '';
  let tags = [];
  for (let index = 0; index < data.length; index++) {
    for (let i = 0; i < data[index].cards.length; i++) {
      for (let z = 0; z < data[index].cards[i].tags.length; z++) {
        tags.push(data[index].cards[i].tags[z])

      }

    }

  }
  let uniqueTags = new Set(tags)
  let tagsArrayJs = [];
  let tagsArrayCss = [];
  let tagsArrayHtml = [];
  for (let index = 0; index < data.length; index++) {
    for (let i = 0; i < data[index].cards.length; i++) {
      for (let z = 0; z < data[index].cards[i].tags.length; z++) {
        if (data[index].cards[i].tags[z] === 'JS') {

          (console.log(data[index].cards[i].tags))
          tagsArrayJs.push(data[index].cards[i].title)
        }
        else if (data[index].cards[i].tags[z] === 'Css') {
          tagsArrayCss.push(data[index].cards[i].title)
        }
        else if (data[index].cards[i].tags[z] === 'Html') {
          tagsArrayHtml.push(data[index].cards[i].title)
        }

      }
    }
  }

  uniqueTags.forEach(tag => {
    let titleElement = document.createElement('h6')
    titleElement.setAttribute('class', 'h5');
    let spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'badge badge-secondary bg-success')
    let spanText = document.createTextNode(tag)
    let ulElement = document.createElement('ul');
    ulElement.setAttribute('id', `${tag}`);
    spanElement.appendChild(spanText)
    titleElement.appendChild(spanElement)
    menuTagsContainer.appendChild(titleElement)
    menuTagsContainer.appendChild(ulElement)
  })

  // siempre uso el array de js porque todas las tareas comparten las mismas tags
  createTaskList('JS', tagsArrayJs);
  createTaskList('Css', tagsArrayCss);
  createTaskList('Html', tagsArrayHtml)

}

function createTaskList(id, tagsArray) {
  let taskList = document.getElementById(id);
  for (const task of tagsArray) {
    let liElement = document.createElement('li');
    let smallElement = document.createElement('small');
    let smallText = document.createTextNode(`${task}`);
    smallElement.appendChild(smallText)
    liElement.appendChild(smallElement);
    taskList.appendChild(liElement)
  }
}


const toggleMenu = () => {
  document.querySelector('.js-menu').classList.toggle('show');
};

document.querySelectorAll('.js-menu-btn').forEach(btn => {
  btn.addEventListener('click', toggleMenu);
});


export default {
  createMenu
}