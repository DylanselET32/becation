//const {verifyToken} = require('../utils/utils');


const authMiddleware = (req, res, next)=> {
  // Obtiene el token de las cabeceras de la petición
//   const token = req.headers.authorization?.split(" ")[1]; //uso el  ? para verificar que exista authorixation y que no crashe

//   // Si no hay token, devuelve un error
//   if (!token) {
//     return res.status(401).json({ error: "No authentication token provided" });
//   }

  try {
    // // Verifica el token con la clave privada
    // const decodedToken = verifyToken(token);
    // // Agrega el usuario autenticado al objeto de solicitud para que se pueda utilizar en rutas posteriores
    // req.user = decodedToken;
    // if(!req.user){
    //   return res.status(401).json({ error: "Invalid authentication token" });
    // }
    // // Continúa con la siguiente función en la pila de middleware
    next();
  } catch (err) {
    // Si el token no es válido, devuelve un error
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}

module.exports = {
  authMiddleware,
}