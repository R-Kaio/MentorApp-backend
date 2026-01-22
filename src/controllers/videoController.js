const Video = require('../models/Video');

// Listar todos 
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pegar um por ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: "Vídeo não encontrado" });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar um vídeo
exports.createVideo = async (req, res) => {
    try {
        const newVideo = new Video(req.body);
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Popular o seed (apenas teste)
exports.seedDatabase = async (req, res) => {
    try {
        await Video.deleteMany({}); 

        const initialData = [
            {
                title: "Introdução à Lógica de Programação",
                author: "Prof. Carlos",
                tag: "Iniciante",
                views: 1240,
                isPremium: false,
                image: "https://img.youtube.com/vi/M576WGiDBdQ/maxresdefault.jpg",
                videoUrl: "https://www.youtube.com/embed/M576WGiDBdQ",
                description: "Conceitos fundamentais da programação."
            },
            {
                title: "Masterclass: Arquitetura Limpa",
                author: "Menta Dev",
                tag: "Avançado",
                views: 850,
                isPremium: true,
                image: "https://via.placeholder.com/300x160/c29437/ffffff?text=Clean+Code",
                videoUrl: "",
                description: "Clean Architecture para devs seniors."
            },
            {
                title: "CSS Grid e Flexbox na Prática",
                author: "Ana Front",
                tag: "Frontend",
                views: 2100,
                isPremium: false,
                image: "https://img.youtube.com/vi/3elGSZSWTbM/maxresdefault.jpg",
                videoUrl: "https://www.youtube.com/embed/3elGSZSWTbM",
                description: "Domine layouts modernos com CSS."
            }
        ];

        await Video.insertMany(initialData);
        res.json({ message: "Banco de dados populado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

// Deletar um vídeo
exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return res.status(404).json({ message: "Vídeo não encontrado" });
        }

        res.json({ message: "Vídeo deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};