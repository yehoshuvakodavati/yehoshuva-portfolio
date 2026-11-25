/** Fixed atmospheric layers: depth, grid, light bloom and film grain. */
export default function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-base" />

      <div
        className="absolute -left-[18%] top-[-12%] h-[70vh] w-[70vw] rounded-full opacity-70 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--glow-a), transparent 65%)' }}
      />
      <div
        className="absolute right-[-14%] top-[32%] h-[62vh] w-[58vw] rounded-full opacity-60 blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--glow-b), transparent 68%)' }}
      />
      <div
        className="absolute bottom-[-20%] left-[24%] h-[50vh] w-[50vw] rounded-full opacity-40 blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)' }}
      />

      <div className="absolute inset-0 grid-plane opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />

      <div className="noise absolute inset-0" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lineStrong to-transparent" />
    </div>
  )
}
