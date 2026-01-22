// Simulação de Banco de Dados (somente teste)
const videos = [
    {
        id: 1,
        title: "Introdução à Lógica de Programação",
        author: "Prof. Carlos",
        tag: "Iniciante",
        views: 1240,
        isPremium: false,
        image: "https://img.youtube.com/vi/M576WGiDBdQ/maxresdefault.jpg", 
        videoUrl: "https://www.youtube.com/embed/M576WGiDBdQ",
        description: "Aprenda os conceitos fundamentais da programação: variáveis, condicionais e loops."
    },
    {
        id: 2,
        title: "Masterclass: Arquitetura Limpa",
        author: "Menta Dev",
        tag: "Avançado",
        views: 850,
        isPremium: true,
        image: "https://via.placeholder.com/300x160/c29437/ffffff?text=Clean+Code",
        videoUrl: "", 
        description: "Entenda como organizar seu código para escalas gigantescas usando Clean Architecture."
    },
    {
        id: 3,
        title: "CSS Grid e Flexbox na Prática",
        author: "Ana Front",
        tag: "Frontend",
        views: 2100,
        isPremium: false,
        image: "https://img.youtube.com/vi/3elGSZSWTbM/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/3elGSZSWTbM",
        description: "Pare de brigar com o CSS. Domine layouts modernos com Grid e Flexbox."
    }
];

exports.getAllVideos = (req, res) => {
    res.json(videos);
};

exports.getVideoById = (req, res) => {
    const { id } = req.params;
    const video = videos.find(v => v.id == id);

    if (!video) {
        return res.status(404).json({ message: "Vídeo não encontrado" });
    }

    res.json(video);
};