import type { TaskFilter, TaskPriority, TaskStatus } from '../Interfaces/task'
import { priorityLabels, priorityOptions, statusLabels, statusOptions } from '../utils/taskMeta'

interface TaskFiltersProps {
  filter: TaskFilter
  onChange: (filter: TaskFilter) => void
}

export function TaskFilters({ filter, onChange }: TaskFiltersProps) {
  const setStatus = (status: TaskStatus | 'all') => {
    onChange({ ...filter, status })
  }

  const setPriority = (priority: TaskPriority | 'all') => {
    onChange({ ...filter, priority })
  }

  return (
    <section className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-wrap gap-2" aria-label="Durum filtresi">
        <button
          className={`filter-button ${filter.status === 'all' ? 'filter-button-active' : ''}`}
          type="button"
          onClick={() => setStatus('all')}
        >
          Tüm görevler
        </button>
        {statusOptions.map((status) => (
          <button
            className={`filter-button ${filter.status === status ? 'filter-button-active' : ''}`}
            key={status}
            type="button"
            onClick={() => setStatus(status)}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
        Öncelik
        <select
          className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          value={filter.priority}
          onChange={(event) => setPriority(event.target.value as TaskPriority | 'all')}
        >
          <option value="all">Tümü</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority]}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}
