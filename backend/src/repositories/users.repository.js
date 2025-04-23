import { prismaClient } from "../database/prismaClient.js"

export class UserRepository {
  async create(data) {
    return await prismaClient.user.create({ data })
  }

  async findByEmail(email) {
    return await prismaClient.user.findUnique({
      where: { email },
    })
  }

  async findById(id) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          itens: {
            select: {
              id: true,
              nome: true,
              status: true,
              categoriaId: true,
              data: true,
              localizacao: true,
              contato: true,
              foto: true,
              createdAt: true,
            },
          },
        },
      })

      console.log(`Usuário encontrado: ${user?.id}, Itens: ${user?.items?.length || 0}`)
      return user
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error)
      throw error
    }
  }

  async updateUser({ id, ...data }) {
    return await prismaClient.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id) {
    return await prismaClient.user.delete({
      where: { id },
    })
  }
}
