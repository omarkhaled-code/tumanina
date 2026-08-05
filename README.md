# Tumanina — the download site

A one-page Next.js site that hands out the app's APK. It borrows the app's own
palette, radii and type file, so someone arriving from the phone recognises it:
mint carries the brand, coral marks the one thing happening right now, and each
prayer keeps the colour of its own hour.

Arabic is the default; English and a light/dark switch sit in the header, the
same two choices the app makes in its own settings. `?lang=en` / `?theme=dark`
also work, so a link can be shared already in one.

## Running it

```bash
npm run dev
```

## What lives where

```
app/layout.tsx      fonts, metadata, and the pre-paint boot script for lang/theme
app/page.tsx        the whole page
app/globals.css     the palette, copied from the app's Color.kt / Theme.kt
components/Phone.tsx  the app's home screen rebuilt in HTML, both its states
components/Mark.tsx   the launcher icon's khatim star, same path data
app/update.json/route.ts  what installed apps ask before offering an update
lib/copy.ts         every string, Arabic and English side by side
assets/Cairo.ttf    the same font file the app bundles
public/tumanina-1.0.apk  the release build
```

## Publishing a new APK

The order matters, because the Android build bakes this site's URL into the APK:
see `tumanina.updateBaseUrl` in the Android project's `gradle.properties`. Set
that **before** building, or the release ships unable to check for its own
successors.

1. Bump `versionCode` and `versionName` in the Android `build.gradle.kts`.
2. Build the release APK.
3. Copy it in under its new name:
   ```bash
   cp ../app/build/outputs/apk/release/app-release.apk public/tumanina-<version>.apk
   ```
4. Get the checksum: `shasum -a 256 public/tumanina-<version>.apk`
5. Update `APK` in `lib/copy.ts`: `href`, `name`, `version`, **`versionCode`**,
   `sizeMb`, `sha256`, and `notes` if the release deserves any.

`next.config.ts` no longer needs touching — its header rule matches any `.apk`.
And if step 3 is forgotten, `npm run build` fails with the file it expected
rather than deploying a download button that 404s.

**`versionCode` is the one that matters.** It is the integer from the Android
project's `build.gradle.kts`, and it is the only field installed copies compare
against when they ask `/update.json` whether there is anything newer. Forget to
bump it and phones will never be offered the release, however new the file is.
Nothing checks this for you: the two numbers live in two files, and only one of
them is in this repo.

## `/update.json`

Built from the same `APK` constant the page renders, so the site cannot announce
a release on one and not the other. `apkPath` is relative: the app resolves it
against the host it asked and refuses anything pointing elsewhere.

It is also where the build checks that the APK named in `copy.ts` is actually in
`public/`. That check lives here because this route is statically generated, so
it runs at build time — the failure it catches (a bumped `href` with the file
left uncommitted) is otherwise completely silent until someone tries to download.

## Deploying to Vercel

This directory is its own git repository, separate from the Android project, so
there is nothing to configure:

- **Root Directory:** `.` — the default. (It is *not* `website`; that would only
  apply if this were still a subdirectory of the Android repo.)
- Framework preset: Next.js (detected)
- No environment variables, no build settings to change.

Import it from GitHub, or from here:

```bash
npx vercel
```

The APK is committed to the repo — Vercel serves it as a static file, which is
why no storage or CDN setup is needed. Each release adds a few megabytes to the
history permanently; at one release a month that is not worth solving, but it is
the reason to delete superseded APKs rather than keep every version live.

### The domain is a one-way door

Installed apps ask the host that was compiled into them. Whatever domain the
first update-capable release is built against, every copy of that release will
keep asking it forever — so use the stable production domain, never a
per-deployment preview URL, and if a custom domain is coming, set it up *before*
that release rather than after. Changing it later means keeping the old one
alive as a redirect for as long as anyone still runs an old build.
