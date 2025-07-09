import { useEffect, useState } from "react";
import { api } from "../api"; // Assum

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false)

  async function fetchTodos() {
    setIsLoading(true);
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    } catch (error) {
      setErrorMessage(`Error fetching todo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]); // Fetch todos when the component mounts

  async function handleCreate(newTodo) {
    setIsLoading(true);
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage(`Error creating todo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(id, todo) {
    setIsLoading(true);
    try {
      await api.todos.update(id, todo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage(`Error updating todo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      setErrorMessage(`Error deleting todo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    error: {
      message: errorMessage,
      clear: () => setErrorMessage()
    }
  }
}