// Amor de Patas — persistência de favoritos no localStorage

window.Favoritos = (function () {

  var CHAVE = 'amorDePatas.favoritos';

  function obterTodos() {
    var bruto = localStorage.getItem(CHAVE);
    if (!bruto) {
      return [];
    }
    try {
      var lista = JSON.parse(bruto);
      return Array.isArray(lista) ? lista : [];
    } catch (erro) {
      // dado corrompido no localStorage: descarta com segurança
      return [];
    }
  }

  function salvarTodos(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  }

  function ehFavorito(id) {
    return obterTodos().indexOf(id) !== -1;
  }

  function alternar(id) {
    var lista = obterTodos();
    var indice = lista.indexOf(id);

    if (indice === -1) {
      lista.push(id);
    } else {
      lista.splice(indice, 1);
    }

    salvarTodos(lista);
    return indice === -1; // true = acabou de ser favoritado
  }

  function aplicarEstadoVisual(container) {
    var favoritos = obterTodos();
    container.querySelectorAll('[data-favorito-id]').forEach(function (botao) {
      var id = botao.getAttribute('data-favorito-id');
      var ativo = favoritos.indexOf(id) !== -1;
      botao.classList.toggle('favorito-ativo', ativo);
      botao.setAttribute('aria-pressed', String(ativo));
    });
  }

  function init(container) {
    // restaura o estado salvo assim que a view inicial é montada
    aplicarEstadoVisual(container);

    container.addEventListener('click', function (evento) {
      var botao = evento.target.closest('[data-favorito-id]');
      if (!botao) {
        return;
      }

      var id = botao.getAttribute('data-favorito-id');
      var agoraFavorito = alternar(id);
      botao.classList.toggle('favorito-ativo', agoraFavorito);
      botao.setAttribute('aria-pressed', String(agoraFavorito));
    });

    // a cada troca de rota o conteúdo é recriado: reaplica o estado salvo
    document.addEventListener('spa:navegou', function () {
      aplicarEstadoVisual(container);
    });
  }

  return {
    init: init,
    ehFavorito: ehFavorito,
    alternar: alternar,
    obterTodos: obterTodos
  };

})();
