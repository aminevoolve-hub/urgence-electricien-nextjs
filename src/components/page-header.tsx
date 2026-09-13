import type { LucideIcon } from "lucide-react";
import SectionContainer from "./section-container";
import QuoteTriggerButton from "./quote-trigger-button";
import AnimatedHeading from "./animated-heading";
import Breadcrumbs, { type Crumb } from "./breadcrumbs";

export default function PageHeader({
  title,
  description,
  ctaLabel = "Soumission gratuite",
  breadcrumbs,
  icon: Icon,
  quoteService,
  secondaryAction,
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  breadcrumbs?: Crumb[];
  icon?: LucideIcon;
  quoteService?: string;
  secondaryAction?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 text-white lg:pb-24 lg:pt-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/electricien-montreal-commercial.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/60" aria-hidden />
      {breadcrumbs && (
        <div className="relative">
          <Breadcrumbs items={breadcrumbs} light centered />
        </div>
      )}
      <SectionContainer className="relative mt-6 flex flex-col items-center gap-6 text-center">
        {Icon && <Icon className="h-10 w-10 text-amber-500" />}
        <AnimatedHeading as="h1" text={title} className="font-heading text-4xl leading-tight sm:text-5xl" />
        <p className="max-w-xl text-navy-200">{description}</p>
        <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-4">
          <QuoteTriggerButton
            service={quoteService}
            className="btn-gradient rounded-full px-5 py-3 text-sm font-semibold text-white sm:px-7 sm:text-base"
          >
            {ctaLabel}
          </QuoteTriggerButton>
          {secondaryAction}
        </div>
      </SectionContainer>
    </section>
  );
}
