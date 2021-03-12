const Usuario = require('../../models/Usuario');

module.exports = {
  async usuarios() {
    const usuario = await Usuario.findAll();

    return usuario;
  }
}