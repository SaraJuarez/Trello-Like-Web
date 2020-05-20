'use strict';
import './api.js';
import './menu.js';
import api from './api.js';
import { createEvents } from './edit.js';
import state from './state.js';
import edit from './edit.js';
import filterMain from './filterMain.js';
import menu from './menu.js';
import newList from './newList.js';

const mainContainer = document.querySelector('.app-board');


let infoArray = [];

let openCardId = '';
let openCardListId = '';
let filterText = '';

const startApp = () => {
    if (localStorage.getItem('lists') != undefined) {
        let localStorageData = localStorage.getItem('lists');
        infoArray = JSON.parse(localStorageData);
        createHtml();
    }
    else {
        api.getDataFromApi().then(data => {
            for (let i = 0; i < data.board.list.length; i++) {
                const info = data.board.list[i];
                infoArray.push(info)

            }
            localStorage.setItem('lists', JSON.stringify(infoArray));
            createHtml();
        })

    }
}


startApp();

// función para manejar eventos columnas
function handleBoardEvents(ev) {
    const dataset = ev.currentTarget;
    const eventAction = dataset.getAttribute('action')
    const datasetId = dataset.getAttribute('id')
    if (eventAction === 'set-list-title') {
        state.handleListName(infoArray, datasetId, ev.currentTarget.value)
    }
    else if (eventAction === 'erase-list-button') {
        state.deleteListButton(infoArray, datasetId)

    }
    else if (eventAction === 'move-list-left') {
        state.moveListLeft(infoArray, ev.currentTarget.form.id)
    }
    else if (eventAction === 'move-list-right') {
        state.moveListRight(infoArray, ev.currentTarget.form.id)
    }
    else if (eventAction === 'create-new-card') {
        state.createNewCard(infoArray, ev.currentTarget.id, ev.currentTarget);

    }
    else if (eventAction === 'move-card-up') {
        state.moveCardUp(infoArray, ev.currentTarget);
        ev.stopPropagation();
    }
    else if (eventAction === 'move-card-down') {
        state.moveCardDown(infoArray, ev.currentTarget);
        ev.stopPropagation();

    }
    localStorage.setItem('lists', JSON.stringify(infoArray));
    createHtml();
}

// función de evento abrir tarjeta

function openCard(ev) {
    openCardId = parseInt(ev.currentTarget.id);
    let openCardParent = ev.currentTarget.parentNode;
    let openCardList = openCardParent.parentNode;
    openCardListId = parseInt(openCardList.id);
    let listIndex = state.getListIndex(infoArray, openCardListId)
    let cardIndex = state.getCardIndex(infoArray, listIndex, openCardId)
    edit.open(infoArray, cardIndex, listIndex);
}


// función borrar tarjeta

function handleDeleteCard() {
    let cardIndex = state.getCardIndex(infoArray, openCardListId, openCardId)
    edit.deleteCard(infoArray, cardIndex, openCardListId);
    localStorage.setItem('lists', JSON.stringify(infoArray));
    createHtml();
}

// función para cambiar nombre a tarjeta

function handleCardName(ev) {
    let text = ev.currentTarget.value;
    state.changeCardName(infoArray, openCardListId, openCardId, text)
    localStorage.setItem('lists', JSON.stringify(infoArray));
    // createHtml();
}

// función para cambiar descripción a tarjeta
function handleCardDescription(ev) {
    let text = ev.currentTarget.value;
    state.changeCardDescription(infoArray, openCardListId, openCardId, text)
    localStorage.setItem('lists', JSON.stringify(infoArray));
    // createHtml();

}

// funcion para borrar registro de tarjeta modal abierta

function close() {
    let openCardId = '';
    let openCardListId = '';
    createHtml();
}

// funciones para filtrar tarjetas por búsqueda

function filterArray() {
    let filteredArrayData = state.filter(infoArray, filterText)
    filterMain.createHtmlFiltered(filteredArrayData)
    addEventListeners();

}

function handleFilter(ev) {
    filterText = ev.currentTarget.value;
    filterArray();
}

// Función para prevenir submit

function preventSubmitForm(ev) {
    ev.preventDefault();
}

// función para abrir menu

function handleOpenMenu() {
    menu.createMenu(infoArray);
}

// función para crear nueva lista

function handleNewList() {
    newList.createNewList(infoArray);
    localStorage.setItem('lists', JSON.stringify(infoArray));
    createHtml();
}

