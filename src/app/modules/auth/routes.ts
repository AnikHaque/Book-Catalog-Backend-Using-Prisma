import express from 'express';
import { AuthControllers } from './controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidators } from './validation';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidators.signupZodSchema),
  AuthControllers.signup
);

router.post(
  '/signin',
  validateRequest(AuthValidators.signInZodSchema),
  AuthControllers.signin
);

export const AuthRoutes = router;
