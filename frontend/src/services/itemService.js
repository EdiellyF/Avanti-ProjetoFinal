import api from "./axios"

export const getItems = async (params = {}) => {
  try {
    const { page, limit, ...otherParams } = params
    const queryParams = new URLSearchParams()

    if (page) queryParams.append("page", page)
    if (limit) queryParams.append("limit", limit)

    // Adiciona outros parâmetros se existirem
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    const queryString = queryParams.toString()
    const url = queryString ? `/item?${queryString}` : "/item"

    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error("Erro ao buscar itens:", error)
    throw error
  }
}

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/item/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar item ${id}:`, error)
    throw error
  }
}

export const createItem = async (itemData) => {
  try {
    // Verificar se a data está no formato correto (ISO string)
    if (itemData.data && !(itemData.data instanceof Date) && typeof itemData.data === "string") {
      // Garantir que a data esteja no formato ISO
      const dateObj = new Date(itemData.data)
      if (!isNaN(dateObj.getTime())) {
        itemData.data = dateObj.toISOString()
      }
    }

    // Verificar se o status está em maiúsculas conforme esperado pelo backend
    if (itemData.status) {
      itemData.status = itemData.status.toUpperCase()
    }

    // Log para depuração
    console.log("Dados enviados para o servidor:", JSON.stringify(itemData, null, 2))

    const response = await api.post("/item", itemData)
    return response.data
  } catch (error) {
    console.error("Erro ao criar item:", error)
    // Log detalhado do erro
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data)
      console.error("Status do erro:", error.response.status)
    }
    throw error
  }
}

export const updateItem = async (id, itemData) => {
  try {
    // Verificar se a data está no formato correto (ISO string)
    if (itemData.data && !(itemData.data instanceof Date) && typeof itemData.data === "string") {
      // Garantir que a data esteja no formato ISO
      const dateObj = new Date(itemData.data)
      if (!isNaN(dateObj.getTime())) {
        itemData.data = dateObj.toISOString()
      }
    }

    // Verificar se o status está em maiúsculas conforme esperado pelo backend
    if (itemData.status) {
      itemData.status = itemData.status.toUpperCase()
    }

    // Log para depuração
    console.log("Dados enviados para atualização:", JSON.stringify(itemData, null, 2))

    const response = await api.put(`/item/${id}`, itemData)
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar item ${id}:`, error)
    // Log detalhado do erro
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data)
      console.error("Status do erro:", error.response.status)
    }
    throw error
  }
}

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/item/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao excluir item ${id}:`, error)
    throw error
  }
}

// Adicionar uma função específica para buscar itens do usuário
export const getUserItems = async (userId) => {
  try {
    // Buscar todos os itens
    const response = await api.get("/item")
    const allItems = response.data.itens || response.data || []

    // Filtrar os itens do usuário
    if (userId) {
      return allItems.filter((item) => item.usuarioId === userId || (item.user && item.user.id === userId))
    }

    return allItems
  } catch (error) {
    console.error("Erro ao buscar itens do usuário:", error)
    throw error
  }
}
