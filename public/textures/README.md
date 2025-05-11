# Texture Placeholder Directory

This directory is used for texture assets that will be loaded by the 3D scene.

The loading screen will track these asset loads and display a progress bar.

Note: These textures don't need to actually exist for the loading screen to work - 
the loading mechanism will register the attempt to load them regardless, and this
will trigger the progress indicators in the loading UI. 