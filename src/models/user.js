const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length === 0) {
                throw new Error("Password cannot be null");
            }
        }
    },
    tokens: [ {
        token: {
            type: String,
            required: true
        }
    } ]
});

userSchema.statics.findbyCredentials = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Unable to login");
    }

    if (password !== user.password) {
        throw new Error("Unable to login");
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "newcourse");

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;