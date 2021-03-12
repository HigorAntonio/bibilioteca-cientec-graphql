const Livro = require('../models/Livro');

module.exports = {
  async index(req, res) {
    const livros = await Livro.findAll();

    return res.json(livros);
  },
  
  async store(req, res) {
    const { isbn, titulo, titulo_original, 
      edicao, editora, url_imagem, 
      descricao, numero_de_paginas, idioma} = req.body;

    const livro = await Livro.create({
      isbn, 
      titulo, 
      titulo_original, 
      edicao, 
      editora, 
      url_imagem, 
      descricao, 
      numero_de_paginas,
      idioma
    });

    return res.json(livro);
  }
}