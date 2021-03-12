const { Model, DataTypes } = require('sequelize');

class Emprestimo extends Model {
  static init(sequelize) {
    super.init({
      previsao_de_entrega: {
        type: DataTypes.DATE,
        allowNull: false
      },
      entregue_em: {
        type: DataTypes.DATE,
        allowNull: false
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

module.exports = Emprestimo;