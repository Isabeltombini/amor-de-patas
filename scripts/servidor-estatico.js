// Servidor estático mínimo, sem dependências externas, para servir uma raiz
// de arquivos via HTTP (necessário para o Lighthouse medir de forma realista,
// já que muitas auditorias não funcionam corretamente sobre file://).
// Uso: node scripts/servidor-estatico.js <pasta-raiz> <porta>

const http = require('http');
const fs = require('fs');
const path = require('path');

const raiz = path.resolve(process.argv[2]);
const porta = Number(process.argv[3]);

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

http.createServer(function (req, res) {
  var urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') {
    urlPath = '/html/index.html';
  }
  var caminho = path.join(raiz, urlPath);
  if (!caminho.startsWith(raiz)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(caminho, function (erro, dados) {
    if (erro) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    var ext = path.extname(caminho).toLowerCase();
    res.writeHead(200, { 'Content-Type': TIPOS[ext] || 'application/octet-stream' });
    res.end(dados);
  });
}).listen(porta, function () {
  console.log('Servindo ' + raiz + ' em http://localhost:' + porta);
});
