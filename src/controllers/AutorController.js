const Livro = require('../models/Livro');
const Autor = require('../models/Autor');

module.exports = {
  async index(req, res) {
    const { livro_id } = req.params;
    
    const livro = await Livro.findByPk(livro_id, {
      include: { association: 'autores', through: { attributes: [] } }
    });

    return res.json(livro.autores);
  },
  
  async store(req, res) {
    const { livro_id } = req.params;
    const { nome, descricao } = req.body;

    const livro = await Livro.findByPk(livro_id);

    if (!livro) {
      return res.status(400).json({ error: 'Livro nao encontrado' });
    }

    const [ autor ] = await Autor.findOrCreate({
      where: { nome, descricao }
    });

    await livro.addAutore(autor);

    return res.json(autor);
  }
};