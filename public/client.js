import elements from './services/elements.js'
import router from './services/router.js';
import {contacts, searchedContacts} from './services/data.js';
import api from './services/api.js';
import contactList from './components/contactList.js';
import editForm from './components/editForm.js'
import insertForm from './components/insertForm.js'


/**
 * global namespace called app created using window
 * @namespace
 * @property {module:services/elements~Elements} elements
 * @property {array<module:services/data~Contact>} contacts 
 * @property {array<module:services/data~Contact>} searchedContacts 
 */
window._app = {
    elements: elements,
    contacts: contacts,
    searchedContacts: searchedContacts    
}


window.addEventListener("DOMContentLoaded", () => {
    _app.elements.contactList = document.querySelector("#contact-list");
    _app.elements.searchedList = document.querySelector("#searched-list");
    _app.elements.editForm = document.querySelector("edit-form");
    _app.elements.insertForm = document.querySelector("insert-form");
    _app.elements.pageNotFound = document.querySelector("h1");
    router.init();
    if(_app.contacts ==null){
    api.loadContacts();
    }
});

