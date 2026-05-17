import { GoldLink } from './GoldLink'

export function GeExplainer() {
  return (
    <details className="mt-4 border border-silver/20 bg-silver/5 open:bg-silver/8">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
        <span className="text-silver">+</span> How GOLD assigns GE credit
      </summary>
      <div className="border-t border-silver/15 px-4 py-3 text-sm leading-6 text-slate-300">
        <p>
          In Gaucho GOLD, each course is tagged with GE letters (Areas A–G, plus special codes). A single
          class can sometimes satisfy more than one requirement in your audit, but you only receive credit
          once per area toward graduation.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Your degree audit is the source of truth — not this demo checklist.</li>
          <li>
            Double majors and minors can make GE look “full” while individual areas still show open until
            GOLD reconciles overlapping courses.
          </li>
          <li>
            Transfer and AP credit may clear an area with a different label than you expect; confirm in GOLD
            before you skip a planned GE course.
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <GoldLink href="https://catalog.ucsb.edu/general-education" variant="pill">
            General Education (catalog)
          </GoldLink>
          <GoldLink href="https://my.sa.ucsb.edu/gold/">Open degree audit in GOLD</GoldLink>
        </div>
      </div>
    </details>
  )
}
