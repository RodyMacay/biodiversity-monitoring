const { clerkClient } = require('@clerk/clerk-sdk-node');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      let userData;

      // Clerk JWT (token que empieza con eyJ... y no es JWT propio tuyo)
      if (token.startsWith('eyJ')) {
        const session = await clerkClient.sessions.verifySession(token);
        const user = await clerkClient.users.getUser(session.userId);

        // Buscar o crear el usuario en MongoDB
        let localUser = await User.findOne({ clerkId: user.id });
        if (!localUser) {
          localUser = await User.create({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.publicMetadata?.role || 'observador',
            lastLogin: new Date(),
          });
          console.log('🆕 Usuario creado en MongoDB:', localUser.email);
        } else {
          localUser.lastLogin = new Date();
          await localUser.save();
        }

        userData = {
          _id: localUser._id,
          ...localUser.toObject(),
        };
      } else {
        // JWT personalizado (si estás usando ambos sistemas)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        userData = decoded;
      }

      req.user = userData;
    } catch (err) {
      console.log("aut");
    }
  }

  next();
};

module.exports = authMiddleware;
