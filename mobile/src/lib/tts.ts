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

export async function speak(text: string) {
  await initOnce();
  Tts.stop();
  try {
    await Tts.speak(text);
  } catch (err) {
    console.warn('[tts] speak() threw:', err);
  }
}

export function stop() {
  Tts.stop();
}
