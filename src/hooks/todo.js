import { useEffect, useState } from "react";
import { api } from "../api"; // Assum

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  async function fetchTodos() {
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]); // Fetch todos when the component mounts

  async function handleCreate(newTodo) {
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async function handleUpdate(id, todo) {
    try {
      await api.todos.update(id, todo);
      await fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return {
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
  }
}