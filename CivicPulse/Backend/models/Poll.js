const mongoose = require('mongoose');  // ✅ Import Mongoose
const { Schema, model } = mongoose; 

const PollSchema = new Schema({
    question: { type: String, required: true },
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    voters: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Tracks who voted
});

module.exports = model('Poll', PollSchema);