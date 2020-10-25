const contactService = require('./service')
module.exports = {
    getContacts,
    getContact,
    addContact,
    deleteContact,
    updateContact
}
async function getContacts(req, res) {
    const contacts = await contactService.query(req.query)
    res.send(contacts)
}

async function getContact(req, res) {
    const contact = await contactService.getById(req.params.id)
    res.send(contact)
}

async function addContact(req, res) {
    const contact = req.body;
    const addedContact = await contactService.add(contact);
    res.send(addedContact);
}

async function deleteContact(req, res) {
    await contactService.remove(req.params.id)
    res.end()
}

async function updateContact(req, res) {
    const contact = req.body;
    const updatedContact = await contactService.update(req.params.id, contact)
    res.send(updatedContact)
}