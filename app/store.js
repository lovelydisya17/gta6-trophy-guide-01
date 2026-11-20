// Progress store: earned trophy names in localStorage, with export, import and a demo seed.
export const STORAGE_KEY = 'leonida-ledger-progress-v1';
export const SPOILER_KEY = 'leonida-ledger-spoilers-v1';

// Thirteen early-game trophies, for the "Load demo progress" button and ?demo=1.
export const DEMO_EARNED = [
  'Just Like Paradise', 'Paradise Lost', 'T**s Ass Drug Money', 'Trust',
  'Break the Bank', 'Master of None', 'Baited My Tackle', 'Stick Fiddler',
  'Positive Mental Attitude', 'Whip It Good', 'In The Beginning…',
  'Treat Yo Self', 'On the Spot',
];

export function loadEarned() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : []);
  } catch {
    return new Set();
  }
}

export function saveEarned(earned) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned]));
}

export function loadSpoilersHidden() {
  return localStorage.getItem(SPOILER_KEY) === '1';
}

export function saveSpoilersHidden(hidden) {
  localStorage.setItem(SPOILER_KEY, hidden ? '1' : '0');
}

export function exportProgress(earned) {
  const payload = { app: 'leonida-ledger', game: 'Grand Theft Auto VI', savedAt: new Date().toISOString(), earned: [...earned] };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  return payload.earned.length;
}

export async function importProgressFile(file) {
  const parsed = JSON.parse(await file.text());
  const names = Array.isArray(parsed) ? parsed : parsed.earned;
  if (!Array.isArray(names)) throw new Error('That file has no earned list in it.');
  return new Set(names.filter((n) => typeof n === 'string'));
}
