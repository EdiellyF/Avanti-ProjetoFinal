import { prismaClient } from "../database/prismaClient.js";

export class categoryRepository {
  async create(data) {
    return await prismaClient.category.create({ data });
  }

  async findByEmail(email) {
    return await prismaClient.category.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await prismaClient.category.findUnique({
      where: { id },
    });
  }


  async updatecategory({}){
    const categoryExists = await this.findById(id);
    if(!categoryExists){
      throw new Error("Usuário não encontrado.");
    }
      return await prismaClient.category.update({
        where: { id },
        data: {
          email,
          password,
        },
    });

  }
}
