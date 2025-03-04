const express = require("express");
const router = express.Router();
const User = require('../models/User');
const otpService = require("../utils/otpService");

// Generate OTP for Aadhaar login 
router.post('/send-otp', async(req, res) => {
    const {aadhaarNumber, phoneNumber} = req.body;
    let user = await User.findOne({aadhaarNumber});

    if(!user){
        user = new User({aadhaarNumber, phnoneNumber});
        await user.save();
    }

    const otp = otpService.generateOTP();
    user.otp = otp;
    await user.save();
    otpService.sendOTP(phoneNumber, otp);
    res.json({message: "OTP sent successfully"});
});

// Verify OTP and authentication user
router.post("/verify-otp", async (req, res) => {
    const {aadhaarNumber, otp} = req.body;
    const user = await User.findOne({aadhaarNumber});
    if (!user || user.otp !== otp) 
    return res.status(400).json({ message: "Invalid OTP" });

    user.otp = null;
    await user.save();
    res.json({message:"Login Successful", userId: user._id});
});

module.exports = router;
