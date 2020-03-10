const express = require("express");
require("./db/mongoose");
require("./app");
const userRouter = require("./routers/user");
const indexRouter = require("./routers/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(indexRouter); // Contains home and 404

app.listen(port, () => {
    console.log("Server is up on port " + port);
});