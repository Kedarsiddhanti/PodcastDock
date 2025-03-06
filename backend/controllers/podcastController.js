const Podcast = require('../models/podcastModel');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

// Get all podcasts
const getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get podcast by ID
const getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.json(podcast);
  } catch (error) {
    console.error('Error fetching podcast:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new podcast
const createPodcast = async (req, res) => {
  try {
    const { title, podcaster, category, description, audioUrl, coverImageUrl, playbackTime } = req.body;
    const audioFile = req.files['audioFile'] ? req.files['audioFile'][0] : null;
    const coverImageFile = req.files['coverImageFile'] ? req.files['coverImageFile'][0] : null;

    let audioResult, coverImageResult;

    if (audioFile) {
      // Upload audio file to Cloudinary
      audioResult = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: 'video',
        folder: 'podcasts/audio',
      });
      fs.unlinkSync(audioFile.path); 
    } else if (audioUrl) {
      audioResult = { secure_url: audioUrl };
    } else {
      return res.status(400).json({ message: 'Audio file or URL is required' });
    }

    if (coverImageFile) {
      // Upload cover image to Cloudinary
      coverImageResult = await cloudinary.uploader.upload(coverImageFile.path, {
        folder: 'podcasts/images',
      });
      fs.unlinkSync(coverImageFile.path); 
    } else if (coverImageUrl) {
      coverImageResult = { secure_url: coverImageUrl };
    } else {
      return res.status(400).json({ message: 'Cover image file or URL is required' });
    }

    const newPodcast = new Podcast({
      title,
      podcaster,
      category,
      description,
      audioUrl: audioResult.secure_url,
      coverImageUrl: coverImageResult.secure_url,
      playbackTime, 
    });

    const savedPodcast = await newPodcast.save();
    res.status(201).json(savedPodcast);
  } catch (error) {
    console.error('Error creating podcast:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update podcast
const updatePodcast = async (req, res) => {
  try {
    const { title, podcaster, category, description, audioUrl, coverImageUrl, playbackTime } = req.body;
    const audioFile = req.files['audioFile'] ? req.files['audioFile'][0] : null;
    const coverImageFile = req.files['coverImageFile'] ? req.files['coverImageFile'][0] : null;

    let audioResult, coverImageResult;

    if (audioFile) {
      // Upload audio file to Cloudinary
      audioResult = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: 'video', // Cloudinary treats audio files as video
        folder: 'podcasts/audio',
      });
      fs.unlinkSync(audioFile.path); // Remove temporary file
    } else if (audioUrl) {
      audioResult = { secure_url: audioUrl };
    }

    if (coverImageFile) {
      // Upload cover image to Cloudinary
      coverImageResult = await cloudinary.uploader.upload(coverImageFile.path, {
        folder: 'podcasts/images',
      });
      fs.unlinkSync(coverImageFile.path); // Remove temporary file
    } else if (coverImageUrl) {
      coverImageResult = { secure_url: coverImageUrl };
    }

    const updatedPodcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      {
        title,
        podcaster,
        category,
        description,
        audioUrl: audioResult ? audioResult.secure_url : audioUrl,
        coverImageUrl: coverImageResult ? coverImageResult.secure_url : coverImageUrl,
        playbackTime,
      },
      { new: true }
    );

    if (!updatedPodcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.json(updatedPodcast);
  } catch (error) {
    console.error('Error updating podcast:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete podcast
const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.json({ message: 'Podcast deleted' });
  } catch (error) {
    console.error('Error deleting podcast:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
  deletePodcast,
};