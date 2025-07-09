import { TodoForm } from "./components/TodoForm/TodoForm";
import { Alert } from './components/Alert/Alert'
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { TodoList } from "./components/TodoList/TodoList";
import { useTodos } from "./hooks/todo";
import styles from "./App.module.css";

function App() {
  const todos = useTodos();

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}>{todos.error.message}</Alert>
        )}
        <TodoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filter} />
        <TodoList
          todos={todos.data}
          onUpdate={todos.update}
          onDelete={todos.delete}
        />
      </div>
    </div>
  );
}

export default App;