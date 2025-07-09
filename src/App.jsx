import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { TodoList } from "./components/TodoList/TodoList";
import styles from "./App.module.css";
import { api } from "./api"; // Assuming you have an api.js file for API calls

function App() {
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

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleCreate} />
        <TodoFilters onFilter={setFilters} />
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;