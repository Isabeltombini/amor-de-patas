// Amor de Patas — templates de views da SPA (funções que retornam fragmentos HTML)

window.Templates = (function () {

  // --- geração dinâmica a partir de window.Dados.animais ---

  function renderBadges(badges) {
    return badges
      .map(function (b) {
        return '<span class="badge badge-' + b.tipo + '">' + b.texto + '</span>';
      })
      .join('\n              ');
  }

  function renderCardAnimal(animal) {
    var favoritado = window.Favoritos.ehFavorito(animal.id);
    return `
          <article>
            <figure>
              <picture>
                <source srcset="${animal.imagem.replace(/\.jpg$/, '.webp')}" type="image/webp">
                <img src="${animal.imagem}" alt="${animal.alt}" loading="lazy" width="512" height="512">
              </picture>
              <figcaption>${animal.figcaption}</figcaption>
              <button
                class="favorito-btn${favoritado ? ' favorito-ativo' : ''}"
                type="button"
                data-favorito-id="${animal.id}"
                aria-pressed="${favoritado}"
                aria-label="Favoritar ${animal.nome}"
              >
                <span aria-hidden="true">♥</span>
              </button>
            </figure>
            <h3>
              ${animal.nome}
              ${renderBadges(animal.badges)}
            </h3>
            <p>${animal.resumo}</p>
            <button class="btn btn-secundario" type="button" data-modal-target="#modal-${animal.id}">
              Saiba mais
            </button>
          </article>`;
  }

  function renderModalAnimal(animal) {
    return `
        <dialog id="modal-${animal.id}" class="modal" aria-modal="true" aria-labelledby="modal-${animal.id}-titulo">
          <div class="modal-conteudo">
            <picture>
              <source srcset="${animal.imagem.replace(/\.jpg$/, '.webp')}" type="image/webp">
              <img src="${animal.imagem}" alt="${animal.alt}" width="512" height="512">
            </picture>
            <h3 id="modal-${animal.id}-titulo">${animal.nome}</h3>
            <dl class="modal-info">
              <div><dt>Idade</dt><dd>${animal.idade}</dd></div>
              <div><dt>Porte</dt><dd>${animal.porte}</dd></div>
              <div><dt>Temperamento</dt><dd>${animal.temperamento}</dd></div>
            </dl>
            <p>${animal.descricaoCompleta}</p>
            <button class="btn" type="button" data-modal-close>Fechar</button>
          </div>
        </dialog>`;
  }

  // --- geração dinâmica a partir de window.Dados.estados ---

  function renderOpcoesEstado() {
    return window.Dados.estados
      .map(function (uf) {
        return `<option value="${uf.sigla}">${uf.nome}</option>`;
      })
      .join('\n                  ');
  }

  function home() {
    return `
    <section class="hero" id="inicio" aria-labelledby="titulo-principal">
      <div class="wrap">
        <h1 id="titulo-principal">
          Cada patinha merece uma nova chance
        </h1>
        <p>
          Resgatamos, acolhemos e cuidamos de cães e gatos
          em situação de abandono, ajudando cada um deles
          a encontrar um lar cheio de carinho e responsabilidade.
        </p>
        <a class="btn" href="#/adocao">
          Quero adotar
        </a>
      </div>
    </section>

    <section class="sobre" id="sobre" aria-labelledby="titulo-sobre">
      <div class="wrap">
        <div>
          <h2 id="titulo-sobre">Nossa missão</h2>
          <p>
            Desde <time datetime="2016">2016</time>,
            a Amor de Patas atua no resgate e cuidado
            de animais em situação de vulnerabilidade.
          </p>
          <p>
            Oferecemos atendimento veterinário, vacinação,
            castração e todo o cuidado necessário até que
            cada animal esteja preparado para encontrar
            uma nova família.
          </p>
          <picture>
            <source srcset="../imagens/amor-de-patas-institucional.webp" type="image/webp">
            <img
              src="../imagens/amor-de-patas-institucional.jpg"
              alt="Voluntária da Amor de Patas acolhendo uma cadela resgatada"
              loading="lazy"
              width="768"
              height="512"
            >
          </picture>
        </div>
        <dl aria-label="Resultados da organização">
          <div class="stat">
            <dt><strong>860</strong></dt>
            <dd>animais já encontraram um novo lar</dd>
          </div>
          <div class="stat">
            <dt><strong>320</strong></dt>
            <dd>castrações realizadas em 2025</dd>
          </div>
        </dl>

        <div class="grafico-impacto">
          <h3>Adoções por ano</h3>
          <div class="grafico-caixa">
            <canvas id="grafico-adocoes" role="img" aria-label="Gráfico de barras mostrando o número de animais adotados por ano, de 2021 a 2025"></canvas>
          </div>
        </div>
      </div>
    </section>

    <section class="adocao" id="adocao" aria-labelledby="titulo-adocao">
      <div class="wrap">
        <h2 id="titulo-adocao">Encontre seu novo melhor amigo</h2>
        <p>
          Conheça alguns dos animais que estão esperando
          por uma família. Todos recebem acompanhamento
          veterinário e os cuidados necessários antes da adoção.
        </p>

        <div class="grid-animais">
          ${window.Dados.animais.map(renderCardAnimal).join('\n')}
        </div>

        ${window.Dados.animais.map(renderModalAnimal).join('\n')}
      </div>
    </section>

    <section class="como-ajudar" id="ajudar" aria-labelledby="titulo-ajudar">
      <div class="wrap">
        <h2 id="titulo-ajudar">Como você pode ajudar</h2>
        <p>
          Existem diferentes maneiras de transformar
          a vida dos animais da Amor de Patas.
          Cada gesto pode fazer a diferença.
        </p>

        <div class="formas-ajuda">
          <article>
            <h3>Adote</h3>
            <p>Ofereça um lar responsável e cheio de carinho para um animal que espera por uma família.</p>
          </article>
          <article>
            <h3>Seja voluntário</h3>
            <p>Ajude nos cuidados, eventos, divulgação e outras atividades realizadas pela organização.</p>
          </article>
          <article>
            <h3>Faça uma doação</h3>
            <p>Contribua com alimentação, medicamentos e atendimento veterinário.</p>
          </article>
        </div>

        <p style="margin-top: 24px;">
          <a class="btn" href="#/projetos">Conhecer projetos</a>
        </p>
      </div>
    </section>

    <section class="contato" id="contato" aria-labelledby="titulo-contato">
      <div class="wrap">
        <div>
          <h2 id="titulo-contato">Fale com a Amor de Patas</h2>
          <p>Quer adotar, ser voluntário, fazer uma doação ou tirar alguma dúvida?</p>

          <form action="#" method="post" novalidate data-toast="Mensagem enviada com sucesso! Em breve entraremos em contato.">
            <div class="campo">
              <label for="nome">Nome <span aria-hidden="true">*</span></label>
              <input type="text" id="nome" name="nome" autocomplete="name" required>
            </div>
            <div class="campo">
              <label for="email">E-mail <span aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="campo">
              <label for="telefone">Telefone / WhatsApp</label>
              <input type="tel" id="telefone" name="telefone" autocomplete="tel">
            </div>
            <div class="campo">
              <label for="interesse">Tenho interesse em <span aria-hidden="true">*</span></label>
              <select id="interesse" name="interesse" required>
                <option value="" disabled selected>Selecione uma opção</option>
                <option value="adocao">Quero adotar</option>
                <option value="voluntariado">Quero ser voluntário</option>
                <option value="doacao">Quero fazer uma doação</option>
                <option value="informacoes">Quero saber mais</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>
            <div class="campo">
              <label for="mensagem">Mensagem <span aria-hidden="true">*</span></label>
              <textarea id="mensagem" name="mensagem" required></textarea>
            </div>
            <p class="legenda-obrigatorio">
              <span aria-hidden="true">*</span> campos obrigatórios
            </p>
            <button type="submit" class="btn">Enviar mensagem</button>
          </form>

          <p style="margin-top: 20px;">
            Para cadastro completo de voluntariado, doações ou adoção,
            acesse a página de cadastro.
          </p>
          <p style="margin-top: 12px;">
            <a class="btn" href="#/cadastro">Fazer cadastro</a>
          </p>
        </div>

        <aside class="alerta alerta-urgente" role="note" aria-labelledby="titulo-urgente">
          <p class="alerta-titulo">
            <span class="alerta-icone" aria-hidden="true">!</span>
            <strong id="titulo-urgente">Precisamos de ajuda</strong>
          </p>
          <p>Quatro filhotes foram encontrados abandonados próximos ao Parque das Águas.</p>
          <p>Eles precisam de ração, apoio veterinário e um lar temporário.</p>
        </aside>
      </div>
    </section>

    <section class="contato-info" aria-labelledby="titulo-contato-info">
      <div class="wrap">
        <h2 id="titulo-contato-info">Contato</h2>
        <address>
          Rua dos Girassóis, 245<br>
          São Carlos — SP<br>
          <a href="mailto:contato@amordepatas.org.br">contato@amordepatas.org.br</a>
          <br>
          <a href="tel:+551635551234">(16) 3555-1234</a>
        </address>
      </div>
    </section>
    `;
  }

  function projetos() {
    return `
    <section class="hero-projetos" aria-labelledby="titulo-projetos">
      <div class="wrap">
        <h1 id="titulo-projetos">Projetos que transformam vidas</h1>
        <p>
          Conheça as formas de participar das ações da Amor de Patas
          e descubra como o voluntariado e as doações ajudam a
          transformar a vida dos animais atendidos pela ONG.
        </p>
      </div>
    </section>

    <section class="voluntariado" id="voluntariado" aria-labelledby="titulo-voluntariado">
      <div class="wrap">
        <h2 id="titulo-voluntariado">Seja voluntário</h2>
        <p class="introducao">
          Os voluntários participam de diferentes atividades
          desenvolvidas pela Amor de Patas e colaboram diretamente
          com o cuidado e o bem-estar dos animais.
        </p>
        <div class="grid-projetos">
          <article>
            <h3>Cuidados com os animais</h3>
            <p>Os voluntários podem ajudar na alimentação, organização dos espaços, passeios e cuidados diários com cães e gatos acolhidos pela ONG.</p>
          </article>
          <article>
            <h3>Eventos e feiras de adoção</h3>
            <p>A participação também pode ocorrer em eventos e feiras de adoção, auxiliando na organização, recepção dos visitantes e apresentação dos animais.</p>
          </article>
          <article>
            <h3>Divulgação das ações</h3>
            <p>Os voluntários também podem colaborar na divulgação de campanhas, animais disponíveis para adoção e necessidades da organização.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="doacoes" id="doacoes" aria-labelledby="titulo-doacoes">
      <div class="wrap">
        <h2 id="titulo-doacoes">Campanhas de doação</h2>
        <p class="introducao">
          As doações ajudam a manter os cuidados oferecidos
          aos animais resgatados e podem ser realizadas de diferentes formas.
        </p>
        <div class="grid-projetos">
          <article>
            <h3>Doação de alimentos</h3>
            <p>A ONG recebe doações de ração para cães e gatos, além de outros itens utilizados na alimentação dos animais acolhidos.</p>
          </article>
          <article>
            <h3>Medicamentos e atendimento</h3>
            <p>As contribuições também ajudam na compra de medicamentos, vacinas e no pagamento de atendimentos veterinários.</p>
          </article>
          <article>
            <h3>Itens de higiene e cuidado</h3>
            <p>Produtos de limpeza, mantas, caminhas e outros materiais também podem ser doados para auxiliar na rotina de cuidados da organização.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="participar" aria-labelledby="titulo-participar">
      <div class="wrap">
        <h2 id="titulo-participar">Faça parte dessa transformação</h2>
        <p>
          Se você deseja participar como voluntário,
          fazer uma doação ou obter mais informações,
          faça seu cadastro na Amor de Patas.
        </p>
        <a class="btn" href="#/cadastro">Fazer cadastro</a>
      </div>
    </section>
    `;
  }

  function cadastro() {
    return `
    <section class="hero-cadastro" aria-labelledby="titulo-cadastro">
      <div class="wrap">
        <h1 id="titulo-cadastro">Faça parte da Amor de Patas</h1>
        <p>
          Preencha seus dados para demonstrar interesse em
          adoção, voluntariado, doações ou outras ações realizadas pela nossa ONG.
        </p>
      </div>
    </section>

    <section class="cadastro" aria-labelledby="titulo-formulario">
      <div class="wrap">
        <h2 id="titulo-formulario">Formulário de cadastro</h2>
        <p class="introducao">
          Informe seus dados nos campos abaixo.
          Os campos marcados com * são obrigatórios.
        </p>

        <form action="#" method="post" novalidate data-toast="Cadastro enviado com sucesso! Em breve entraremos em contato.">
          <fieldset>
            <legend>Dados pessoais</legend>

            <div class="campo">
              <label for="nome">Nome completo <span aria-hidden="true">*</span></label>
              <input type="text" id="nome" name="nome" autocomplete="name" minlength="3" required>
            </div>

            <div class="linha-campos">
              <div class="campo">
                <label for="email">E-mail <span aria-hidden="true">*</span></label>
                <input type="email" id="email" name="email" autocomplete="email" required>
              </div>
              <div class="campo">
                <label for="nascimento">Data de nascimento <span aria-hidden="true">*</span></label>
                <input type="date" id="nascimento" name="nascimento" autocomplete="bday" required>
              </div>
            </div>

            <div class="linha-campos">
              <div class="campo">
                <label for="cpf">CPF <span aria-hidden="true">*</span></label>
                <input type="text" id="cpf" name="cpf" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" title="Digite o CPF no formato 000.000.000-00" required>
                <small class="ajuda-campo">Formato: 000.000.000-00</small>
              </div>
              <div class="campo">
                <label for="telefone">Telefone / WhatsApp <span aria-hidden="true">*</span></label>
                <input type="tel" id="telefone" name="telefone" autocomplete="tel" maxlength="15" placeholder="(00) 00000-0000" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" title="Digite o telefone no formato (00) 00000-0000" required>
                <small class="ajuda-campo">Formato: (00) 00000-0000</small>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>

            <div class="campo">
              <label for="cep">CEP <span aria-hidden="true">*</span></label>
              <input type="text" id="cep" name="cep" autocomplete="postal-code" inputmode="numeric" maxlength="9" placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}" title="Digite o CEP no formato 00000-000" required>
              <small class="ajuda-campo">Formato: 00000-000</small>
            </div>

            <div class="campo">
              <label for="endereco">Endereço <span aria-hidden="true">*</span></label>
              <input type="text" id="endereco" name="endereco" autocomplete="address-line1" required>
            </div>

            <div class="linha-campos">
              <div class="campo">
                <label for="cidade">Cidade <span aria-hidden="true">*</span></label>
                <input type="text" id="cidade" name="cidade" autocomplete="address-level2" required>
              </div>
              <div class="campo">
                <label for="estado">Estado <span aria-hidden="true">*</span></label>
                <select id="estado" name="estado" autocomplete="address-level1" required>
                  <option value="" disabled selected>Selecione</option>
                  ${renderOpcoesEstado()}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Interesse na Amor de Patas</legend>

            <div class="campo">
              <label for="interesse">Como você gostaria de participar? <span aria-hidden="true">*</span></label>
              <select id="interesse" name="interesse" required>
                <option value="" disabled selected>Selecione uma opção</option>
                <option value="adocao">Quero adotar</option>
                <option value="voluntariado">Quero ser voluntário</option>
                <option value="doacao">Quero fazer uma doação</option>
                <option value="informacoes">Quero receber mais informações</option>
              </select>
            </div>

            <div class="campo">
              <label for="mensagem">Conte um pouco sobre seu interesse</label>
              <textarea id="mensagem" name="mensagem" placeholder="Escreva sua mensagem aqui..."></textarea>
            </div>
          </fieldset>

          <p class="legenda-obrigatorio">
            <span aria-hidden="true">*</span> campos obrigatórios
          </p>

          <button class="btn" type="submit">Enviar cadastro</button>
        </form>
      </div>
    </section>
    `;
  }

  return { home: home, projetos: projetos, cadastro: cadastro };

})();
