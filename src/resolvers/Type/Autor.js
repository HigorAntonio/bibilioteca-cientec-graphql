const Autor = require('../../models/Autor');

module.exports = {
  async livros(parent) {
    const autor = await Autor.findByPk(parent.id, {
      include: { association: 'livros', through: { attributes: [] } }
    });

    return autor.livros;
  }
};