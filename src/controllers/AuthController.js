const { loginService, signupService } = require('../services');
const hashPassword = require('../utils/validator/DecryptPassword')
const generateToken = require('../utils/validator/generateToken')

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password required'
        });
    }
    try {
        const User = await loginService(email, password);
        if (User !== null) {
            const token = generateToken(User._id);
            res.json({
                'success': true,
                'message': 'User Logged In Successfully',
                'userId': User._id,
                'token': token,
                'data': {
                    User,
                },
            });
            return;
        }
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email and password required'
        });
        return;
    }
    try {
        const hash = await hashPassword(password);
        const User = await signupService(name, email, hash);
        const token = generateToken(User._id);
        if (User) {
            res.json({
                'success': true,
                'message': 'User Registered Successfully',
                'data': {
                    'userId': User._id,
                    'token': token,
                    'name:': User.name,
                    'email': User.email,
                    'timestamp': User.createdAt
                },
            });
        }
    } catch (error) {
        if (error.code === 11000) res.status(400).json({ 'success': false, 'message': 'User Already Exists' });
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {
    login,
    signup
}