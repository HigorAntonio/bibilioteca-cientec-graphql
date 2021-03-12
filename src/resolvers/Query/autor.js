const Autor = require('../../models/Autor');

module.exports = {
  async autores() {
    const autores = await Autor.findAll();

    return autores;
  }
}