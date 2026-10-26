import { useEffect, useRef } from "react";

const BG_IMAGE_1 = "/images/hero-1.png";
const BG_IMAGE_2 = "/images/hero-2.png";

export default function ImageRevealBackground() {
  const revealRef = useRef(null);
  const canvasRef = useRef(null);
  const patternRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const gridOffsetRef = useRef({ x: 0, y: 0 });
  const cellRef = useRef(48);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;

    const setInitial = () => {
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      smoothRef.current = { ...mouseRef.current };
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cellRef.current = Math.round(
        Math.min(64, Math.max(36, window.innerWidth * 0.028))
      );
    };
    setInitial();

    const handlePointerMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cellRef.current = Math.round(
        Math.min(64, Math.max(36, window.innerWidth * 0.028))
      );
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", handleResize);

    const ctx = canvas.getContext("2d");

    const tick = () => {
      const mouse = mouseRef.current;
      const smooth = smoothRef.current;
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      const radius = Math.round(
        Math.min(420, Math.max(160, window.innerWidth * 0.16))
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(
        smooth.x,
        smooth.y,
        0,
        smooth.x,
        smooth.y,
        radius
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.4, "rgba(255,255,255,1)");
      gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
      gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
      gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (revealRef.current) {
        const dataUrl = canvas.toDataURL();
        revealRef.current.style.maskImage = `url(${dataUrl})`;
        revealRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        revealRef.current.style.maskSize = "100% 100%";
        revealRef.current.style.webkitMaskSize = "100% 100%";
      }

      const cx = smooth.x / window.innerWidth - 0.5;
      const cy = smooth.y / window.innerHeight - 0.5;
      const go = gridOffsetRef.current;
      go.x += (cx * 16 - go.x) * 0.06;
      go.y += (cy * 16 - go.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute("x", String(go.x));
        patternRef.current.setAttribute("y", String(go.y));
        const cell = cellRef.current;
        patternRef.current.setAttribute("width", String(cell));
        patternRef.current.setAttribute("height", String(cell));
        const path = patternRef.current.firstElementChild;
        if (path) {
          path.setAttribute("d", `M ${cell} 0 L 0 0 0 ${cell}`);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="block fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BG_IMAGE_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        ref={revealRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BG_IMAGE_2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      >
        <defs>
          <pattern
            ref={patternRef}
            id="grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}