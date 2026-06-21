import { CalendarClock, CheckCircle2, Pencil, Trash2 } from 'lucide-react'
import type { Task } from '../Interfaces/task'
import { priorityLabels, priorityTone, statusLabels, statusTone } from '../utils/taskMeta'

interface TaskCardProps {
  task: Task
  isEditing: boolean
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export function TaskCard({ task, isEditing, onEdit, onDelete }: TaskCardProps) {
  return (
    <article
      className={`rounded-lg border bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)] transition ${
        isEditing ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`badge ${statusTone[task.status]}`}>
              {statusLabels[task.status]}
            </span>
            <span className={`badge ${priorityTone[task.priority]}`}>
              {priorityLabels[task.priority]} öncelik
            </span>
          </div>
          <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-950">{task.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{task.description}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label={`${task.title} görevini düzenle`}
            className="icon-button text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            title="Düzenle"
            type="button"
            onClick={() => onEdit(task)}
          >
            <Pencil aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            aria-label={`${task.title} görevini sil`}
            className="icon-button text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            title="Sil"
            type="button"
            onClick={() => onDelete(task)}
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Güncellendi: {dateFormatter.format(new Date(task.updatedAt))}
        </span>
        {task.status === 'done' && (
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            Tamamlandı
          </span>
        )}
      </div>
    </article>
  )
}
