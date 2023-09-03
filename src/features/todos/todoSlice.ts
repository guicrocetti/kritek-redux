import { createSlice } from "@reduxjs/toolkit"

export interface TodoState {
  todos: Todo[]
}

interface Todo {
  id: number
  text: string
  checked: boolean
}

const initialState: TodoState = {
  todos: [],
}

export const removeAllCheckedTodos = () => (dispatch: any, getState: any) => {
  const { todos: data } = getState()
  const uncheckedTodos = data.todos.filter((todo: Todo) => !todo.checked)
  dispatch(setTodos([uncheckedTodos]))
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
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      )
      if (index !== -1) {
        state.todos[index] = action.payload
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
