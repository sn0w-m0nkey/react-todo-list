import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
  headers: { 'content-type': 'application/json' },
  timeout: 5000,
})

http.interceptors.response.use(({ data }) => data);

export const api = {
  todos: {
    getAll: (filters = {}) => {
      return http.get('todos', { filters })
        .catch((error) => {
          error?.response === 404 ? [] : Promise.reject(error)
        });
    },

    create: (newTodo) => {
      return http.post('todos', newTodo);
    },

    update: (id, todo) => {
      return http.put(`todos/${id}`, todo);
    },

    delete: (id) => {
      return http.delete(`todos/${id}`);
    },
  }
}