const BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

export const api = {
  todos: {
    getAll: (filters = {}) => {
      //const searchParams = new URLSearchParams(filters).toString();

      const url = new URL(`${BASE_URL}todos`);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      return fetch(url.toString(), {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      })
        .then(response => {
          if (response.ok) return response.json();
          if (response.status === 404) return [];
        });
    },

    create: (newTodo) => {
      return fetch(`${BASE_URL}todos`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTodo),
      }).then(response => response.ok && response.json());
    },

    update: (id, todo) => {
      return fetch(`${BASE_URL}todos/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(todo),
      }).then(response => response.ok && response.json());
    },

    delete: (id) => {
      return fetch(`${BASE_URL}todos/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.ok && response.json());
    },
  }
}