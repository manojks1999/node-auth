import { Router } from 'express';
import { verifySignUp } from '../middleware/index.js';
import authController from '../controllers/AuthController.js';

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authController.signup
);

router.post("/api/auth/signin",authController.signin);

export default router;
