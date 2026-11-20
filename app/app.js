// Leonida Ledger boot: loads the trophy data, renders the tracker, the detail pane,
// the roadmap and the missables pages, and wires up saving, filters and routing.
import { STORAGE_KEY, DEMO_EARNED, loadEarned, saveEarned, loadSpoilersHidden, saveSpoilersHidden, exportProgress, importProgressFile } from './store.js';
import { KINDS, applyFilters, isSpoilerHidden, gradeLabel, kindLabel } from './filters.js';
import { renderRoadmapSteps, renderMissables } from './roadmap.js';

const listEl = document.getElementById('trophyList');
const detailEl = document.getElementById('detailPane');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const countLine = document.getElementById('countLine');
const searchEl = document.getElementById('search');
const gradeEl = document.getElementById('grade');
const spoilerEl = document.getElementById('spoiler');
const kindFiltersEl = document.getElementById('kindFilters');

const state = { kind: 'all', grade: 'all', query: '', selected: null };
let doc = { trophies: [] };
let earned = loadEarned();
let spoilersHidden = loadSpoilersHidden();

function seedDemoIfRequested() {
  const params = new URLSearchParams(location.search);
  if (params.get('demo') === '1' && earned.size === 0) {
    earned = new Set(DEMO_EARNED);
    saveEarned(earned);
  }
}

function updateProgress() {
  const total = doc.trophies.length;
  progressFill.style.width = total ? (earned.size / total * 100) + '%' : '0';
  progressText.textContent = earned.size + ' of ' + total + ' earned' + (earned.size === total && total > 0 ? ' — platinum!' : '');
}

function pill(text, cls) {
  const span = document.createElement('span');
  span.className = 'pill ' + cls;
  span.textContent = text;
  return span;
}

function renderKindFilters() {
  kindFiltersEl.replaceChildren();
  for (const kind of KINDS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kind-btn' + (state.kind === kind.id ? ' active' : '');
    btn.textContent = kind.label + ' (' + doc.trophies.filter((t) => kind.id === 'all' ? true : kind.id === 'missable' ? t.missable : t.kind === kind.id).length + ')';
    btn.addEventListener('click', () => { state.kind = kind.id; renderTracker(); });
    kindFiltersEl.append(btn);
  }
}

function renderTracker() {
  const visible = applyFilters(doc.trophies, state);
  listEl.replaceChildren();
  document.getElementById('emptyNote').hidden = visible.length > 0;
  countLine.textContent = 'Showing ' + visible.length + ' of ' + doc.trophies.length + ' trophies' +
    (state.kind !== 'all' ? ' in ' + kindLabel(state.kind) : '') +
    (state.grade !== 'all' ? ', ' + gradeLabel(state.grade) : '') + '.';
  for (const t of visible) {
    const hidden = isSpoilerHidden(t, earned, spoilersHidden);
    const li = document.createElement('li');
    li.className = 'trophy-row' + (earned.has(t.name) ? ' earned' : '') + (state.selected === t.name ? ' selected' : '');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.name);
    box.setAttribute('aria-label', 'Mark ' + t.name + ' as earned');
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.name); else earned.delete(t.name);
      saveEarned(earned);
      updateProgress();
      renderTracker();
      if (state.selected === t.name) renderDetail(t);
    });
    const main = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'trophy-name';
    name.textContent = hidden ? 'Hidden story trophy' : t.name;
    const desc = document.createElement('div');
    desc.className = 'trophy-desc';
    desc.textContent = hidden ? 'Earn this trophy to reveal its name and description.' : t.description;
    const meta = document.createElement('div');
    meta.className = 'trophy-meta';
    meta.append(pill(gradeLabel(t.grade), t.grade));
    if (kindLabel(t.kind) !== gradeLabel(t.grade)) meta.append(pill(kindLabel(t.kind), ''));
    if (t.missable) meta.append(pill('Missable', 'missable'));
    if (t.hidden) meta.append(pill('Hidden', 'hidden'));
    if (typeof t.count === 'number') meta.append(pill('Target: ' + t.count.toLocaleString('en-US'), ''));
    main.append(name, desc, meta);
    const earnedTag = document.createElement('span');
    earnedTag.className = 'pill';
    earnedTag.textContent = earned.has(t.name) ? 'Earned' : 'Not earned';
    li.append(box, main, earnedTag);
    li.addEventListener('click', (event) => {
      if (event.target === box) return;
      state.selected = t.name;
      location.hash = '#/trophy/' + t.id;
    });
    listEl.append(li);
  }
  updateProgress();
}

