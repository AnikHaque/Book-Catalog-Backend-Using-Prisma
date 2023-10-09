import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookServices } from './services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { bookSearchAndFilter } from './constant';
import { Book } from '@prisma/client';

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const bookData = req.body
  const result = await BookServices.createBook(bookData);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books data created successfully!',
    data: result,
  });
})

const getAllBooks: RequestHandler = catchAsync(async (req, res) => {
  const pagination = pick(req.query, paginationFields);
  const searchAndFilter = pick(req.query, bookSearchAndFilter);
  const result = await BookServices.getAllBooks(pagination, searchAndFilter);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books data fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId: RequestHandler = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId;
  const pagination = pick(req.query, paginationFields);
  const result = await BookServices.getBooksByCategoryId(categoryId, pagination);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books associated with category data fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookServices.getBook(id);

  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book data fetched successfully!',
    data: result,
  });
});

const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const bookData = req.body;
  const result = await BookServices.updateBook(id, bookData);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books data updated successfully!',
    data: result,
  });
});

const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookServices.deleteBook(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books data deleted successfully!',
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBook,
  updateBook,
  deleteBook,
};
