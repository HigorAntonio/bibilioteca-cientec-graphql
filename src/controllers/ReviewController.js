const Usuario = require('../models/Usuario');
const Livro = require('../models/Livro');
const Review = require('../models/Review');

module.exports = {
  async index(req, res) {
    
  },

  async store(req, res) {
    const { usuario_id, livro_id } = req.params;
    const { review_do_usuario, nota } = req.body;

    const usuario = await Usuario.findByPk(usuario_id);

    if (!usuario) {
      return res.status(400).json({ error: 'Usuario nao encontrado' });
    }

    const livro = await Livro.findByPk(livro_id);

    if (!livro) {
      return res.status(400).json({ error: 'Livro nao encontrado' });
    }

    const review = await Review.create({
      usuario_id,
      livro_id,
      review_do_usuario,
      nota,
    });

    return res.json(review);
  }
};