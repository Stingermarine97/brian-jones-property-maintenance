const sharp = require('sharp');
const path = require('node:path');
const fs = require('node:fs');

const imagesDir = path.join(__dirname, '..', 'images');
const thumbsDir = path.join(__dirname, '..', 'public', 'thumbnails');

fs.mkdirSync(thumbsDir, { recursive: true });

const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

async function run() {
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputFile = file.replace('.png', '.jpg');
    const outputPath = path.join(thumbsDir, outputFile);

    if (fs.existsSync(outputPath)) {
      console.log(`skip  ${file}`);
      continue;
    }

    process.stdout.write(`gen   ${file} ... `);
    await sharp(inputPath)
      .rotate()
      .resize(600, null, { withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(outputPath);
    console.log('done');
  }
  console.log(`\nGenerated thumbnails in ${thumbsDir}`);
}

run().catch(err => { console.error(err); process.exit(1); });
