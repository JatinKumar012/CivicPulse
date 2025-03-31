import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Send OTP for Login
export const sendOtp = async (aadhaarNumber) => {
  return await axios.post(`${API_URL}/auth/send-otp`, { aadhaarNumber });
};

// ✅ Verify OTP for Login
export const verifyOtp = async (aadhaarNumber, otp) => {
  return await axios.post(`${API_URL}/auth/verify-otp`, { aadhaarNumber, otp });
};

// ✅ Fetch Polls
export const getPolls = async () => {
  return await axios.get(`${API_URL}/vote/polls`);
};

// ✅ Submit Vote
export const submitVote = async (userId, pollId, optionIndex) => {
  return await axios.post(`${API_URL}/vote/vote`, { userId, pollId, optionIndex });
};

// ✅ Fetch Results (Admin)
export const getResults = async (pollId) => {
  return await axios.get(`${API_URL}/vote/results/${pollId}`);
};
