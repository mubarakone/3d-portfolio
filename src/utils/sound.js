// Sound utility for handling sound effects
class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    this.loaded = false;
  }

  // Initialize with sounds
  init(soundEffects) {
    // Skip initialization on server side
    if (typeof window === 'undefined') return;

    try {
      // Create audio objects for each sound
      Object.entries(soundEffects).forEach(([name, src]) => {
        this.sounds[name] = new window.Audio(src);
        this.sounds[name].volume = this.volume;
        
        // Add error listener for sound loading issues
        this.sounds[name].addEventListener('error', (e) => {
          console.warn(`Error loading sound ${name}:`, e);
        });
      });
      
      // Mark as loaded so we know initialization was attempted
      this.loaded = true;
    } catch (error) {
      console.error('Error initializing sound manager:', error);
    }
  }

  // Play a sound by name
  play(name) {
    // Skip on server side or if sound doesn't exist
    if (typeof window === 'undefined') return;
    if (!this.enabled || !this.sounds[name]) {
      return;
    }
    
    try {
      // Stop and reset the sound if it's already playing
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
      
      // Play the sound
      const playPromise = this.sounds[name].play();
      
      // Handle play promise (modern browsers return a promise from play())
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn(`Error playing sound ${name}:`, err);
        });
      }
    } catch (error) {
      console.warn(`Error playing sound ${name}:`, error);
    }
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Set volume (0-1)
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    
    // Update volume for all sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
    
    return this.volume;
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager; 