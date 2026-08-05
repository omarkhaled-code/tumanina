/*
 * Both languages live here side by side, exactly as they do in the app's two
 * strings.xml files. The Arabic is the one the app was written in first; the
 * English is a translation of it, not the other way round.
 */

export type Lang = 'ar' | 'en';

export const LANGS: { id: Lang; native: string; dir: 'rtl' | 'ltr' }[] = [
  { id: 'ar', native: 'العربية', dir: 'rtl' },
  { id: 'en', native: 'English', dir: 'ltr' },
];

/**
 * The one description of the current release. The page reads it, and so does
 * `/update.json` — which is what an installed app asks before offering itself an
 * update, so the two can never disagree about what the latest version is.
 *
 * `versionCode` is the field that decides: it is the integer from the Android
 * project's `build.gradle.kts`, and it is what the app compares against. Bump it
 * with every release or installed copies will never see the new build.
 */
export const APK = {
  href: '/tumanina-1.0.apk',
  name: 'tumanina-1.0.apk',
  version: '1.0',
  versionCode: 1,
  sizeMb: '2.1',
  minAndroid: '8.0',
  sha256: 'eb9ca590007fb571db4a9a6c18a2572d7ea63dc6586e3ec6c56d1fa072e8028f',
  /** Shown in the app's update prompt. Leave empty to show none. */
  notes: {
    ar: '',
    en: '',
  },
};

/** ٠١٢ instead of 012 when the page is in Arabic, same as the phone would. */
export function digits(value: string, lang: Lang): string {
  if (lang !== 'ar') return value;
  return value.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
}

/**
 * "بعد ساعتين و١٥ دقيقة" — Arabic has a dual and a 3–10 plural, which is why
 * the app made this a real plurals resource instead of splicing an English
 * fragment into a translated sentence. Same rules here.
 */
export function relativeFuture(totalMinutes: number, lang: Lang): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (lang === 'en') {
    if (totalMinutes < 1) return 'in under a minute';
    const parts: string[] = [];
    if (h > 0) parts.push(h === 1 ? '1 hour' : `${h} h`);
    if (m > 0) parts.push(m === 1 ? '1 minute' : `${m} min`);
    return `in ${parts.join(' ')}`;
  }

  // Arabic has a zero form of its own, and the app uses it rather than
  // printing a bare "٠ دقيقة".
  if (totalMinutes < 1) return 'بعد أقل من دقيقة';

  const arabicPlural = (n: number, one: string, two: string, few: string, many: string) => {
    if (n === 1) return one;
    if (n === 2) return two;
    if (n >= 3 && n <= 10) return few.replace('%d', digits(String(n), 'ar'));
    return many.replace('%d', digits(String(n), 'ar'));
  };

  const parts: string[] = [];
  if (h > 0) parts.push(arabicPlural(h, 'ساعة', 'ساعتين', '%d ساعات', '%d ساعة'));
  if (m > 0) parts.push(arabicPlural(m, 'دقيقة', 'دقيقتين', '%d دقائق', '%d دقيقة'));
  return `بعد ${parts.join(' و')}`;
}

type Feature = { icon: string; title: string; body: string; tone: string };
type Step = { title: string; body: string };
type Qa = { q: string; a: string };

export type Copy = {
  dir: 'rtl' | 'ltr';
  brandName: string;
  brandSub: string;
  themeLabel: string;
  themes: { system: string; light: string; dark: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleAccent: string;
    titleB: string;
    lede: string;
    download: string;
    howTo: string;
    meta: string[];
  };
  phone: {
    tabListing: string;
    tabSilent: string;
    date: string;
    city: string;
    nextSilence: string;
    todaysPrayers: string;
    restOfToday: string;
    silentNow: string;
    inProgress: string;
    until: string;
    left: string;
    endEarly: string;
    master: string;
    masterOn: string;
    prayers: [string, string, string, string, string];
  };
  features: { eyebrow: string; title: string; lede: string; items: Feature[] };
  install: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: Step[];
    warning: string;
  };
  band: { title: string; body: string; button: string; note: string };
  faq: { eyebrow: string; title: string; items: Qa[] };
  footer: { built: string; checksum: string; source: string };
};

