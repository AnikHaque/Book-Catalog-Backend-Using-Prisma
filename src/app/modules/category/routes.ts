import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './controllers';
import { CategoryValidators } from './validation';
const router = express.Router();

router.post(
  '/create-category',
  auth(UserRole.admin),
  validateRequest(CategoryValidators.createCategoryZodSchema),
  CategoryControllers.createCategory
);

router.get('/', CategoryControllers.getAllCategories);

router.get('/:id', CategoryControllers.getCategory);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(CategoryValidators.updateCategoryZodSchema),
  CategoryControllers.updateCategory
);

router.delete('/:id', auth(UserRole.admin), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
