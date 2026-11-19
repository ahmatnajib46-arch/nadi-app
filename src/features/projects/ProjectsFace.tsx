import { PlaceholderCard } from '@/shared/components/PlaceholderCard'

/**
 * Wajah Project — placeholder Sprint 1.
 */
export function ProjectsFace() {
  return (
    <div
      data-testid="face-scroll-projects"
      className="h-full touch-pan-y overflow-y-auto overscroll-contain px-gutter pb-8 pt-6"
    >
      <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-muted-sage">
        Project
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-soft-white">Project</h2>
      <p className="mt-1 text-sm text-muted-sage">Kumpulan pekerjaan yang sedang kamu jalani.</p>
      <div className="mt-5">
        <PlaceholderCard
          icon="folder"
          title="Belum ada project"
          description="Daftar project dan progresnya akan tampil di sini."
        />
      </div>
    </div>
  )
}
