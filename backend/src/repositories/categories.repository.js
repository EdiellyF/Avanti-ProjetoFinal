import { prismaClient } from "../database/prismaClient.js";

export class CategoryRepository {
  async create(data) {
    return await prismaClient.category.create({ data });
  }

  async findByEmail(email) {
    return await prismaClient.category.findUnique({
      where: { email },
    });
  }

  
}
