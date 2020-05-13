'use strict';

let info = {};
let infoArray = new Array();
import { createHtml } from './main.js';
import { createEvents } from './edit.js';
import { createButtonNewColumn } from './main.js';



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
            console.log(infoArray)
            if (localStorage.getItem('lists') != undefined) {
                const localStorageData = localStorage.getItem('lists');
                infoArray = JSON.parse(localStorageData)
            }
            localStorage.setItem('lists', JSON.stringify(infoArray));
            createHtml();

        })
}

getDataFromApi();


export { infoArray };