import { z } from 'zod';

const signupZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'password is required' }),
    contactNo: z.string({ required_error: 'Contact No is required' }),
    address: z.string({ required_error: 'Address is required' }),
    profileImg: z.string({ required_error: 'Profile Image is required' }),
  }),
});

const signInZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidators = { signupZodSchema, signInZodSchema };
