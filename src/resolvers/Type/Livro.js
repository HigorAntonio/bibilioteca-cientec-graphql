const Livro = require('../../models/Livro');

module.exports = {
  async autores(parent) {
    const livro = await Livro.findByPk(parent.id, {
      include: { association: 'autores', through: { attributes: [] } }
    });

    return livro.autores;
  },

  async generos(parent) {
    const livro = await Livro.findByPk(parent.id, {
      include: { association: 'generos', through: {attributes: [] } }
    });

    return livro.generos;
  }
};
