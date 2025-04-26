import api from "./axios";

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/users", userData);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await api.post("/users/login", userData);

    return data.token;
  } catch (error) {
    throw error.message;
  }
};

// Melhorar a função getUserById para incluir mais informações e lidar melhor com erros
export const getUserById = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);

    // Buscar também os itens do usuário para ter estatísticas completas
    try {
      const itemsResponse = await api.get("/item");
      const allItems = itemsResponse.data.itens || itemsResponse.data || [];

      // Adicionar contagem de itens aos dados do usuário
      const userItems = allItems.filter((item) => {
        const isUserItem =
          item.usuarioId === id || (item.user && item.user.id === id);
        return isUserItem;
      });

      // Adicionar estatísticas aos dados do usuário
      return {
        ...data,
        itemsCount: userItems.length,
        items: userItems,
      };
    } catch (error) {
      console.warn("Não foi possível obter itens do usuário:", error);
      // Retornar os dados básicos do usuário mesmo se não conseguir obter os itens
      return data;
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    // Melhorar a mensagem de erro para facilitar a depuração
    if (error.response) {
      console.error(
        "Resposta do servidor:",
        error.response.status,
        error.response.data
      );
    }
    throw (
      error.response?.data.message ||
      "Erro ao carregar dados do usuário. Por favor, tente novamente."
    );
  }
};

export const updateUser = async (id, userData) => {
  try {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};
