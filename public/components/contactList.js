import router from "../services/router.js";

export default class contactList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("contactsLoaded", () => {
            for (const contact of _app.contacts){
                const listItem = document.createElement('li');
                listItem.textContent = `name:${contact.name} , number:${contact.number}`;
                listItem.addEventListener("click", (event) => {
                    _app.elements.selectedContact = event.target;
                    _app.elements.editForm.dataset.id = contact.id;
                    router.go(`/client/edit/${contact.id}`);
                })
                _app.elements.contactList.appendChild(listItem);
            }
        });

        window.addEventListener("contactDeleted", () => {
            _app.elements.selectedContact.remove();
        });

        window.addEventListener("contactInserted", (e) => {
            const listItem = document.createElement('li');
            listItem.textContent = `name:${e.name} , number:${e.number}`;
            listItem.addEventListener("click", (event) => {
                _app.elements.selectedContact = event.target;
                _app.elements.editForm.dataset.id = e.id;
                router.go(`/client/edit/${e.id}`);
            })
            _app.elements.contactList.appendChild(listItem);
        });
    }
}
customElements.define("contact-list", contactList);