import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { parse, join } from 'node:path';

const larguras = [480, 800, 1200];
const pasta = 'img';

for (const arquivo of readdirSync(pasta)) {
  const { name, ext } = parse(arquivo);
  if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) continue;

  const caminho = join(pasta, arquivo);
  const { width } = await sharp(caminho).metadata();

  // Larguras menores que a original + a própria largura original (sem ampliar)
  const alvos = [...larguras.filter((l) => l < width), width];

  for (const largura of alvos) {
    await sharp(caminho)
      .resize({ width: largura })
      .webp({ quality: 80 })
      .toFile(join(pasta, `${name}-${largura}.webp`));
  }
}

console.log('Imagens otimizadas.');
