const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const LivroController = require('./controllers/LivroController');
const AutorController = require('./controllers/AutorController');
const GeneroController = require('./controllers/GeneroController');
const EmprestimoController = require('./controllers/EmprestimoController');
const ReviewController = require('./controllers/ReviewController');

const authMiddleware = require('../src/middlewares/auth');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.post('/registrar', UsuarioController.register);
routes.post('/autenticar', UsuarioController.authenticate);
routes.post('/token', UsuarioController.refreshToken);
routes.delete('/sair', UsuarioController.logout);

routes.get('/livros', authMiddleware, LivroController.index);
routes.post('/livros', LivroController.store);

routes.get('/livros/:livro_id/autores', AutorController.index);
routes.post('/livros/:livro_id/autores', AutorController.store);

routes.get('/livros/:livro_id/generos', GeneroController.index);
routes.post('/livros/:livro_id/generos', GeneroController.store);

routes.get('/usuarios/:usuario_id/emprestimos', EmprestimoController.index);
routes.post('/usuarios/:usuario_id/livros/:livro_id/emprestimos', EmprestimoController.store);

routes.get('/usuarios/:usuario_id/reviews', ReviewController.index);
routes.post('/usuarios/:usuario_id/livros/:livro_id/reviews', ReviewController.store);

module.exports = routes;