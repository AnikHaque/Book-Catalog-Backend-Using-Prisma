import express from 'express';
import { UserRoutes } from '../modules/user/routes';
import { AuthRoutes } from '../modules/auth/routes';
import { CategoryRoutes } from '../modules/category/routes';
import { BookRoutes } from '../modules/book/routes';
import { OrderRoutes } from '../modules/order/routes';
import { ProfileRoutes } from '../modules/profile/routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: "/categories",
    routes: CategoryRoutes
  },

  {
    path: "/books",
    routes: BookRoutes
  },
  {
    path: "/orders",
    routes: OrderRoutes
  },
  {
    path: "/profile",
    routes: ProfileRoutes
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
