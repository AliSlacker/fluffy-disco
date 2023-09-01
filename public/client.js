import elements from './services/elements.js'
import router from './services/router.js';

window._app = {}
_app.elements = elements;

window.addEventListener("DOMContentLoaded", () => {
    _app.elements.contactList = document.querySelector("ul");
    _app.elements.form = document.querySelector("form");
    _app.elements.pageNotFound = document.querySelector("h1");
    router.init();
    showContacts();

});

async function showContacts(){
    const responce = await fetch("http://127.0.0.1:3000/contacts");
    const contacts = await responce.json();
    for (const contact of contacts){
        const listItem = document.createElement('li');
        listItem.textContent = `name:${contact.name} , number:${contact.number}`;
        _app.elements.contactList.appendChild(listItem);
    }
}