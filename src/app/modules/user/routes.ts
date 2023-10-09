import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './controllers';
const router = express.Router();

router.get('/', auth(UserRole.admin), UserControllers.getAllUsers);
router.get('/:id', auth(UserRole.admin), UserControllers.getUser);
router.patch('/:id', auth(UserRole.admin), UserControllers.updateUser);
router.delete('/:id', auth(UserRole.admin), UserControllers.deleteUser);

export const UserRoutes = router;
