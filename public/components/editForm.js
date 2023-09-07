import router from "../services/router.js";
import api from "../services/api.js"

export default class editForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.querySelector('button').addEventListener('click', (e) => {
            api.deleteContact(_app.elements.editForm.dataset.id).then(() => { router.go('/client'); });
        });

        this.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            let name = this.querySelector('#name').value;
            let number = this.querySelector('#phone').value;
            let id = _app.elements.editForm.dataset.id;
            api.editContact(name, number, id).then(() => {
                router.go('/client');
            }).catch(err => {
                alert(err);
            })
        })
    }
}
customElements.define("edit-form", editForm);    