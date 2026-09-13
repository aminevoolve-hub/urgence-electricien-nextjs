import { stats } from "@/lib/site";
import SectionContainer from "../section-container";
import Reveal from "../reveal";
import AnimatedCounter from "../animated-counter";

export default function StatsBar() {
  return (
    <section id="stats" className="scroll-mt-24 bg-white">
      <SectionContainer className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 divide-x divide-navy-100 py-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="px-6 text-center first:pl-0">
            <p className="font-heading text-4xl text-navy-900">
              <AnimatedCounter value={s.value} />
              <span className="text-amber-600">{s.suffix}</span>
            </p>
            <p className="mt-1 text-sm text-navy-600">{s.label}</p>
          </Reveal>
        ))}
      </SectionContainer>
    </section>
  );
}
