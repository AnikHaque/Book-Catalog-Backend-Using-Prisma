import { Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userSearchableFields } from './constant';
import { IUserFilter } from './interface';

const getAllUsers = async (
  pagination: IPaginationOptions,
  userSearchAndFilter: IUserFilter
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const { search, ...filters } = userSearchAndFilter;

  const andCondition = [];

  // Searching
  if (search) {
    andCondition.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filter
  if (Object.keys(filters).length) {
    andCondition.push({
      AND: Object.keys(filters).map(field => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [field]: (filters as any)[field],
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const data = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.user.count({ where: whereCondition });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data,
  };
};

const getUser = async (id: string): Promise<User | null> => {
  const data = await prisma.user.findUnique({ where: { id } });
  return data;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const data = await prisma.user.update({ where: { id }, data: payload });
  return data;
};

const deleteUser = async (id: string): Promise<User> => {
  const data = await prisma.user.delete({ where: { id } });
  return data;
};

export const UserServices = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
