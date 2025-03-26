const express = require("express");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminRouter = express.Router(); 
const SECRET_KEY = "your_secret_key";

// Admin Login Route
adminRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; 
        const admin = await Admin.findOne({ username }); 
        
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ adminId: admin._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.adminId = decoded.adminId;
        next();
    });
};

module.exports = { adminRouter, authenticateAdmin };
