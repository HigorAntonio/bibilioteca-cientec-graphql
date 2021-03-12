'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livros', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo_original: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edicao: {
        type: Sequelize.STRING,
      },
      editora: {
        type: Sequelize.STRING,
      },
      url_imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      numero_de_paginas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idioma: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('livros');
  }
};
