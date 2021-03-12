const { Model, DataTypes } = require('sequelize');

class Genero extends Model {
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
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsToMany(models.Livro, { foreignKey: 'genero_id', through: 'livro_generos', as: 'livros' });
  }
};

module.exports = Genero;