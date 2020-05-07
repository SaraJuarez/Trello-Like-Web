'use strict';
import { createHtmlList, paintList } from './list.js';
import { createHtmlCard } from './card.js';
import { paintCard } from './card.js';

let info = {};
let infoArray = new Array();

function getDataFromApi() {
    fetch('../../api/board.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.board.list.length; i++) {
                const info = data.board.list[i];
                infoArray.push(info)
            }
            createHtmlList();
            createHtmlCard();
            paintList();
            paintCard();

        })
}

getDataFromApi();

export { infoArray };
