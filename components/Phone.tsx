'use client';

/*
 * The app's home screen, rebuilt in HTML: the mint gradient hero, the five
 * prayer cards each in the colour of its own hour, and the coral card for the
 * one state that is happening right now. Times are a demo day in Cairo, but
 * the countdown is real — it reads the visitor's own clock and reticks every
 * thirty seconds, same as the app's ticker.
 */

import { useEffect, useState } from 'react';
import { Copy, Lang, digits, relativeFuture } from '@/lib/copy';
import {
  IconBellOff,
  IconHalfMoon,
  IconHelp,
  IconMoon,
  IconSettings,
  IconSun,
  IconSunLow,
  IconTwilight,
} from '@/components/icons';

/** A demo day in Cairo, in minutes past midnight. */
const ADHAN = [4 * 60 + 12, 12 * 60 + 59, 16 * 60 + 36, 19 * 60 + 47, 21 * 60 + 12];
/** The app's defaults: silence starts at the adhan and runs ten minutes. */
const AFTER = 10;

const TONES = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
const GLYPHS = [IconTwilight, IconSun, IconSunLow, IconHalfMoon, IconMoon];

const clock = (minutes: number, lang: Lang) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  const text = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  return digits(text, lang);
};

export type PhoneView = 'listing' | 'silent';

export function Phone({ copy, lang, view }: { copy: Copy; lang: Lang; view: PhoneView }) {
  // The server has no clock the visitor would recognise, so the first paint
  // uses a fixed minute and the real one arrives on mount.
  const [nowMin, setNowMin] = useState(10 * 60 + 44);

  useEffect(() => {
    const read = () => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    };
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, []);

  const nextIndex = ADHAN.findIndex((t) => t + AFTER > nowMin);
  const next = nextIndex === -1 ? 0 : nextIndex;
  const minutesUntil = nextIndex === -1 ? 1440 - nowMin + ADHAN[0] : ADHAN[next] - nowMin;

  // In the silent state the phone is mid-window, so it is always the prayer
  // whose window we are inside — pick the one that just started.
  const liveIndex = nextIndex === -1 ? 4 : next;
  const liveEnd = ADHAN[liveIndex] + AFTER;
  const liveElapsed = 4;
  const liveLeft = AFTER - liveElapsed;

  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="phone-topbar">
          <div>
            <div className="phone-title">{copy.brandName}</div>
            <div className="phone-sub">
              {copy.phone.date} · {copy.phone.city}
            </div>
          </div>
          <div className="phone-actions">
            <span className="icon-round">
              <IconHelp />
            </span>
            <span className="icon-round">
              <IconSettings />
            </span>
          </div>
        </div>

        <div className="phone-body">
          {view === 'listing' ? (
            <>
              <div className="p-hero">
                <div className="p-hero-label">{copy.phone.nextSilence}</div>
                <div className="p-hero-count">
                  {relativeFuture(Math.max(minutesUntil, 0), lang)}
                </div>
                <div className="p-hero-row">
                  <span className="avatar">{glyph(next)}</span>
                  <div>
                    <div className="p-hero-name">{copy.phone.prayers[next]}</div>
                    <div className="p-hero-range figure">
                      {clock(ADHAN[next], lang)} – {clock(ADHAN[next] + AFTER, lang)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-card">
                <span
                  className="avatar"
                  style={{ background: 'var(--mint-wash)', color: 'var(--mint-strong)' }}
                >
                  <IconBellOff />
                </span>
                <div>
                  <div className="name">{copy.phone.master}</div>
                  <div className="range" style={{ color: 'var(--ink-faint)' }}>
                    {copy.phone.masterOn}
                  </div>
                </div>
                <span className="p-switch" />
              </div>

              <div className="p-section-title">{copy.phone.todaysPrayers}</div>
              {ADHAN.map((adhan, i) => (
                <PrayerCard
                  key={i}
                  index={i}
                  copy={copy}
                  lang={lang}
                  adhan={adhan}
                  isNext={i === next}
                  isPast={adhan + AFTER <= nowMin}
                />
              ))}
            </>
          ) : (
            <>
              <div className="p-live">
                <div className="p-live-head">
                  <span
                    className="avatar"
                    style={{
                      background: 'color-mix(in srgb, var(--coral) 18%, transparent)',
                      color: 'var(--coral)',
                    }}
                  >
                    <IconBellOff />
                  </span>
                  <div>
                    <div className="p-live-title">{copy.phone.silentNow}</div>
                    <div className="p-live-kicker">
                      {copy.phone.prayers[liveIndex]} · {copy.phone.inProgress}
                    </div>
                  </div>
                </div>
                <div className="p-live-until">
                  {copy.phone.until} <span className="figure">{clock(liveEnd, lang)}</span> ·{' '}
                  {copy.phone.left}{' '}
                  <span className="figure">{digits(String(liveLeft), lang)}</span>{' '}
                  {lang === 'ar' ? 'دقائق' : 'min'}
                </div>
                <div className="p-track">
                  <i style={{ width: `${(liveElapsed / AFTER) * 100}%` }} />
                </div>
                <div className="p-live-btn">{copy.phone.endEarly}</div>
              </div>

              <div className="p-section-title">{copy.phone.restOfToday}</div>
              {ADHAN.map((adhan, i) =>
                i === liveIndex ? null : (
                  <PrayerCard
                    key={i}
                    index={i}
                    copy={copy}
                    lang={lang}
                    adhan={adhan}
                    isNext={false}
                    isPast={i < liveIndex}
                  />
                ),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function glyph(index: number) {
  const Glyph = GLYPHS[index];
  return <Glyph />;
}

function PrayerCard({
  index,
  copy,
  lang,
  adhan,
  isNext,
  isPast,
}: {
  index: number;
  copy: Copy;
  lang: Lang;
  adhan: number;
  isNext: boolean;
  isPast: boolean;
}) {
  const tone = TONES[index];
  return (
    <div
      className={`p-card${isPast ? ' past' : ''}`}
      style={isNext ? { background: `var(--${tone}-wash)` } : undefined}
    >
      <span
        className="avatar"
        style={{
          background: isNext
            ? `color-mix(in srgb, var(--${tone}) 20%, transparent)`
            : `var(--${tone}-wash)`,
          color: `var(--${tone})`,
        }}
      >
        {glyph(index)}
      </span>
      <div>
        <div className="name">{copy.phone.prayers[index]}</div>
        <div className="range figure" style={{ color: `var(--${tone})` }}>
          {clock(adhan, lang)} – {clock(adhan + 10, lang)}
        </div>
      </div>
      <div className="time figure">{clock(adhan, lang)}</div>
    </div>
  );
}
