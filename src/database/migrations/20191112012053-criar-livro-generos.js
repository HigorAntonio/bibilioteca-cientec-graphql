'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livro_generos', { 
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
      genero_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'generos', key: 'id' },
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
    return queryInterface.dropTable('livro_generos');
  }
};
