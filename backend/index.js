const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const podcastRoutes = require('./routes/podcastRoutes');
const userRoutes = require('./routes/userRoutes');
const ttsRoutes = require('./routes/ttsRoutes');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the request body size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Increase the request body size limit for URL-encoded data

app.use('/api/podcasts', podcastRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});