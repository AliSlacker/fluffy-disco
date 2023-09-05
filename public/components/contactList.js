import router from "../services/router.js";

export default class contactList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("contactsLoaded", () => {
            this.renderAll();
        });
    }

    renderAll(){
        for (const contact of _app.contacts){
            const listItem = document.createElement('li');
            listItem.textContent = `name:${contact.name} , number:${contact.number}`;
            listItem.addEventListener("click", (event) => {
                _app.elements.selectedContact = event.target;
                router.go(`/client/edit/${contact.id}`);
            })
            _app.elements.contactList.appendChild(listItem);
        }
    }
}
customElements.define("contact-list", contactList);