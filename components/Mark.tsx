/*
 * The app's launcher icon, unchanged: an eight-pointed khatim star with the ط
 * of طمأنينة cut out of it, on the mint gradient. The path data is copied from
 * app/src/main/res/drawable/ic_launcher_foreground.xml so the tab, the header
 * and the phone's home screen are all showing one mark.
 */

const STAR =
  'M84.1,56.4A3.4,3.4 0 0 0 84.1,51.6L77.68,45.18A2.4,2.4 0 0 1 76.98,43.49L76.98,34.42A3.4,3.4 0 0 0 73.58,31.02L64.51,31.02A2.4,2.4 0 0 1 62.82,30.32L56.4,23.9A3.4,3.4 0 0 0 51.6,23.9L45.18,30.32A2.4,2.4 0 0 1 43.49,31.02L34.42,31.02A3.4,3.4 0 0 0 31.02,34.42L31.02,43.49A2.4,2.4 0 0 1 30.32,45.18L23.9,51.6A3.4,3.4 0 0 0 23.9,56.4L30.32,62.82A2.4,2.4 0 0 1 31.02,64.51L31.02,73.58A3.4,3.4 0 0 0 34.42,76.98L43.49,76.98A2.4,2.4 0 0 1 45.18,77.68L51.6,84.1A3.4,3.4 0 0 0 56.4,84.1L62.82,77.68A2.4,2.4 0 0 1 64.51,76.98L73.58,76.98A3.4,3.4 0 0 0 76.98,73.58L76.98,64.51A2.4,2.4 0 0 1 77.68,62.82ZM41.42 39.9H48.19V53.93Q49.5 52.33 50.85 51.13Q52.47 49.7 54.41 48.93Q56.35 48.16 58.95 48.16Q61.64 48.16 63.62 49.06Q65.6 49.97 66.92 51.59Q68.23 53.21 68.87 55.32Q69.5 57.44 69.5 59.86V69.1H38.5V63.33H41.42V39.9ZM48.19 60.25V63.33H62.75V59.86Q62.75 57.65 62.17 56.37Q61.58 55.09 60.54 54.51Q59.5 53.94 58.09 53.94Q56.3 53.94 54.69 54.7Q53.08 55.46 51.68 56.66Q50.27 57.85 49.09 59.19Q48.61 59.74 48.19 60.25Z';

export function Mark({ size = 40, radius = 12 }: { size?: number; radius?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 108 108"
      role="img"
      aria-label="Tumanina"
      style={{ flex: 'none', display: 'block' }}
    >
      <defs>
        <linearGradient id="markGrad" x1="0" y1="0" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16D2A5" />
          <stop offset="0.55" stopColor="#00B894" />
          <stop offset="1" stopColor="#009BA8" />
        </linearGradient>
      </defs>
      <rect width="108" height="108" rx={(radius / size) * 108} fill="url(#markGrad)" />
      <g transform="translate(54 54) scale(1.3) translate(-54 -54)">
        <path d={STAR} fill="#fff" fillRule="evenodd" />
      </g>
    </svg>
  );
}
