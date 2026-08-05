import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Any APK, not one named version. This used to name the file, which
        // meant every release needed an edit here as well — and forgetting it
        // failed quietly: the browser would try to display the file instead of
        // Android offering to install it, with nothing to say why.
        source: '/:file(.*\\.apk)',
        headers: [
          // Android will only offer to install the file if it arrives with the
          // right type; the disposition makes a shared link download rather
          // than open in the browser's viewer.
          { key: 'Content-Type', value: 'application/vnd.android.package-archive' },
          { key: 'Content-Disposition', value: 'attachment' },
        ],
      },
    ];
  },
};

export default nextConfig;
