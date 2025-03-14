const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Podcast = require('./models/podcastModel');

dotenv.config();
connectDB();

const podcasts = [
  {
    title: "The Daily",
    podcaster: "The New York Times",
    category: "News",
    description: "A daily news podcast.",
    audioUrl: "https://example.com/audio1.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=1",
    numberOfListeners: 1500000,
    numberOfLikes: 50000,
    playbackTime: "25:30",
  },
  {
    title: "Stuff You Should Know",
    podcaster: "iHeartRadio",
    category: "Education",
    description: "Learn interesting facts about various topics.",
    audioUrl: "https://example.com/audio2.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=2",
    numberOfListeners: 2000000,
    numberOfLikes: 75000,
    playbackTime: "45:20",
  },
  {
    title: "TED Talks Daily",
    podcaster: "TED",
    category: "Education",
    description: "Thought-provoking talks from TED.",
    audioUrl: "https://example.com/audio3.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=3",
    numberOfListeners: 1200000,
    numberOfLikes: 60000,
    playbackTime: "15:00",
  },
  {
    title: "The Joe Rogan Experience",
    podcaster: "Joe Rogan",
    category: "Entertainment",
    description: "Long-form conversations with guests.",
    audioUrl: "https://example.com/audio4.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=4",
    numberOfListeners: 3000000,
    numberOfLikes: 100000,
    playbackTime: "120:00",
  },
  {
    title: "How I Built This",
    podcaster: "NPR",
    category: "Business",
    description: "Stories behind the people who created successful companies.",
    audioUrl: "https://example.com/audio5.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=5",
    numberOfListeners: 1800000,
    numberOfLikes: 80000,
    playbackTime: "50:45",
  },
  {
    title: "Radiolab",
    podcaster: "WNYC Studios",
    category: "Science",
    description: "Investigating a strange world.",
    audioUrl: "https://example.com/audio6.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=6",
    numberOfListeners: 1400000,
    numberOfLikes: 70000,
    playbackTime: "60:00",
  },
  {
    title: "The Tim Ferriss Show",
    podcaster: "Tim Ferriss",
    category: "Business",
    description: "Interviews with world-class performers.",
    audioUrl: "https://example.com/audio7.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=7",
    numberOfListeners: 1600000,
    numberOfLikes: 75000,
    playbackTime: "90:00",
  },
  {
    title: "Freakonomics Radio",
    podcaster: "Freakonomics, LLC",
    category: "Economics",
    description: "Exploring the hidden side of everything.",
    audioUrl: "https://example.com/audio8.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=8",
    numberOfListeners: 1300000,
    numberOfLikes: 65000,
    playbackTime: "55:00",
  },
  {
    title: "Planet Money",
    podcaster: "NPR",
    category: "Economics",
    description: "The economy explained.",
    audioUrl: "https://example.com/audio9.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=9",
    numberOfListeners: 1100000,
    numberOfLikes: 55000,
    playbackTime: "20:00",
  },
  {
    title: "The Moth",
    podcaster: "The Moth",
    category: "Storytelling",
    description: "True stories told live.",
    audioUrl: "https://example.com/audio10.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=10",
    numberOfListeners: 1000000,
    numberOfLikes: 50000,
    playbackTime: "35:00",
  },
  {
    title: "Science Vs",
    podcaster: "Gimlet",
    category: "Science",
    description: "Tackling fads, trends, and the opinionated mob.",
    audioUrl: "https://example.com/audio11.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=11",
    numberOfListeners: 900000,
    numberOfLikes: 45000,
    playbackTime: "40:00",
  },
  {
    title: "Serial",
    podcaster: "Serial Productions",
    category: "True Crime",
    description: "A new story told over multiple episodes.",
    audioUrl: "https://example.com/audio12.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=12",
    numberOfListeners: 2500000,
    numberOfLikes: 120000,
    playbackTime: "60:00",
  },
  {
    title: "The Daily Stoic",
    podcaster: "Daily Stoic",
    category: "Philosophy",
    description: "Daily wisdom and practical advice.",
    audioUrl: "https://example.com/audio13.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=13",
    numberOfListeners: 800000,
    numberOfLikes: 40000,
    playbackTime: "10:00",
  },
  {
    title: "The Happiness Lab",
    podcaster: "Dr. Laurie Santos",
    category: "Psychology",
    description: "Exploring the science of happiness.",
    audioUrl: "https://example.com/audio14.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=14",
    numberOfListeners: 700000,
    numberOfLikes: 35000,
    playbackTime: "30:00",
  },
  {
    title: "The History Extra Podcast",
    podcaster: "BBC History Magazine",
    category: "History",
    description: "Interviews with notable historians.",
    audioUrl: "https://example.com/audio15.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=15",
    numberOfListeners: 600000,
    numberOfLikes: 30000,
    playbackTime: "45:00",
  },
  {
    title: "The Minimalists Podcast",
    podcaster: "Joshua Fields Millburn & Ryan Nicodemus",
    category: "Lifestyle",
    description: "Living a meaningful life with less.",
    audioUrl: "https://example.com/audio16.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=16",
    numberOfListeners: 500000,
    numberOfLikes: 25000,
    playbackTime: "50:00",
  },
  {
    title: "The Tony Robbins Podcast",
    podcaster: "Tony Robbins",
    category: "Motivation",
    description: "Strategies and tactics for achieving success.",
    audioUrl: "https://example.com/audio17.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=17",
    numberOfListeners: 400000,
    numberOfLikes: 20000,
    playbackTime: "55:00",
  },
  {
    title: "The Dave Ramsey Show",
    podcaster: "Dave Ramsey",
    category: "Finance",
    description: "Practical advice for life and money.",
    audioUrl: "https://example.com/audio18.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=18",
    numberOfListeners: 300000,
    numberOfLikes: 15000,
    playbackTime: "60:00",
  },
  {
    title: "The GaryVee Audio Experience",
    podcaster: "Gary Vaynerchuk",
    category: "Business",
    description: "Insights and advice from Gary Vaynerchuk.",
    audioUrl: "https://example.com/audio19.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=19",
    numberOfListeners: 200000,
    numberOfLikes: 10000,
    playbackTime: "65:00",
  },
  {
    title: "The Ed Mylett Show",
    podcaster: "Ed Mylett",
    category: "Motivation",
    description: "Interviews with peak performers.",
    audioUrl: "https://example.com/audio20.mp3",
    coverImageUrl: "https://picsum.photos/300/300?random=20",
    numberOfListeners: 100000,
    numberOfLikes: 5000,
    playbackTime: "70:00",
  },
];

const seedDatabase = async () => {
  try {
    await Podcast.deleteMany(); // Clear existing data
    await Podcast.insertMany(podcasts); // Insert new data
    console.log('Database seeded');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();