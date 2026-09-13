import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const targets = [
  "public/images/services",
  "public/images/valeurs",
  "public/images/about",
];

const singleFiles = ["public/images/electricien-montreal-commercial.jpg"];

async function convert(filePath) {
  const ext = path.extname(filePath);
  const base = filePath.slice(0, -ext.length);
  const webpPath = `${base}.webp`;

  const before = fs.statSync(filePath).size;
  await sharp(filePath).webp({ quality: 85 }).toFile(webpPath);
  const after = fs.statSync(webpPath).size;

  fs.unlinkSync(filePath);

  console.log(
    `${filePath} -> ${webpPath}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${Math.round(
      (1 - after / before) * 100
    )}% smaller)`
  );
}

const files = [
  ...targets.flatMap((dir) => fs.readdirSync(dir).map((f) => path.join(dir, f))),
  ...singleFiles,
].filter((f) => [".png", ".jpg", ".jpeg"].includes(path.extname(f).toLowerCase()));

for (const f of files) {
  await convert(f);
}
