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
            const response = await axios.post("http://localhost:500/api/auth/send-otp", {aadhaar});
            if(response.data.success){
                setOtpSent(true);
            } else{
                setError("Failed to send OTP");
            }
        } catch(error){
            setError("Error sending OTP. Check Aadhaar number.");
        }
    };




}