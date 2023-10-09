import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IAuth } from './interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const signup = async (user: User) => {
  const data = await prisma.user.create({
    data: user,
  });

  return data;
};

const signin = async (signInData: IAuth) => {
  // Check User Existence
  const userExist = await prisma.user.findFirst({
    where: {
      email: signInData.email,
    },
  });

  if (!userExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist!");
  }

  const { id, role, password } = userExist;

  // Check Password
  if (signInData.password !== password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect credentials!');
  }

  // Generate Token
  const token = jwtHelpers.createToken(
    { userId: id, role },
    process.env.JWT_SECRET as string,
    process.env.JWT_SECRET_EXPIRE as string
  );

  return { token };
};

export const AuthServices = {
  signup,
  signin,
};
