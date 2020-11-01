const userService = require('./service')
module.exports = {
    getUsers,
    getUser,
    deleteUser,
    updateUser
}
async function getUsers(req, res) {
    const users = await userService.query(req.query)
    res.send(users)
}

async function getUser(req, res) {
    const user = await userService.getByName(req.params.name)
    res.send(user)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.name)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    const updatedUser = await userService.update(user)
    res.send(updatedUser)
}