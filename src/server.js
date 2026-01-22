const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import de Rotas
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Uso das rotas
app.use('/api/videos', videoRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Backend do MentorApp está rodando! 🚀" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});