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


  async updateUser({id, email, password, phone}){
    const userExists = await this.findById(id);
    if(!userExists){
      throw new Error("Usuário não encontrado.");
    }
      return await prismaClient.user.update({
        where: { id },
        data: {
          email,
          password,
        },
    });

  }
}
