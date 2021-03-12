const Livro = require('../models/Livro');
const Genero = require('../models/Genero');

module.exports = {
  async index(req, res) {
    const { livro_id } = req.params;

    const livro = await Livro.findByPk(livro_id, {
      include: { association: 'generos', through: { attributes: [] } }
    });

    return res.json(livro.generos);
  },
  
  async store(req, res) {
    const { livro_id } = req.params;
    const { nome } = req.body;

    const livro = await Livro.findByPk(livro_id);

    if (!livro) {
      return res.status(400).json({ error: 'Livro nao encontrado' });
    }

    const [ genero ] = await Genero.findOrCreate({
      where: { nome }
    });

    await livro.addGenero(genero);

    return res.json(genero);
  }
};