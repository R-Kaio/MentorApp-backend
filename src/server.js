const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');

const User = require('./models/User'); 

const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

// Definição das Rotas Principais
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);

// --- NOVA ROTA: Estatísticas (Conta os Alunos) ---
app.get('/api/stats', async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ isAdmin: { $ne: true } });
        
        res.json({ studentCount });
    } catch (error) {
        console.error("Erro ao contar alunos:", error);
        res.json({ studentCount: 0 }); 
    }
});

// Conexão com o Banco
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Conectado!"))
    .catch((err) => console.error("Erro ao conectar no Mongo:", err));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});