function createHtml() {
    mainContainer.innerHTML = '';

    for (let index = 0; index < infoArray.length; index++) {
        // div para columna
        let divColumnList = document.createElement('div');
        divColumnList.setAttribute('class', 'app-list')
        divColumnList.setAttribute('id', infoArray[index].id)
        mainContainer.appendChild(divColumnList)

        // div para list-header, card y list-footer

        let divListCard = document.createElement('div')
        divListCard.setAttribute('class', 'p-1 rounded-sm bg-primary shadow');
        divColumnList.appendChild(divListCard);

        // form para list header

        let formListHeader = document.createElement('form');
        formListHeader.setAttribute('class', 'app-list-form align-middle p-1 position-relative');
        Object.assign(formListHeader, {
            id: [index]
        })
        divListCard.appendChild(formListHeader);
        let inputListHeader = document.createElement('input');
        Object.assign(inputListHeader, {
            className: 'app-list-input form-control form-control-sm',
            placeholder: 'Tareas importantes',
            type: 'text',
            value: infoArray[index].title,
            title: 'Editar el título de la lista',
            id: infoArray[index].id
        })
        inputListHeader.setAttribute('action', 'set-list-title')

        formListHeader.appendChild(inputListHeader)
        let listOptions = document.createElement('div');
        listOptions.setAttribute('class', 'app-list-options');
        formListHeader.appendChild(listOptions)
        let spanListHeader = document.createElement('span');
        spanListHeader.setAttribute('class', 'pl-2 pr-2 text-white-50 fas fa-ellipsis-v');
        listOptions.appendChild(spanListHeader);
        let divListButtons = document.createElement('div');
        divListButtons.setAttribute('class', 'app-list-btns btn-group btn-group-sm');
        listOptions.appendChild(divListButtons);

        // botón borrar

        let eraseButton = document.createElement('button');
        Object.assign(eraseButton, {
            type: 'button',
            className: 'erase-list-btn btn btn-light text-muted border shadow-sm',
            title: 'Borrar esta tarjeta',
            id: [index]
        });
        eraseButton.setAttribute('action', 'erase-list-button')

        divListButtons.appendChild(eraseButton)
        let spanEraseButton = document.createElement('span');
        spanEraseButton.setAttribute('class', 'fas fa-trash-alt');
        eraseButton.appendChild(spanEraseButton);

        // botón izquierda

        let leftArrow = document.createElement('button');
        leftArrow.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-left')
        Object.assign(leftArrow, {
            type: 'button',
            title: 'Mover esta lista hacia la izquierda'
        })
        leftArrow.setAttribute('action', 'move-list-left')
        divListButtons.appendChild(leftArrow);
        let leftArrowSpan = document.createElement('span');
        leftArrowSpan.setAttribute('class', 'fas fa-arrow-left');
        leftArrow.appendChild(leftArrowSpan);

        // botón derecha

        let rightArrow = document.createElement('button');
        rightArrow.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-list-move-right')
        Object.assign(rightArrow, {
            type: 'button',
            title: 'Mover esta lista hacia la derecha'
        })
        rightArrow.setAttribute('action', 'move-list-right')
        divListButtons.appendChild(rightArrow);
        let rightArrowSpan = document.createElement('span');
        rightArrowSpan.setAttribute('class', 'fas fa-arrow-right')
        rightArrow.appendChild(rightArrowSpan);

        // card

        for (let i = 0; i < infoArray[index].cards.length; i++) {

            let cards = infoArray[index].cards[i]
            let cardArticle = document.createElement('article');
            cardArticle.setAttribute('class', 'js-card js-open-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm')
            // cardArticle.setAttribute('id', parseInt([i]))
            cardArticle.setAttribute('id', infoArray[index].cards[i].id)
            cardArticle.setAttribute('title', 'Abrir la tarjeta')
            divListCard.appendChild(cardArticle)

            // tags container

            let divTagsContainer = document.createElement('div');
            cardArticle.appendChild(divTagsContainer)
            for (let x = 0; x < cards.tags.length; x++) {
                let tagElement = document.createElement('span');
                tagElement.setAttribute('class', 'badge badge-secondary bg-success')
                tagElement.innerHTML = cards.tags[x]
                divTagsContainer.appendChild(tagElement)

            }

            // card title

            let divCardTitle = document.createElement('div')
            let titleCard = document.createElement('h3');
            titleCard.setAttribute('class', 'h6')
            let titleText = document.createTextNode(cards.title);
            titleCard.appendChild(titleText)

            divCardTitle.appendChild(titleCard)
            cardArticle.appendChild(divCardTitle)

            // card summary

            let cardSummary = document.createElement('div');
            cardSummary.setAttribute('class', 'text-black-50');
            let small1 = document.createElement('small');
            small1.setAttribute('class', 'pr-2 fas fa-align-left');
            let small2 = document.createElement('small');
            small2.setAttribute('class', 'far fa-check-square');
            let small3 = document.createElement('small');
            small3.setAttribute('title', 'Subtareas completadas: 3 de 5');
            let textFinishedTasks = document.createTextNode('Subtareas completadas: 3 de 5')
            small3.appendChild(textFinishedTasks)
            cardSummary.appendChild(small1)
            cardSummary.appendChild(small2);
            cardSummary.appendChild(small3)
            cardArticle.appendChild(cardSummary)

            // flechas para mover arriba y abajo

            let divArrows = document.createElement('div');
            divArrows.setAttribute('class', 'app-card-btns btn-group-vertical btn-group-sm');
            let buttonUp = document.createElement('button');
            Object.assign(buttonUp, {
                type: 'button',
                title: 'Mover esta tarjeta hacia arriba'
            })
            buttonUp.setAttribute('action', 'move-card-up')
            buttonUp.setAttribute('class', 'btn btn-light text-muted border shadow-sm app-card-move-up')
            let spanButtonUp = document.createElement('span');
            spanButtonUp.setAttribute('class', 'fas fa-arrow-up');
            buttonUp.appendChild(spanButtonUp)

            let buttonDown = document.createElement('button');
            Object.assign(buttonDown, {
                type: 'button',
                className: 'btn btn-light text-muted border shadow-sm app-card-move-down',
                title: 'Mover esta tarjeta hacia abajo'
            })
            buttonDown.setAttribute('action', 'move-card-down')
            let spanButtonDown = document.createElement('span');
            spanButtonDown.setAttribute('class', 'fas fa-arrow-down');
            buttonDown.appendChild(spanButtonDown)
            divArrows.appendChild(buttonUp);
            divArrows.appendChild(buttonDown);
            cardArticle.appendChild(divArrows)
        }
        // list footer
        let listFooterButton = document.createElement('button');
        listFooterButton.setAttribute('type', 'button');
        listFooterButton.setAttribute('class', 'ml-1 btn btn-primary btn-sm text-white-50 new-card-button');
        listFooterButton.setAttribute('title', 'Añadir una nueva tarjeta');
        listFooterButton.setAttribute('action', 'create-new-card')
        listFooterButton.setAttribute('id', [index])
        let footerButtonSpan = document.createElement('span');
        footerButtonSpan.setAttribute('class', 'fas fa-plus');
        let textSpanFooter = document.createTextNode('Añadir otra tarjeta');
        footerButtonSpan.appendChild(textSpanFooter);
        listFooterButton.appendChild(footerButtonSpan);
        divListCard.appendChild(listFooterButton)
    }
    addEventListeners();
}


