const Usuario = require('../models/Usuario');
const Livro = require('../models/Livro');
const Emprestimo = require('../models/Emprestimo');

module.exports = {
  async index(req, res) {
    const { usuario_id } = req.params;

    const usuario = await Usuario.findByPk(usuario_id, {
      include: { association: 'emprestimos' }
    });

    return res.json(usuario.emprestimos);
  },
  
  async store(req, res) {
    const { usuario_id, livro_id } = req.params;
    const { previsao_de_entrega } = req.body;

    const usuario = await Usuario.findByPk(usuario_id);
    
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario nao encontrado' });
    }

    const livro = await Livro.findByPk(livro_id);

    if (!livro) {
      return res.status(400).json({ error: 'Livro nao encontrado' });
    }

    const emprestimo = await Emprestimo.create({
      usuario_id,
      livro_id,
      previsao_de_entrega,
    });

    return res.json(emprestimo);
  }
}