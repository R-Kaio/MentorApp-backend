const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Rotas Públicas 
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

// Rotas Admin
router.post('/', protect, adminOnly, videoController.createVideo);
router.delete('/:id', protect, adminOnly, videoController.deleteVideo);

// Rota de Seed (pública por enquanto)
router.get('/seed', videoController.seedDatabase);

module.exports = router;