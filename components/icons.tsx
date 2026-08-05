/*
 * One icon set for the whole site, drawn on the same 24 grid and inheriting
 * currentColor — the app gives each prayer a glyph taken from the light at
 * that hour, and these are the web's version of the same five.
 */

type Props = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
};

/** Fajr — first light over the horizon. */
export function IconTwilight({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M3 18h18" />
      <path d="M7.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M12 4v2.5M5.2 7.2l1.8 1.8M18.8 7.2 17 9" />
    </svg>
  );
}

/** Dhuhr — the sun at its highest. */
export function IconSun({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </svg>
  );
}

/** Asr — the sun on its way down. */
export function IconSunLow({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="11" r="3.8" />
      <path d="M12 3.4v1.8M4.6 11H2.8M21.2 11h-1.8M6.1 5.1 4.8 3.8M17.9 5.1l1.3-1.3" />
      <path d="M4 19h16" />
    </svg>
  );
}

/** Maghrib — half in light, half in dark. */
export function IconHalfMoon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Isha — night. */
export function IconMoon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
    </svg>
  );
}

/** The app's own subject: the ringer, off. */
export function IconBellOff({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M9.4 18.2a2.6 2.6 0 0 0 5.2 0" />
      <path d="M6.2 9.6a5.8 5.8 0 0 1 8.3-5.2M17.8 11.4v2.1l1.6 2.6a1 1 0 0 1-.85 1.5H7.2" />
      <path d="M6.2 9.6v3.9L4.6 16.1a1 1 0 0 0 .3 1.4" />
      <path d="m3.6 3.6 16.8 16.8" />
    </svg>
  );
}

export function IconShieldCheck({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 5 5.8v5.4c0 4.2 2.9 7.6 7 9.8 4.1-2.2 7-5.6 7-9.8V5.8z" />
      <path d="m9.2 12.1 2 2 3.6-4" />
    </svg>
  );
}

export function IconCrosshair({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="7.6" />
      <path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6" />
    </svg>
  );
}

export function IconGlobe({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.6 12h16.8M12 3.4c2.2 2.4 3.3 5.3 3.3 8.6S14.2 18.2 12 20.6c-2.2-2.4-3.3-5.3-3.3-8.6S9.8 5.8 12 3.4z" />
    </svg>
  );
}

export function IconClock({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  );
}

export function IconRefresh({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.4 4v4.4H16" />
    </svg>
  );
}

export function IconDownload({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.6v11.2" />
      <path d="m7.6 10.6 4.4 4.4 4.4-4.4" />
      <path d="M4.4 19.4h15.2" />
    </svg>
  );
}

export function IconSettings({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.2 14.4a1.5 1.5 0 0 0 .3 1.65l.05.06a1.8 1.8 0 1 1-2.55 2.55l-.06-.06a1.5 1.5 0 0 0-2.55 1.06v.17a1.8 1.8 0 1 1-3.6 0v-.09a1.5 1.5 0 0 0-2.6-1.03l-.06.06A1.8 1.8 0 1 1 5.58 16.3l.06-.06A1.5 1.5 0 0 0 4.58 13.7h-.17a1.8 1.8 0 1 1 0-3.6h.09A1.5 1.5 0 0 0 5.53 7.5l-.06-.06A1.8 1.8 0 1 1 8.02 4.9l.06.06a1.5 1.5 0 0 0 1.65.3h.08a1.5 1.5 0 0 0 .9-1.37v-.17a1.8 1.8 0 1 1 3.6 0v.09a1.5 1.5 0 0 0 2.55 1.06l.06-.06a1.8 1.8 0 1 1 2.55 2.55l-.06.06a1.5 1.5 0 0 0-.3 1.65v.08a1.5 1.5 0 0 0 1.37.9h.17a1.8 1.8 0 1 1 0 3.6h-.09a1.5 1.5 0 0 0-1.36.9z" />
    </svg>
  );
}

export function IconHelp({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.7 9.4a2.4 2.4 0 0 1 4.66.8c0 1.6-2.36 2.4-2.36 2.4" />
      <path d="M12 16.3h.01" />
    </svg>
  );
}

export function IconWarning({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M10.7 4.2 2.9 17.4a1.5 1.5 0 0 0 1.3 2.3h15.6a1.5 1.5 0 0 0 1.3-2.3L13.3 4.2a1.5 1.5 0 0 0-2.6 0z" />
      <path d="M12 9.4v4M12 16.6h.01" />
    </svg>
  );
}

export function IconPhone({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="6.4" y="2.6" width="11.2" height="18.8" rx="2.6" />
      <path d="M10.8 18.6h2.4" />
    </svg>
  );
}

export function IconBattery({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="2.6" y="7.4" width="16" height="9.2" rx="2.4" />
      <path d="M21.4 10.8v2.4" />
      <path d="M6.4 10.6v3M9.8 10.6v3" />
    </svg>
  );
}

export function IconType({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.2V4.6h9.4v1.6M8.7 4.6v14.8M6.6 19.4h4.2" />
      <path d="M14.4 12.6v-1h5.6v1M17.2 11.6v7.8M15.8 19.4h2.8" />
    </svg>
  );
}
