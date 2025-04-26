import api from "./axios"

export const getItems = async (params = {}) => {
  try {
    const { page, limit, ...otherParams } = params
    const queryParams = new URLSearchParams()

    if (page) queryParams.append("page", page)
    if (limit) queryParams.append("limit", limit)

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
    if (itemData.data && !(itemData.data instanceof Date) && typeof itemData.data === "string") {
      const dateObj = new Date(itemData.data)
      if (!isNaN(dateObj.getTime())) {
        itemData.data = dateObj.toISOString()
      }
    }

    if (itemData.status) {
      itemData.status = itemData.status.toUpperCase()
    }

    


    const response = await api.post("/item", itemData  )

    return response.data
  } catch (error) {
    console.error("Erro ao criar item:", error)
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data)
      console.error("Status do erro:", error.response.status)
    }
    throw error
  }
}

export const updateItem = async (id, itemData) => {
  try {
    if (itemData.data && !(itemData.data instanceof Date) && typeof itemData.data === "string") {
      const dateObj = new Date(itemData.data)
      if (!isNaN(dateObj.getTime())) {
        itemData.data = dateObj.toISOString()
      }
    }

    if (itemData.status) {
      itemData.status = itemData.status.toUpperCase()
    }

    const response = await api.put(`/item/${id}`, itemData)
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar item ${id}:`, error)
    if (error.response) {
      console.error("Resposta do servidor:", error.response.data)
      console.error("Status do erro:", error.response.status)
    }
    throw error
  }
}


export const deleteItem = async (id, token) => {
  try {
    const response = await api.delete(`/item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }) 

    return response.data
  } catch (error) {
    console.error(`Erro ao excluir item ${id}:`, error)
    throw error
  }
}

export const getUserItems = async (userId) => {
  try {
    const response = await api.get("/item")
    const allItems = response.data.itens || response.data || []

    if (userId) {
      return allItems.filter((item) => item.usuarioId === userId || (item.user && item.user.id === userId))
    }

    return allItems
  } catch (error) {
    console.error("Erro ao buscar itens do usuário:", error)
    throw error
  }
}
