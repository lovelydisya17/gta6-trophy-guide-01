// Filters: kind, grade, search text, earned state, and the spoiler rule.
export const KINDS = [
  { id: 'all', label: 'All kinds' },
  { id: 'story', label: 'Story' },
  { id: 'missable', label: 'Missable' },
  { id: 'collectible', label: 'Collectibles' },
  { id: 'activity', label: 'Activities' },
  { id: 'crime', label: 'Crime' },
  { id: 'side', label: 'Side quests' },
  { id: 'misc', label: 'One-offs' },
  { id: 'completion', label: '100% completion' },
  { id: 'platinum', label: 'Platinum' },
];

export function kindMatches(trophy, kind) {
  if (kind === 'all') return true;
  if (kind === 'missable') return trophy.missable === true;
  return trophy.kind === kind;
}

export function applyFilters(trophies, state) {
  const query = state.query.trim().toLowerCase();
  return trophies.filter((t) => {
    if (!kindMatches(t, state.kind)) return false;
    if (state.grade !== 'all' && t.grade !== state.grade) return false;
    if (query && !(t.name.toLowerCase().includes(query) || t.description.toLowerCase().includes(query))) return false;
    return true;
  });
}

// A story trophy the player has not earned yet stays hidden while spoiler mode is on.
export function isSpoilerHidden(trophy, earned, spoilersHidden) {
  return spoilersHidden && trophy.kind === 'story' && !earned.has(trophy.name);
}

export function gradeLabel(grade) {
  return grade.charAt(0).toUpperCase() + grade.slice(1);
}

export function kindLabel(kind) {
  const found = KINDS.find((k) => k.id === kind);
  return found ? found.label : kind;
}
