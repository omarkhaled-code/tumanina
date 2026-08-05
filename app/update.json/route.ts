import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { APK } from '@/lib/copy';

/*
 * What an installed copy of the app asks before offering itself an update.
 *
 * It is deliberately the smallest thing that can answer the question, and it is
 * built from the same `APK` constant the download page renders, so a release
 * cannot be announced here and not there.
 *
 * `apkPath` is relative on purpose: the app already knows which host it asked,
 * and resolving against that is one fewer place for a wrong absolute URL to
 * send someone. The app refuses anything that is not on the host it asked.
 */

export const dynamic = 'force-static';

/**
 * Fail the build rather than deploy a version announcement pointing at a file
 * that is not there.
 *
 * The failure this catches is a quiet one: bump `APK.href` in `lib/copy.ts`,
 * forget to commit the actual file, and both the download button and every
 * installed app's update check start 404ing with nothing to say why. This runs
 * at build time, because the route is statically generated.
 */
function assertApkExists() {
  const file = join(process.cwd(), 'public', APK.href.replace(/^\//, ''));
  if (!existsSync(file)) {
    throw new Error(
      `APK.href in lib/copy.ts points at ${APK.href}, but public/ has no such file. ` +
        'Copy the release APK in, or fix the href.',
    );
  }
}

export function GET() {
  assertApkExists();

  const notes = APK.notes ?? { ar: '', en: '' };

  return Response.json(
    {
      versionCode: APK.versionCode,
      versionName: APK.version,
      apkPath: APK.href,
      sha256: APK.sha256,
      sizeMb: APK.sizeMb,
      minAndroid: APK.minAndroid,
      notes,
    },
    {
      headers: {
        // Short enough that a release reaches phones the same day, long enough
        // that this is not a per-launch round trip to the origin.
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    },
  );
}
