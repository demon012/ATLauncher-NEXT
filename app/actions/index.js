import fetch from 'isomorphic-fetch'

export const TEST = 'TEST';

export function increment() {
    return {
        type: TEST
    };
}

function receiveNews(json) {
}

export function fetchNews() {
    return dispatch => {
        dispatch(requestNews())
        return fetch('https://download.nodecdn.net/containers/atl/launcher/json/news.json')
        .then(response => response.json())
        .then(json => dispatch(receiveNews(json)))
    }
}
