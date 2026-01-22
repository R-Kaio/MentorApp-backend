const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/seed', videoController.seedDatabase);
router.get('/', videoController.getAllVideos);
router.post('/', videoController.createVideo);
router.get('/:id', videoController.getVideoById);
router.delete('/:id', videoController.deleteVideo); 

module.exports = router;