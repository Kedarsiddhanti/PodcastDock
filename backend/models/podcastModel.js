const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  podcaster: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
  numberOfListeners: {
    type: Number,
    default: 0,
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  playbackTime: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;