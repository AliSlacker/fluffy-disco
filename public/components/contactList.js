import router from "../services/router.js";

export default class contactList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("contactsLoaded", () => {
            for (const contact of _app.contacts) {
                this.render(contact.name, contact.number, contact.id, _app.elements.contactList);
            }
        });

        window.addEventListener("contactDeleted", () => {
            _app.elements.selectedContact.remove();
        });

        window.addEventListener("contactInserted", (e) => {
            _app.contacts.push({ name: e.detail.name, number: e.detail.number, id: e.detail.id });
            this.render(e.detail.name, e.detail.number, e.detail.id, _app.elements.contactList);
        });

        window.addEventListener("contactEdited", (e) => {
            _app.elements.selectedContact.textContent = `name:${e.detail.name} , number:${e.detail.number}`;
        })

        this.querySelector("input").addEventListener("input", (e) => {
            let searchWord = e.target.value;
            if (searchWord == "") {
                _app.searchedContacts = null;
                _app.elements.contactList.hidden = false;
                _app.elements.searchedList.hidden = true;
            }
            else {
                _app.elements.searchedList.innerHTML = "";
                _app.searchedContacts = _app.contacts.filter((contact) => {
                    return contact.name.includes(searchWord);
                })
                for (const contact of _app.searchedContacts) {
                    this.render(contact.name, contact.number, contact.id, _app.elements.searchedList);
                }
                _app.elements.contactList.hidden = true;
                _app.elements.searchedList.hidden = false;
            }
        })
    }

    render(name, number, id, target) {
        const listItem = document.createElement('li');
        listItem.textContent = `name:${name} , number:${number}`;
        listItem.addEventListener("click", (event) => {
            _app.elements.selectedContact = event.target;
            _app.elements.editForm.dataset.id = id;
            router.go(`/client/edit/${id}`);
        })
        target.appendChild(listItem);
    }
}
customElements.define("contact-list", contactList);