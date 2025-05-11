import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import soundManager from '../src/utils/sound';

const LoadingScreen = ({ started, onStarted }) => {
  const { progress, total, loaded, item } = useProgress();
  const [pullDown, setPullDown] = useState(false);
  const lastProgressPlayed = useRef(0);
  const progressSoundInterval = useRef(10); // Play sound every 10% progress
  
  // Handle button click to initiate pull-down animation before starting the scene
  const handleEnterClick = () => {
    // Play enter button sound
    soundManager.play('enterButton');
    
    setPullDown(true);
    // Wait for animation to complete before showing 3D scene
    setTimeout(() => {
      onStarted();
    }, 500); // Match this with the CSS animation duration
  };
  
  // Handle progress changes and play loading sound at intervals
  useEffect(() => {
    // Calculate the current progress step (0, 10, 20, 30...)
    const progressStep = Math.floor(progress / progressSoundInterval.current) * progressSoundInterval.current;
    
    // If we've reached a new progress step and it's not 0, play the sound
    if (progressStep > lastProgressPlayed.current && progressStep > 0 && progressStep < 100) {
      soundManager.play('progressComplete');
      lastProgressPlayed.current = progressStep;
    }
    
    // If we've reached 100%, make sure we don't play the loading sound again
    if (progress === 100) {
      lastProgressPlayed.current = 100;
      
      const timer = setTimeout(() => {
        // Do nothing, just ensure loading screen stays visible for a moment
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  return (
    <div className={`loading-screen ${pullDown ? 'pull-down' : ''} ${started ? 'hidden' : ''}`}>
      <div className="loading-content">
        <h1 className="loading-title">Loading Portfolio</h1>
        
        {/* Progress details */}
        <div className="loading-progress">
          <span>{Math.round(progress)}%</span>
          <span>{loaded}/{total} assets</span>
        </div>
        
        {/* Progress bar with glowing effect */}
        <div className="loading-bar-container">
          <div 
            className="loading-bar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        
        {/* Current loading item */}
        <div className="loading-item">
          {item && `Loading: ${item}`}
        </div>
        
        {/* Enter button - brightens on hover */}
        {progress === 100 && (
          <button
            className="enter-button"
            onClick={handleEnterClick}
          >
            Enter
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen; 