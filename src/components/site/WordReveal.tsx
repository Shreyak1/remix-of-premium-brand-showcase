import { motion } from "framer-motion";
import { wordContainer, wordChild } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  inView?: boolean;
};

/**
 * Mask-reveals each word from bottom on mount or whileInView.
 * Wrap inline with other JSX as needed; renders an element of `as`.
 */
export function WordReveal({ text, className, wordClassName, as = "span", inView = true }: Props) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      variants={wordContainer}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pt-[0.2em] pb-[0.1em] -my-[0.15em] mr-[0.25em] last:mr-0">
          <motion.span variants={wordChild} className={`inline-block ${wordClassName ?? ""}`}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}