'use strict';
import './api.js';
import './edit.js';
import './menu.js';

import { infoArray } from './api.js';
const mainContainer = document.querySelector('.app-board');

function createHtml() {
    console.log(infoArray)
    mainContainer.innerHTML = '';

    for (let index = 0; index < infoArray.length; index++) {
        // div para columna
        let divColumnList = document.createElement('div');
        divColumnList.setAttribute('class', 'app-list')
        divColumnList.setAttribute('id', index)
        mainContainer.appendChild(divColumnList)

        // div para list-header, card y list-footer

        let divListCard = document.createElement('div')
        divListCard.setAttribute('class', 'p-1 rounded-sm bg-primary shadow');
        divColumnList.appendChild(divListCard);

        // form para list header

        let formListHeader = document.createElement('form');
        formListHeader.setAttribute('class', 'app-list-form align-middle p-1 position-relative');
        divListCard.appendChild(formListHeader);
        let inputListHeader = document.createElement('input');
        Object.assign(inputListHeader, {
            className: 'app-list-input form-control form-control-sm',
            placeholder: 'Tareas importantes',
            type: 'text',
            value: infoArray[index].title,
            title: 'Editar el título de la lista',
            id: index,
        })
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
            class: 'btn btn-light text-muted border shadow-sm',
            title: 'Borrar esta tarjeta'
        });
        divListButtons.appendChild(eraseButton)
        let spanEraseButton = document.createElement('span');
        spanEraseButton.setAttribute('class', 'fas fa-trash-alt');
        eraseButton.appendChild(spanEraseButton);

        // botón izquierda

        let leftArrow = document.createElement('button');
        Object.assign(leftArrow, {
            type: 'button',
            class: 'btn btn-light text-muted border shadow-sm app-list-move-left',
            title: 'Mover esta lista hacia la izquierda'
        })
        divListButtons.appendChild(leftArrow);
        let leftArrowSpan = document.createElement('span');
        leftArrowSpan.setAttribute('class', 'fas fa-arrow-left');
        leftArrow.appendChild(leftArrowSpan);

        // botón derecha

        let rightArrow = document.createElement('button');
        Object.assign(rightArrow, {
            type: 'button',
            class: 'btn btn-light text-muted border shadow-sm app-list-move-right',
            title: 'Mover esta lista hacia la derecha'
        })
        divListButtons.appendChild(rightArrow);
        let rightArrowSpan = document.createElement('span');
        rightArrowSpan.setAttribute('class', 'fas fa-arrow-right')
        rightArrow.appendChild(rightArrowSpan);

        // card

        for (let i = 0; i < infoArray[index].cards.length; i++) {

            let cards = infoArray[index].cards[i]
            let cardArticle = document.createElement('article');
            cardArticle.setAttribute('class', 'js-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm')
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

            console.log(cards)

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
                class: 'btn btn-light text-muted border shadow-sm app-card-move-up', title: 'Mover esta tarjeta hacia abajo'
            })
            let spanButtonUp = document.createElement('span');
            spanButtonUp.setAttribute('class', 'fas fa-arrow-up');
            buttonUp.appendChild(spanButtonUp)

            let buttonDown = document.createElement('button');
            Object.assign(buttonDown, {
                type: 'button',
                class: 'btn btn-light text-muted border shadow-sm app-card-move-down',
                title: 'Mover esta tarjeta hacia arriba'
            })
            let spanButtonDown = document.createElement('span');
            spanButtonDown.setAttribute('class', 'fas fa-arrow-down');
            buttonDown.appendChild(spanButtonDown)
            divArrows.appendChild(buttonUp);
            divArrows.appendChild(buttonDown);
            cardArticle.appendChild(divArrows)
        }
        // list footer
        let listFooterButton = document.createElement('button');
        Object.assign(listFooterButton, {
            type: 'button',
            class: 'ml-1 btn btn-primary btn-sm text-white-50',
            title: 'Añadir una nueva tarjeta'
        })
        let footerButtonSpan = document.createElement('span');
        footerButtonSpan.setAttribute('class', 'fas fa-plus');
        let textSpanFooter = document.createTextNode('Añadir otra tarjeta');
        footerButtonSpan.appendChild(textSpanFooter);
        listFooterButton.appendChild(footerButtonSpan);
        divListCard.appendChild(listFooterButton)
    }
    // añadir nueva columna
}

export { createHtml };