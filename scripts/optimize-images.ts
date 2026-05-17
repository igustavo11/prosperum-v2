import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

type Config = {
  input: string;
  output: string;
  webpQuality?: number;
  jpegQuality?: number;
  resize?: { width: number; height?: number };
};

const configs: Config[] = [
  {
    input: "hero-bg.png",
    output: "hero-bg.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "hero-building.png",
    output: "hero-building.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "premium-paralax.png",
    output: "premium-paralax.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "bg-gradiente.png",
    output: "bg-gradiente.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "portfolio/hero.jpg",
    output: "portfolio/hero.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "portfolio/property-placeholder.jpg",
    output: "portfolio/property-placeholder.webp",
    jpegQuality: 75,
    resize: { width: 800 },
  },
  {
    input: "about/abou.png",
    output: "about/abou.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
  {
    input: "about/about-bg.jpg",
    output: "about/about-bg.webp",
    webpQuality: 80,
    resize: { width: 1920 },
  },
];

async function optimize(config: Config) {
  const inputPath = path.join(IMAGES_DIR, config.input);
  const outputPath = path.join(IMAGES_DIR, config.output);

  if (!fs.existsSync(inputPath)) {
    console.log(`⏭️  Skipping ${config.input} (not found)`);
    return;
  }

  const originalSize = fs.statSync(inputPath).size;
  let pipeline = sharp(inputPath);

  if (config.resize) {
    pipeline = pipeline.resize(config.resize.width, config.resize.height, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  if (config.output.endsWith(".webp")) {
    pipeline = pipeline.webp({ quality: config.webpQuality ?? 80 });
  } else if (config.output.endsWith(".jpg") || config.output.endsWith(".jpeg")) {
    pipeline = pipeline.jpeg({ quality: config.jpegQuality ?? 75 });
  }

  await pipeline.toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

  console.log(
    `✅ ${config.input} → ${config.output} | ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${reduction}% smaller)`
  );
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + "MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + "KB";
  return bytes + "B";
}

async function main() {
  console.log("🚀 Optimizing images...\n");
  for (const config of configs) {
    await optimize(config);
  }
  console.log("\n✨ Done! Remember to update the image paths in your components.");
}

main().catch(console.error);
