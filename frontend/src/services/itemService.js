import api from "./axios";

export const getItems = async () => {
  const res = await api.get('/item');
  return res.data;
};

export const getItemById = async (id) => {
  const res = await api.get(`/item/${id}`);
  return res.data;
};

export const createItem = async (itemData, token) => {
  try {
    console.log(itemData); 
    const response = await api.post('/item', itemData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ESSA LINHA É ESSENCIAL
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  const res = await api.put(`/item/${id}`, itemData);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await api.delete(`/item/${id}`);
  return res.data;
};