import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { products } from "@/lib/products";
import sunrise from "@/assets/ritual/step-1-sunrise.png";
import midday from "@/assets/ritual/step-2-midday.png";
import moon from "@/assets/ritual/step-3-moon.png";
import drip from "@/assets/ritual/step-4-drip.png";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Honey Ritual — HONÉE Journal" },
      { name: "description", content: "A four-step honey ritual: morning balm, midday gloss, evening scrub, and a healing oil before sleep." },
      { property: "og:title", content: "The Honey Ritual — HONÉE Journal" },
      { property: "og:description", content: "A four-step daily lip ritual, from sunrise to soft sleep." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

type Step = {
  time: string;
  hour: string;
  kicker: string;
  title: string;
  italic: string;
  body: string;
  ritual: string;
  productSlug: string;
  productName: string;
  productTagline: string;
  illustration: string;
  bg: string;
};

function getStepsFromProducts(): Step[] {
  const find = (slug: string) => products.find((p) => p.slug === slug)!;
  const allDay = find("honey-all-day");
  const lookHere = find("honey-look-here");
  const goodNight = find("honey-good-night");
  const drippin = find("honey-drippin");

  return [
    {
      time: "AM",
      hour: "07:00",
      kicker: "Step One — Wake",
      title: "Wake the",
      italic: "softness.",
      body: "Mornings ask for very little. A clean slate, a slow breath, and a balm that protects without ceremony. Honey, All Day glides on like sunrise — quiet, warm, and built to last until the world is fully awake.",
      ritual: "Glide on bare lips. Layer again before stepping outside.",
      productSlug: allDay.slug,
      productName: allDay.name,
      productTagline: allDay.tagline,
      illustration: sunrise,
      bg: "oklch(0.95 0.04 80)",
    },
    {
      time: "NOON",
      hour: "12:30",
      kicker: "Step Two — Shine",
      title: "Step out, lit",
      italic: "from within.",
      body: "Midday is for being seen. Sweep on Honey, Look Here for a mirrored finish that catches the light without weight or stick — a little gloss to carry you through lunch, errands, and that one good photograph.",
      ritual: "Apply over bare lips or atop colour. Reapply at golden hour.",
      productSlug: lookHere.slug,
      productName: lookHere.name,
      productTagline: lookHere.tagline,
      illustration: midday,
      bg: "oklch(0.93 0.07 82)",
    },
    {
      time: "PM",
      hour: "21:30",
      kicker: "Step Three — Renew",
      title: "Polish away",
      italic: "the day.",
      body: "Before the pillow, a small ritual. Massage Honey, Good Night across your lips in slow circles — sugar fines lift the day away, honey-inspired emollients leave only softness behind. Wipe gently, or simply let it linger.",
      ritual: "Massage in slow circles for one minute. Wipe or leave on overnight.",
      productSlug: goodNight.slug,
      productName: goodNight.name,
      productTagline: goodNight.tagline,
      illustration: moon,
      bg: "oklch(0.88 0.05 70)",
    },
    {
      time: "NIGHT",
      hour: "22:00",
      kicker: "Step Four — Heal",
      title: "Drench, and",
      italic: "drift off.",
      body: "After the scrub, the drink. Paint Honey, Drippin' across newly-smoothed lips and let marula, rosehip, and honey-inspired botanicals do their slow work overnight. Wake up to lips that feel poured, not patched.",
      ritual: "Sweep the brush across lips as the last step before sleep.",
      productSlug: drippin.slug,
      productName: drippin.name,
      productTagline: drippin.tagline,
      illustration: drip,
      bg: "oklch(0.84 0.04 60)",
    },
  ];
}

function Journal() {
  const steps = getStepsFromProducts();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % steps.length), 7000);
    return () => window.clearTimeout(id);
  }, [index, auto, steps.length]);

  const step = steps[index];

  return (
    <>
      {/* HEADER */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 mb-6">
          Journal — Vol. 01
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-8xl leading-[1.08]"
        >
          The Honey Ritual,<br />
          <span className="italic text-caramel">in four parts.</span>
        </motion.h1>
        <p className="mt-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed text-foreground/75">
          Sunrise to soft sleep. A slow choreography of four small gestures, each one composed to leave your lips a little better than it found them.
        </p>
      </section>

      {/* SLIDESHOW */}
      <section
        className="relative overflow-hidden border-y border-border/40 transition-colors duration-700"
        style={{ background: step.bg }}
        onMouseEnter={() => setAuto(false)}
        onMouseLeave={() => setAuto(true)}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10 md:gap-16 items-center min-h-[560px] md:min-h-[640px]">
          {/* Illustration */}
          <div className="md:col-span-5 relative flex justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <motion.img
                key={`ill-${index}`}
                src={step.illustration}
                alt={`${step.productName} ritual illustration`}
                width={768}
                height={768}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotate: 4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] md:w-[440px] h-auto select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(92,58,42,0.18)]"
              />
            </AnimatePresence>
          </div>

          {/* Copy */}
          <div className="md:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-display text-5xl md:text-6xl text-caramel leading-none">
                    {step.time}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-foreground/60">
                    {step.kicker} · {step.hour}
                  </span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl leading-[1.08]">
                  {step.title}<br />
                  <span className="italic text-caramel">{step.italic}</span>
                </h2>
                <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-foreground/80">
                  {step.body}
                </p>
                <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-foreground/60">
                  Ritual · {step.ritual}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to="/product/$slug"
                    params={{ slug: step.productSlug }}
                    className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 text-[12px] uppercase tracking-[0.22em] hover:bg-caramel transition-colors"
                  >
                    {step.productName}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                    {step.productTagline}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pb-10 md:pb-14 flex items-center justify-between gap-6">
          <div className="flex gap-3">
            {steps.map((s, i) => (
              <button
                key={s.time}
                onClick={() => setIndex(i)}
                aria-label={`Go to step ${i + 1}: ${s.productName}`}
                className="group flex flex-col items-start gap-2"
              >
                <span
                  className={`h-px transition-all duration-500 ${
                    i === index ? "w-16 bg-foreground" : "w-10 bg-foreground/30 group-hover:bg-foreground/60"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] transition-colors ${
                    i === index ? "text-foreground" : "text-foreground/50"
                  }`}
                >
                  {s.time}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-foreground/60">
            <button
              onClick={() => setIndex((i) => (i - 1 + steps.length) % steps.length)}
              className="hover:text-foreground transition-colors"
              aria-label="Previous step"
            >
              ← Prev
            </button>
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setIndex((i) => (i + 1) % steps.length)}
              className="hover:text-foreground transition-colors"
              aria-label="Next step"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-[900px] px-6 md:px-10 py-24 md:py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 mb-6">The Whole Ritual</p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.08]">
          Four pieces.<br />
          <span className="italic text-caramel">One slow, golden day.</span>
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 mt-10 bg-foreground text-background px-7 py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-caramel transition-colors"
        >
          Shop the Collection
          <span>→</span>
        </Link>
      </section>
    </>
  );
}