const sharp = require('sharp');
const fs = require('fs');

async function createBrandedPoster() {
  const width = 1024;
  const height = 576;
  
  // SVG overlay with exact font styling, color scheme and positions matching the original aesthetic
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .red-header {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 15px;
          font-weight: 800;
          fill: #D3121A;
          letter-spacing: 1.5px;
        }
        .quote-line1 {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 17px;
          font-weight: 800;
          fill: #3F3F46;
          letter-spacing: 0.8px;
        }
        .quote-line2 {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 17px;
          font-weight: 900;
          fill: #18181B;
          letter-spacing: 1px;
        }
        .meta-text {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 15px;
          font-weight: 900;
          fill: #801016;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      </style>

      <!-- Top Left: Role & Tagline -->
      <text x="50" y="115" class="red-header">AI CONTENT CREATOR</text>
      <text x="50" y="145" class="quote-line1">&quot;TRANSFORMING IMAGINATION</text>
      <text x="50" y="173" class="quote-line2">INTO CINEMATIC REALITY&quot;</text>

      <!-- Bottom Left: Specializations -->
      <text x="50" y="385" class="meta-text">PROMPT ARCHITECT</text>
      <text x="50" y="408" class="meta-text">GEN-AI FILMMAKER</text>

      <!-- Top Right: Name -->
      <text x="960" y="130" text-anchor="end" class="red-header">MOHAMMED SHUHAIB</text>

      <!-- Bottom Right: Core Tools & Stack -->
      <text x="960" y="375" text-anchor="end" class="meta-text">CREATIVE TECHNOLOGIST</text>
      <text x="960" y="398" text-anchor="end" class="meta-text">RUNWAY • MIDJOURNEY</text>
      <text x="960" y="421" text-anchor="end" class="meta-text">SORA • FLUX • COMFYUI</text>
    </svg>
  `);

  await sharp('assets/hero-clean.jpg')
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 96 })
    .toFile('assets/hero-branded.jpg');

  console.log('Created assets/hero-branded.jpg successfully');
}

createBrandedPoster().catch(console.error);
