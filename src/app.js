const path = require("path");
const express = require("express");
// const ejs = require("ejs");

const app = express();
// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
// const partialsPath = path.join(__dirname, "../templates/partials");

// Setup hadlebars engine and views location
app.set("view engine", "ejs");
app.set("views", viewsPath);
// ejs.

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));