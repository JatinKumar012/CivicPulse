const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/vote', voteRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/votingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get("/",(req, res) => {
    res.send("All things are perfect");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

