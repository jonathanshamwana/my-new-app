# Wax Print Archive **Prototype**

An immersive 3D web application for displaying ML-generated textiles with accompanying audio clips. Built with React, Three.js, and React Three Fiber.

## Features

- **3D Textile Display**: View your textiles in an immersive 3D environment
- **Audio Integration**: Click on textiles to play their associated audio clips
- **Interactive Controls**: Hover, click, and navigate around the gallery
- **Responsive Design**: Works on desktop and mobile devices
- **Customizable**: Easy to add your own textiles and audio files
- **Beautiful UI**: Modern gradient backgrounds and smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Your Own Textiles

### 1. Prepare Your Files

- **Textile Images**: High-quality images of your ML-generated textiles (recommended: 800x600px or higher)
- **Audio Files**: Audio clips that complement your textiles (MP3, WAV, or other web-compatible formats)

### 2. Update the Configuration

Edit `src/config/textiles.js` to add your textiles:

```javascript
{
  id: 6, // Unique ID
  name: "Your Textile Name",
  description: "Description of your textile",
  audioUrl: "/path/to/your/audio.mp3", // Your audio file
  textureUrl: "/path/to/your/textile.jpg", // Your textile image
  position: [x, y, z], // 3D position
  rotation: [x, y, z], // 3D rotation
  scale: [x, y, z], // 3D scale
  category: "your-category",
  tags: ["tag1", "tag2", "tag3"]
}
```

### 3. File Organization

For better organization, create folders in the `public` directory:

```
public/
├── audio/
│   ├── textile1.mp3
│   ├── textile2.wav
│   └── ...
└── images/
    ├── textile1.jpg
    ├── textile2.png
    └── ...
```

Then reference them in your configuration:

```javascript
audioUrl: "/audio/textile1.mp3",
textureUrl: "/images/textile1.jpg"
```

## Configuration Options

### Audio Configuration

```javascript
export const audioConfig = {
  defaultVolume: 0.7,        // Default volume (0.0 to 1.0)
  fadeInDuration: 1000,      // Fade in time in milliseconds
  fadeOutDuration: 500,      // Fade out time in milliseconds
  crossfade: true           // Enable crossfading between audio
};
```

### Gallery Configuration

```javascript
export const galleryConfig = {
  autoRotate: true,          // Enable auto-rotation
  autoRotateSpeed: 0.5,      // Rotation speed
  enableZoom: true,          // Enable zoom controls
  enablePan: false,          // Enable pan controls
  enableRotate: true,        // Enable rotation controls
  maxDistance: 15,           // Maximum camera distance
  minDistance: 3,            // Minimum camera distance
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ambientLightIntensity: 0.4,
  directionalLightIntensity: 1,
  pointLightIntensity: 0.5
};
```

## Controls

- **Mouse/Touch**: Click and drag to rotate the view
- **Scroll**: Zoom in and out
- **Click Textiles**: Select and play audio
- **Audio Controls**: Play, pause, and stop audio playback

## Customization

### Changing the Background

Edit the `backgroundColor` property in `galleryConfig`:

```javascript
backgroundColor: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
```

### Adjusting Lighting

Modify the light intensities in `galleryConfig`:

```javascript
ambientLightIntensity: 0.6,      // Overall lighting
directionalLightIntensity: 1.2,  // Main light source
pointLightIntensity: 0.8         // Accent lighting
```

### Textile Positioning

Use the `position`, `rotation`, and `scale` properties to arrange your textiles:

- **Position**: `[x, y, z]` coordinates in 3D space
- **Rotation**: `[x, y, z]` rotation angles in radians
- **Scale**: `[x, y, z]` size multipliers

## Troubleshooting

### Audio Not Playing

1. Check that your audio files are in a web-compatible format (MP3, WAV, OGG)
2. Ensure the audio URLs are correct and accessible
3. Check browser console for error messages
4. Some browsers require user interaction before playing audio

### Images Not Loading

1. Verify image URLs are correct
2. Ensure images are in web-compatible formats (JPG, PNG, WebP)
3. Check that image files are accessible

### Performance Issues

1. Optimize image sizes (recommended: 800x600px for good performance)
2. Compress audio files for faster loading
3. Reduce the number of textiles if experiencing lag

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- **React**: UI framework
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy your immersive textile experience! 🎨✨**
