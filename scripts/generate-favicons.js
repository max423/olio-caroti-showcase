import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

(async () => {
  try {
    const root = path.resolve(process.cwd());
    const svgPath = path.join(root, 'public', 'static', 'olio-icon.svg');
    if (!fs.existsSync(svgPath)) {
      console.error('SVG source not found:', svgPath);
      process.exit(1);
    }

    const outDir = path.join(root, 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const sizes = [16, 32];
    const pngBuffers = [];

    for (const s of sizes) {
      const pngPath = path.join(outDir, `favicon-${s}x${s}.png`);
      await sharp(svgPath)
        .resize(s, s, { fit: 'contain' })
        .png()
        .toFile(pngPath);
      console.log('Wrote', pngPath);
      pngBuffers.push(fs.readFileSync(pngPath));
    }

    // generate ico from pngs
    const icoBuffer = await pngToIco(pngBuffers);
    const icoPath = path.join(outDir, 'favicon.ico');
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('Wrote', icoPath);

    // also write standard sizes as png (already done)
    console.log('Favicons generated successfully.');
  } catch (err) {
    console.error('Error generating favicons:', err);
    process.exit(1);
  }
})();
