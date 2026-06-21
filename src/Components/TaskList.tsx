import type { Task } from '../Interfaces/task'
import { EmptyState } from './EmptyState'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  totalTaskCount: number
  editingTaskId?: string
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskList({ tasks, totalTaskCount, editingTaskId, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState isFiltered={totalTaskCount > 0} />
  }

  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskCard
          isEditing={editingTaskId === task.id}
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
