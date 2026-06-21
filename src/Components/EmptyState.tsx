import { ClipboardList } from 'lucide-react'

interface EmptyStateProps {
  isFiltered: boolean
}

export function EmptyState({ isFiltered }: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <ClipboardList aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-950">
        {isFiltered ? 'Bu filtrede görev yok' : 'Henüz görev yok'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {isFiltered
          ? 'Filtreleri değiştirerek diğer görevleri görebilir veya sağdaki formdan yeni bir görev ekleyebilirsin.'
          : 'Sağdaki formu kullanarak ilk görevini ekle; kayıtlar tarayıcıda LocalStorage ile saklanır.'}
      </p>
    </div>
  )
}
