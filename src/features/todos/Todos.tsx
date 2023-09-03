import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  addTodo,
  removeAllCheckedTodos,
  removeTodo,
  selectTodos,
  updateTodo,
} from "./todoSlice"
import styles from "./Todos.module.css"

export function Todos() {
  const todos = useAppSelector(selectTodos)
  const dispatch = useAppDispatch()
  const [item, setItem] = useState("")
  const [checked, setChecked] = useState(false)

  console.log(todos)

  const handleRemoveChecked = () => {
    dispatch(removeAllCheckedTodos())
  }

  return (
    <div>
      <div className={styles.row}>
        {todos.map((todo) => (
          <div key={todo.id}>
            {" "}
            <span className={styles.value}>{todo.text}</span>
            <input
              onChange={() => setChecked(!checked)}
              type="checkbox"
              id={todo.id.toString()}
              checked={checked}
            />
            <button
              className={styles.button}
              aria-label="Remove item"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Remove Item
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
      <button
        className={styles.button}
        aria-label="Remove Checked"
        onClick={handleRemoveChecked}
      >
        Remove Checked
      </button>
    </div>
  )
}
