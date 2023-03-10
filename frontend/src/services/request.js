import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestDataById = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const createData = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const editData = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export const deleteData = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export default api;
