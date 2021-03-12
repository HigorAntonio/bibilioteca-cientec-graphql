const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const Usuario = require('../models/Usuario');

const redisClient = require('../redisClient');
const saddAsync = promisify(redisClient.sadd).bind(redisClient);
const sremAsync = promisify(redisClient.srem).bind(redisClient);
const sismemberAsync = promisify(redisClient.sismember).bind(redisClient);

function generateAccessToken(params) {
  return jwt.sign(params, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 20 });
}

module.exports = {
  async index(req, res) {
    const usuarios = await Usuario.findAll();

    return res.json(usuarios);
  },

  async register(req, res) {
    const { email } = req.body;
    
    try {
      if(await Usuario.findOne({ where: { email } })) {
        return res.status(400).json({ erro: 'Usuario existente' });
      }

      const usuario = await Usuario.create(req.body);

      usuario.senha = undefined;


      const accessToken = generateAccessToken({ id: usuario.id });
      const refreshToken = jwt.sign({ id: usuario.id }, process.env.REFRESH_TOKEN_SECRET);
      await saddAsync('refreshTokens', refreshToken);

      return res.json({
        usuario,
        accessToken,
        refreshToken
      });
    } catch (err) {
      return res.status(400).json({ erro: 'Falha ao registrar' });
    }
  }, 

  async authenticate(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });
      
      if(!usuario) 
        return res.status(400).json({ erro: 'Usuario não encontrado' });

      if(!await bcrypt.compare(senha, usuario.senha)) 
        return res.status(400).json({ erro: 'Senha inválida' });

      usuario.senha = undefined;

      const accessToken = generateAccessToken({ id: usuario.id });
      const refreshToken = jwt.sign({ id: usuario.id }, process.env.REFRESH_TOKEN_SECRET);
      await saddAsync('refreshTokens', refreshToken);

      return res.json({
        usuario,
        accessToken,
        refreshToken
      });

    } catch (err) {
      return res.status(400).json({ erro: 'Falha ao autenticar' });
    }
  },

  async refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ erro: 'RefreshToken não informado' });
    
    if (await sismemberAsync('refreshTokens', refreshToken) !== 1)
      return res.status(403).json({ erro: 'RefreshToken inválido' });
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ erro: 'RefreshToken inválido' });
      
      delete decoded.iat;
      const accessToken = generateAccessToken(decoded);
      return res.json({ accessToken });
    });
  },

  async logout(req, res) {
    const refreshToken = req.body.refreshToken;
    
    if (await sremAsync('refreshTokens', refreshToken) === 0)
      return res.status(400).json({ erro: 'Falha ao sair'});
    
    res.sendStatus(204);
  }
}