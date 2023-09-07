import router from "../services/router.js";
import api from "../services/api.js"

export default class insertForm extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.querySelector('form').addEventListener("submit", (e) => {
            e.preventDefault();
            let name = this.querySelector('#name').value;
            let number = this.querySelector('#phone').value;
            api.insertContact(name, number).then(() => {
                router.go('/client')
            }).catch(err => {
                alert(err);
            })
        })
    }
}
customElements.define("insert-form", insertForm);    