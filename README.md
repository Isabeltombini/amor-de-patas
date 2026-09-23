# Amor de Patas — SPA em JavaScript

Aplicação web para uma ONG fictícia de proteção animal, desenvolvida como
projeto acadêmico da disciplina de Desenvolvimento Front-End (ADS —
Cruzeiro do Sul), ao longo de quatro Experiências Práticas: fundamentos e
estruturação, estilização e layouts, interatividade e funcionalidade, e
versionamento e acessibilidade.

## Sobre o projeto

O site apresenta a missão da ONG, os animais disponíveis para adoção,
formas de ajudar (voluntariado e doações) e um formulário de contato e
cadastro. Foi construído como uma **Single Page Application (SPA)**: uma
única página HTML (`html/index.html`) cujo conteúdo é substituído
dinamicamente pelo roteador conforme o usuário navega, sem recarregar o
navegador.

## Funcionalidades

- Roteamento client-side baseado em hash (`#/rota`), compatível com
  execução direta via `file://` (sem servidor)
- Templates HTML gerados dinamicamente a partir de dados (`js/dados.js` +
  `js/templates.js`), usando `Array.prototype.map()`
- Modais nativos (`<dialog>`) para detalhes de cada animal
- Notificações "toast" de feedback ao enviar formulários
- Validação de formulários em JavaScript, combinando restrições nativas
  do HTML5 com expressões regulares para CPF, telefone e CEP
- Animais favoritos persistidos no navegador via `localStorage`
- Gráfico de adoções por ano, integrado com a biblioteca externa
  [Chart.js](https://www.chartjs.org/)
- Layout responsivo com Grid de 12 colunas e Flexbox, seguindo um Design
  System próprio (tokens de cor, tipografia e espaçamento)

## Estrutura de pastas

```
ong/
├── html/index.html      # shell único da SPA
├── css/                 # Design System + estilos por view
├── js/                  # 10 módulos, um por responsabilidade
├── imagens/              # fotografias usadas na interface
├── capturas/             # evidências visuais das experiências práticas
└── legado-paginas-estaticas/  # versão pré-SPA (referência histórica)
```

## Como executar

### Localmente (desenvolvimento)

Não é necessário instalar dependências nem rodar um servidor: basta abrir
`html/index.html` diretamente no navegador.

### Build de produção

Para gerar a versão otimizada (CSS/JS/HTML minificados e imagens em WebP),
usada no deploy:

```
npm install
npm run build
```

O resultado é escrito em `dist/`, com a mesma estrutura de pastas do
projeto-fonte. O diretório `dist/` não é versionado (está no
`.gitignore`) — é reconstruído a cada execução, inclusive automaticamente
pelo pipeline de CI/CD a cada push em `main` (veja
`.github/workflows/deploy.yml`).

### Produção

A aplicação publicada está disponível em
[isabeltombini.github.io/amor-de-patas](https://isabeltombini.github.io/amor-de-patas/).

## Arquitetura de módulos

Cada arquivo em `js/` segue o padrão IIFE com namespace global
(`window.NomeDoModulo = (function () { ... })();`), em vez de ES6 Modules
com `import`/`export` — escolha deliberada, já que `<script type="module">`
é bloqueado por política de CORS quando a página é aberta via `file://`.

O roteador (`js/router.js`) orquestra os demais módulos, chamando
`init(container)` de cada um sobre o contêiner persistente
`#conteudo-principal`. A comunicação entre módulos desacoplados (como o
menu mobile e os favoritos) ocorre pelo evento customizado `spa:navegou`,
disparado a cada navegação.

## Versionamento

O repositório segue o modelo **GitFlow**: `main` concentra apenas versões
estáveis, `develop` é a branch de integração contínua, e cada
funcionalidade nasce em uma branch `feature/` própria, mesclada de volta
com `merge --no-ff`. Commits seguem o padrão
[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`,
`fix:`, `docs:`, `chore:`), e os lançamentos são marcados com tags de
versionamento semântico (ex.: `v1.0.0`, `v2.0.0`).

## Autoria

Desenvolvido por Isabel Cristina dos Santos Tombini, estudante de Análise
e Desenvolvimento de Sistemas, como projeto acadêmico.
