import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () =>{
    const [aadhaar, setAadhaar] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // function to send OTP
    const sendOtp = async () => {
        try{
            const response = await axios.post("http://localhost:5000/api/auth/send-otp", {aadhaar});
            if(response.data.success){
                setOtpSent(true);
            } else{
                setError("Failed to send OTP");
            }
        } catch(err){
            setError("Error sending OTP. Check Aadhaar number.");
        }
    };

    // Function to verify OTP
    const verifyOtp = async () => {
        try{
            const response = await axios.post("https://localhost:5000/api/auth/verify-otp", {aadhaar, otp});
            if(response.data.success){
                localStorage.setItem("token", response.data.token);
                navigate("/vote");
            } else{
                setError("Invalid OTP");
            }
        } catch(err){
            setError("Error verifying OTP");
        }
    };

    return (
        <div>
            <h2>Aadhaar Login</h2>
            {error && <p style={{color:"red"}}>{error}</p>}

            {!otpSent ? (
                <div>
                <input 
                type="text"
                placeholder="Enter Aadhaar Number"
                value = {aadhaar}
                onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={sendOtp}>Send OTP </button>
                </div>
            ): (
                <div>
                    <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                <button onClick={verifyOtp}>Verify OTP  </button>
                </div>
            )}
        </div>
    );
};

export default Login;