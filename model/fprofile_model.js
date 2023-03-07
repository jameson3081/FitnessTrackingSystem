const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    classNumber: {type: Number, required: true}
},
{collection: 'user-profiles'}
)

const model = mongoose.model('ProfileSchema', ProfileSchema)

module.exports = model