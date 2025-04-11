import { prismaClient } from "../database/prismaClient.js";

export class ItemRepository {
  async createItem(data) {
    return await prismaClient.item.create({ data });
  }

  async deleteItemById(id) {
    const item = await this.findByIdItem(id);

    if(item){
        return await prismaClient.item.delete({
        where: { id }
      });
    }
    return null;
  }

  async findByIdItem(id) {
    return await prismaClient.item.findUnique({
      where: { id }});
  }

  async findAllItens() {
    return await prismaClient.item.findMany({
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

}
