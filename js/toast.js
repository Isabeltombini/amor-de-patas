// Amor de Patas — módulo de toasts (notificações não obstrutivas), com event delegation

window.Toast = (function () {

  function show(mensagem) {
    var container = document.getElementById('toast-container');
    if (!container) {
      return;
    }

    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<span class="toast-icone" aria-hidden="true">✓</span><span>' + mensagem + '</span>';

    container.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('mostrar');
    });

    setTimeout(function () {
      toast.classList.remove('mostrar');
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 4000);
  }

  function initForms(container) {
    // um único listener delegado: "submit" borbulha, então funciona
    // mesmo para formulários recriados a cada navegação da SPA
    container.addEventListener('submit', function (evento) {
      var formulario = evento.target.closest('form[data-toast]');
      if (!formulario) {
        return;
      }

      if (!formulario.checkValidity()) {
        return; // deixa o navegador exibir a validação nativa
      }

      evento.preventDefault();
      show(formulario.getAttribute('data-toast'));
      formulario.reset();
    });
  }

  return { show: show, initForms: initForms };

})();
