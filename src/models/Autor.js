const { Model, DataTypes } = require('sequelize');

class Autor extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo nome não pode ser vazio'
          }
        }
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo descricao não pode ser vazio'
          }
        }
      },
    }, {
      sequelize,
      tableName: 'autores',
    });
  }

  static associate(models) {
    this.belongsToMany(models.Livro, { foreignKey: 'autor_id', through: 'livro_autores', as: 'livros' });
  }
};

module.exports = Autor;