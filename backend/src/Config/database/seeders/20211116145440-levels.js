module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'levels',
      [
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
          nivel: 'Pleno',
        },
        {
          nivel: 'Senior',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('levels', null, {});
  },
};
