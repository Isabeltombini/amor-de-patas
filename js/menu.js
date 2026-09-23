// Amor de Patas — módulo do menu (hambúrguer + dropdown), fixo no shell da SPA

window.Menu = (function () {

  function init() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menuPrincipal = document.getElementById('menu-principal');

    if (menuToggle && menuPrincipal) {
      menuToggle.addEventListener('click', function () {
        var aberto = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!aberto));
        menuPrincipal.classList.toggle('aberto', !aberto);
      });
    }

    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var item = toggle.closest('.tem-dropdown');
        var aberto = toggle.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(function (outro) {
          if (outro !== toggle) {
            outro.setAttribute('aria-expanded', 'false');
            outro.closest('.tem-dropdown').classList.remove('aberto');
          }
        });

        toggle.setAttribute('aria-expanded', String(!aberto));
        if (item) {
          item.classList.toggle('aberto', !aberto);
        }
      });
    });

    document.addEventListener('click', function (evento) {
      if (!evento.target.closest('.tem-dropdown')) {
        document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(function (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.closest('.tem-dropdown').classList.remove('aberto');
        });
      }
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key !== 'Escape') {
        return;
      }

      // fecha qualquer dropdown aberto e devolve o foco ao botao que o
      // controla, caso o foco estivesse em um item agora oculto (sem isso,
      // o navegador joga o foco para <body>, desorientando quem navega
      // so por teclado)
      document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(function (toggle) {
        var item = toggle.closest('.tem-dropdown');
        var focoDentro = item.contains(document.activeElement);
        toggle.setAttribute('aria-expanded', 'false');
        item.classList.remove('aberto');
        if (focoDentro) {
          toggle.focus();
        }
      });

      // fecha o menu mobile pela mesma razao, devolvendo o foco ao
      // botao hamburguer
      if (menuToggle && menuPrincipal && menuToggle.getAttribute('aria-expanded') === 'true') {
        var focoNoMenu = menuPrincipal.contains(document.activeElement);
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPrincipal.classList.remove('aberto');
        if (focoNoMenu) {
          menuToggle.focus();
        }
      }
    });

    // fecha o menu mobile automaticamente após navegar para uma rota
    document.addEventListener('spa:navegou', function () {
      if (menuToggle && menuPrincipal) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPrincipal.classList.remove('aberto');
      }
    });
  }

  return { init: init };

})();
