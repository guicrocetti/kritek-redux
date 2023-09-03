import { useState, useEffect } from "react"
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../apiSlice"
import { Todo } from "./todoSlice"

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
    try {
      await updateTask({
        id: task.id,
        title: task.title,
        completed: !task.completed,
      })
      refetch()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
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
              {task.title}
              <button onClick={() => handleToggleTask(task)}>Update</button>
              <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Todos
