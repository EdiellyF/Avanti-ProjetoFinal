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
    });
  }
}
