const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = authService.registerUser(req.body);
        res.status(201).json(user); 
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const loggedUser = authService.loginUser(email, password);

        if(loggedUser.token) {
            res.json(result);
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {register, login}