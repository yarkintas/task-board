import { CheckCircle2, CircleDashed, ListChecks, Timer } from 'lucide-react'

interface StatsSummaryProps {
  stats: {
    total: number
    todo: number
    doing: number
    done: number
  }
}

const statsConfig = [
  {
    key: 'total',
    label: 'Tüm görevler',
    icon: ListChecks,
    tone: 'text-slate-700',
  },
  {
    key: 'todo',
    label: 'Yapılacak',
    icon: CircleDashed,
    tone: 'text-slate-600',
  },
  {
    key: 'doing',
    label: 'Devam',
    icon: Timer,
    tone: 'text-blue-600',
  },
  {
    key: 'done',
    label: 'Bitti',
    icon: CheckCircle2,
    tone: 'text-emerald-600',
  },
] as const

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <section
      aria-label="Görev istatistikleri"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statsConfig.map(({ key, label, icon: Icon, tone }) => (
        <div
          className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
          key={key}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <Icon aria-hidden="true" className={`h-5 w-5 ${tone}`} strokeWidth={2} />
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{stats[key]}</p>
        </div>
      ))}
    </section>
  )
}