function sourceList(sources) {
  const ul = document.createElement('ul');
  for (const s of sources) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = s.name;
    li.append(a);
    ul.append(li);
  }
  return ul;
}

function renderDetail(trophy) {
  detailEl.replaceChildren();
  if (!trophy) {
    const p = document.createElement('p');
    p.className = 'detail-hint';
    p.textContent = 'Select a trophy to read its guide and sources.';
    detailEl.append(p);
    return;
  }
  const hidden = isSpoilerHidden(trophy, earned, spoilersHidden);
  const title = document.createElement('h2');
  title.textContent = hidden ? 'Hidden story trophy' : trophy.name;
  const official = document.createElement('p');
  official.className = 'official';
  official.textContent = hidden ? 'Earn this trophy to reveal its official description.' : 'Official: "' + trophy.description + '" — ' + gradeLabel(trophy.grade) + '.';
  detailEl.append(title, official);
  const meta = document.createElement('p');
  meta.textContent = 'Kind: ' + kindLabel(trophy.kind) + ' · Status: ' + (earned.has(trophy.name) ? 'Earned' : 'Not earned yet') +
    (trophy.missable ? ' · Missable: yes, see the Missables page' : ' · Missable: no') +
    (typeof trophy.count === 'number' ? ' · Target: ' + trophy.count.toLocaleString('en-US') : '');
  detailEl.append(meta);
  if (!hidden) {
    const srcHead = document.createElement('h3');
    srcHead.textContent = 'Sources for this guide';
    const guideHead = document.createElement('h3');
    guideHead.textContent = 'Guide';
    const guide = document.createElement('p');
    guide.textContent = trophy.guide;
    detailEl.append(srcHead, sourceList(trophy.sources), guideHead, guide);
  }
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = earned.has(trophy.name) ? 'Mark as not earned' : 'Mark as earned';
  toggle.addEventListener('click', () => {
    if (earned.has(trophy.name)) earned.delete(trophy.name); else earned.add(trophy.name);
    saveEarned(earned);
    updateProgress();
    renderTracker();
    renderDetail(trophy);
  });
  detailEl.append(toggle);
}

function showView(name) {
  for (const view of ['tracker', 'roadmap', 'missables']) {
    document.getElementById('view-' + view).hidden = view !== name;
    document.getElementById('tab-' + view).classList.toggle('active', view === name);
  }
}

function route() {
  const hash = location.hash || '#/';
  if (hash.startsWith('#/roadmap')) {
    showView('roadmap');
    renderRoadmapSteps(document.getElementById('roadmapSteps'), doc.trophies);
  } else if (hash.startsWith('#/missables')) {
    showView('missables');
    renderMissables(document.getElementById('missableList'), doc.trophies);
  } else if (hash.startsWith('#/trophy/')) {
    showView('tracker');
    const id = Number(hash.split('/')[2]);
    const trophy = doc.trophies.find((t) => t.id === id);
    state.selected = trophy ? trophy.name : null;
    renderTracker();
    renderDetail(trophy || null);
  } else {
    showView('tracker');
    renderTracker();
  }
}

function wireControls() {
  searchEl.addEventListener('input', () => { state.query = searchEl.value; renderTracker(); });
  gradeEl.addEventListener('change', () => { state.grade = gradeEl.value; renderTracker(); });
  spoilerEl.checked = spoilersHidden;
  spoilerEl.addEventListener('change', () => {
    spoilersHidden = spoilerEl.checked;
    saveSpoilersHidden(spoilersHidden);
    renderTracker();
    renderDetail(doc.trophies.find((t) => t.name === state.selected) || null);
  });
  document.getElementById('export').addEventListener('click', () => { exportProgress(earned); });
  document.getElementById('import').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const names = await importProgressFile(file);
      earned = new Set(names.filter((n) => doc.trophies.some((t) => t.name === n)));
      saveEarned(earned);
      renderTracker();
    } catch (err) {
      alert('Could not import that file: ' + err.message);
    }
    event.target.value = '';
  });
  document.getElementById('demo').addEventListener('click', () => {
    earned = new Set(DEMO_EARNED);
    saveEarned(earned);
    renderTracker();
  });
  document.getElementById('reset').addEventListener('click', () => {
    if (!confirm('Clear all earned trophies?')) return;
    earned = new Set();
    saveEarned(earned);
    renderTracker();
    renderDetail(null);
  });
  window.addEventListener('hashchange', route);
}

async function boot() {
  seedDemoIfRequested();
  const response = await fetch('data/trophies.json');
  doc = await response.json();
  updateProgress();
  renderKindFilters();
  wireControls();
  route();
}

boot();
