import Tts from 'react-native-tts';

// react-native-tts's engine takes a moment to initialize on first use;
// calling Tts.speak() before that finishes is a well-known way to get a
// silently-dropped utterance. Cache a single init promise (and wire up the
// error event) so every caller waits for the same one-time setup.
let initPromise: Promise<void> | null = null;

function initOnce(): Promise<void> {
  if (!initPromise) {
    initPromise = Tts.getInitStatus()
      .then(() => undefined)
      .catch((err) => {
        console.warn('[tts] engine init failed — speech will be unavailable:', err);
      });
    Tts.addEventListener('tts-error', (event) => console.warn('[tts] speak error:', event));
  }
  return initPromise;
}

// BCP-47 tags for the app's supported languages — used to pick a matching
// device TTS voice when one is installed. Falls back to the device's
// current default voice if the tag/voice isn't available.
const LANGUAGE_TAGS: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  kn: 'kn-IN',
  te: 'te-IN',
};

export async function speak(text: string, languageCode?: string) {
  await initOnce();
  Tts.stop();
  const tag = languageCode && LANGUAGE_TAGS[languageCode];
  if (tag) {
    try {
      await Tts.setDefaultLanguage(tag);
    } catch (err) {
      console.warn(`[tts] setDefaultLanguage(${tag}) failed — voice may not be installed on this device:`, err);
    }
  }
  try {
    await Tts.speak(text);
  } catch (err) {
    console.warn('[tts] speak() threw:', err);
  }
}

export function stop() {
  Tts.stop();
}
