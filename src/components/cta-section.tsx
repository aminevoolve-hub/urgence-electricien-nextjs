import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getVideo } from "@/lib/images";
import SectionContainer from "./section-container";
import QuoteTriggerButton from "./quote-trigger-button";
import AnimatedHeading from "./animated-heading";

export default function CtaSection({
  title = "Une panne électrique ? On arrive en moins d'une heure.",
  description = "Disponible 24/7 dans le Grand Montréal. Diagnostic gratuit, prix annoncé avant la réparation, aucune surcharge d'urgence.",
}: {
  title?: string;
  description?: string;
}) {
  const videoSrc = getVideo("electricien-commercial-montreal-contact");
  const hasVideo = Boolean(videoSrc.webm || videoSrc.mp4);

  return (
    <section className="py-20">
      <SectionContainer>
        <div
          className={`card-shadow relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-6 py-16 text-center ${
            hasVideo ? "text-white" : "bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950"
          }`}
        >
          {hasVideo && (
            <>
              <video className="absolute inset-0 h-full w-full object-cover grayscale" autoPlay loop muted playsInline aria-hidden>
                {videoSrc.webm && <source src={videoSrc.webm} type="video/webm" />}
                {videoSrc.mp4 && <source src={videoSrc.mp4} type="video/mp4" />}
              </video>
              <div
                className="absolute inset-0 mix-blend-color bg-gradient-to-br from-navy-500 via-navy-600 to-amber-500"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/60 to-navy-950/30" aria-hidden />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(5,11,26,0.75), transparent 70%)" }}
                aria-hidden
              />
            </>
          )}
          <AnimatedHeading
            as="h2"
            text={title}
            className={`relative max-w-2xl font-heading text-3xl sm:text-4xl ${hasVideo ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" : ""}`}
          />
          <p className={`relative max-w-xl ${hasVideo ? "text-navy-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]" : "text-navy-900/80"}`}>
            {description}
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${site.phone}`}
              className="btn-gradient-dark flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Appeler {site.phoneDisplay}
            </a>
            <QuoteTriggerButton
              className={`rounded-full border px-7 py-3.5 font-semibold ${
                hasVideo
                  ? "border-white/40 hover:bg-white/10"
                  : "border-navy-950/30 hover:bg-navy-950/10"
              }`}
            >
              Soumission gratuite
            </QuoteTriggerButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
