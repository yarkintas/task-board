import { CloudUpload, HardDrive, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Task, TaskDraft } from '../Interfaces/task'
import { StatsSummary } from '../Components/StatsSummary'
import { TaskFilters } from '../Components/TaskFilters'
import { TaskForm } from '../Components/TaskForm'
import { TaskList } from '../Components/TaskList'
import { useTasks } from '../hooks/useTasks'

export function DashboardPage() {
  const {
    tasks,
    filteredTasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
  } = useTasks()
  const [editingTaskId, setEditingTaskId] = useState<string>()

  const editingTask = useMemo(
    () => tasks.find((task) => task.id === editingTaskId),
    [editingTaskId, tasks],
  )

  const handleSubmit = (draft: TaskDraft) => {
    if (editingTask) {
      updateTask(editingTask.id, draft)
      setEditingTaskId(undefined)
      return
    }

    addTask(draft)
  }

  const handleDelete = (task: Task) => {
    const confirmed = window.confirm(`"${task.title}" görevini silmek istiyor musun?`)

    if (!confirmed) return

    deleteTask(task.id)

    if (editingTaskId === task.id) {
      setEditingTaskId(undefined)
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-[0_14px_30px_rgba(5,150,105,0.22)]">
              <Plus aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                Görev Panosu
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                React, TypeScript ve Tailwind CSS ile hazırlanmış CRUD odaklı ders projesi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700">
              <HardDrive aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              Yerel depolama aktif
            </span>
            <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
              <CloudUpload aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              Statik deploy hazır
            </span>
          </div>
        </header>

        <div className="grid flex-1 gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="grid min-w-0 content-start gap-4">
            <StatsSummary stats={stats} />
            <TaskFilters filter={filter} onChange={setFilter} />

            <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">Tüm görevler</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Son güncellenen kayıtlar önce gösterilir.
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  {filteredTasks.length} / {tasks.length} kayıt
                </p>
              </div>

              <TaskList
                editingTaskId={editingTaskId}
                tasks={filteredTasks}
                totalTaskCount={tasks.length}
                onDelete={handleDelete}
                onEdit={(task) => setEditingTaskId(task.id)}
              />
            </div>
          </section>

          <div className="lg:sticky lg:top-5 lg:self-start">
            <TaskForm
              key={editingTask?.id ?? 'new-task'}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTaskId(undefined)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
