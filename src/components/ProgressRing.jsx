export function ProgressRing({ percent, size = 'lg' }) {
  const dimensions = size === 'sm' ? 'h-24 w-24' : 'h-36 w-36'
  const inner = size === 'sm' ? 'h-[4.5rem] w-[4.5rem] text-2xl' : 'h-28 w-28 text-3xl'

  return (
    <div
      className={`relative flex ${dimensions} shrink-0 items-center justify-center rounded-full`}
      style={{
        background: `conic-gradient(var(--color-silver) 0deg ${percent * 3.6}deg, rgba(255,255,255,0.08) ${percent * 3.6}deg 360deg)`,
      }}
    >
      <div className={`flex ${inner} items-center justify-center rounded-full bg-slate-950 font-semibold`}>
        {percent}%
      </div>
    </div>
  )
}
