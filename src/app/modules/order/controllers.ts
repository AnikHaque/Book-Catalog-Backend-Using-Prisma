import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderServices } from './services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { orderFilter } from './constant';
import { Order } from '@prisma/client';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user?.userId
  const orderData = req.body
  const result = await OrderServices.createOrder(userId, orderData);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders data created successfully!',
    data: result,
  });
})

const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const pagination = pick(req.query, paginationFields);
  const filter = pick(req.query, orderFilter);
  const user = req.user
  const result = await OrderServices.getAllOrders(pagination, filter, user);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders data fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.orderId;
  const user = req.user
  const result = await OrderServices.getOrder(id, user);

  sendResponse<Order | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order data fetched successfully!',
    data: result,
  });
});


export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrder,
};
