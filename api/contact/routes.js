const express = require('express')
const { getContacts, getContact, addContact, updateContact, deleteContact } = require('./controller')
const router = express.Router()

router.get('/', getContacts);
router.get('/:id', getContact)
router.post('/', addContact) //requireAuth
router.put('/:id', updateContact) //requireAuth
router.delete('/:id', deleteContact) // require admin, auth

module.exports = router