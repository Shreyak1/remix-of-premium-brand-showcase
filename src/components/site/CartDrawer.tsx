import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useCart, cartTotal } from "@/lib/cart";

export function CartDrawer() {
  const { items, isOpen, setOpen, update, remove } = useCart();
  const total = cartTotal(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-cocoa/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 24, mass: 1 }}
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-[440px] bg-cream flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-border/50">
              <p className="text-[11px] uppercase tracking-[0.22em]">Your Bag</p>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.22em] hover:text-caramel"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-display text-3xl">Empty as a winter hive.</p>
                  <p className="mt-3 text-sm text-muted-foreground">Add a little sweetness.</p>
                  <Link
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="inline-block mt-8 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1"
                  >
                    Shop the collection
                  </Link>
                </div>
              ) : (
                <motion.ul
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
                  }}
                >
                  <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.slug}
                      layout
                      variants={{
                        hidden: { opacity: 0, x: 30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                      }}
                      exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-24 bg-muted overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-display text-xl leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center border border-border">
                            <button onClick={() => update(item.slug, item.quantity - 1)} className="px-2 py-1">−</button>
                            <motion.span layout className="px-3">{item.quantity}</motion.span>
                            <button onClick={() => update(item.slug, item.quantity + 1)} className="px-2 py-1">+</button>
                          </div>
                          <button onClick={() => remove(item.slug)} className="uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border/50 px-8 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="uppercase tracking-[0.18em] text-[11px]">Subtotal</span>
                  <span className="font-display text-xl">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-foreground text-background py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-caramel transition-colors">
                  Checkout
                </button>
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.18em]">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}