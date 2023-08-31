let contactList;
window.addEventListener("DOMContentLoaded", () => {
    contactList = document.querySelector("ul");
    showContacts(contactList);

});

async function showContacts(contactList){
    const responce = await fetch("http://127.0.0.1:3000/contacts");
    const contacts = await responce.json();
    for (const contact of contacts){
        const listItem = document.createElement('li');
        listItem.textContent = `name:${contact.name} , number:${contact.number}`;
        contactList.appendChild(listItem);
    }
}