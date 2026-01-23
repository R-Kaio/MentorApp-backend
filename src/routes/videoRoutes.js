const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Rotas Públicas 
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

// Rotas Admin (Protegidas)
router.post('/', protect, adminOnly, videoController.createVideo);

// --- NOVA ROTA DE ATUALIZAÇÃO ---
router.put('/:id', protect, adminOnly, videoController.updateVideo);

router.delete('/:id', protect, adminOnly, videoController.deleteVideo);

module.exports = router;