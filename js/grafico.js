// Amor de Patas — integração com a biblioteca externa Chart.js
// Responsabilidade: renderizar o gráfico de impacto (adoções por ano) na home.

window.Grafico = (function () {

  var instanciaAtual = null;

  function init(container) {
    var canvas = container.querySelector('#grafico-adocoes');

    // se a view atual não tiver o canvas (ex.: projetos, cadastro), não faz nada
    if (!canvas) {
      return;
    }

    // destrói uma instância anterior antes de criar outra: o Chart.js não
    // permite reutilizar o mesmo <canvas> sem isso, e a cada navegação da
    // SPA o roteador recria o elemento do zero
    if (instanciaAtual) {
      instanciaAtual.destroy();
      instanciaAtual = null;
    }

    var estiloComputado = getComputedStyle(document.documentElement);
    var corPrimaria = estiloComputado.getPropertyValue('--azul-noite').trim();
    var corDestaque = estiloComputado.getPropertyValue('--mel').trim();

    instanciaAtual = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Animais adotados',
          data: [120, 165, 210, 245, 260],
          backgroundColor: corDestaque,
          hoverBackgroundColor: corPrimaria,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  return { init: init };

})();
