import { ForbiddenError, ValidationError, NotFoundError } from "../utils/customErrors.js"

export class ItemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository
  }

  async createItem(itemData, usuarioId) {
    console.log("Dados recebidos no service:", itemData)

    if (!this.#validateRequiredFields(itemData)) {
      throw new ValidationError("Missing required fields")
    }

    itemData.status = itemData.status.toUpperCase()
    if (!this.#validateStatus(itemData.status)) {
      throw new ValidationError(`Status inválido: ${itemData.status}. Valores permitidos: PERDIDO, ENCONTRADO`)
    }

    // Garantir que a data esteja no formato correto
    try {
      if (itemData.data) {
        const dateObj = new Date(itemData.data)
        if (!isNaN(dateObj.getTime())) {
          itemData.data = dateObj.toISOString()
        } else {
          throw new ValidationError("Data inválida")
        }
      }
    } catch (error) {
      console.error("Erro ao processar data:", error)
      throw new ValidationError("Formato de data inválido")
    }

    const data = {
      ...itemData,
      usuarioId,
    }

    console.log("Dados a serem enviados para o repositório:", data)

    try {
      return await this.itemRepository.createItem(data)
    } catch (error) {
      console.error("Erro ao criar item no service:", error)
      throw new Error("Erro ao criar item no banco de dados")
    }
  }

  async deleteItemById({ id, userId, role }) {
    if (!id) {
      throw new ValidationError("Missing required fields")
    }

    const item = await this.itemRepository.findByIdItem(id)

    if (!item) {
      throw new NotFoundError("Item not found")
    }

    if (item.usuarioId !== userId || role !== "ADMIN") {
      throw new ForbiddenError("Você só pode deletar itens relacionados a você")
    }

    try {
      return await this.itemRepository.deleteItemById(id)
    } catch (error) {
      console.error("Error deleting item:", error)
      throw new Error("Erro ao deletar item")
    }
  }

  async getAllItens({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit

    const itens = await this.itemRepository.findAllItens({
      skip: offset,
      take: limit,
    })

    if (!itens) {
      return null
    }

    const totalCount = await this.itemRepository.countItens()

    if (totalCount === 0) {
      return {
        itens: [],
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: null,
        previousPage: null,
      }
    }

    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1
    const nextPage = hasNextPage ? page + 1 : null
    const previousPage = hasPreviousPage ? page - 1 : null

    const response = {
      itens,
      totalCount,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
    }

    return response
  }

  async updateItemById({ id, userId, role, updateData }) {
    if (!id) {
      throw new ValidationError("Missing required fields")
    }

    const item = await this.itemRepository.findByIdItem(id)

    if (!item) {
      throw new NotFoundError("Item not found")
    }

    if (item.usuarioId !== userId && role !== "ADMIN") {
      throw new ForbiddenError("Você só pode editar itens relacionados a você")
    }

    const allowedFields = ["nome", "descricao", "data", "localizacao", "contato", "status", "foto"]
    const filteredData = {}

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        if (key === "status") {
          const upperStatus = value.toUpperCase()
          if (!this.#validateStatus(upperStatus)) {
            throw new ValidationError(`Status inválido: ${value}. Valores permitidos: PERDIDO, ENCONTRADO`)
          }
          filteredData[key] = upperStatus
        } else if (key === "data") {
          // Garantir que a data esteja no formato correto
          try {
            const dateObj = new Date(value)
            if (!isNaN(dateObj.getTime())) {
              filteredData[key] = dateObj.toISOString()
            } else {
              throw new ValidationError("Data inválida")
            }
          } catch (error) {
            throw new ValidationError("Formato de data inválido")
          }
        } else {
          filteredData[key] = value
        }
      }
    }

    updateData = filteredData

    if (Object.keys(updateData).length === 0) {
      throw new ValidationError("Nenhum campo válido para atualização foi fornecido")
    }

    try {
      return await this.itemRepository.updateItemById(id, updateData)
    } catch (error) {
      console.error("Erro ao atualizar item:", error)
      throw new Error("Erro ao atualizar item no banco de dados")
    }
  }

  async getItemById(id) {
    const item = await this.itemRepository.findById(id)

    if (!item) {
      return null
    }

    return item
  }

  #validateRequiredFields(data) {
    console.log("Validando campos obrigatórios:", data)
    const requiredFields = ["nome", "descricao", "localizacao", "contato", "categoriaId", "data", "status"]
    const missingFields = requiredFields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      console.log("Campos faltando:", missingFields)
      return false
    }

    return true
  }

  #validateStatus(status) {
    const validStatuses = ["PERDIDO", "ENCONTRADO"]
    return validStatuses.includes(status?.toUpperCase())
  }
}
