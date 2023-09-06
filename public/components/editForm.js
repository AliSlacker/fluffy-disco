import router from "../services/router.js";
import api from "../services/api.js"

export default class editForm extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.querySelector('button').addEventListener('click', () =>{
            api.deleteContact( _app.elements.form.dataset.id).then( () => {router.go('/client');});
        });
    }
}
customElements.define("edit-form", editForm);    