const ar: Copy = {
  dir: 'rtl',
  brandName: 'طمأنينة',
  brandSub: 'الهاتف يسكت لوحده وقت الصلاة',
  themeLabel: 'السمة',
  themes: { system: 'النظام', light: 'فاتح', dark: 'داكن' },
  hero: {
    eyebrow: 'تطبيق أندرويد · نسخة ١٫٠',
    titleA: 'هاتفك يسكت لوحده',
    titleAccent: 'وقت الصلاة',
    titleB: '، ويرجع زي ما كان.',
    lede:
      'طمأنينة بتفعّل وضع عدم الإزعاج حوالين كل صلاة من الخمسة، وبعد ما تخلص بترجّع الرنّة بالظبط للحالة اللي كانت عليها. مفيش أذان، ولا تنبيهات، ولا بوصلة قبلة — بتسكّت الهاتف وبعدين تختفي.',
    download: 'نزّل التطبيق',
    howTo: 'إزاي أثبّته؟',
    meta: ['أندرويد ٨ فأحدث', 'شغّال من غير إنترنت', 'من غير إعلانات ولا حسابات'],
  },
  phone: {
    tabListing: 'الشاشة الرئيسية',
    tabSilent: 'أثناء الصلاة',
    date: 'اليوم',
    city: 'القاهرة',
    nextSilence: 'الكتم القادم',
    todaysPrayers: 'صلوات اليوم',
    restOfToday: 'بقية اليوم',
    silentNow: 'الهاتف صامت',
    inProgress: 'جارٍ الآن',
    until: 'حتى',
    left: 'باقي',
    endEarly: 'إنهاء مبكر',
    master: 'الكتم التلقائي',
    masterOn: 'مُفعَّل · خمس صلوات',
    prayers: ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'],
  },
  features: {
    eyebrow: 'إيه اللي بيعمله',
    title: 'حاجة واحدة، بس بيعملها صح',
    lede:
      'كل قرار في التطبيق مبني على إنه ياخد سيطرة على هاتفك لدقايق معدودة، ويسيبه بعدها زي ما لقاه.',
    items: [
      {
        icon: 'bell',
        title: 'الصلوات الخمسة، كل واحدة بفترتها',
        body:
          'بيبدأ الكتم مع الأذان وينتهي بعده بعشر دقايق — وتقدر تظبط الدقايق دي قبل وبعد لكل صلاة على حدة، أو تقفل صلاة بالكامل.',
        tone: 'mint',
      },
      {
        icon: 'refresh',
        title: 'بيرجّع الرنّة زي ما كانت بالظبط',
        body:
          'لو كنت مفعّل عدم الإزعاج بنفسك قبل الصلاة، بيسيبه شغّال بعد ما الفترة تخلص. التطبيق بيرجّع الحالة السابقة نفسها، مش بيفتح الصوت على عماه.',
        tone: 'fajr',
      },
      {
        icon: 'shield',
        title: 'مش بيعاندك',
        body:
          'لو شيلت الكتم بإيدك وأنت في نص الفترة، بيفهم إنك قصدت كده ومبيرجعش يسكّت الهاتف تاني لحد الصلاة اللي بعدها.',
        tone: 'coral',
      },
      {
        icon: 'crosshair',
        title: 'المواقيت من مكانك، والموقع مبيخرجش',
        body:
          'بيقرأ موقعك مرة في اليوم عشان يحسب المواقيت، أو تختار مدينة بإيدك. الإحداثيات بتفضل على الهاتف — مفيش سيرفر ولا حساب ولا رفع لأي حاجة.',
        tone: 'isha',
      },
      {
        icon: 'clock',
        title: 'أربع طرق حساب، والعصر بمذهبك',
        body:
          'المصرية، أم القرى، رابطة العالم الإسلامي، وISNA — والعصر عند الجمهور أو عند الحنفية.',
        tone: 'dhuhr',
      },
      {
        icon: 'type',
        title: 'عربي وإنجليزي، فاتح وداكن',
        body:
          'اللغة والسمة بتتظبط من جوه التطبيق نفسه، مش من إعدادات الهاتف. وخط القاهرة بيكتب اللغتين بنفس الشكل.',
        tone: 'maghrib',
      },
    ],
  },
  install: {
    eyebrow: 'التثبيت',
    title: 'أربع خطوات وخلاص',
    lede:
      'التطبيق مش على جوجل بلاي — ده ملف APK بتنزّله وتثبّته بنفسك، زي أي تطبيق برّه المتجر.',
    steps: [
      {
        title: 'نزّل ملف الـ APK',
        body: 'من زرار التنزيل فوق. حجمه صغير وهيخلص في ثانية.',
      },
      {
        title: 'افتح الملف من التنزيلات',
        body:
          'أندرويد هيسألك تسمح بالتثبيت من المصدر ده. اضغط "إعدادات" وفعّل السماح، وارجع وكمّل.',
      },
      {
        title: 'افتح التطبيق وحدّد مكانك',
        body: 'اضغط "استخدم موقعي"، أو اختار مدينتك من القائمة لو مش عايز تدي إذن الموقع.',
      },
      {
        title: 'امنح الأذونات من شاشة الإعداد',
        body:
          'أهمهم صلاحية عدم الإزعاج — من غيرها التطبيق مش هيقدر يسكّت أي حاجة. وكمان استثناء البطارية عشان سامسونج وشاومي ميقفلوش التطبيق في الخلفية.',
      },
    ],
    warning:
      'أول ما تفتح الملف ممكن يظهرلك تحذير من Play Protect إن التطبيق مش من المتجر. ده طبيعي لأي ملف APK مش متنزّل من جوجل بلاي — اضغط "التثبيت على أي حال". وتحت في آخر الصفحة هتلاقي بصمة SHA-256 للملف لو حابب تتأكد إنه هو نفسه.',
  },
  band: {
    title: 'جاهز؟',
    body: 'ملف واحد، من غير حساب ولا اشتراك ولا إعلانات. ثبّته وانسى إنه موجود — ده كل الهدف منه.',
    button: 'نزّل الـ APK',
    note: 'لو نزّلته على الكمبيوتر، ابعت الملف لنفسك على الموبايل وافتحه من هناك.',
  },
  faq: {
    eyebrow: 'أسئلة',
    title: 'اللي غالباً هتسأل عنه',
    items: [
      {
        q: 'هل بياخد أي بيانات مني؟',
        a: 'مش بياخد حاجة. المواقيت بتتحسب على الهاتف والإحداثيات بتفضل مخزّنة عليه لوحده ومش بتخرج منه أبداً. الحاجة الوحيدة اللي بتتبعت هي سؤال للموقع ده: فيه نسخة أحدث؟ — وتقدر تقفلها من الإعدادات، ووقتها مفيش أي حاجة بتتبعت خالص.',
      },
      {
        q: 'المنبّه هيرن وأنا بصلي؟',
        a: 'على حسب مستوى الكتم اللي تختاره. "صمت تام" بيوقف المنبّه هو كمان — ده أهدى خيار وهو اللي مش هيصحّيك. "المنبّه" بيخليه يرن. و"أولوية" بيسيب المكالمات المهمة وأي حد بيتصل مرتين ورا بعض يعدّوا.',
      },
      {
        q: 'ليه مش على جوجل بلاي؟',
        a: 'دي نسخة شخصية اتعملت للاستخدام الخاص، مش منشورة على المتجر. عشان كده بتنزّلها كملف APK.',
      },
      {
        q: 'الصلاة فاتت والهاتف مسكتش، أعمل إيه؟',
        a: 'افتح شاشة "لماذا لم يعمل؟" جوه التطبيق. بتقولك بالظبط إيه الناقص — غالباً هتكون إدارة البطارية في سامسونج أو شاومي أو أوبو وهي بتقفل التطبيق في الخلفية.',
      },
      {
        q: 'هيشتغل على أي هاتف؟',
        a: 'أي أندرويد ٨ فأحدث. مفيش نسخة آيفون — آبل مبتسمحش لأي تطبيق إنه يغيّر وضع الصوت لوحده.',
      },
    ],
  },
  footer: {
    built: 'طمأنينة · تطبيق أندرويد بواجهة Compose',
    checksum: 'بصمة SHA-256 للملف',
    source: 'الإصدار',
  },
};

