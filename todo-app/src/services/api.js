import axios from 'axios';

const API_URL = 'http://10.10.96.30:3000/api/tasks';

export const getTask = () => axios.get(API_URL);
export const addTask = (title) => axios.post(API_URL, { title });
export const updateTask = (id, title) => axios.put(`${API_URL}/${id}`, { title });
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

