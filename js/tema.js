// Amor de Patas — alternância de tema (claro/escuro), persistida em localStorage

window.Tema = (function () {

  var CHAVE = 'amorDePatas.tema';

  function obterEscolhaSalva() {
    return localStorage.getItem(CHAVE); // 'escuro' | 'claro' | null (sem preferência salva)
  }

  function prefereSistemaEscuro() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function estaEscuro() {
    var escolha = obterEscolhaSalva();
    if (escolha) {
      return escolha === 'escuro';
    }
    return prefereSistemaEscuro();
  }

  function atualizarBotao(escuro) {
    var botao = document.querySelector('.tema-toggle');
    if (!botao) {
      return;
    }
    botao.setAttribute('aria-pressed', String(escuro));
    botao.setAttribute('aria-label', escuro ? 'Ativar modo claro' : 'Ativar modo escuro');
  }

  function alternar() {
    var novoEscuro = !estaEscuro();
    var tema = novoEscuro ? 'escuro' : 'claro';
    localStorage.setItem(CHAVE, tema);
    document.documentElement.setAttribute('data-tema', tema);
    atualizarBotao(novoEscuro);
  }

  function init() {
    var escolha = obterEscolhaSalva();
    if (escolha) {
      // o usuário já escolheu antes: aplica explicitamente, sobrepondo o SO
      document.documentElement.setAttribute('data-tema', escolha);
    }
    // sem escolha salva: não mexe no atributo data-tema, deixa o CSS
    // (prefers-color-scheme) decidir; só sincroniza o estado visual do botão
    atualizarBotao(estaEscuro());

    var botao = document.querySelector('.tema-toggle');
    if (botao) {
      botao.addEventListener('click', alternar);
    }

    // se o usuário nunca escolheu manualmente, acompanha em tempo real
    // mudanças na preferência do sistema operacional
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!obterEscolhaSalva()) {
          atualizarBotao(estaEscuro());
        }
      });
    }
  }

  return { init: init };

})();
