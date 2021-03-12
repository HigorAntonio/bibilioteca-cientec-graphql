const Genero = require('../../models/Genero');

module.exports = {
  async livros(parent) {
    const genero = await Genero.findByPk(parent.id, {
      include: { association: 'livros', through: { attributes: [] } }
    });

    return genero.livros;
  },
};