import { useEffect, useMemo, useState } from 'react'
import type { Task, TaskDraft, TaskFilter } from '../Interfaces/task'
import { loadTasks, saveTasks } from '../services/taskStorage'

const initialFilter: TaskFilter = {
  status: 'all',
  priority: 'all',
}

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [filter, setFilter] = useState<TaskFilter>(initialFilter)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => filter.status === 'all' || task.status === filter.status)
      .filter((task) => filter.priority === 'all' || task.priority === filter.priority)
      .sort((first, second) => Date.parse(second.updatedAt) - Date.parse(first.updatedAt))
  }, [filter.priority, filter.status, tasks])

  const addTask = (draft: TaskDraft) => {
    const now = new Date().toISOString()

    setTasks((currentTasks) => [
      {
        id: createId(),
        ...draft,
        createdAt: now,
        updatedAt: now,
      },
      ...currentTasks,
    ])
  }

  const updateTask = (id: string, draft: TaskDraft) => {
    const now = new Date().toISOString()

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...draft,
              updatedAt: now,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((task) => task.status === 'todo').length,
      doing: tasks.filter((task) => task.status === 'doing').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  )

  return {
    tasks,
    filteredTasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
  }
}
