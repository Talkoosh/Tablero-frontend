export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId
}

function saveToStorage(key, val){
    localStorage.setItem(key, JSON.stringify(val));
    return Promise.resolve();
}

function loadFromStorage(key){
    let val = localStorage.getItem(key);
    return Promise.resolve(JSON.parse(val));
}

function makeId(length =5){
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i < length; i++)   {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}