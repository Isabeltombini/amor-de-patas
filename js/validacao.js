// Amor de Patas — validação de formulários em JavaScript (com event delegation)

window.Validacao = (function () {

  var REGRAS_POR_NOME = {
    cpf: {
      regex: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
      mensagem: 'Digite um CPF válido no formato 000.000.000-00.'
    },
    telefone: {
      regex: /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/,
      mensagem: 'Digite um telefone válido no formato (00) 00000-0000.'
    },
    cep: {
      regex: /^[0-9]{5}-[0-9]{3}$/,
      mensagem: 'Digite um CEP válido no formato 00000-000.'
    }
  };

  var REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function limparFeedback(campo) {
    campo.classList.remove('campo-invalido', 'campo-valido');
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
    var msg = campo.parentElement.querySelector('.erro-mensagem');
    if (msg) {
      msg.remove();
    }
  }

  function marcarErro(campo, mensagem) {
    limparFeedback(campo);
    campo.classList.add('campo-invalido');
    campo.setAttribute('aria-invalid', 'true');

    var idErro = campo.id + '-erro';
    var msg = document.createElement('small');
    msg.className = 'erro-mensagem';
    msg.id = idErro;
    msg.setAttribute('role', 'alert');
    msg.textContent = mensagem;
    campo.insertAdjacentElement('afterend', msg);
    campo.setAttribute('aria-describedby', idErro);
  }

  function marcarSucesso(campo) {
    limparFeedback(campo);
    campo.classList.add('campo-valido');
    campo.setAttribute('aria-invalid', 'false');
  }

  function validarCampo(campo) {
    var valor = campo.value.trim();
    var obrigatorio = campo.hasAttribute('required');

    // 1) campo obrigatório vazio
    if (obrigatorio && valor === '') {
      marcarErro(campo, 'Este campo é obrigatório.');
      return false;
    }

    // campo opcional vazio: sem feedback visual
    if (valor === '') {
      limparFeedback(campo);
      return true;
    }

    // 2) formatos específicos do padrão brasileiro, verificados por RegEx própria
    var regra = REGRAS_POR_NOME[campo.name];
    if (regra && !regra.regex.test(valor)) {
      marcarErro(campo, regra.mensagem);
      return false;
    }

    // 3) e-mail
    if (campo.type === 'email' && !REGEX_EMAIL.test(valor)) {
      marcarErro(campo, 'Digite um e-mail válido.');
      return false;
    }

    // 4) demais restrições nativas (minlength, type=date, etc.)
    if (!campo.checkValidity()) {
      marcarErro(campo, campo.title || 'Verifique o valor informado neste campo.');
      return false;
    }

    marcarSucesso(campo);
    return true;
  }

  function init(container) {
    // "focusout" borbulha (diferente de "blur"), por isso funciona delegado
    container.addEventListener('focusout', function (evento) {
      if (evento.target.matches('input, select, textarea')) {
        validarCampo(evento.target);
      }
    });

    container.addEventListener('submit', function (evento) {
      var formulario = evento.target.closest('form');
      if (!formulario) {
        return;
      }

      var campos = formulario.querySelectorAll('input, select, textarea');
      var formularioValido = true;

      campos.forEach(function (campo) {
        if (!validarCampo(campo)) {
          formularioValido = false;
        }
      });

      if (!formularioValido) {
        evento.preventDefault();
        var primeiroInvalido = formulario.querySelector('.campo-invalido');
        if (primeiroInvalido) {
          primeiroInvalido.focus();
        }
      }
    });
  }

  return { init: init, validarCampo: validarCampo };

})();
