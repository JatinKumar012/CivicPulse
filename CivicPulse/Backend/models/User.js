const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    aadharNumber: {type:String, required:true, unique:true},
    phoneNumber: {type:String, required:true},
    hasVoted : {type: Boolean, default:false}
});

module.exports = mongoose.model('User',UserSchema);