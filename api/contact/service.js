
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
    const collection = await dbService.getCollection('contacts');
    try {
        const contacts = await collection.find().toArray();
        return contacts
    } catch (err) {
        console.log('ERROR: cannot find contacts')
        throw err;
    }
}

async function getById(id) {
    const collection = await dbService.getCollection('contacts')
    try {
        const contact = await collection.findOne({ "_id": ObjectId(id) })
        return contact
    } catch (err) {
        console.log(`ERROR: while finding contact ${id}`)
        throw err;
    }
}
async function remove(id) {
    const collection = await dbService.getCollection('contacts')
    try {
        await collection.deleteOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log(`ERROR: cannot remove contact ${id}`)
        throw err;
    }
}

async function update(id, contact) {

    const collection = await dbService.getCollection('contacts')
    var replacement = JSON.parse(JSON.stringify(contact));    
    delete replacement._id
    try {
        await collection.updateOne({ "_id": ObjectId(id) }, { $set: replacement })
        return contact
    } catch (err) {
        console.log(`ERROR: cannot update contact ${contact._id}`)
        throw err;
    }
}

async function add(contact) {
    const collection = await dbService.getCollection('contacts')
    try {
        console.log('contact:', contact);
        await collection.insertOne(contact);
        return contact;
    } catch (err) {
        console.log(`ERROR: cannot insert contact`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //     criteria.contact.name = filterBy.txt
    // }
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
    return criteria;
}


