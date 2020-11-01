const express = require('express')
const { getUsers, getUser, updateUser, deleteUser } = require('./controller')
const router = express.Router()

router.get('/', getUsers);
router.get('/:name', getUser)
router.put('/:name', updateUser) //requireAuth
router.delete('/:name', deleteUser) // require admin, auth

module.exports = router