import AuthService from '../services/AuthService.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  try {
    req.userId = await AuthService.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).send({
      message: error
    });
  }
};

const isUser = async (req, res, next) => {
  try {
    const hasRole = await AuthService.isUser(req.userId);
    if (hasRole) {
      next();
    } else {
      res.status(403).send({
        message: "Require User Role!"
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const hasRole = await AuthService.isAdmin(req.userId);
    if (hasRole) {
      next();
    } else {
      res.status(403).send({
        message: "Require Admin Role!"
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const hasRole = await AuthService.isModerator(req.userId);
    if (hasRole) {
      next();
    } else {
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const hasRole = await AuthService.isModeratorOrAdmin(req.userId);
    if (hasRole) {
      next();
    } else {
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const authJwt = {
    verifyToken: verifyToken,
    isUser: isUser,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

export default authJwt;