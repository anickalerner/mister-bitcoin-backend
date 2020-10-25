const userService = require('./service')
module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser
}
async function getUsers(req, res) {
    const users = await userService.query(req.query)
    res.send(users)
}

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function addUser(req, res) {
    const user = req.body;
    const addedUser = await userService.add(user);
    res.send(addedUser);
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    const updatedUser = await userService.update(req.params.id, user)
    res.send(updatedUser)
}