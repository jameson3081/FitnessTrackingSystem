const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String}
},
{collection: 'system-users'}
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model

