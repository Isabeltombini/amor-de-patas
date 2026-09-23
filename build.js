// Amor de Patas — build de produção: minifica CSS, JS e HTML para dist/
// Uso: npm run build

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const { minify: minifyHtml } = require('html-minifier-terser');

const RAIZ = __dirname;
const DIST = path.join(RAIZ, 'dist');

function tamanho(caminho) {
  return fs.statSync(caminho).size;
}

function bytesParaKB(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

async function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
  fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
  fs.mkdirSync(path.join(DIST, 'html'), { recursive: true });
  fs.mkdirSync(path.join(DIST, 'imagens'), { recursive: true });

  var relatorio = [];
  var totalOriginal = 0;
  var totalMinificado = 0;

  // --- CSS: cada arquivo minificado individualmente, mesmos nomes/pastas ---
  var arquivosCss = fs.readdirSync(path.join(RAIZ, 'css')).filter(function (f) { return f.endsWith('.css'); });
  for (var i = 0; i < arquivosCss.length; i++) {
    var nome = arquivosCss[i];
    var origem = path.join(RAIZ, 'css', nome);
    var destino = path.join(DIST, 'css', nome);
    var antes = tamanho(origem);
    var resultado = await esbuild.build({
      entryPoints: [origem],
      outfile: destino,
      minify: true,
      loader: { '.css': 'css' },
      logLevel: 'silent'
    });
    var depois = tamanho(destino);
    totalOriginal += antes;
    totalMinificado += depois;
    relatorio.push({ arquivo: 'css/' + nome, antes: antes, depois: depois });
  }

  // --- JS: cada arquivo minificado individualmente, preservando a ordem de
  // carregamento sequencial via <script> (o projeto usa IIFE + namespace
  // global, não ES Modules, então cada arquivo é minificado à parte em vez
  // de agrupado em um único bundle) ---
  var arquivosJs = fs.readdirSync(path.join(RAIZ, 'js')).filter(function (f) { return f.endsWith('.js'); });
  for (var j = 0; j < arquivosJs.length; j++) {
    var nomeJs = arquivosJs[j];
    var origemJs = path.join(RAIZ, 'js', nomeJs);
    var destinoJs = path.join(DIST, 'js', nomeJs);
    var antesJs = tamanho(origemJs);
    await esbuild.build({
      entryPoints: [origemJs],
      outfile: destinoJs,
      minify: true,
      target: 'es2018',
      logLevel: 'silent'
    });
    var depoisJs = tamanho(destinoJs);
    totalOriginal += antesJs;
    totalMinificado += depoisJs;
    relatorio.push({ arquivo: 'js/' + nomeJs, antes: antesJs, depois: depoisJs });
  }

  // --- HTML: minifica removendo comentários/espaços, mantendo os atributos
  // necessários para acessibilidade (aria-*, alt, role) e sem quebrar os
  // atributos data-* usados pelo JS (data-modal-target, data-toast etc.) ---
  var origemHtml = path.join(RAIZ, 'html', 'index.html');
  var destinoHtml = path.join(DIST, 'html', 'index.html');
  var antesHtml = tamanho(origemHtml);
  var conteudoHtml = fs.readFileSync(origemHtml, 'utf8');
  var htmlMinificado = await minifyHtml(conteudoHtml, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: false, // os <script> aqui só referenciam arquivos externos (src=), nada inline a minificar
    removeAttributeQuotes: false,
    keepClosingSlash: true
  });
  fs.writeFileSync(destinoHtml, htmlMinificado, 'utf8');
  var depoisHtml = tamanho(destinoHtml);
  totalOriginal += antesHtml;
  totalMinificado += depoisHtml;
  relatorio.push({ arquivo: 'html/index.html', antes: antesHtml, depois: depoisHtml });

  // --- redireciona a raiz do site publicado (GitHub Pages serve dist/ na
  // raiz do domínio) para html/index.html, mantendo a mesma estrutura de
  // pastas do projeto-fonte em vez de achatar os caminhos relativos ---
  var redirectHtml = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">'
    + '<meta http-equiv="refresh" content="0; url=html/index.html">'
    + '<title>Amor de Patas</title></head><body>'
    + '<p>Redirecionando para <a href="html/index.html">a aplicação</a>...</p>'
    + '</body></html>';
  fs.writeFileSync(path.join(DIST, 'index.html'), redirectHtml, 'utf8');

  // --- imagens: copia só os arquivos referenciados pela aplicação (JPEG + WebP
  // dos 4 usados em js/dados.js e js/templates.js). Ficam de fora da build de
  // produção o amor-de-patas-collage.jpg (nunca referenciado) e os backups
  // *-original-com-texto.jpg, evitando enviar ~450 KB de peso morto ao deploy ---
  var imagensUsadas = [
    'nina.jpg', 'nina.webp',
    'simba.jpg', 'simba.webp',
    'bento.jpg', 'bento.webp',
    'amor-de-patas-institucional.jpg', 'amor-de-patas-institucional.webp'
  ];
  for (var k = 0; k < imagensUsadas.length; k++) {
    fs.copyFileSync(path.join(RAIZ, 'imagens', imagensUsadas[k]), path.join(DIST, 'imagens', imagensUsadas[k]));
  }

  // --- relatório ---
  console.log('\nArquivo'.padEnd(30) + 'Antes'.padStart(12) + 'Depois'.padStart(12) + 'Reducao'.padStart(12));
  relatorio.forEach(function (r) {
    var reducao = (100 - (r.depois / r.antes) * 100).toFixed(1) + '%';
    console.log(r.arquivo.padEnd(30) + bytesParaKB(r.antes).padStart(12) + bytesParaKB(r.depois).padStart(12) + reducao.padStart(12));
  });
  var reducaoTotal = (100 - (totalMinificado / totalOriginal) * 100).toFixed(1);
  console.log('\nTOTAL (CSS+JS+HTML): ' + bytesParaKB(totalOriginal) + ' -> ' + bytesParaKB(totalMinificado) + '  (reducao de ' + reducaoTotal + '%)');
}

main().catch(function (erro) {
  console.error(erro);
  process.exit(1);
});