function addEventListeners() {
    createButtonNewColumn();
    createEvents();
    addEvents('.app-list-input', 'change', handleBoardEvents);
    addEvents('.erase-list-btn', 'click', handleBoardEvents);
    addEvents('.app-list-move-left', 'click', handleBoardEvents);
    addEvents('.app-list-move-right', 'click', handleBoardEvents)
    addEvents('.new-card-button', 'click', handleBoardEvents)
    addEvents('.app-card-move-up', 'click', handleBoardEvents)
    addEvents('.app-card-move-down', 'click', handleBoardEvents)
    addEvents('.js-open-card', 'click', openCard);
    addEvents('.js-edit-delete', 'click', handleDeleteCard);
    addEvents('.js-filter', 'keyup', handleFilter)
    addEvents('.js-submit', 'submit', preventSubmitForm)
    addEvents('.js-menu-btn', 'click', handleOpenMenu)
    addEvents('.new-list-btn', 'click', handleNewList)
    addEvents('.app-edit-title', 'change', handleCardName)
    addEvents('.app-edit-textarea', 'change', handleCardDescription)
    addEvents('.js-edit-close', 'click', close)
}

// añadir nueva columna

function createButtonNewColumn() {
    let divNewColumn = document.createElement('div');
    let buttonNewColumn = document.createElement('button');
    buttonNewColumn.setAttribute('class', 'new-list-btn btn btn-light btn-outline-primary btn-sm mr-5 shadow-sm');
    buttonNewColumn.setAttribute('type', 'button');
    buttonNewColumn.setAttribute('title', 'Añadir nueva lista')
    let spanNewColumn = document.createElement('span');
    spanNewColumn.setAttribute('class', 'fas fa-plus');
    buttonNewColumn.appendChild(spanNewColumn);
    divNewColumn.appendChild(buttonNewColumn);
    mainContainer.appendChild(divNewColumn);
}

// función para añadir eventos
function addEvents(selector, eventType, eventhandler) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
        element.addEventListener(eventType, eventhandler)
    }

}


export { createHtml };
export { createButtonNewColumn };
