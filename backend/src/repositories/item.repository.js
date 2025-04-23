import { prismaClient } from "../database/prismaClient.js"

export class ItemRepository {
  async createItem(data) {
    console.log("Dados recebidos no repositório:", data)
    try {
      // Garantir que a data seja um objeto Date válido
      if (data.data && typeof data.data === "string") {
        data.data = new Date(data.data)
      }

      return await prismaClient.item.create({ data })
    } catch (error) {
      console.error("Erro no repositório ao criar item:", error)
      throw error
    }
  }

  async deleteItemById(id) {
    const item = await this.findByIdItem(id)

    if (item) {
      return await prismaClient.item.delete({
        where: { id },
      })
    }
    return null
  }

  async findByIdItem(id) {
    return await prismaClient.item.findUnique({
      where: { id },
    })
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
        usuarioId: true, // Adicionar o ID do usuário
        user: {
          select: {
            id: true, // Adicionar o ID do usuário
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
    })
  }

  async updateItemById(id, updateData) {
    try {
      // Garantir que a data seja um objeto Date válido
      if (updateData.data && typeof updateData.data === "string") {
        updateData.data = new Date(updateData.data)
      }

      return await prismaClient.item.update({
        where: { id },
        data: updateData,
      })
    } catch (error) {
      console.error("Erro ao atualizar item no repositório:", error)
      throw error
    }
  }

  async findById(id) {
    return await prismaClient.item.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true, // Adicionar o ID do usuário
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
    })
  }

  async countItens() {
    return await prismaClient.item.count()
  }
}
