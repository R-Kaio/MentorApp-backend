const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); 
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONEXÃO COM MONGODB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 MongoDB Conectado!"))
    .catch((err) => console.error("Erro ao conectar no Mongo:", err));

app.use(cors());
app.use(express.json());

app.use('/api/videos', videoRoutes);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});