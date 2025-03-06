const express = require('express');
const router = express.Router();
const User = require('../models/User');
const otpService = require('../utils/otpService');
const aadhaarService = require('../utils/aadhaarService'); // Aadhaar API integration

// Generate OTP using Aadhaar-linked phone number
router.post('/send-otp', async (req, res) => {
    try {
        const { aadhaarNumber } = req.body;
        
        // Fetch phone number linked with Aadhaar
        const phoneNumber = await aadhaarService.getLinkedPhoneNumber(aadhaarNumber);
        if (!phoneNumber) return res.status(400).json({ message: 'Invalid Aadhaar number' });

        let user = await User.findOne({ aadhaarNumber });
        if (!user) {
            user = new User({ aadhaarNumber, phoneNumber });
        }

        const otp = otpService.generateOTP();
        user.otp = otp;
        await user.save();
        await otpService.sendOTP(phoneNumber, otp);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Verify OTP and authenticate user
router.post('/verify-otp', async (req, res) => {
    try {
        const { aadhaarNumber, otp } = req.body;
        const user = await User.findOne({ aadhaarNumber, otp });
        if (!user) return res.status(400).json({ message: 'Invalid OTP' });
        user.otp = null; // Clear OTP after verification
        await user.save();
        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
