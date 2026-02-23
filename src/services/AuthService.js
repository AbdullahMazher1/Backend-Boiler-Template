const User = require('../models/UserModel');
const isMatch = require('../utils/validator/IsMatch');

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            const status = await isMatch(password, user.password);
            if (status) {
                return user;
            };
        }
        return null;
    } catch (error) {
        throw error;
    }
}

const signupService = async (name, email, password) => {
    try {
        const user = User.create({ name, email, password });
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

module.exports = { loginService, signupService }