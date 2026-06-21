import type { Task } from '../Interfaces/task'

export const TASK_STORAGE_KEY = 'wgjs_tasks_v1'

export const seedTasks: Task[] = [
  {
    id: 'seed-1',
    title: 'Proje klasör yapısını tamamla',
    description: 'Components, Pages ve Interfaces klasörlerini oluşturup README notlarını ekle.',
    status: 'done',
    priority: 'medium',
    createdAt: '2026-06-19T10:00:00.000Z',
    updatedAt: '2026-06-20T09:20:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'CRUD akışını test et',
    description: 'Ekleme, listeleme, güncelleme ve silme adımlarını tek tek doğrula.',
    status: 'doing',
    priority: 'high',
    createdAt: '2026-06-20T11:15:00.000Z',
    updatedAt: '2026-06-21T08:30:00.000Z',
  },
  {
    id: 'seed-3',
    title: 'Ekran görüntüsünü teslim dosyasına koy',
    description: 'Uygulamanın ilk ekranını docs/screenshot.png olarak sakla.',
    status: 'todo',
    priority: 'low',
    createdAt: '2026-06-21T07:45:00.000Z',
    updatedAt: '2026-06-21T07:45:00.000Z',
  },
]

const isTaskArray = (value: unknown): value is Task[] =>
  Array.isArray(value) &&
  value.every((task) => {
    if (!task || typeof task !== 'object') return false
    const candidate = task as Partial<Task>

    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.description === 'string' &&
      ['todo', 'doing', 'done'].includes(String(candidate.status)) &&
      ['low', 'medium', 'high'].includes(String(candidate.priority)) &&
      typeof candidate.createdAt === 'string' &&
      typeof candidate.updatedAt === 'string'
    )
  })

export const loadTasks = (): Task[] => {
  const stored = window.localStorage.getItem(TASK_STORAGE_KEY)

  if (!stored) {
    return seedTasks
  }

  try {
    const parsed = JSON.parse(stored)

    if (isTaskArray(parsed)) {
      return parsed
    }
  } catch {
    window.localStorage.removeItem(TASK_STORAGE_KEY)
  }

  return seedTasks
}

export const saveTasks = (tasks: Task[]) => {
  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
}
