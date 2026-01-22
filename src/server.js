const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');

// Importação das Rotas
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

// Definição das Rotas
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Conectado!"))
    .catch((err) => console.error("Erro ao conectar no Mongo:", err));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});