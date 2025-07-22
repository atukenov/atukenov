"use client";

import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

const BackgroundMusic = () => {
  // State to track if music is playing or paused
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle play/pause on button click
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the music
      } else {
        audioRef.current.play(); // Play the music
      }
      setIsPlaying(!isPlaying); // Toggle the state
    }
  };

  const toggleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Restart the music
      if (!isPlaying) {
        audioRef.current.play(); // Play the music if it was paused
        setIsPlaying(true); // Update the state to playing
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume); // Update volume state
    if (audioRef.current) {
      audioRef.current.volume = newVolume; // Set audio volume
    }
  };

  const filledPercentage = volume * 100;

  return (
    <div
      className="mb-2 md:mb-2 flex items-center p-4 rounded-2xl max-w-[270px] mx-auto"
      style={{ boxShadow: "0px 4px 20px rgb(0 255 90 / 30%)" }}
    >
      {/* Button to toggle play/pause */}
      <button
        onClick={togglePlayPause}
        className="text-accent-default px-4 py-2 rounded text-2xl"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <input
        id="volumeSlider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume} // Bind value to state
        onChange={handleVolumeChange}
        className="volume-slider"
        style={{
          background: `linear-gradient(to right, #00ff99 ${filledPercentage}%, #e0e0e0 ${filledPercentage}%)`, // Dynamic background color based on volume
        }}
      />

      <button
        onClick={toggleRestart}
        className="text-accent-default px-4 py-2 rounded text-2xl"
      >
        {<IoMdRefresh />}
      </button>

      {/* Audio element to play the background music */}
      <audio ref={audioRef} loop>
        <source src="/assets/music/hozier-too-sweet.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BackgroundMusic;
