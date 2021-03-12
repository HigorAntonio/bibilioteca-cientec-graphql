const { Model, DataTypes } = require('sequelize');

class Livro extends Model {
  static init(sequelize) {
    super.init({
      isbn: {
        type: DataTypes.STRING
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo titulo não pode ser vazio'
          }
        }
      },
      titulo_original: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo titulo_original não pode ser vazio'
          }
        }
      },
      edicao: {
        type: DataTypes.STRING
      },
      editora: {
        type: DataTypes.STRING
      },
      url_imagem: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo descricao nao pode ser vazio'
          }
        }
      },
      numero_de_paginas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo numero_de_paginas não pode ser vazio'
          }
        }
      },
      idioma: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo idioma não pode ser vazio'
          }
        }
      },
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Emprestimo, { foreignKey: 'livro_id', as: 'emprestimos' });
    this.hasMany(models.Review, { foreignKey: 'livro_id', as: 'reviews' });
    this.belongsToMany(models.Genero, { foreignKey: 'livro_id', through: 'livro_generos', as: 'generos' });
    this.belongsToMany(models.Autor, { foreignKey: 'livro_id', through: 'livro_autores', as: 'autores' });
  }
};

module.exports = Livro;