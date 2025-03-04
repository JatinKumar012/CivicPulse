const PollSchema = new mongoose.Schema({
    question: {type: String, required:true},
    option : [{text: String, votes: {type: Number, default:0}}],
    voters : [{type: mongoose.Schema.Type.ObjectId, ref: 'User'}] // Tracks who voted
});

module.exports = mongoose.model('Poll', PollSchema);