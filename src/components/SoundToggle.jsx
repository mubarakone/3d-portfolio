import React, { useState, useEffect } from 'react';
import soundManager from '../utils/sound';

const SoundToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSound = () => {
    if (!isMounted) return;
    const isEnabled = soundManager.toggle();
    setIsMuted(!isEnabled);
  };

  // Don't render anything during SSR
  if (!isMounted) return null;

  return (
    <button 
      onClick={toggleSound} 
      className="sound-toggle"
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
    >
      {isMuted ? (
        // Muted icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.34 2.93L2.93 4.34l4.95 4.95-2.69 2.7h-3.19v4h3.19l4.76 4.76-1.6 1.6 1.41 1.41 15.55-15.55-1.41-1.41-4.95 4.95-2.82-2.83zm2.96 2.97l4.18 4.18 2.5-2.49 4.19 4.18v-11.76l-5 5v-3.76l-5.71 5.7-0.16-0.15z" fill="white"/>
        </svg>
      ) : (
        // Unmuted icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9v6h4l5 5v-16l-5 5h-4zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-0.73 2.5-2.25 2.5-4.02zm-2.5-8.77v2.06c2.89 0.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-0.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="white"/>
        </svg>
      )}
    </button>
  );
};

export default SoundToggle; 