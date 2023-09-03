import { useState } from "react"
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../apiSlice"
import { Todo } from "./todoSlice"

function Todos() {
  const { data: tasks } = useGetTasksQuery("")
  const [taskTitle, setTaskTitle] = useState("")
  const [createTask] = useCreateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const handleAddTask = async () => {
    try {
      await createTask({ title: taskTitle, completed: false })
      setTaskTitle("")
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleRemoveTask = async (id: number) => {
    try {
      await deleteTask(id)
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const handleToggleTask = async (task: Todo) => {
    try {
      await updateTask({
        id: task.id,
        title: task.title,
        completed: !task.completed,
      })
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks &&
          tasks.map((task: Todo) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task)}
              />
              {task.title}
              <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Todos
