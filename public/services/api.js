/** @module services/api */

/**
 * all the tlaking with backend api happens here.
 * @namespace
 * @property {method} loadContacts - see {@link module:services/api~loadContacts loadContacts}
 * @property {method} deleteContact - see {@link module:services/api~deleteContact deleteContact}
 * @property {method} insertContact - see {@link module:services/api~insertContact insertContact}
 * @property {method} editContact - see {@link module:services/api~editContact editContact}
 * @property {method} binarySearch - see {@link module:services/api~binarySearch binarySearch}
 */
const api = {

    /**
     * <p>get the contacts from the server and put it in _app.contacts.</p>
     * <p>after contacts got loaded, dispatch contactsLoaded event. some components will react to this event.</p>
     * @method loadContacts
     */
    loadContacts: async () => {
        const result = await fetch("http://127.0.0.1:3000/contacts");
        _app.contacts = await result.json();
        window.dispatchEvent(new Event("contactsLoaded"));
    },

    /**
     * <p> sends a delete request</p>
     * <p> also removes the contact from the _app.contacts.</p>
     * <p> to find the contact and remove it from _app.contacts a binary search will happen by the id.</p>
     * <p> contactDeleted event will be dispatched</p>
     * @method deleteContact 
     * @param {string} id - id of contact to be deleted(must be parsed to int).
     */
    deleteContact: async (id) => {
        const result = await fetch(`http://127.0.0.1:3000/contacts/${id}`, { method: 'DELETE' });
        id = parseInt(id);
        if (result.ok) {
            _app.contacts.splice(api.binarySearch(id), 1);
            window.dispatchEvent(new Event("contactDeleted"));
        }
    },
    /**
     * <p> sends a POST request to insert the new contact into database</p>
     * <p> also inserts the new contact into the _app.contact.</p>
     * <p> the id of the new inserted contact will be received from the server response. put the new contact into _app.contacts as well.</p>
     * <p> contactInserted event will be dispatched. id, name and number will be available in detail of the event.</p>
     * @method insertContact 
     * @param {string} name - name of the new contact to be created
     * @param {string} number - number of the new contact to be created
     */
    insertContact: async (name, number) => {
        let data = { name: name, number: number };
        const result = await fetch('http://127.0.0.1:3000/contacts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const responce = await result.json();
        if (responce.statusCode > 399) {
            throw new Error("something went wrong");
        }
        let id = responce[0].insertId;
        window.dispatchEvent(new CustomEvent("contactInserted", { detail: {id: id, name: name, number: number }}));

    },

     /**
     * <p> sends a PUT request to edit a contact</p>
     * <p> if name or number are empty but the other one has some value just update the one that has a new value. </p>
     * <p> do a binary search on _app.contacts to find the contact by id. then update it.</p>
     * <p> contactEdited event will be dispatched. name and number will be available in detail of the event.</p>
     * @method editContact
     * @param {number} id - id of contact to be edited
     * @param {string} name - the new name of contact
     * @param {string} number - the new number of contact
     */
    editContact: async (name, number, id) => {
        const index = api.binarySearch(id);

        const nonEmptyName = /\S+/;
        if (!nonEmptyName.test(name))
            name = _app.contacts[index].name;
        const nonEmptyNumber = /\d+/;
        if (!nonEmptyNumber.test(number))
            number = _app.contacts[index].number;

        _app.contacts[index].name = name;
        _app.contacts[index].number = number;

        let data = {name: name, number: number, id: id};
        const result = await fetch(`http://127.0.0.1:3000/contacts/${id}`, {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data) 
        })
        const responce = await result.json();
        if (responce.statusCode > 399) {
            throw new Error("something went wrong");
        }
        window.dispatchEvent(new CustomEvent("contactEdited", { detail: {name: name, number: number }}))
    },

    /**
     * <p> simple binary search to find a contact by its id in the _app.contacts array.</p>
     * @method binarySearch
     * @param {number} id - id of the contact to be find.
     */
    binarySearch: (id) => {
        let low = 0;
        let high = _app.contacts.length - 1;
        let mid;
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (_app.contacts[mid].id == id) {
                return mid;
            }
            else if (_app.contacts[mid].id < id) {
                low = mid + 1;
            }
            else {
                high = mid - 1
            }
        }
    }
}

export default api;