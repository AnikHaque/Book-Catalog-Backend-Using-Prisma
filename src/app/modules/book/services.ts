import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './constant';
import { IBookFilter } from './interface';

const createBook = async (payload: Book): Promise<Book> => {
  const data = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return data;
};

const getAllBooks = async (
  pagination: IPaginationOptions,
  bookSearchAndFilter: IBookFilter
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const { search, ...filters } = bookSearchAndFilter;

  const andCondition = [];

  // Searching
  if (search) {
    andCondition.push({
      OR: bookSearchableFields.map(field => ({
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
      AND: Object.keys(filters).map((field: string) => {
        if (bookRelationalFields.includes(field)) {
          return {
            [bookRelationalFieldsMapper[field]]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              id: (filters as any)[field],
            },
          };
        } else {
          return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [field]: (filters as any)[field],
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.BookWhereInput = andCondition.length
    ? { AND: andCondition }
    : {};

  const data = await prisma.book.findMany({
    where: whereCondition,
    include: { category: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.book.count({ where: whereCondition });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  pagination: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const data = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    include: { category: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data,
  };
};

const getBook = async (id: string): Promise<Book | null> => {
  const data = await prisma.book.findUnique({
    where: { id },
    include: { category: true },
  });
  return data;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const data = await prisma.book.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
  return data;
};

const deleteBook = async (id: string): Promise<Book> => {
  const data = await prisma.book.delete({
    where: { id },
    include: { category: true },
  });
  return data;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBook,
  updateBook,
  deleteBook,
};
