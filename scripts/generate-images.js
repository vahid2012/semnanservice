#!/usr/bin/env node
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), 'public', 'images');
const FEATURED_DIR = join(OUTPUT_DIR, 'featured');
const INCONTENT_DIR = join(OUTPUT_DIR, 'in-content');
const BLOG_DIR = join(OUTPUT_DIR, 'blog');

// Base gradient colors for different appliance types
const colorPalettes = [
  { primary: '#0d6e6e', secondary: '#1a8a8a', accent: '#c8821e' }, // teal
  { primary: '#1a5276', secondary: '#2874a6', accent: '#d4ac0d' }, // blue
  { primary: '#7d3c98', secondary: '#a569bd', accent: '#f39c12' }, // purple (only for variety)
  { primary: '#196f3d', secondary: '#27ae60', accent: '#e67e22' }, // green
  { primary: '#922b21', secondary: '#cb4335', accent: '#f1c40f' }, // red
  { primary: '#34495e', secondary: '#5d6d7e', accent: '#e67e22' }, // dark blue-gray
  { primary: '#b9770e', secondary: '#d4ac0d', accent: '#0d6e6e' }, // gold
  { primary: '#1a5276', secondary: '#2e86c1', accent: '#c8821e' }, // blue variant
];

// Simple SVG generator for featured images (1200x675)
function generateFeaturedSVG(paletteIndex, label) {
  const p = colorPalettes[paletteIndex % colorPalettes.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${p.primary};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${p.secondary};stop-opacity:1" />
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.05)" />
      </pattern>
    </defs>
    <rect width="1200" height="675" fill="url(#bg)" />
    <rect width="1200" height="675" fill="url(#dots)" />
    <rect x="0" y="575" width="1200" height="100" fill="${p.accent}" opacity="0.9" />
    <rect x="60" y="250" width="200" height="8" fill="rgba(255,255,255,0.3)" rx="4" />
    <rect x="60" y="280" width="300" height="8" fill="rgba(255,255,255,0.2)" rx="4" />
    <circle cx="900" cy="300" r="120" fill="rgba(255,255,255,0.08)" />
    <circle cx="950" cy="250" r="80" fill="rgba(255,255,255,0.05)" />
  </svg>`;
}

// Simple SVG for in-content images (800x600)
function generateInContentSVG(paletteIndex, label) {
  const p = colorPalettes[paletteIndex % colorPalettes.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${p.secondary};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${p.primary};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg2)" />
    <rect x="0" y="500" width="800" height="100" fill="${p.accent}" opacity="0.8" />
    <rect x="50" y="200" width="180" height="6" fill="rgba(255,255,255,0.25)" rx="3" />
    <rect x="50" y="220" width="220" height="6" fill="rgba(255,255,255,0.15)" rx="3" />
    <circle cx="600" cy="250" r="90" fill="rgba(255,255,255,0.08)" />
  </svg>`;
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function generateImage(svgBuffer, outputPath, width, height) {
  await sharp(svgBuffer)
    .resize(width, height)
    .webp({ quality: 80 })
    .toFile(outputPath);
}

async function main() {
  console.log('Generating images...');

  await ensureDir(FEATURED_DIR);
  await ensureDir(INCONTENT_DIR);

  // Import data files (use dynamic import with ts-node or just hardcode)
  const appliances = [
    { slugEn: 'yakhchal', slug: 'یخچال' },
    { slugEn: 'labasshooyi', slug: 'لباسشویی' },
    { slugEn: 'zarfshooyi', slug: 'ظرفشویی' },
    { slugEn: 'cooler-gazy', slug: 'کولر-گازی' },
    { slugEn: 'pakij', slug: 'پکیج' },
    { slugEn: 'telvizion', slug: 'تلویزیون' },
    { slugEn: 'microwave', slug: 'مایکروویو' },
    { slugEn: 'jaroberghi', slug: 'جاروبرقی' },
  ];

  const cities = [
    { slugEn: 'semnan' }, { slugEn: 'shahroud' }, { slugEn: 'garmsar' }, { slugEn: 'damghan' },
    { slugEn: 'mehdishahr' }, { slugEn: 'ivanaki' }, { slugEn: 'sardkhaneh' }, { slugEn: 'shahmirzad' },
    { slugEn: 'aradan' }, { slugEn: 'bastam' }, { slugEn: 'miyami' }, { slugEn: 'kalate-kheirabad' },
    { slugEn: 'deyhim' }, { slugEn: 'amirieh' }, { slugEn: 'sorkheh' }, { slugEn: 'roudbar' },
    { slugEn: 'fouladmahalleh' }, { slugEn: 'lalehrud' }, { slugEn: 'biarjmand' }, { slugEn: 'jorji' },
    { slugEn: 'sabzevar' }, { slugEn: 'neyshabur' },
  ];

  let count = 0;

  // 1. Appliance hub images (featured + in-content)
  for (let i = 0; i < appliances.length; i++) {
    const app = appliances[i];
    const featuredSvg = generateFeaturedSVG(i, app.slug);
    const inContentSvg = generateInContentSVG(i, app.slug);

    await generateImage(Buffer.from(featuredSvg), join(FEATURED_DIR, `${app.slugEn}-hub.webp`), 1200, 675);
    await generateImage(Buffer.from(inContentSvg), join(INCONTENT_DIR, `${app.slugEn}-hub-incontent.webp`), 800, 600);
    count += 2;
  }

  // 2. City hub images (featured + in-content)
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const paletteIdx = i % colorPalettes.length;
    const featuredSvg = generateFeaturedSVG(paletteIdx, city.slugEn);
    const inContentSvg = generateInContentSVG(paletteIdx, city.slugEn);

    await generateImage(Buffer.from(featuredSvg), join(FEATURED_DIR, `${city.slugEn}-city-hub.webp`), 1200, 675);
    await generateImage(Buffer.from(inContentSvg), join(INCONTENT_DIR, `${city.slugEn}-city-hub-incontent.webp`), 800, 600);
    count += 2;
  }

  // 3. Level-3 pages: appliance x city (160 featured + 160 in-content = 320)
  for (let i = 0; i < appliances.length; i++) {
    const app = appliances[i];
    for (let j = 0; j < cities.length; j++) {
      const city = cities[j];
      // Rotate palette by both appliance and city to avoid identical images
      const paletteIdx = (i * cities.length + j) % colorPalettes.length;
      const featuredSvg = generateFeaturedSVG(paletteIdx, `${app.slugEn}-${city.slugEn}`);
      const inContentSvg = generateInContentSVG(paletteIdx, `${app.slugEn}-${city.slugEn}`);

      await generateImage(
        Buffer.from(featuredSvg),
        join(FEATURED_DIR, `${app.slugEn}-${city.slugEn}-featured.webp`),
        1200, 675
      );
      await generateImage(
        Buffer.from(inContentSvg),
        join(INCONTENT_DIR, `${app.slugEn}-${city.slugEn}-incontent.webp`),
        800, 600
      );
      count += 2;
    }
  }

  // 4. Pillar page images
  const pillarFeatured = generateFeaturedSVG(0, 'pillar');
  const pillarInContent = generateInContentSVG(0, 'pillar');
  await generateImage(Buffer.from(pillarFeatured), join(FEATURED_DIR, 'appliance-hub-pillar.webp'), 1200, 675);
  await generateImage(Buffer.from(pillarInContent), join(INCONTENT_DIR, 'appliance-hub-incontent.webp'), 800, 600);
  count += 2;

  // 5. Tow truck images (hub + city)
  const towHubFeatured = generateFeaturedSVG(4, 'towtruck');
  const towHubInContent = generateInContentSVG(4, 'towtruck');
  await generateImage(Buffer.from(towHubFeatured), join(FEATURED_DIR, 'towtruck-hub.webp'), 1200, 675);
  await generateImage(Buffer.from(towHubInContent), join(INCONTENT_DIR, 'towtruck-hub-incontent.webp'), 800, 600);
  count += 2;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const paletteIdx = (i + 4) % colorPalettes.length;
    const featuredSvg = generateFeaturedSVG(paletteIdx, `towtruck-${city.slugEn}`);
    const inContentSvg = generateInContentSVG(paletteIdx, `towtruck-${city.slugEn}`);

    await generateImage(Buffer.from(featuredSvg), join(FEATURED_DIR, `towtruck-${city.slugEn}-featured.webp`), 1200, 675);
    await generateImage(Buffer.from(inContentSvg), join(INCONTENT_DIR, `towtruck-${city.slugEn}-incontent.webp`), 800, 600);
    count += 2;
  }

  // 6. Scrap images (hub + city)
  const scrapHubFeatured = generateFeaturedSVG(5, 'scrap');
  const scrapHubInContent = generateInContentSVG(5, 'scrap');
  await generateImage(Buffer.from(scrapHubFeatured), join(FEATURED_DIR, 'scrap-hub.webp'), 1200, 675);
  await generateImage(Buffer.from(scrapHubInContent), join(INCONTENT_DIR, 'scrap-hub-incontent.webp'), 800, 600);
  count += 2;

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const paletteIdx = (i + 5) % colorPalettes.length;
    const featuredSvg = generateFeaturedSVG(paletteIdx, `scrap-${city.slugEn}`);
    const inContentSvg = generateInContentSVG(paletteIdx, `scrap-${city.slugEn}`);

    await generateImage(Buffer.from(featuredSvg), join(FEATURED_DIR, `scrap-${city.slugEn}-featured.webp`), 1200, 675);
    await generateImage(Buffer.from(inContentSvg), join(INCONTENT_DIR, `scrap-${city.slugEn}-incontent.webp`), 800, 600);
    count += 2;
  }

  // 7. Default OG image
  const ogDefault = generateFeaturedSVG(0, 'og-default');
  await generateImage(Buffer.from(ogDefault), join(OUTPUT_DIR, 'og-default.webp'), 1200, 675);
  count += 1;

  // 8. Blog images (featured + in-content for each post + hub)
  await ensureDir(BLOG_DIR);

  const blogPosts = [
    { slugEn: 'yedek-kesh-better-towtruck' },
    { slugEn: 'crash-car-crane-transport' },
    { slugEn: 'towtruck-24h-semnan' },
    { slugEn: 'fridge-not-cold-freezer-ok' },
    { slugEn: 'washing-machine-no-foam' },
    { slugEn: 'ac-blowing-warm-air' },
    { slugEn: 'dishwasher-water-leak' },
    { slugEn: 'e99-error-iranradiator-boiler' },
    { slugEn: 'tv-not-turning-on-after-power-outage' },
    { slugEn: 'water-heater-not-heating' },
  ];

  // Blog hub image
  const blogHubSvg = generateFeaturedSVG(3, 'blog-hub');
  await generateImage(Buffer.from(blogHubSvg), join(BLOG_DIR, 'blog-hub-featured.webp'), 1200, 675);
  count += 1;

  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    const paletteIdx = (i + 2) % colorPalettes.length;
    const featuredSvg = generateFeaturedSVG(paletteIdx, post.slugEn);
    const inContentSvg = generateInContentSVG(paletteIdx, post.slugEn);
    await generateImage(Buffer.from(featuredSvg), join(BLOG_DIR, `${post.slugEn}-featured.webp`), 1200, 675);
    await generateImage(Buffer.from(inContentSvg), join(BLOG_DIR, `${post.slugEn}-incontent.webp`), 800, 600);
    count += 2;
  }

  console.log(`Done! Generated ${count} WebP images.`);
}

main().catch((err) => {
  console.error('Error generating images:', err);
  process.exit(1);
});
