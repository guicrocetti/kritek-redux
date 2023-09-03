import { useState } from "react"
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../apiSlice"
import { Todo } from "./todoSlice"
import "./Todos.module.css"

function Todos() {
  const { data: tasks, isLoading, refetch } = useGetTasksQuery("")
  const [taskTitle, setTaskTitle] = useState("")
  const [createTask] = useCreateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const handleAddTask = async () => {
    try {
      await createTask({ title: taskTitle, completed: false })
      setTaskTitle("")
      refetch()
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleRemoveTask = async (id: number) => {
    try {
      await deleteTask(id)
      refetch()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleToggleTask = async (task: Todo) => {
    console.log(task)
    try {
      await updateTask({
        id: task.id,
        title: task.title,
        completed: task.completed,
      })
      refetch()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  return (
    <div className="todos-container">
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          tasks &&
          tasks.map((task: Todo) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  handleToggleTask({
                    ...task,
                    completed: !task.completed,
                  })
                }
              />
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  handleToggleTask({ ...task, title: e.target.value })
                }
              />
              <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Todos
