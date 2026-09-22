// Amor de Patas — módulo de modais (dialog nativo), com event delegation

window.Modal = (function () {

  function init(container) {
    // um único listener no contêiner persistente, delegando para os
    // elementos de modal que são criados e recriados a cada navegação da SPA
    container.addEventListener('click', function (evento) {
      var gatilho = evento.target.closest('[data-modal-target]');
      if (gatilho) {
        var modal = document.querySelector(gatilho.getAttribute('data-modal-target'));
        if (modal) {
          modal.showModal();
        }
        return;
      }

      var botaoFechar = evento.target.closest('[data-modal-close]');
      if (botaoFechar) {
        var modalPai = botaoFechar.closest('dialog.modal');
        if (modalPai) {
          modalPai.close();
        }
        return;
      }

      // clique no backdrop (fora da caixa do modal) também fecha
      if (evento.target.tagName === 'DIALOG' && evento.target.classList.contains('modal')) {
        evento.target.close();
      }
    });
  }

  return { init: init };

})();
