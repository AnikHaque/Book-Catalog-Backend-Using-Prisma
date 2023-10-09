import prisma from '../../../shared/prisma';

const getUserProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
  });

  return result;
};

export const ProfileServices = { getUserProfile };
