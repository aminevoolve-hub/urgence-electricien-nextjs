import { processSteps as defaultProcessSteps } from "@/lib/faq";
import SectionContainer from "./section-container";
import AnimatedHeading from "./animated-heading";
import Reveal from "./reveal";

export default function ProcessStepper({
  title = "Comment se déroule un projet",
  description,
  steps = defaultProcessSteps,
}: {
  title?: string;
  description?: string;
  steps?: { title: string; description: string }[];
}) {
  return (
    <section className="py-20">
      <SectionContainer>
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedHeading as="h2" text={title} className="font-heading text-3xl text-navy-900" />
          {description && <p className="mt-3 text-navy-600">{description}</p>}
        </div>

        <div className="mt-14 hidden sm:flex sm:items-start">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                {i > 0 && <div className="dash-connector h-0.5 flex-1" />}
                <span className="btn-gradient mx-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-lg text-navy-950">
                  {i + 1}
                </span>
                {i < steps.length - 1 && <div className="dash-connector h-0.5 flex-1" />}
              </div>
              <p className="mt-8 font-heading text-base text-navy-900">{step.title}</p>
              <p className="mt-2 max-w-56 text-sm text-navy-600">{step.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col divide-y divide-navy-100 rounded-3xl border border-navy-100 sm:hidden">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-2 p-6">
              <span className="btn-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm text-navy-950">
                {i + 1}
              </span>
              <div>
                <p className="font-heading text-base text-navy-900">{step.title}</p>
                <p className="mt-1 text-sm text-navy-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
