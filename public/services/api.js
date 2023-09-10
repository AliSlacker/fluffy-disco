const api = {
    loadContacts: async () => {
        const result = await fetch("http://127.0.0.1:3000/contacts");
        _app.contacts = await result.json();
        window.dispatchEvent(new Event("contactsLoaded"));
    },

    deleteContact: async (id) => {
        const result = await fetch(`http://127.0.0.1:3000/contacts/${id}`, { method: 'DELETE' });
        id = parseInt(id);
        if (result.ok) {
            _app.contacts.splice(api.binarySearch(id), 1);
            window.dispatchEvent(new Event("contactDeleted"));
        }
    },

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

    editContact: async (name, number, id) => {
        const index = api.binarySearch(id);
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