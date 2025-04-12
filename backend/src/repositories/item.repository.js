import { prismaClient } from "../database/prismaClient.js";

export class ItemRepository {
  async createItem(data) {
    return await prismaClient.item.create({ data });
  }

  async deleteItemById(id) {
    const item = await this.findByIdItem(id);

    if (item) {
      return await prismaClient.item.delete({
        where: { id },
      });
    }
    return null;
  }

  async findByIdItem(id) {
    return await prismaClient.item.findUnique({
      where: { id },
    });
  }

  async findAllItens({ skip = 0, take = 10 }) {
    return await prismaClient.item.findMany({
      skip,
      take,
      select: {
        id: true,
        nome: true,
        descricao: true,
        data: true,
        localizacao: true,
        contato: true,
        status: true,
        foto: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        categoria: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateItemById(id, updateData) {
    try {
      return await prismaClient.item.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      console.error("Erro ao atualizar item no repositório:", error);
      throw new Error("Erro ao atualizar item no banco de dados");
    }
  }

  async findById(id) {
    return await prismaClient.item.findUnique({
      where: { id },
    });
  }

  async countItens() {
    return await prismaClient.item.count();
  }
}
