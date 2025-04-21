import api from "./axios";

export const registerUser = async (userData) => {
    try {
        
      const res = await api.post("/users", userData);
      return res;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response || error.message);
      throw error;
    }
  };