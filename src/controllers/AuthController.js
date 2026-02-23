const { loginService, signupService } = require('../services');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.sendStatus(400);
    }
    try {
        const User = await loginService(email, password);
        if (User) {
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name, !email || !password) {
        res.sendStatus(400);
    }
    try {
        const User = await signupService(email, password);
        if (User) {
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {
    login,
    signup
}