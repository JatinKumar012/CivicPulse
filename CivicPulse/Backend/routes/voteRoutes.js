const express = require('express');
const voteRouter = express.Router();
const Poll = require('../models/Poll');
const User = require('../models/User');

//Vote on Poll
voteRouter.post('/vote', async(req, res) => {
    try{
        const{userId, pollId, optionIndex} = res.body;

        const user = await User.findById(pollId);
        if(!user || user.hasVoted){
            return res.status(400).json({message:'User has alreay voted or not found'});
        }
        res.send("You can vote here..")

            const poll = await Poll.findById(pollId);
            if(!poll || optionIndex < 0 || optionIndex >= poll.options.length){
            return res.status(400).json({message:'Invalid poll or option'});
        }

        poll.options[optionIndex].votes +=1;
        poll.voters.push(userId);
        user.hasVoted = true;

        await poll.save();
        await user.save();

        res.json({
            message: "Vote cast sucessfully"
        });

    } catch(error){
        res.status(500).json({message:'Server error', error});
    }
});

// Get poll result (Admin Only)
voteRouter.get('/results/:pollId', async (req, res) => {
    try{
        const {pollId} = req.params;
        const poll  = await findById(pollId);
        if(!poll)
            return res.status(400).json({message:"Poll not found"});
            res.json({poll});
        
    } catch(error){
        res.status(500).json({message:'Server error', error});
    }
});

module.exports = voteRouter;
