import elements from './services/elements.js'
import router from './services/router.js';
import contacts from './services/data.js';
import api from './services/api.js';
import contactList from './components/contactList.js';

window._app = {}
_app.elements = elements;
_app.contacts  = contacts;

window.addEventListener("DOMContentLoaded", () => {
    _app.elements.contactList = document.querySelector("contact-list");
    _app.elements.form = document.querySelector("form");
    _app.elements.pageNotFound = document.querySelector("h1");
    router.init();
    if(_app.contacts ==null){
    api.loadContacts();
    }
});

