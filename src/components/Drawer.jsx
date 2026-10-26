import { X } from "lucide-react";

export default function Drawer({ open, onClose, title, children, footer }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 250ms ease",
          zIndex: 30,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "var(--drawer-max)",
          background: "white",
          borderLeft: "1px solid #d1d5db",
          padding: "var(--drawer-pad)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease",
          zIndex: 31,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "1.5rem" }}>
          <h2
            className="font-orbitron font-bold uppercase"
            style={{ fontSize: "var(--nav)", letterSpacing: "0.1em" }}
          >
            {title}
          </h2>
          <button onClick={onClose} className="hover:opacity-50" aria-label="Close">
            <X style={{ width: "var(--icon)", height: "var(--icon)" }} strokeWidth={1.5} />
          </button>
        </div>

        <div style={{ flex: 1 }}>{children}</div>

        <div style={{ marginTop: "1.5rem" }}>
          {footer || (
            <p
              className="font-jakarta text-gray-500 uppercase text-center"
              style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}
            >
              MAX33 © 2026
            </p>
          )}
        </div>
      </div>
    </>
  );
}