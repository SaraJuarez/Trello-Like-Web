'user strict';

import { infoArray } from './api.js';
import { createHtml } from './main.js';

function deleteList(ev) {
    let buttonId = ev.currentTarget.id;
    const deleteList = infoArray.splice(buttonId, 1);
    createHtml();
}

export { deleteList };