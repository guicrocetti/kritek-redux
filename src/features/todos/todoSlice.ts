import { createSlice } from "@reduxjs/toolkit"

export interface TodoState {
  todos: Todo[]
}

export interface Todo {
  id: number
  text: string
}

const initialState: TodoState = {
  todos: [],
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log("addTodo", action.payload)
      const newTodo = {
        id: state.todos.length + 1,
        text: action.payload,
        checked: false,
      }
      state.todos.push(newTodo)
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload
      const todo = state.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.text = text
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload
    },
  },
})

export const selectTodos = (state: { todos: TodoState }) => state.todos.todos

export const { addTodo, removeTodo, updateTodo, setTodos } = todoSlice.actions
export default todoSlice.reducer
