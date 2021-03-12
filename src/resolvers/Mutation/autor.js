const Autor = require('../../models/Autor');

module.exports = {
  async novoAutor(_, { dados }) {
    const autor = await Autor.create({
      ...dados
    });

    return autor;
  }
}