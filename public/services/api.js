const api = {
     loadContacts: async () => {
         const result = await fetch("http://127.0.0.1:3000/contacts");
         _app.contacts = await result.json();
         window.dispatchEvent(new Event("contactsLoaded"));
     }
 }

 export default api;