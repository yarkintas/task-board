import { Save, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Task, TaskDraft, TaskPriority, TaskStatus } from '../Interfaces/task'
import { priorityLabels, priorityOptions, statusLabels, statusOptions } from '../utils/taskMeta'

interface TaskFormProps {
  editingTask?: Task
  onSubmit: (draft: TaskDraft) => void
  onCancelEdit: () => void
}

const emptyDraft: TaskDraft = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
}

const getInitialDraft = (task?: Task): TaskDraft =>
  task
    ? {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      }
    : emptyDraft

export function TaskForm({ editingTask, onSubmit, onCancelEdit }: TaskFormProps) {
  const [draft, setDraft] = useState<TaskDraft>(() => getInitialDraft(editingTask))
  const [submitted, setSubmitted] = useState(false)

  const isValid = useMemo(
    () => draft.title.trim().length >= 3 && draft.description.trim().length >= 8,
    [draft.description, draft.title],
  )

  const updateDraft = <Key extends keyof TaskDraft>(key: Key, value: TaskDraft[Key]) => {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!isValid) return

    onSubmit({
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
    })
    setDraft(emptyDraft)
    setSubmitted(false)
  }

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            {editingTask ? 'Görev düzenleniyor' : 'Yeni Görev'}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            {editingTask ? 'Bilgileri güncelle' : 'Planına yeni adım ekle'}
          </h2>
        </div>
        {editingTask && (
          <button
            aria-label="Düzenlemeyi iptal et"
            className="icon-button text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            title="İptal"
            type="button"
            onClick={onCancelEdit}
          >
            <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Başlık
          <input
            className="form-control"
            placeholder="Örn. README dosyasını güncelle"
            type="text"
            value={draft.title}
            onChange={(event) => updateDraft('title', event.target.value)}
          />
          {submitted && draft.title.trim().length < 3 && (
            <span className="text-xs font-medium text-rose-600">Başlık en az 3 karakter olmalı.</span>
          )}
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Açıklama
          <textarea
            className="form-control min-h-28 resize-y"
            placeholder="Görevin kısa açıklamasını yaz."
            value={draft.description}
            onChange={(event) => updateDraft('description', event.target.value)}
          />
          {submitted && draft.description.trim().length < 8 && (
            <span className="text-xs font-medium text-rose-600">
              Açıklama en az 8 karakter olmalı.
            </span>
          )}
        </label>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Durum
            <select
              className="form-control"
              value={draft.status}
              onChange={(event) => updateDraft('status', event.target.value as TaskStatus)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Öncelik
            <select
              className="form-control"
              value={draft.priority}
              onChange={(event) => updateDraft('priority', event.target.value as TaskPriority)}
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority}>
                  {priorityLabels[priority]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(5,150,105,0.24)] transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2"
          type="submit"
        >
          <Save aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          {editingTask ? 'Kaydet' : 'Yeni Görev'}
        </button>
      </form>
    </aside>
  )
}
