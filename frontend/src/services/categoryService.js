import api from './axios';


export const getCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};


export const getCategoryById = async (id) => {
  try {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};


export const createCategory = async (categoryData) => {
  try {
    const { data } = await api.post('/categories', categoryData);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const { data } = await api.put(`/categories/${id}`, categoryData);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};


export const deleteCategory = async (id) => {
  try {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data.message || error.message;
  }
};