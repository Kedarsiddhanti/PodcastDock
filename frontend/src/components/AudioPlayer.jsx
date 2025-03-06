import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const CustomAudioPlayer = ({ src }) => {
  return (
    <AudioPlayer
      src={src}
      autoPlay={false}
      controls
      style={{ width: '100%' }}
    />
  );
};

export default CustomAudioPlayer;