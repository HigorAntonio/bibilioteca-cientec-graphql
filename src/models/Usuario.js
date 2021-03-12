const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo email não pode ser vazio'
          },
          isEmail: {
            msg: 'O campo email deve receber um email válido'
          }
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O campo senha não pode ser vazio'
          }
        }
      },
    }, {
      hooks: {
        beforeCreate: usuario => {
          usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        },
        beforeUpdate: usuario => {
          usuario.senha = bcrypt.hashSync(usuario.senha, 10);
        }
      },
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Emprestimo, { foreignKey: 'usuario_id', as: 'emprestimos' });
    this.hasMany(models.Review, { foreignKey: 'usuario_id', as: 'reviews' });
  }
};

module.exports = Usuario;