import { useEffect, useRef, useState, useCallback } from "react";
import { ShoppingBag, ArrowUpRight, ChevronRight, Check } from "lucide-react";

import Corner from "./components/Corner";
import Drawer from "./components/Drawer";
import ImageRevealBackground from "./components/ImageRevealBackground";
import { SHOP_ITEMS } from "./data/shopItems";
import { COLLECTIONS } from "./data/collections";
import { JOURNAL_ITEMS } from "./data/journalItems";
import { themeVars, GLOBAL_STYLES } from "./styles/theme";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Michroma&family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";

export default function MAX33Landing() {
  const [drawer, setDrawer] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimeout = useRef(null);

  useEffect(() => {
    if (document.getElementById("MAX33-fonts")) return;
    const link = document.createElement("link");
    link.id = "MAX33-fonts";
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.title === item.title);
      if (existing) {
        return prev.map((p) =>
          p.title === item.title ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`Added "${item.title}" to your shopping bag.`);
  };

  const removeFromCart = (title) => {
    setCart((prev) => prev.filter((p) => p.title !== title));
  };

  const checkout = () => {
    setCart([]);
    setDrawer(null);
    showToast("Order submitted successfully!");
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const closeDrawer = () => setDrawer(null);

  return (
    <div
      className="min-h-screen bg-white text-black font-jakarta flex flex-col justify-between relative overflow-hidden"
      style={themeVars}
    >
      <style>{GLOBAL_STYLES}</style>

      <ImageRevealBackground />

      <header
        className="relative z-20 flex items-center justify-between"
        style={{
          paddingInline: "var(--pad-x)",
          paddingTop: "var(--header-pt)",
          paddingBottom: "var(--section-gap)",
        }}
      >
        <button
          onClick={closeDrawer}
          className="font-orbitron hover:opacity-80"
          style={{ fontWeight: 900, letterSpacing: "0.15em", fontSize: "var(--logo)" }}
        >
          MAX33
        </button>

        <nav
          className="flex items-center font-jakarta font-medium uppercase"
          style={{
            gap: "var(--gap-nav)",
            letterSpacing: "0.2em",
            fontSize: "var(--nav)",
          }}
        >
          <button onClick={() => setDrawer("shop")} className="hover:opacity-50">
            SHOP
          </button>
          <button onClick={() => setDrawer("collections")} className="hover:opacity-50">
            COLLECTIONS
          </button>
          <button onClick={() => setDrawer("journal")} className="hover:opacity-50">
            JOURNAL
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setDrawer("cart")}
            className="relative hover:opacity-50"
            aria-label="Cart"
          >
            <ShoppingBag
              style={{ width: "var(--icon)", height: "var(--icon)" }}
              strokeWidth={1.5}
            />
            {cartCount > 0 && (
              <span
                className="absolute flex items-center justify-center bg-black text-white rounded-full"
                style={{
                  top: "-0.45rem",
                  right: "-0.55rem",
                  width: "1rem",
                  height: "1rem",
                  fontSize: "0.6rem",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      <main
        className="relative z-10 flex-1 flex flex-col lg:flex-row lg:justify-between"
        style={{ paddingInline: "var(--pad-x)", paddingBlock: "var(--main-py)" }}
      >
        <div
          className="flex flex-col justify-center"
          style={{
            gap: "var(--section-gap)",
            transform: "translateY(calc(clamp(3rem, 14vh, 9rem) - 3cm))",
          }}
        >
          <div style={{ position: "relative", width: "fit-content", padding: "0.9rem", zIndex: 10 }}>
            <div className="absolute top-0 left-0" style={{ zIndex: 20, pointerEvents: "none" }}>
              <Corner pos="tl" />
            </div>
            <div className="absolute top-0 right-0" style={{ zIndex: 20, pointerEvents: "none" }}>
              <Corner pos="tr" />
            </div>
            <div className="absolute bottom-0 left-0" style={{ zIndex: 20, pointerEvents: "none" }}>
              <Corner pos="bl" />
            </div>
            <div className="absolute bottom-0 right-0" style={{ zIndex: 20, pointerEvents: "none" }}>
              <Corner pos="br" />
            </div>

            <h1
              className="font-orbitron font-extrabold uppercase"
              style={{
                letterSpacing: "0.08em",
                lineHeight: 1.05,
                fontSize: "var(--headline)",
                fontWeight: 800,
                margin: 0,
                position: "relative",
                zIndex: 1,
              }}
            >
              WORLD
              <br />
              DRIVERS
              <br />
              CHAMPION
            </h1>
          </div>

          <button
            onClick={() => setDrawer("shop")}
            className="group inline-flex items-center w-fit border rounded-md uppercase font-jakarta hover:bg-black hover:text-white transition-colors"
            style={{
              borderColor: "#9ca3af",
              gap: "var(--btn-gap)",
              letterSpacing: "0.18em",
              fontSize: "var(--body)",
              paddingInline: "var(--btn-px)",
              paddingBlock: "var(--btn-py)",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "black")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#9ca3af")}
          >
            SHOP NOW
            <ArrowUpRight
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ width: "var(--icon)", height: "var(--icon)" }}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <div
          className="feature-block"
          style={{ padding: "var(--feature-pad)", minWidth: "var(--feature-min)" }}
        >
          <div className="absolute top-0 left-0">
            <Corner pos="tl" />
          </div>
          <div className="absolute top-0 right-0">
            <Corner pos="tr" />
          </div>
          <div className="absolute bottom-0 left-0">
            <Corner pos="bl" />
          </div>
          <div className="absolute bottom-0 right-0">
            <Corner pos="br" />
          </div>

          <img
            src="/images/logo.png"
            alt="Feature"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "clamp(5rem, 8vw, 8rem)",
              height: "auto",
              objectFit: "contain",
              marginInline: "auto",
            }}
          />
        </div>
      </main>

      <Drawer open={drawer === "shop"} onClose={closeDrawer} title="Catalog">
        <p
          className="font-jakarta text-gray-500 uppercase"
          style={{ fontSize: "var(--micro)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}
        >
          Featured Helmets
        </p>
        <div className="flex flex-col" style={{ gap: "1.5rem" }}>
          {SHOP_ITEMS.map((item) => (
            <div key={item.title} className="border-b border-gray-200 pb-4">
              <p
                className="text-gray-400 uppercase"
                style={{ fontSize: "var(--micro)", letterSpacing: "0.1em" }}
              >
                {item.tag}
              </p>
              <p
                className="font-orbitron font-bold uppercase"
                style={{ fontSize: "var(--body)", marginTop: "0.35rem" }}
              >
                {item.title}
              </p>
              <div className="flex items-center justify-between" style={{ marginTop: "0.6rem" }}>
                <span className="font-jakarta font-semibold" style={{ fontSize: "var(--body)" }}>
                  ${item.price}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="border border-gray-400 rounded-md uppercase hover:bg-black hover:text-white hover:border-black transition-colors"
                  style={{
                    letterSpacing: "0.15em",
                    fontSize: "var(--micro)",
                    padding: "0.4rem 0.9rem",
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer open={drawer === "collections"} onClose={closeDrawer} title="Collection 2026">
        <p
          className="font-jakarta text-gray-500 uppercase"
          style={{ fontSize: "var(--micro)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}
        >
          Season Lineup
        </p>
        <div className="flex flex-col" style={{ gap: "1.5rem" }}>
          {COLLECTIONS.map((c) => (
            <div key={c.title} className="border-b border-gray-200 pb-4">
              <p className="font-orbitron font-bold uppercase" style={{ fontSize: "var(--body)" }}>
                {c.title}
              </p>
              <p
                className="font-jakarta text-gray-600"
                style={{ fontSize: "var(--micro)", marginTop: "0.5rem", lineHeight: 1.6 }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer open={drawer === "journal"} onClose={closeDrawer} title="Articles">
        <p
          className="font-jakarta text-gray-500 uppercase"
          style={{ fontSize: "var(--micro)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}
        >
          Latest NEWS
        </p>
        <div className="flex flex-col" style={{ gap: "1.5rem" }}>
          {JOURNAL_ITEMS.map((j) => (
            <div key={j.title} className="border-b border-gray-200 pb-4">
              <p
                className="text-gray-400 uppercase"
                style={{ fontSize: "var(--micro)", letterSpacing: "0.1em" }}
              >
                {j.date}
              </p>
              <p
                className="font-orbitron font-bold uppercase"
                style={{ fontSize: "var(--body)", marginTop: "0.35rem" }}
              >
                {j.title}
              </p>
              <p
                className="font-jakarta text-gray-500 uppercase"
                style={{ fontSize: "var(--micro)", marginTop: "0.4rem", letterSpacing: "0.1em" }}
              >
                {j.read}
              </p>
            </div>
          ))}
        </div>
      </Drawer>

      <Drawer
        open={drawer === "cart"}
        onClose={closeDrawer}
        title="Shopping Bag"
        footer={
          cart.length > 0 ? (
            <button
              onClick={checkout}
              className="w-full flex items-center justify-center bg-black text-white uppercase rounded-md hover:opacity-90"
              style={{
                gap: "0.5rem",
                letterSpacing: "0.18em",
                fontSize: "var(--body)",
                padding: "var(--btn-py) var(--btn-px)",
              }}
            >
              CHECKOUT NOW
              <ChevronRight
                style={{ width: "var(--icon)", height: "var(--icon)" }}
                strokeWidth={1.5}
              />
            </button>
          ) : undefined
        }
      >
        {cart.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ paddingTop: "2.5rem", gap: "1rem" }}
          >
            <ShoppingBag
              style={{ width: "2rem", height: "2rem" }}
              strokeWidth={1}
              className="text-gray-400"
            />
            <p className="font-jakarta text-gray-500" style={{ fontSize: "var(--body)" }}>
              Your shopping bag is empty.
            </p>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: "1.25rem" }}>
            {cart.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between border-b border-gray-200 pb-3"
              >
                <div>
                  <p
                    className="font-orbitron font-bold uppercase"
                    style={{ fontSize: "var(--body)" }}
                  >
                    {item.title}
                    {item.qty > 1 ? ` × ${item.qty}` : ""}
                  </p>
                  <p
                    className="font-jakarta text-gray-600"
                    style={{ fontSize: "var(--micro)", marginTop: "0.25rem" }}
                  >
                    ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.title)}
                  className="text-gray-400 uppercase hover:text-black"
                  style={{ fontSize: "var(--micro)", letterSpacing: "0.1em" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </Drawer>

      <div
        className="fixed z-40 flex items-center bg-black text-white rounded-md"
        style={{
          top: "1.5rem",
          right: "1.5rem",
          gap: "0.6rem",
          padding: "0.75rem 1.1rem",
          fontSize: "var(--micro)",
          letterSpacing: "0.05em",
          transform: toast ? "translateY(0)" : "translateY(-1rem)",
          opacity: toast ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}
      >
        <Check style={{ width: "1rem", height: "1rem", color: "#34d399" }} strokeWidth={2} />
        <span className="font-jakarta">{toast}</span>
      </div>
    </div>
  );
}