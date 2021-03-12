const Genero = require('../../models/Genero');

module.exports = {
  async generos() {
    const generos = await Genero.findAll();

    return generos;
  }
}