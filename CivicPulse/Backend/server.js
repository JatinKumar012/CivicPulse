const express = require("express");
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
app.use(express.json());
app.use(cors());;

// Connect to MongoD
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

app.get("/", (req, res) => {
    res.send("request is accepted");
    // res.send(`Running on Port ${PORT}`)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening and running on port  ${PORT}`);
});
