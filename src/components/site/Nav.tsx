import { Link } from "@tanstack/react-router";
import { useCart, cartCount } from "@/lib/cart";
import logo from "@/assets/honee-logo.png";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative inline-block transition-colors hover:text-foreground group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}

export function Nav() {
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartCount(items);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="sticky top-0 z-40 backdrop-blur-md bg-cream/70 border-b border-border/40"
    >
      <nav className="mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-10 py-2">
        <div className="flex-1 hidden md:flex gap-8 text-[13px] uppercase tracking-[0.18em] text-foreground/80">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/journal">Journal</NavLink>
        </div>
        <Link to="/" className="flex items-center">
          <img src={logo} alt="HONÉE" className="h-10 md:h-12 w-auto" />
        </Link>
        <div className="flex-1 flex justify-end items-center gap-6 text-[13px] uppercase tracking-[0.18em] text-foreground/80">
          <span className="hidden md:inline"><NavLink to="/contact">Contact</NavLink></span>
          <button
            onClick={() => setOpen(true)}
            className="relative inline-block hover:text-foreground transition-colors group"
            aria-label="Open cart"
          >
            BAG {count > 0 && <span className="ml-1">({count})</span>}
            <span className="absolute left-0 -bottom-1 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}