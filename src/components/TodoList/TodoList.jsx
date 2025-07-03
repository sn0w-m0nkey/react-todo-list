import { TodoListItem } from "../TodoListItem/TodoListItem";
import styles from "./TodoList.module.css";

export function TodoList({ todos, onUpdate }) {
  return (
    <section>
      <h3>To-Do's</h3>

      <ul className={styles.TodoList}>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onUpdate={onUpdate} />
        ))}
      </ul>
    </section>
  );
}