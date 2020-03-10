const User = require("../models/user"); // User model in the database
const express = require("express");
const auth = require("../middleware/auth"); // authenciation middleware
const router = new express.Router();

// Creates a new user
router.post("/users", async (req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login a user
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findbyCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Logout a user out of the account on device curently in use
router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// Logout a user out of all devices
router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

// Update user data
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ "password" ];
    
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }        

    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete user account
router.delete("/users/me", auth, async (req, res) => {
    const _id = req.user._id;

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

