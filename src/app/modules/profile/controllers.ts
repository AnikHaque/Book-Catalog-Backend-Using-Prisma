import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";
import { ProfileServices } from "./services";

const getUserProfile: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.user?.userId
    const result = await ProfileServices.getUserProfile(userId)

    sendResponse<User | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result
    })
})

export const ProfileControllers = {
    getUserProfile
}