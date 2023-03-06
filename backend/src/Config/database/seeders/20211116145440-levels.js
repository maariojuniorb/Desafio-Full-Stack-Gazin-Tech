module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'levels',
      [
        {
          nivel: 'Estagiário',
        },
        {
          nivel: 'Jr A',
        },
        {
          nivel: 'Jr B',
        },
        {
          nivel: 'Jr C',
        },
        {
          nivel: 'Pleno A',
        },
        {
          nivel: 'Pleno B',
        },
        {
          nivel: 'Pleno C',
        },
        {
          nivel: 'Senior',
        },
        {
          nivel: 'Especialista',
        },
        {
          nivel: 'QA',
        },
        {
          nivel: 'PO',
        },
        {
          nivel: 'SM',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('levels', null, {});
  },
};
