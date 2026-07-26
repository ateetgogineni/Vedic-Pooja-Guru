// Deterministic sample panchangam generator for the MVP prototype.
// NOT real astronomical/location-aware panchangam — see PanchangamScreen's
// on-screen disclaimer. Produces plausible, consistent-per-date values so
// picking a different calendar date visibly updates the screen, without
// asserting real astrological accuracy (unlike mantras, tithi/nakshatra/
// kalam names here are Sanskrit terms left untranslated by convention).
const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashti', 'Saptami',
  'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya',
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha',
  'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function fmt(minutesSinceMidnight: number) {
  const h = Math.floor(minutesSinceMidnight / 60) % 24;
  const m = minutesSinceMidnight % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${pad(m)} ${period}`;
}

function range(startMin: number, durationMin: number) {
  return `${fmt(startMin)} — ${fmt(startMin + durationMin)}`;
}

export function seedFor(date: Date) {
  return date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
}

export function getSamplePanchangam(date: Date) {
  const s = seedFor(date);
  const tithi = TITHIS[s % TITHIS.length];
  const paksha = Math.floor(s / TITHIS.length) % 2 === 0 ? 'Shukla Paksha' : 'Krishna Paksha';
  const nakshatra = NAKSHATRAS[(s * 7) % NAKSHATRAS.length];

  const sunriseMin = 360 + (s % 20); // ~06:00–06:20
  const sunsetMin = 1080 + (s % 30); // ~18:00–18:30

  const auspiciousStart = sunriseMin + 15 + (s % 30);
  const durmuhuratStart = 720 + (s % 45); // early-mid afternoon
  const rahuKalamStart = sunriseMin + 60 + (s % 60);
  const yamagandamStart = sunriseMin + 255 + (s % 60);
  const gulikaKalamStart = sunriseMin + 420 + (s % 60);
  const varjyamStart = 900 + (s % 90); // evening

  return {
    tithi,
    paksha,
    nakshatra,
    sunrise: fmt(sunriseMin),
    sunset: fmt(sunsetMin),
    auspiciousMuhurat: range(auspiciousStart, 90),
    durmuhurat: range(durmuhuratStart, 45),
    rahuKalam: range(rahuKalamStart, 90),
    yamagandam: range(yamagandamStart, 90),
    gulikaKalam: range(gulikaKalamStart, 90),
    varjyam: range(varjyamStart, 60),
  };
}
