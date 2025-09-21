// Configuration file for textile data
// Add your ML-generated textiles and audio clips here

export const textileData = [
  {
    id: 1,
    name: "African Wax Print",
    description: "Vibrant traditional African wax print fabric with bold geometric patterns",
    audioUrl: "/ah146-final-clippety-clop.mp3", // Textile-specific audio
    textureUrl: "/african-wax-print-fabric-162-172476.jpg",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    category: "traditional",
    tags: ["african", "wax-print", "geometric", "vibrant"]
  },
  {
    id: 2,
    name: "Ankara Fabric",
    description: "Rich Ankara fabric showcasing intricate cultural patterns and designs",
    audioUrl: "/ah146-final-clippety-clop.mp3", // Textile-specific audio
    textureUrl: "/AnkaraFabric-240116.jpg",
    position: [3, 0, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [0.8, 0.8, 0.8],
    category: "cultural",
    tags: ["ankara", "cultural", "intricate", "rich"]
  },
  {
    id: 3,
    name: "Textile Pattern",
    description: "Contemporary textile design with modern aesthetic appeal",
    audioUrl: "/ah146-final-clippety-clop.mp3", // Textile-specific audio
    textureUrl: "/images.jpeg",
    position: [-3, 0, 0],
    rotation: [0, -Math.PI / 4, 0],
    scale: [0.9, 0.9, 0.9],
    category: "contemporary",
    tags: ["modern", "contemporary", "aesthetic", "pattern"]
  },
  {
    id: 4,
    name: "Geometric Harmony",
    description: "Striking geometric patterns creating visual harmony and balance",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/b4c4cc241ebfc2b83119457f49b1d49d.jpg",
    position: [0, 3, 0],
    rotation: [0, Math.PI / 2, 0],
    scale: [0.85, 0.85, 0.85],
    category: "geometric",
    tags: ["geometric", "harmony", "balance", "striking"]
  },
  {
    id: 5,
    name: "Floral Elegance",
    description: "Delicate floral motifs with elegant flowing designs",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/23b8c7e85c97d84e604b528515992d50.jpg",
    position: [0, -3, 0],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.9, 0.9, 0.9],
    category: "floral",
    tags: ["floral", "elegant", "delicate", "flowing"]
  },
  {
    id: 6,
    name: "Abstract Flow",
    description: "Dynamic abstract patterns with organic flowing movement",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/b86d85a5d87eab80a27e457a7f660df2.jpg",
    position: [4.5, 1.5, 0],
    rotation: [0, Math.PI / 6, 0],
    scale: [0.75, 0.75, 0.75],
    category: "abstract",
    tags: ["abstract", "dynamic", "organic", "flowing"]
  },
  {
    id: 7,
    name: "Textured Weave",
    description: "Rich textured weave with depth and dimensional appeal",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/66b1ff37985868f3fee97830b6d4e2b9.jpg",
    position: [-4.5, 1.5, 0],
    rotation: [0, -Math.PI / 6, 0],
    scale: [0.8, 0.8, 0.8],
    category: "textured",
    tags: ["textured", "weave", "depth", "dimensional"]
  },
  {
    id: 8,
    name: "Minimalist Design",
    description: "Clean minimalist patterns with sophisticated simplicity",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/306f3f0d2822b9824d10c50b202a7ebe.jpg",
    position: [4.5, -1.5, 0],
    rotation: [0, Math.PI / 3, 0],
    scale: [0.85, 0.85, 0.85],
    category: "minimalist",
    tags: ["minimalist", "clean", "sophisticated", "simple"]
  },
  {
    id: 9,
    name: "Bold Statement",
    description: "Bold and dramatic patterns making a powerful visual statement",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/e60ad39712225a2627901a8f1355281d.jpg",
    position: [-4.5, -1.5, 0],
    rotation: [0, -Math.PI / 3, 0],
    scale: [0.8, 0.8, 0.8],
    category: "bold",
    tags: ["bold", "dramatic", "powerful", "statement"]
  },
  {
    id: 10,
    name: "Artistic Expression",
    description: "Artistic textile expression with creative and innovative patterns",
    audioUrl: "/ah146-final-clippety-clop.mp3",
    textureUrl: "/e00c3903c1e944b367da6dff6578ebf3.jpg",
    position: [0, 0, 3],
    rotation: [0, 0, 0],
    scale: [0.9, 0.9, 0.9],
    category: "artistic",
    tags: ["artistic", "creative", "innovative", "expression"]
  }
];

// Audio configuration
export const audioConfig = {
  defaultVolume: 0.6, // Slightly higher volume for textile audio
  fadeInDuration: 1000, // Faster fade in for textile audio
  fadeOutDuration: 500, // Faster fade out for textile audio
  crossfade: true,
  ambientAudioUrl: "/in god's childlike hands.mp3", // Persistent ambient audio
  ambientVolume: 0.3 // Lower volume for background ambient
};

// Gallery configuration
export const galleryConfig = {
  autoRotate: true,
  autoRotateSpeed: 0.3, // Slower rotation for more peaceful experience
  enableZoom: true,
  enablePan: false,
  enableRotate: true,
  maxDistance: 20, // Increased for more textiles
  minDistance: 3,
  backgroundColor: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', // Dark night sky
  ambientLightIntensity: 0.4,
  directionalLightIntensity: 1,
  pointLightIntensity: 0.5
};

// Instructions for adding new textiles:
/*
1. Add a new object to the textileData array
2. Replace the audioUrl with your actual audio file URL
3. Replace the textureUrl with your actual textile image URL
4. Adjust position, rotation, and scale as needed
5. Add appropriate category and tags for organization

Example:
{
  id: 11,
  name: "Your Textile Name",
  description: "Description of your textile",
  audioUrl: "/path/to/your/audio.mp3",
  textureUrl: "/path/to/your/textile.jpg",
  position: [x, y, z],
  rotation: [x, y, z],
  scale: [x, y, z],
  category: "your-category",
  tags: ["tag1", "tag2", "tag3"]
}
*/ 