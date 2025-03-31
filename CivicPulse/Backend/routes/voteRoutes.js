const express = require("express");
const voteRouter = express.Router();
const Poll = require("../models/Poll");
const User = require("../models/User");

// ✅ Vote on Poll
voteRouter.post("/vote", async (req, res) => {
    try {
        const { userId, pollId, optionIndex } = req.body;

        // ✅ Check if user exists
        const user = await User.findById(userId);
        if (!user || user.hasVoted) {
            return res.status(400).json({ message: "User has already voted or not found" });
        }

        // ✅ Fetch the poll
        const poll = await Poll.findById(pollId);
        if (!poll || optionIndex < 0 || optionIndex >= poll.options.length) {
            return res.status(400).json({ message: "Invalid poll or option" });
        }

        // ✅ Update poll & user data
        poll.options[optionIndex].votes += 1;
        poll.voters.push(userId);
        user.hasVoted = true;

        await poll.save();
        await user.save();

        res.json({ message: "Vote cast successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Get Poll Results (Admin Only)
voteRouter.get("/results/:pollId", async (req, res) => {
    try {
        const { pollId } = req.params;
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(400).json({ message: "Poll not found" });
        }
        res.json({ poll });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = voteRouter;
