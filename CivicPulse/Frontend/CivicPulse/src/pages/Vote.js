import { useEffect, useState } from "react";
import { getPolls, submitVote } from "../services/api";

const Vote = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await getPolls();
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls", error);
    }
  };

  const handleVote = async () => {
    if (!selectedPoll || selectedOption === null) return;
    
    try {
      const userId = localStorage.getItem("userId"); // Assuming userId is stored after login
      const response = await submitVote(userId, selectedPoll, selectedOption);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting vote");
    }
  };

  return (
    <div>
      <h2>Vote for Your Choice</h2>
      {message && <p>{message}</p>}
      <ul>
        {polls.map((poll) => (
          <li key={poll._id} onClick={() => setSelectedPoll(poll._id)}>
            {poll.question}
          </li>
        ))}
      </ul>

      {selectedPoll && (
        <div>
          <h3>Select an Option</h3>
          {polls.find((p) => p._id === selectedPoll)?.options.map((opt, index) => (
            <div key={index}>
              <input
                type="radio"
                name="option"
                value={index}
                onChange={() => setSelectedOption(index)}
              />
              {opt.text}
            </div>
          ))}
          <button onClick={handleVote}>Submit Vote</button>
        </div>
      )}
    </div>
  );
};

export default Vote;
