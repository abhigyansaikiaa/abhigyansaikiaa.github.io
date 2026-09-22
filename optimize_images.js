import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesToOptimize = [
  'public/abhigyan.png',
  'public/assets/toolkb.png',
  'public/assets/arogyarelief.png',
  'public/assets/motionsubtitles.png',
  'public/assets/brandcey.png',
  'public/qrivna_demo_pro.png',
  'public/brollwriter_demo_pro.png',
  'public/dhankathaa_demo_pro.png'
];

async function optimizeImages() {
  for (const imgPath of imagesToOptimize) {
    if (!fs.existsSync(imgPath)) {
      console.log(`Skipping ${imgPath} - not found`);
      continue;
    }
    
    const parsedPath = path.parse(imgPath);
    const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
    
    console.log(`Optimizing ${imgPath} -> ${webpPath}`);
    
    try {
      await sharp(imgPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);
        
      console.log(`Success: ${webpPath}`);
    } catch (error) {
      console.error(`Error optimizing ${imgPath}:`, error);
    }
  }
}

optimizeImages();
