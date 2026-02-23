const { loginService, signupService } = require('../services');
const hashPassword = require('../utils/validator/DecryptPassword')
const generateToken = require('../utils/validator/generateToken')

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({
            'success': false,
            'message': 'Please provide email and password'
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
        res.json({
            'success': false,
            'message': 'User Not Found'
        })
    } catch (error) {
        console.log('ERROR in LOGIN API: ', error);
        res.json({ 'success': false, 'error': error });
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.json({
            'success': false,
            'message': 'Please provide name, email and password'
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
                'userId': User._id,
                'token': token,
                'data': {
                    User,
                },
            });
        }
    } catch (error) {
        console.log('ERROR in SIGN UP API: ', error)
        if (error.code === 11000) res.json({ 'success': false, 'message': 'User Already Exists' });
        res.json({ 'success': false, 'error': error });
    }
}

module.exports = {
    login,
    signup
}