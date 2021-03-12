'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livro_autores', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      livro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'livros', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'autores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('livro_autores');
  }
};
