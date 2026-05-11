import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");

const PNG_SIZES = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "favicon-48x48.png": 48,
  "apple-touch-icon.png": 180,
  "icon-192.png": 192,
  "icon-512.png": 512,
};

async function pngFromSvg(svgPath, size) {
  const svg = await readFile(svgPath);
  return sharp(svg, { density: Math.max(72, size * 4) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function generateFavicons(svgPath) {
  const written = [];
  for (const [name, size] of Object.entries(PNG_SIZES)) {
    const buf = await pngFromSvg(svgPath, size);
    const out = resolve(PUBLIC, name);
    await writeFile(out, buf);
    written.push({ file: name, bytes: buf.length });
    console.log(`  wrote ${name} (${size}x${size}) — ${buf.length} bytes`);
  }
  return written;
}

async function generateIco(svgPath) {
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(sizes.map((s) => pngFromSvg(svgPath, s)));
  const ico = await pngToIco(buffers);
  const out = resolve(PUBLIC, "favicon.ico");
  await writeFile(out, ico);
  console.log(`  wrote favicon.ico (${sizes.join("+")}) — ${ico.length} bytes`);
  return { file: "favicon.ico", bytes: ico.length };
}

function ogTemplate({ width, height, title, subtitle, domain }) {
  // Logo mark at left, headline + subtitle to its right, domain bottom-right.
  const markSize = Math.round(height * 0.34);
  const markX = Math.round(width * 0.07);
  const markY = Math.round((height - markSize) / 2 - height * 0.04);
  const textX = markX + markSize + Math.round(width * 0.04);
  const titleY = markY + Math.round(markSize * 0.45);
  const subY = titleY + Math.round(height * 0.11);
  const titleSize = Math.round(height * 0.085);
  const subSize = Math.round(height * 0.045);
  const domainSize = Math.round(height * 0.035);

  // House mark scaled to markSize. ViewBox is 64x64.
  const scale = markSize / 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5f7fb"/>
      <stop offset="100%" stop-color="#e2eaf5"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.15" r="0.7">
      <stop offset="0%" stop-color="#00529c" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#00529c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="0" y="${height - 8}" width="${width}" height="8" fill="#ffb81c"/>

  <!-- House mark -->
  <g transform="translate(${markX} ${markY}) scale(${scale})">
    <rect width="64" height="64" rx="14" fill="#00529c"/>
    <g fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32 L32 14 L52 32"/>
      <path d="M18 30 L18 52 L46 52 L46 30"/>
    </g>
    <rect x="28" y="38" width="8" height="14" rx="1.5" fill="#ffb81c"/>
  </g>

  <!-- Title -->
  <text x="${textX}" y="${titleY}" font-family="'IBM Plex Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue','Arial',sans-serif" font-size="${titleSize}" font-weight="700" fill="#00529c">${title}</text>
  <!-- Subtitle -->
  <text x="${textX}" y="${subY}" font-family="'IBM Plex Sans Thai','Sukhumvit Set','Thonburi',sans-serif" font-size="${subSize}" font-weight="500" fill="#36475c">${subtitle}</text>

  <!-- Domain bottom right -->
  <text x="${width - Math.round(width * 0.04)}" y="${height - Math.round(height * 0.06)}" text-anchor="end" font-family="'IBM Plex Sans Thai','Helvetica Neue','Arial',sans-serif" font-size="${domainSize}" font-weight="700" fill="#ffb81c">${domain}</text>
</svg>`;
}

async function generateSocialImage(name, width, height) {
  const svg = ogTemplate({
    width,
    height,
    title: "คำนวณค่างวดผ่อนบ้าน",
    subtitle: "ฟรี · ดอกเบี้ย ค่างวด ตารางผ่อนรายปี",
    domain: "phonbaan.com",
  });
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const out = resolve(PUBLIC, name);
  await writeFile(out, buf);
  console.log(`  wrote ${name} (${width}x${height}) — ${buf.length} bytes`);
  return { file: name, bytes: buf.length };
}

async function main() {
  const markSvg = resolve(PUBLIC, "logo-mark.svg");
  console.log("Generating favicons from logo-mark.svg…");
  const pngs = await generateFavicons(markSvg);
  const ico = await generateIco(markSvg);

  console.log("\nGenerating social share images…");
  const og = await generateSocialImage("og-image.png", 1200, 630);
  const tw = await generateSocialImage("twitter-image.png", 1200, 600);

  const all = [...pngs, ico, og, tw];
  const total = all.reduce((s, x) => s + x.bytes, 0);
  console.log(`\nTotal generated: ${all.length} files, ${(total / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
