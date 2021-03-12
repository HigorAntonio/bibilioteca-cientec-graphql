const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader)
    return res.status(401).json({ erro: 'Token não fornecido' });

  const partes = authHeader.split(' ');
  if(partes.length !== 2)
    return res.status(401).json({ erro: 'Erro no token' });

  const [ scheme, token ] = partes;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ erro: 'Token no formato incorreto' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) 
      return res.status(403).json({ erro: 'AccessToken inválido' });

    req.usuarioId = decoded.id;
    
    next();
  });    
};