import type { TaskPriority, TaskStatus } from '../Interfaces/task'

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'Yapılacak',
  doing: 'Devam',
  done: 'Bitti',
}

export const priorityLabels: Record<TaskPriority, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

export const statusOptions: TaskStatus[] = ['todo', 'doing', 'done']

export const priorityOptions: TaskPriority[] = ['low', 'medium', 'high']

export const statusTone: Record<TaskStatus, string> = {
  todo: 'border-slate-200 bg-slate-50 text-slate-700',
  doing: 'border-blue-200 bg-blue-50 text-blue-700',
  done: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

export const priorityTone: Record<TaskPriority, string> = {
  low: 'border-slate-200 bg-slate-50 text-slate-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  high: 'border-rose-200 bg-rose-50 text-rose-700',
}
