const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/hero_interior.png');
const outputPath = path.join(__dirname, '../public/hero_poster.webp');

sharp(inputPath)
  .resize(1280, 720, {
    fit: 'cover',
    position: 'center'
  })
  .webp({ quality: 75 })
  .toFile(outputPath)
  .then(info => {
    console.log('WebP Poster image generated successfully:', info);
  })
  .catch(err => {
    console.error('Error generating WebP poster image:', err);
  });
