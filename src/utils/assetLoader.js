import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

// This utility function creates and loads a texture with a specified delay
// to simulate network loading time, ensuring we can see the loading progress
const createDelayedLoader = (url, delayMs = 500) => {
  return new Promise((resolve) => {
    const loader = new TextureLoader();
    
    // Start loading after a delay
    setTimeout(() => {
      loader.load(
        url,
        (texture) => {
          resolve(texture);
        },
        undefined,
        (error) => {
          console.error(`Error loading texture ${url}:`, error);
          resolve(null); // Resolve anyway to prevent hanging
        }
      );
    }, delayMs);
  });
};

// Hook to preload assets with artificial delays
export const useAssetPreloader = () => {
  // Define your actual asset URLs here - these should be real files in your project
  // For demo purposes, we're creating "fake" URLs that will fail to load,
  // but they'll still trigger the loading progress UI
  const assetUrls = [
    '/textures/sphere_texture.jpg', 
    '/textures/background_texture.jpg',
    '/textures/glow_texture.jpg',
    '/textures/ui_element_1.png',
    '/textures/ui_element_2.png',
    '/textures/ui_element_3.png',
    '/textures/ui_element_4.png',
    '/textures/particle_texture.png',
  ];
  
  // Create a custom loader for each asset with a different delay
  const loadAssets = async () => {
    const loadPromises = assetUrls.map((url, index) => {
      // Stagger the loads by increasing delay
      const delay = 300 + (index * 300);
      return createDelayedLoader(url, delay);
    });
    
    try {
      await Promise.all(loadPromises);
    } catch (error) {
      console.error("Failed to load some assets:", error);
    }
    
    // Return true when done
    return true;
  };
  
  return { loadAssets };
};

export default useAssetPreloader; 