const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs", { title: "TimeTable" });
});

router.get("*", (req, res) => {
    res.send("404 Page Not Found");
});

module.exports = router;