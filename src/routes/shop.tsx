import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { TiltCard } from "@/components/site/TiltCard";
import { WordReveal } from "@/components/site/WordReveal";
import { diagonalContainer, diagonalChild } from "@/lib/motion";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — HONÉE" },
      { name: "description", content: "Shop the complete HONÉE lipcare collection: gloss, oil, scrub, and balm." },
      { property: "og:title", content: "Shop — HONÉE" },
      { property: "og:description", content: "Honey-inspired lipcare, in four quiet acts." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-24 pb-24">
      <div className="mb-16 md:mb-24 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 mb-10">The Collection</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[1.2] pb-3">
          <WordReveal as="span" inView={false} text="Lipcare," className="block" />
          <WordReveal as="span" inView={false} text="curated." className="block italic text-caramel" />
        </h1>
        <p className="mt-8 text-base md:text-lg text-foreground/75 leading-relaxed">
          Four formulas. Each one a chapter in the honey ritual.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20"
        variants={diagonalContainer(2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map((p) => (
          <motion.div key={p.slug} variants={diagonalChild}>
            <TiltCard>
              <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                  <motion.img
                    src={p.images[0]}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  />
                  {p.images[1] && (
                    <motion.img
                      src={p.images[1]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    />
                  )}
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/60">{p.type}</p>
                    <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">{p.name}</h2>
                    <p className="mt-3 text-sm text-muted-foreground max-w-md">{p.shortDescription}</p>
                  </div>
                  <span className="font-display text-2xl">${p.price}</span>
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}