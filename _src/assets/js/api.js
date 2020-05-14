'use strict';

const getDataFromApi = () => {
    return fetch('../../api/board.json')
        .then(function (response) {
            return response.json();
        })
}

export default {
    getDataFromApi
}



