const mongoose = require('mongoose')

const fprofileData = new mongoose.Schema({
    idFromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
    classNumber: {type: Number, required: true},
    fullname: {type: String, required: true, unique: true},
    sex: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    bmi: {type: Number, required: true},
    bmr: {type: Number, required: true},
    act: {type: String, required: true},
    goal: {type: String, required: true},
    time: {type: String, required: true},
    kg: {type: String, required: true},
    goalKcal: {type: String, required: true},
},
{collection: 'user-profiles'}
)

const model = mongoose.model('fprofileData', fprofileData)

module.exports = model