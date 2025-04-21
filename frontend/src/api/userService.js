import api from "./axios";

export const registerUser = async (userData) => {
    try {
        
      const res = await api.post("/users", userData);
      return res.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:",error.response?.data || error.message);
      throw error.response?.data || error.message
    }
  };