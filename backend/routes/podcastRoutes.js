const express = require('express');
const multer = require('multer');
const {
  getAllPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
  deletePodcast,
} = require('../controllers/podcastController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

router.get('/', getAllPodcasts);
router.get('/:id', getPodcastById);
router.post('/', upload.fields([{ name: 'audioFile' }, { name: 'coverImageFile' }]), createPodcast);
router.put('/:id', upload.fields([{ name: 'audioFile' }, { name: 'coverImageFile' }]), updatePodcast);
router.delete('/:id', deletePodcast);

module.exports = router;