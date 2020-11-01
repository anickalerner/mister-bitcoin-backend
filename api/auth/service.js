const userService = require('../user/service')

const saltRounds = 10

async function login(name) {
    console.log('login', name);
    if (!name) return Promise.reject('Please insert a name')
    const user = await userService.getByName(name)
    if (!user) return Promise.reject('Name doesn\'t exist');
    return user;
}

async function signup(user) {
    console.log(user);
    if (!user.name) return Promise.reject('Please insert a name')
    return userService.add(user)
}

module.exports = {
    signup,
    login,
}