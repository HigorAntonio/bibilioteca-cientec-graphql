const livro = require('./livro');
const autor = require('./autor');
const genero = require('./genero');

module.exports = {
  ...livro,
  ...autor,
  ...genero,
};