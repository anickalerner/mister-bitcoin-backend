const authService = require('./service')

async function login(req, res) {
    const {name} = req.body
    console.log('auth controller', name);
    try {
        const user = await authService.login(name)
        req.session.user = user;
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    try {
        const user = req.body
        const account = await authService.signup(user)
        const loggedUser = await authService.login(user.name)
        req.session.user = loggedUser
        res.send(loggedUser)
    } catch (err) {
        res.status(500).send({ error: 'Could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully', user: null})
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}