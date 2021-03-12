const { Op } = require('sequelize');
const Livro = require('../../models/Livro');

module.exports = {
  async livros() {
    const livros = await Livro.findAll();

    return livros;
  },

  async filtrarLivros(_, { filtro }) {
    if(!filtro) return null;

    const { isbn, titulo, titulo_original,
      editora, idioma, autor, genero } = filtro;
    
    if(isbn) {
      return await Livro.findAll({
        where: {
          isbn: {
            [Op.iLike]: `${isbn}%`
          }
        }
      });
    } else if(titulo) {
      return await Livro.findAll({
        where: {
          titulo: {
            [Op.iLike]: `%${titulo}%`
          }
        }
      });
    } else if(titulo_original) {
      return await Livro.findAll({
        where: {
          titulo_original: {
            [Op.iLike]: `%${titulo_original}%`
          }
        }
      });
    } else if(editora) {
      return await Livro.findAll({
        where: {
          editora: {
            [Op.iLike]: `%${editora}%`
          }
        }
      });
    } else if(idioma) {
      return await Livro.findAll({ 
        where: {
          idioma: {
            [Op.iLike]: `${idioma}%`
          }
        } 
      });
    } else if(autor) {
      return await Livro.findAll({
        include: { 
          association: 'autores',
          through: { attributes: []  },
          where: {
            nome: {
              [Op.iLike]: `%${autor}%`
            }
          }
        }
      });
    } else if(genero) {
      return await Livro.findAll({
        include: {
          association: 'generos',
          through: { attributes: [] },
          where: {
            nome: {
              [Op.iLike]: `%${genero}%`
            }
          }
        }
      });
    }
  }
};