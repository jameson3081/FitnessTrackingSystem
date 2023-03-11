const mongoose = require('mongoose')

const fprofileData = new mongoose.Schema({
    idFromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
    fullname: {type: String, required: true, unique: true},
},
{collection: 'user-profiles'}
)

const model = mongoose.model('fprofileData', fprofileData)

module.exports = model