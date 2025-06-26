const { clerkClient } = require('@clerk/clerk-sdk-node');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      // Verificar si es un token de Clerk
      if (token.startsWith('clerk_')) {
        // Verificar token de Clerk
        const sessionToken = await clerkClient.verifyToken(token);
        if (sessionToken) {
          // Obtener información del usuario de Clerk
          const user = await clerkClient.users.getUser(sessionToken.sub);
          req.user = {
            sub: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.publicMetadata?.role || 'observador',
          };
        }
      } else {
        // Verificar token JWT estándar
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        req.user = decoded;
      }
    } catch (error) {
      console.log('Token inválido:', error.message);
      // No establecer req.user, pero continuar
    }
  }
  
  next();
};

module.exports = authMiddleware;

