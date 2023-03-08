const mongoose = require('mongoose')

const fprofileData = new mongoose.Schema({
    classNumber: {type: Number, required: true}
},
{collection: 'user-profiles'}
)

const model = mongoose.model('fprofileData', fprofileData)

module.exports = model