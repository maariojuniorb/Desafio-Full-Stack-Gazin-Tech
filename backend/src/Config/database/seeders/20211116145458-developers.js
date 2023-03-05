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
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('developers', null, {});
  },
};
