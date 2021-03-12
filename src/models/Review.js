const { Model, DataTypes } = require('sequelize');

class Review extends Model {
  static init(sequelize) {
    super.init({
      review_do_usuario: {
        type: DataTypes.TEXT
      },
      nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1],
            msg: 'O campo nota deve ser maior ou igual a 1 e menor ou igual a 5'
          },
          max: {
            args: [5],
            msg: 'O campo nota deve ser maior ou igual a 1 e menor ou igual a 5'
          }
        }
      },
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(models.Livro, { foreignKey: 'livro_id', as: 'livro' });
  }
};

module.exports = Review;