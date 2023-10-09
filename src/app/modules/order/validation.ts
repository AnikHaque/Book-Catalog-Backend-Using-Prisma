import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: 'Book Id is required' }),
        quantity: z.number({ required_error: 'Quantity is required' }),
      }),
      { required_error: 'Ordered Books data is required' }
    ),
  }),
});

export const OrderValidators = {
  createOrderZodSchema,
};
