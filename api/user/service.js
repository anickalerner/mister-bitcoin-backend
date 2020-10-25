
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
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

async function getById(id) {
    const collection = await dbService.getCollection('users')
    try {
        const user = await collection.findOne({ "_id": ObjectId(id) })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${id}`)
        throw err;
    }
}
async function remove(id) {
    const collection = await dbService.getCollection('users')
    try {
        await collection.deleteOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${id}`)
        throw err;
    }
}

async function update(id, user) {

    const collection = await dbService.getCollection('users')
    var replacement = JSON.parse(JSON.stringify(user));    
    delete replacement._id
    try {
        await collection.updateOne({ "_id": ObjectId(id) }, { $set: replacement })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
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


