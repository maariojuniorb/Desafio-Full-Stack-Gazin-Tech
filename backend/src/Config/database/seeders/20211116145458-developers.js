module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'developers',
      [
        {
          nivel: 1,
          nome: 'Mario Junior',
          sexo: 'Masculino',
          data_nascimento: '1993-12-17',
          idade: 29,
          hobby: 'Fishing'
        },
        {
          nivel: 3,
          nome: 'Marcos Vinicius',
          sexo: 'Masculino',
          data_nascimento: '1992-08-16',
          idade: 30,
          hobby: 'To cook'
        },
        {
          nivel: 4,
          nome: 'Albert Lukas',
          sexo: 'Masculino',
          data_nascimento: '1992-05-13',
          idade: 30,
          hobby: 'Basketball'
        },
        {
          nivel: 5,
          nome: 'Fernando Botassio',
          sexo: 'Masculino',
          data_nascimento: '1995-01-18',
          idade: 27,
          hobby: 'Futebol'
        },
        {
          nivel: 6,
          nome: 'Alessandro Nascimento',
          sexo: 'Masculino',
          data_nascimento: '1994-05-24',
          idade: 28,
          hobby: 'Academia'
        },
        {
          nivel: 7,
          nome: 'Gustavo Bianchi ',
          sexo: 'Masculino',
          data_nascimento: '1994-04-26',
          idade: 27,
          hobby: 'Basketball'
        },
        {
          nivel: 8,
          nome: 'Mateus Mazzeto',
          sexo: 'Masculino',
          data_nascimento: '1992-02-11',
          idade: 30,
          hobby: 'Basketball'
        },
        {
          nivel: 9,
          nome: 'Gabriel Rodrigues',
          sexo: 'Masculino',
          data_nascimento: '1994-07-05',
          idade: 28,
          hobby: 'Basketball'
        },
        {
          nivel: 10,
          nome: 'Gustavo Renan',
          sexo: 'Masculino',
          data_nascimento: '1995-09-09',
          idade: 27,
          hobby: 'Basketball'
        },
        {
          nivel: 11,
          nome: 'Gabriel Silva',
          sexo: 'Masculino',
          data_nascimento: '1991-01-02',
          idade: 31,
          hobby: 'Basketball'
        },
        {
          nivel: 12,
          nome: 'Alexandre Dias',
          sexo: 'Masculino',
          data_nascimento: '1994-02-25',
          idade: 28,
          hobby: 'Basketball'
        },
        {
          nivel: 2,
          nome: 'Joao Moreira',
          sexo: 'Masculino',
          data_nascimento: '1990-07-30',
          idade: 32,
          hobby: 'Basketball'
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('developers', null, {});
  },
};
