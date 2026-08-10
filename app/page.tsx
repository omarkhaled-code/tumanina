'use client';

import { useCallback, useEffect, useState } from 'react';
import { Mark } from '@/components/Mark';
import { Phone, PhoneView } from '@/components/Phone';
import { APK, COPY, LANGS, Lang, digits } from '@/lib/copy';
import {
  IconArrow,
  IconBellOff,
  IconCalendarDay,
  IconClock,
  IconCrosshair,
  IconDownload,
  IconMoon,
  IconPhone,
  IconRefresh,
  IconShieldCheck,
  IconSparkle,
  IconSun,
  IconTimer,
  IconType,
  IconVibrate,
  IconWarning,
  IconWidget,
} from '@/components/icons';

type ThemeChoice = 'system' | 'light' | 'dark';

const FEATURE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  bell: IconBellOff,
  refresh: IconRefresh,
  shield: IconShieldCheck,
  crosshair: IconCrosshair,
  clock: IconClock,
  type: IconType,
  vibrate: IconVibrate,
  calendar: IconCalendarDay,
  timer: IconTimer,
  widget: IconWidget,
};

export default function Page() {
  const [lang, setLang] = useState<Lang>('ar');
  const [theme, setTheme] = useState<ThemeChoice>('system');
  const [view, setView] = useState<PhoneView>('listing');
  const copy = COPY[lang];

  // Pick up whatever the boot script already applied, so the React tree and
  // the document agree from the first render after mount. ?lang= and ?theme=
  // win over the stored choice, which makes a link shareable in either one.
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const wantedLang = (query.get('lang') ?? localStorage.getItem('tumanina-lang')) as Lang | null;
    const wantedTheme = (query.get('theme') ??
      localStorage.getItem('tumanina-theme')) as ThemeChoice | null;
    if (wantedLang === 'ar' || wantedLang === 'en') setLang(wantedLang);
    if (wantedTheme === 'system' || wantedTheme === 'light' || wantedTheme === 'dark') {
      setTheme(wantedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('tumanina-lang', lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches);
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
    };
    apply();
    localStorage.setItem('tumanina-theme', theme);
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);

  // The phone alternates between its two states on its own, and stops the
  // moment a visitor takes over.
  const [autoplay, setAutoplay] = useState(true);
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setView((v) => (v === 'listing' ? 'silent' : 'listing')), 6000);
    return () => clearInterval(id);
  }, [autoplay]);

  const pick = useCallback((next: PhoneView) => {
    setAutoplay(false);
    setView(next);
  }, []);

  // A quiet fade-and-rise the first time each card, step or question scrolls
  // into view. Only ever applied to what starts below the fold — nothing
  // above it is ever hidden, so there is no flash for anyone whose scroll
  // position lands there before this effect has run.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((el) => {
      el.classList.add('reveal-ready');
      io.observe(el);
    });
    return () => io.disconnect();
    // Deliberately once: switching language only changes text inside the
    // same elements, not which elements exist, so there is nothing new here
    // for a second run to find.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const num = (value: string) => digits(value, lang);

  return (
    <>
      <header className="bar">
        <div className="shell bar-inner">
          <a className="brand" href="#top">
            <Mark size={40} radius={12} />
            <span>
              <span className="brand-name">{copy.brandName}</span>
              <span className="brand-sub">{copy.brandSub}</span>
            </span>
          </a>

          <div className="segmented" role="group" aria-label={copy.themeLabel}>
            <button
              type="button"
              aria-pressed={theme === 'system'}
              onClick={() => setTheme('system')}
              title={copy.themes.system}
            >
              <IconPhone />
            </button>
            <button
              type="button"
              aria-pressed={theme === 'light'}
              onClick={() => setTheme('light')}
              title={copy.themes.light}
            >
              <IconSun />
            </button>
            <button
              type="button"
              aria-pressed={theme === 'dark'}
              onClick={() => setTheme('dark')}
              title={copy.themes.dark}
            >
              <IconMoon />
            </button>
          </div>

          {/* Each language names itself in its own script — the same rule the
              app follows on its first screen. */}
          <div className="segmented" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                lang={l.id}
                aria-pressed={lang === l.id}
                onClick={() => setLang(l.id)}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>
      </header>

      <a className="announce" href="#features">
        <span className="announce-badge">
          <IconSparkle />
          {copy.announce.badge}
        </span>
        <span className="announce-text">{copy.announce.text}</span>
        <span className="announce-cta">
          {copy.announce.cta}
          <IconArrow className="announce-arrow" />
        </span>
      </a>

      <main id="top">
        <div className="field">
          <div className="shell hero">
            <div className="hero-copy">
              <p className="eyebrow">{copy.hero.eyebrow}</p>
              <h1>
                {copy.hero.titleA} <span className="accent">{copy.hero.titleAccent}</span>
                {copy.hero.titleB}
              </h1>
              <p className="hero-lede">{copy.hero.lede}</p>

              <div className="hero-cta">
                <a className="btn btn-primary" href={APK.href} download={APK.name}>
                  <IconDownload />
                  {copy.hero.download}
                </a>
                <a className="btn btn-soft" href="#install">
                  {copy.hero.howTo}
                </a>
              </div>

              <div className="hero-meta">
                <span>
                  <i className="dot" />
                  APK · {num(APK.sizeMb)} {lang === 'ar' ? 'ميجابايت' : 'MB'}
                </span>
                {copy.hero.meta.map((m) => (
                  <span key={m}>
                    <i className="dot" />
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="phone-stage">
              <Phone copy={copy} lang={lang} view={view} />
              <div className="phone-tabs" role="group">
                <button
                  type="button"
                  aria-pressed={view === 'listing'}
                  onClick={() => pick('listing')}
                >
                  {copy.phone.tabListing}
                </button>
                <button
                  type="button"
                  aria-pressed={view === 'silent'}
                  onClick={() => pick('silent')}
                >
                  {copy.phone.tabSilent}
                </button>
              </div>
            </div>
          </div>
        </div>

        <section id="features">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">{copy.features.eyebrow}</p>
              <h2>{copy.features.title}</h2>
              <p>{copy.features.lede}</p>
            </div>

            <div className="grid">
              {copy.features.items.map((item) => {
                const Glyph = FEATURE_ICONS[item.icon];
                const tone = item.tone === 'mint' ? 'mint' : item.tone;
                return (
                  <article className="card" data-reveal key={item.title}>
                    {item.badge && <span className="card-badge">{copy.announce.badge}</span>}
                    <span
                      className="avatar"
                      style={{
                        background:
                          tone === 'mint'
                            ? 'var(--mint-wash)'
                            : tone === 'coral'
                              ? 'var(--coral-wash)'
                              : `var(--${tone}-wash)`,
                        color:
                          tone === 'mint'
                            ? 'var(--mint-strong)'
                            : tone === 'coral'
                              ? 'var(--coral)'
                              : `var(--${tone})`,
                      }}
                    >
                      <Glyph />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="install">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">{copy.install.eyebrow}</p>
              <h2>{copy.install.title}</h2>
              <p>{copy.install.lede}</p>
            </div>

            <div className="steps">
              {copy.install.steps.map((step, i) => (
                <article className="step" data-reveal key={step.title}>
                  <span className="step-n">{num(String(i + 1))}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>

            <div className="note">
              <IconWarning />
              <p>{copy.install.warning}</p>
            </div>
          </div>
        </section>

        <section id="download">
          <div className="shell">
            <div className="band" data-reveal>
              <div className="band-copy">
                <h2>{copy.band.title}</h2>
                <p>{copy.band.body}</p>
                <p className="band-note">{copy.band.note}</p>
              </div>
              <a className="btn btn-primary" href={APK.href} download={APK.name}>
                <IconDownload />
                {copy.band.button}
              </a>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="shell">
            <div className="section-head">
              <p className="eyebrow">{copy.faq.eyebrow}</p>
              <h2>{copy.faq.title}</h2>
            </div>
            <div className="faq">
              {copy.faq.items.map((qa) => (
                <details data-reveal key={qa.q}>
                  <summary>{qa.q}</summary>
                  <p>{qa.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mark size={26} radius={8} />
            <span>{copy.footer.built}</span>
          </div>
          <div>
            <div>
              {copy.footer.source} {num(APK.version)} · {APK.name}
            </div>
            <div className="hash">
              {copy.footer.checksum}: {APK.sha256}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
