const express = require('express')
const { getUsers, getUser, signup, updateUser, deleteUser } = require('./controller')
const router = express.Router()

router.get('/', getUsers);
router.get('/:id', getUser)
router.post('/signup', signup) //requireAuth
router.put('/:id', updateUser) //requireAuth
router.delete('/:id', deleteUser) // require admin, auth

module.exports = router