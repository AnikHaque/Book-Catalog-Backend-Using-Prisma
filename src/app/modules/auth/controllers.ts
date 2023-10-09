import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './services';

const signup: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await AuthServices.signup(user);
  const { password, ...restData } = result;
  console.log(password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signed Up successfully!',
    data: restData,
  });
});

const signin: RequestHandler = catchAsync(async (req, res) => {
  const userSignIn = req.body;
  const { token } = await AuthServices.signin(userSignIn);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signed In successfully!',
    token,
  });
});

export const AuthControllers = {
  signup,
  signin,
};
