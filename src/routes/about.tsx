import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroCollection from "@/assets/hero-collection.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HONÉE" },
      { name: "description", content: "The story behind HONÉE — small-batch, honey-inspired lipcare." },
      { property: "og:title", content: "About — HONÉE" },
      { property: "og:description", content: "Small-batch, honey-inspired lipcare." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 md:px-10 pt-24 md:pt-40 pb-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 mb-8">Our Story</p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl md:text-9xl leading-[0.9]"
        >
          A small house,<br />
          <span className="italic text-caramel">built on honey.</span>
        </motion.h1>
      </section>

      <section className="mx-auto max-w-[900px] px-6 md:px-10 pb-32 space-y-8 text-lg leading-relaxed text-foreground/85">
        <p>
          HONÉE began with a single jar of raw honey on a kitchen counter and a question: why doesn't lipcare feel like something we look forward to?
        </p>
        <p>
          We rendered our first formulas slowly — by hand, in small batches — pairing honey-inspired botanicals with the kind of quiet textures that ask you to take a breath before you apply them. Each product carries a name like a sentence: an invitation, a wink, a small daily promise.
        </p>
        <p>
          We don't make a hundred things. We make four. Each one earns its place in your morning, your afternoon, your before-bed ritual. Honey, look here. Honey, all day. Honey, drippin'. Honey, good night.
        </p>
        <p className="font-display text-3xl text-caramel italic pt-4">Honey, please.</p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <div className="aspect-[16/9] overflow-hidden" style={{ boxShadow: "var(--shadow-warm)" }}>
          <img src={heroCollection} alt="HONÉE collection" className="w-full h-full object-cover" />
        </div>
      </section>
    </>
  );
}