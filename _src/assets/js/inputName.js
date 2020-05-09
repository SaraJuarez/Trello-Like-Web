'user strict';
import { infoArray } from './api.js';

function getListName(ev) {
    let inputId = ev.currentTarget.id;
    let insertedName = ev.target.value;
    infoArray[inputId].title = insertedName;
}

export { getListName };