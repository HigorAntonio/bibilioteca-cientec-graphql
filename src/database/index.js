const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Livro = require('../models/Livro');
const Autor = require('../models/Autor');
const Genero = require('../models/Genero');
const Emprestimo = require('../models/Emprestimo');
const Review = require('../models/Review');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Livro.init(connection);
Autor.init(connection);
Genero.init(connection);
Emprestimo.init(connection);
Review.init(connection);

Usuario.associate(connection.models);
Livro.associate(connection.models);
Autor.associate(connection.models);
Genero.associate(connection.models);
Emprestimo.associate(connection.models);
Review.associate(connection.models);


module.exports = connection;