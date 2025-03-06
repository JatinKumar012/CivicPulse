const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    aadhaarNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    otp: { type: String }, // Store OTP temporarily for verification
    hasVoted: { type: Boolean, default: false }
});

module.exports = model('User', UserSchema);