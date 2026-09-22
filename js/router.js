// Amor de Patas — roteador da SPA (baseado em hash, sem recarregar a página)

window.Router = (function () {

  var ROTAS = {
    '': { template: 'home', titulo: 'Amor de Patas — ONG de Proteção Animal' },
    'projetos': { template: 'projetos', titulo: 'Projetos — Amor de Patas' },
    'cadastro': { template: 'cadastro', titulo: 'Cadastro — Amor de Patas' }
  };

  // âncoras que pertencem à view "home", mas não são rotas próprias
  var ANCORAS_HOME = ['sobre', 'adocao', 'ajudar', 'contato'];

  var appEl = null;

  function parseHash() {
    var hash = window.location.hash.replace(/^#\/?/, ''); // remove "#" ou "#/"
    var partes = hash.split('/').filter(Boolean);
    var primeira = partes[0] || '';

    if (Object.prototype.hasOwnProperty.call(ROTAS, primeira)) {
      return { rota: primeira, ancora: partes[1] || null };
    }

    if (ANCORAS_HOME.indexOf(primeira) !== -1) {
      return { rota: '', ancora: primeira };
    }

    return { rota: '', ancora: null };
  }

  function render() {
    var alvo = parseHash();
    var config = ROTAS[alvo.rota];

    appEl.innerHTML = window.Templates[config.template]();
    document.title = config.titulo;

    atualizarLinkAtivo(alvo.rota);

    // biblioteca externa: o <canvas> é recriado a cada navegação,
    // então o gráfico precisa ser (re)inicializado a cada render
    if (window.Grafico) {
      window.Grafico.init(appEl);
    }

    if (alvo.ancora) {
      var elAncora = document.getElementById(alvo.ancora);
      if (elAncora) {
        elAncora.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo(0, 0);
    }

    document.dispatchEvent(new CustomEvent('spa:navegou', { detail: alvo }));
  }

  function atualizarLinkAtivo(rotaAtual) {
    document.querySelectorAll('#menu-principal a[href^="#/"]').forEach(function (link) {
      var hrefRota = link.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
      link.classList.toggle('ativo', hrefRota === rotaAtual);
    });
  }

  function init() {
    appEl = document.getElementById('conteudo-principal');

    // event delegation: listeners fixados uma única vez no contêiner
    // persistente, funcionando para qualquer conteúdo injetado depois
    window.Modal.init(appEl);
    window.Validacao.init(appEl); // roda antes do Toast, para marcar erros primeiro
    window.Toast.initForms(appEl);
    window.Favoritos.init(appEl);

    window.addEventListener('hashchange', render);
    render(); // renderiza a rota inicial (com base na hash atual, se houver)
  }

  return { init: init };

})();
