const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'meu_segredo_super_secreto';

// Registrar Usuário 
exports.register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "E-mail já cadastrado" });

        const user = await User.create({ name, email, password, isAdmin });

        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "E-mail ou senha inválidos" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "E-mail ou senha inválidos" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            SECRET_KEY, 
            { expiresIn: '1d' } 
        );

        res.json({ 
            token, 
            user: { name: user.name, email: user.email, isAdmin: user.isAdmin } 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};