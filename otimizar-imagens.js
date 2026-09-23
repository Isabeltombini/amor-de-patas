// Amor de Patas — conversão real das imagens usadas na aplicação para WebP
// Uso: node otimizar-imagens.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PASTA = path.join(__dirname, 'imagens');

// apenas as imagens efetivamente referenciadas em js/dados.js e js/templates.js
// (amor-de-patas-collage.jpg e os arquivos *-original-com-texto.jpg são
// backups/artefatos não usados pela aplicação e ficam de fora)
const IMAGENS = [
  { arquivo: 'nina.jpg', qualidade: 80 },
  { arquivo: 'simba.jpg', qualidade: 80 },
  { arquivo: 'bento.jpg', qualidade: 80 },
  { arquivo: 'amor-de-patas-institucional.jpg', qualidade: 78 }
];

function bytesParaKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function main() {
  console.log('Arquivo'.padEnd(38) + 'JPEG'.padStart(10) + 'WebP'.padStart(10) + 'Reducao'.padStart(10));
  var totalAntes = 0;
  var totalDepois = 0;

  for (var i = 0; i < IMAGENS.length; i++) {
    var item = IMAGENS[i];
    var origem = path.join(PASTA, item.arquivo);
    var destino = path.join(PASTA, item.arquivo.replace(/\.jpe?g$/i, '.webp'));

    var antes = fs.statSync(origem).size;
    await sharp(origem).webp({ quality: item.qualidade }).toFile(destino);
    var depois = fs.statSync(destino).size;

    totalAntes += antes;
    totalDepois += depois;

    var reducao = (100 - (depois / antes) * 100).toFixed(1) + '%';
    console.log(item.arquivo.padEnd(38) + bytesParaKB(antes).padStart(10) + bytesParaKB(depois).padStart(10) + reducao.padStart(10));
  }

  var reducaoTotal = (100 - (totalDepois / totalAntes) * 100).toFixed(1);
  console.log('\nTOTAL: ' + bytesParaKB(totalAntes) + ' -> ' + bytesParaKB(totalDepois) + '  (reducao de ' + reducaoTotal + '%)');
}

main().catch(function (erro) {
  console.error(erro);
  process.exit(1);
});
