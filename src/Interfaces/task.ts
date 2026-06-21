export type TaskStatus = 'todo' | 'doing' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string
  updatedAt: string
}

export interface TaskDraft {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

export interface TaskFilter {
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
}
