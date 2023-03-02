'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('developers', {
      id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      },
      nivel: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'levels',
        key: 'id'
      }
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataNascimento: {
        field: 'data_nascimento',
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      idade: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hobby: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('developers');
  }
};

