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
            listItem.textContent = `name:${e.detail.name} , number:${e.detail.number}`;
            listItem.addEventListener("click", (event) => {
                _app.elements.selectedContact = event.target;
                _app.elements.editForm.dataset.id = e.detail.id;
                router.go(`/client/edit/${e.detail.id}`);
            })
            _app.elements.contactList.appendChild(listItem);
        });
    }
}
customElements.define("contact-list", contactList);