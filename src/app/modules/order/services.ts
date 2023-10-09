import { Order, Prisma, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { orderRelationalFields, orderRelationalFieldsMapper } from './constant';
import { IOrderFilter, IOrderReqData, WhereConditionType } from './interface';

const createOrder = async (
  userId: string,
  payload: IOrderReqData
): Promise<Order | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  const { orderedBooks } = payload;

  const newOrder = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: { userId: user.id },
    });

    if (!order) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to palce order');
    }

    for (const orderedBook of orderedBooks) {
      await transactionClient.orderedBook.create({
        data: {
          orderId: order.id,
          bookId: orderedBook.bookId,
          quantity: orderedBook.quantity,
        },
      });
    }

    return order;
  });

  const data = await prisma.order.findUnique({
    where: { id: newOrder.id },
    include: {
      user: true,
      orderedBooks: {
        include: { book: true },
      },
    },
  });

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to place your order!');
  }

  return data;
};

const getAllOrders = async (
  pagination: IPaginationOptions,
  orderFilter: IOrderFilter,
  user: JwtPayload | null
): Promise<IGenericResponse<Order[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andCondition = [];

  // Filter
  if (Object.keys(orderFilter).length) {
    andCondition.push({
      AND: Object.keys(orderFilter).map((field: string) => {
        if (orderRelationalFields.includes(field)) {
          return {
            [orderRelationalFieldsMapper[field]]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              id: (orderFilter as any)[field],
            },
          };
        } else {
          return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [field]: (orderFilter as any)[field],
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.OrderWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  if (user?.role === UserRole.customer) {
    whereCondition.user = { id: user.userId };
  }

  const data = await prisma.order.findMany({
    where: whereCondition,
    include: {
      user: true,
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.order.count({ where: whereCondition });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data,
  };
};

const getOrder = async (
  id: string,
  user: JwtPayload | null
): Promise<Order | null> => {
  const whereCondition: WhereConditionType = { id };

  if (user?.role === UserRole.customer) {
    console.log(user);
    whereCondition.user = { id: user.userId };
  }

  const data = await prisma.order.findUnique({
    where: whereCondition,
    include: {
      user: true,
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
  return data;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrder,
};
