import api from "./axios";

export const registerUser = async (userData) => {
    try {
      const {data}= await api.post("/users", userData);
      return data;
    } catch (error) {
      throw error.response?.data.message || error.message
    }
  };

export const loginUser = async (userData) =>{
  try{
    const {data} = await api.post("/users/login", userData);
    
    return data.token;

  }catch(error){
    throw  error.message
  }
}