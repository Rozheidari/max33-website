export default function Corner({ pos, size = "var(--corner)", className = "" }) {
    const paths = {
      tl: "M0 11.5V0.5H11.5",
      tr: "M0.5 0.5H11.5V11.5",
      bl: "M0 0.5V11.5H11.5",
      br: "M0.5 11.5H11.5V0.5",
    };
  
    return (
      <svg
        viewBox="0 0 12 12"
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
        fill="none"
      >
        <path d={paths[pos]} stroke="black" strokeWidth="1.5" />
      </svg>
    );
  }