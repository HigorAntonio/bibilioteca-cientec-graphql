const Livro = require('../../models/Livro');
const Autor = require('../../models/Autor');
const Genero = require('../../models/Genero');

module.exports = {
  async novoLivro(_, { dadosLivro, dadosAutor, dadosGenero }) {
    const livro = await Livro.create({
      ...dadosLivro
    });
    
    await Promise.all(dadosAutor.map(async dados => {
      const [ autor ] = await Autor.findOrCreate({
        where: { ...dados }
      });
  
      await livro.addAutores(autor);
    }));

    await Promise.all(dadosGenero.map(async dados => {
      const [ genero ] = await Genero.findOrCreate({
        where: { ...dados }
      });

      await livro.addGenero(genero);
    }));

    const livroCompleto = await Livro.findByPk(livro.id, {
      include: [
        { association: 'autores', through: { attributes: [] } },
        { association: 'generos', through: { attributes: [] } }
      ]
    });

    return livroCompleto;
  }
}