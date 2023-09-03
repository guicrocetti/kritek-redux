import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { addTodo, removeTodo, selectTodos, updateTodo, Todo } from "./todoSlice"
import styles from "./Todos.module.css"

export function Todos() {
  const todos = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()
  const [item, setItem] = useState("")

  return (
    <div>
      <div className={styles.row}>
        {todos.map((todo: Todo) => (
          <div key={todo.id}>
            <span className={styles.value}>{todo.text}</span>
            <button
              className={styles.button}
              aria-label="Remove item"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              X
            </button>
          </div>
        ))}
        <button
          className={styles.button}
          aria-label="Add item"
          onClick={() => dispatch(addTodo(item))}
        >
          Add Item
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
    </div>
  )
}
