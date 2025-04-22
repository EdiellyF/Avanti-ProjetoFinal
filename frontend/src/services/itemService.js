import api from "./axios";

export const getItems = async () => {
  const res = await api.get('/item');
  return res.data;
};

export const getItemById = async (id) => {
  const res = await api.get(`/item/${id}`);
  return res.data;
};

export const createItem = async (itemData) => {
  const res = await api.post('/item', itemData);
  return res.data;
};

export const updateItem = async (id, itemData) => {
  const res = await api.put(`/item/${id}`, itemData);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await api.delete(`/item/${id}`);
  return res.data;
};