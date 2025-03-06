const otpService = {
    generateOTP: () => Math.floor(100000 + Math.random() * 900000).toString(),
    sendOTP: (phoneNumber, otp) => {
        console.log(`Sending OTP ${otp} to ${phoneNumber}`);  // Reolace with real SMS API
    }
};

module.exports = otpService;


