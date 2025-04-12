import { prismaClient } from "../database/prismaClient.js";

export class UserRepository {
  async create(data) {
    return await prismaClient.user.create({ data });
  }

  async findByEmail(email) {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await prismaClient.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
      },
    });
  }

  async updateUser({ id, ...data }) {
    return await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id) {
    return await prismaClient.user.delete({
      where: { id },
    });
  }
}
