const usuario = require('./usuario');
const livro = require('./livro');
const autor = require('./autor');
const genero = require('./genero');

module.exports = {
  ...usuario,
  ...livro,
  ...autor,
  ...genero,
};