// Amor de Patas — fonte de dados usada pelos templates dinâmicos

window.Dados = (function () {

  var animais = [
    {
      id: 'nina',
      nome: 'Nina',
      idade: '2 anos',
      porte: 'Médio',
      temperamento: 'Dócil e companheira',
      badges: [{ tipo: 'sucesso', texto: 'Disponível' }],
      imagem: '../imagens/nina.jpg',
      alt: 'Nina, cadela de porte médio, sentada e olhando para a câmera',
      figcaption: 'Nina, 2 anos — carinhosa e companheira',
      resumo: 'Nina é uma cachorrinha de porte médio, muito dócil e apaixonada por passeios e carinho.',
      descricaoCompleta: 'Nina é uma cachorrinha de porte médio, muito dócil e apaixonada por passeios e carinho. Já está castrada, vacinada e pronta para conhecer sua nova família.'
    },
    {
      id: 'simba',
      nome: 'Simba',
      idade: '1 ano',
      porte: 'Pequeno',
      temperamento: 'Curioso e brincalhão',
      badges: [{ tipo: 'sucesso', texto: 'Disponível' }],
      imagem: '../imagens/simba.jpg',
      alt: 'Simba, gato laranja deitado em um cobertor',
      figcaption: 'Simba, 1 ano — curioso e brincalhão',
      resumo: 'Simba é um gatinho carinhoso, divertido e sociável. Convive bem com outros animais.',
      descricaoCompleta: 'Simba é um gatinho carinhoso, divertido e sociável. Convive bem com outros animais e adora um cantinho quentinho para cochilar após brincar.'
    },
    {
      id: 'bento',
      nome: 'Bento',
      idade: '8 anos',
      porte: 'Grande',
      temperamento: 'Tranquilo e amoroso',
      badges: [{ tipo: 'sucesso', texto: 'Disponível' }, { tipo: 'info', texto: 'Sênior' }],
      imagem: '../imagens/bento.jpg',
      alt: 'Bento, cão sênior de pelagem escura descansando',
      figcaption: 'Bento, 8 anos — tranquilo e muito amoroso',
      resumo: 'Bento é um cãozinho sênior que procura um lar tranquilo e cheio de carinho.',
      descricaoCompleta: 'Bento é um cãozinho sênior que procura um lar tranquilo e cheio de carinho. Já passou por todos os cuidados veterinários e está pronto para relaxar em uma nova casa.'
    }
  ];

  var estados = [
    { sigla: 'AC', nome: 'Acre' }, { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' }, { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' }, { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' }, { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' }, { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' }, { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' }, { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' }, { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' }, { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' }, { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' }, { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' }, { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' }, { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  return { animais: animais, estados: estados };

})();