const en: Copy = {
  dir: 'ltr',
  brandName: 'Tumanina',
  brandSub: 'Your phone goes quiet for prayer',
  themeLabel: 'Theme',
  themes: { system: 'System', light: 'Light', dark: 'Dark' },
  hero: {
    eyebrow: 'Android app · version 1.0',
    titleA: 'Your phone goes quiet',
    titleAccent: 'for prayer',
    titleB: ', then goes back exactly as it was.',
    lede:
      'Tumanina turns on Do Not Disturb around each of the five daily prayers and restores your ringer to precisely the state it was in. No adhan, no reminders, no qibla compass — it silences, then gets out of the way.',
    download: 'Download the app',
    howTo: 'How do I install it?',
    meta: ['Android 8.0 and up', 'Works with no internet', 'No ads, no account'],
  },
  phone: {
    tabListing: 'Home screen',
    tabSilent: 'While praying',
    date: 'Today',
    city: 'Cairo',
    nextSilence: 'Next silence',
    todaysPrayers: "Today's prayers",
    restOfToday: 'Rest of today',
    silentNow: 'Silent now',
    inProgress: 'in progress',
    until: 'Until',
    left: 'left',
    endEarly: 'End early',
    master: 'Automatic silence',
    masterOn: 'On · all five',
    prayers: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
  },
  features: {
    eyebrow: 'What it does',
    title: 'One thing, done properly',
    lede:
      'Every decision in the app follows from one fact: it takes over your phone for a few minutes, and it has to hand it back exactly as it found it.',
    items: [
      {
        icon: 'bell',
        title: 'All five prayers, each with its own window',
        body:
          'Silence starts at the adhan and ends ten minutes later — and you can set those minutes before and after per prayer, or switch a prayer off entirely.',
        tone: 'mint',
      },
      {
        icon: 'refresh',
        title: 'Your ringer comes back exactly as it was',
        body:
          'If you already had Do Not Disturb on for your own reasons, it stays on when the window ends. The app restores the previous state rather than blindly turning the sound back up.',
        tone: 'fajr',
      },
      {
        icon: 'shield',
        title: "It doesn't fight you",
        body:
          'Turn the silence off by hand mid-window and the app takes the hint: it will not re-silence the phone until the next prayer comes round.',
        tone: 'coral',
      },
      {
        icon: 'crosshair',
        title: 'Times from where you are — and they stay there',
        body:
          'Your position is read once a day to work out the times, or you pick a city by hand. The coordinates never leave the phone: no server, no account, nothing uploaded.',
        tone: 'isha',
      },
      {
        icon: 'clock',
        title: 'Four calculation methods, Asr by your madhab',
        body:
          'Egyptian, Umm al-Qura, Muslim World League and ISNA — with Asr set the standard way or the Hanafi way.',
        tone: 'dhuhr',
      },
      {
        icon: 'type',
        title: 'Arabic and English, light and dark',
        body:
          'Language and theme are chosen inside the app, not inherited from the phone. Cairo is the one type family, so both scripts are drawn with the same hand.',
        tone: 'maghrib',
      },
    ],
  },
  install: {
    eyebrow: 'Installing',
    title: 'Four steps, then forget about it',
    lede:
      "The app isn't on Google Play — it's an APK file you download and install yourself, like any app from outside the store.",
    steps: [
      {
        title: 'Download the APK',
        body: 'The button above. It is small; it will be done in a second.',
      },
      {
        title: 'Open the file from your downloads',
        body:
          'Android will ask whether to allow installs from this source. Tap Settings, switch it on, and come back.',
      },
      {
        title: 'Open the app and set your location',
        body:
          "Tap “Use my location”, or pick your city from the list if you'd rather not grant the permission.",
      },
      {
        title: 'Grant the permissions on the Setup screen',
        body:
          'Do Not Disturb access is the important one — without it the app cannot silence anything. Add the battery exemption too, so Samsung and Xiaomi phones do not kill it in the background.',
      },
    ],
    warning:
      'Play Protect may warn you that the app did not come from the store. That is normal for any APK installed outside Google Play — choose “Install anyway”. The file\'s SHA-256 fingerprint is at the bottom of this page if you want to check you got the same file.',
  },
  band: {
    title: 'Ready?',
    body: 'One file. No account, no subscription, no ads. Install it and forget it exists — that is the whole point.',
    button: 'Download the APK',
    note: 'Downloaded it on a computer? Send the file to your phone and open it there.',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'The ones you are probably about to ask',
    items: [
      {
        q: 'Does it collect anything about me?',
        a: 'It collects nothing. Prayer times are computed on the phone and your coordinates never leave it. The only thing the app sends is a request to this site asking whether a newer version exists — and you can switch that off in Settings, after which nothing is sent at all.',
      },
      {
        q: 'Will my alarm still ring while I pray?',
        a: 'That depends on the level you pick. "Total" stops the alarm too — it is the quietest option and the one that will not wake you. "Alarms" lets it ring. "Priority" lets urgent calls and anyone who rings twice in a row through.',
      },
      {
        q: "Why isn't it on Google Play?",
        a: 'It is a personal build, made for private use rather than store distribution. That is why it comes as an APK.',
      },
      {
        q: 'A prayer was missed and the phone stayed loud. Now what?',
        a: 'Open the “Why didn\'t it work?” screen inside the app. It tells you exactly what is missing — usually the battery manager on Samsung, Xiaomi or Oppo phones shutting the app down in the background.',
      },
      {
        q: 'Which phones does it run on?',
        a: 'Anything on Android 8.0 or newer. There is no iPhone version — Apple does not let an app change the ringer by itself.',
      },
    ],
  },
  footer: {
    built: 'Tumanina · an Android app built with Compose',
    checksum: 'SHA-256 of the file',
    source: 'Version',
  },
};

export const COPY: Record<Lang, Copy> = { ar, en };
