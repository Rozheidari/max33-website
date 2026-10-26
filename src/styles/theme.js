export const themeVars = {
    "--pad-x": "clamp(1.25rem, 4.5vw, 5rem)",
    "--pad-y": "clamp(1rem, 3vh, 4rem)",
    "--header-pt": "clamp(1.25rem, 2.5vh, 2.5rem)",
    "--gap-nav": "clamp(1rem, 2.2vw, 2.25rem)",
    "--logo": "clamp(1.35rem, 1.2vw + 0.9rem, 2.1rem)",
    "--logo-deg": "clamp(0.65rem, 0.4vw + 0.45rem, 0.9rem)",
    "--nav": "clamp(0.65rem, 0.35vw + 0.5rem, 0.875rem)",
    "--headline": "clamp(2.15rem, 4.5vw + 0.75rem, 5.25rem)",
    "--body": "clamp(0.7rem, 0.35vw + 0.55rem, 0.9rem)",
    "--micro": "clamp(0.55rem, 0.25vw + 0.45rem, 0.7rem)",
    "--btn-px": "clamp(1.15rem, 1.4vw, 1.75rem)",
    "--btn-py": "clamp(0.6rem, 0.9vh, 0.85rem)",
    "--btn-gap": "clamp(0.75rem, 1vw, 1.1rem)",
    "--feature-pad": "clamp(1rem, 1.5vw, 1.75rem)",
    "--feature-min": "clamp(13rem, 18vw, 20rem)",
    "--corner": "clamp(0.65rem, 0.4vw + 0.4rem, 0.95rem)",
    "--icon": "clamp(1rem, 0.6vw + 0.7rem, 1.35rem)",
    "--drawer-pad": "clamp(1.25rem, 2.5vw, 2.25rem)",
    "--drawer-max": "clamp(18rem, 28vw, 28rem)",
    "--section-gap": "clamp(0.75rem, 1.5vh, 1.5rem)",
    "--main-py": "clamp(1.25rem, 4vh, 4rem)",
  };
  
  export const GLOBAL_STYLES = `
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
    ::selection { background: black; color: white; }
    .feature-block {
      position: absolute;
      right: 1cm;
      bottom: 1cm;
    }
    @media (max-width: 767px) {
      .feature-block {
        position: static;
        margin-top: 2.5rem;
        margin-left: auto;
        margin-right: 0;
      }
    }
  `;