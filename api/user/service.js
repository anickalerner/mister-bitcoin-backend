
const dbService = require('../../services/db.service')

module.exports = {
    query,
    getByName,
    remove,
    update,
    add    
}

async function query() {
    const collection = await dbService.getCollection('users');
    try {
        const users = await collection.find().toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getByName(name) {
    const collection = await dbService.getCollection('users')
    try {
        const user = await collection.findOne({ "name": name })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${name}`)
        throw err;
    }
}
async function remove(name) {
    const collection = await dbService.getCollection('users')
    try {
        await collection.deleteOne({ "name": name })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${name}`)
        throw err;
    }
}

async function update(user) {
console.log(user);
    const collection = await dbService.getCollection('users')
    var replacement = JSON.parse(JSON.stringify(user));    
    try {
        await collection.updateOne({ "name": user.name }, { $set: replacement })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user.name}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('users')
    try {
        console.log('user:', user);
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.user.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
    return criteria;
}


