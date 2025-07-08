import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { TodoList } from "./components/TodoList/TodoList";
import styles from "./App.module.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  function fetchTodos() {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(setTodos)
  }

  useEffect(() => {
    fetchTodos();
  }, []); // Fetch todos when the component mounts

  function handleCreate(newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then(response => !!response.ok && response.json())
      .then(fetchTodos)
  }

  function filterTodos(todo) {
    const { completed, priority } = filters;

    return (
      (completed === "" || todo.completed === completed) &&
      (priority === "" || todo.priority === priority)
    )
  }

  function handleUpdate(id, newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then(response => !!response.ok && response.json())
      .then(fetchTodos)
  }

  function handleDelete(id) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => !!response.ok && response.json())
      .then(fetchTodos)
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
          todos={todos.filter(filterTodos)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;