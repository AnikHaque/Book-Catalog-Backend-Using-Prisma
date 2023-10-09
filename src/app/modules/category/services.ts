import { Category, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICategoryFilter } from './interace';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { categorySearchableFields } from './constants';
import { IGenericResponse } from '../../../interfaces/common';

const createCategory = async (payload: Category): Promise<Category> => {
  const data = await prisma.category.create({
    data: payload,
  });
  return data;
};

const getAllCategories = async (
  pagination: IPaginationOptions,
  categorySearchAndFilter: ICategoryFilter
): Promise<IGenericResponse<Category[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const { search } = categorySearchAndFilter;

  const andCondition = [];

  // Searching
  if (search) {
    andCondition.push({
      OR: categorySearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereCondition: Prisma.CategoryWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const data = await prisma.category.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.category.count({ where: whereCondition });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data,
  };
};

const getCategory = async (id: string): Promise<Category | null> => {
  const data = await prisma.category.findUnique({ where: { id } });
  return data;
};

const updateCategory = async (id: string, payload: Partial<Category>): Promise<Category> => {
  const data = await prisma.category.update({ where: { id }, data: payload });
  return data;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const data = await prisma.category.delete({ where: { id } });
  return data;
};

export const CategoryServices = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
