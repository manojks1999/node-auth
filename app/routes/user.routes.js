import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import authJwt from '../middleware/authJwt.js';

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get('/all', UserController.allAccess);

router.get('/user', [authJwt.verifyToken, authJwt.isUser], UserController.userBoard);

router.get('/mod', [authJwt.verifyToken, authJwt.isModerator], UserController.moderatorBoard);

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], UserController.adminBoard);

export default router;
