const Genero = require('../../models/Genero');

module.exports = {
  async novoGenero(_, { dados }) {
    const genero = await Genero.create({
      ...dados
    });

    return genero;
  }
};