// Roadmap and missables: the three-step route to the platinum, built from the official
// descriptions and PowerPyx's roadmap. Stages come from each trophy's stage field.
export const ROADMAP_STEPS = [
  {
    stage: 1,
    title: 'Step 1: Play the story, grab the one missable',
    hours: '60-80 hours',
    body: 'Finish all five chapters and enjoy the story. The 100% checklist is not visible until after the story, but progress made now already counts. Do the Chapter 1 meditation for Positive Mental Attitude before Chapter 1 ends: after the mission Down to Earth, talk to Lucia in the kitchen in the morning, follow her to the balcony and accept. Scan vehicles with the WAiNK app and study animals with binoculars as you travel, do optional missions as they appear, and start the stranger and character questlines when they are marked. There are no mission gold medals, so play the missions however you like.',
  },
  {
    stage: 2,
    title: 'Step 2: The 100% completion checklist',
    hours: 'About 100 hours',
    body: 'After the story, open Progress, Stats, 100% Completion. Work the checklist: all robberies, underwater discoveries, shooting ranges, drone races and Bret quests in full, plus the partial targets, any 100 optional missions, 200 of 277 vehicles scanned, 100 of 255 animals studied, 300 stunts, 15 of 18 meditations and any 70 of 80 challenges. This step also earns most of the silver trophies and the gold A Long Road. Nothing here is missable.',
  },
  {
    stage: 3,
    title: 'Step 3: Strangers and Freaks, then cleanup',
    hours: '10-20 hours',
    body: 'Finish the 8 counting Strangers and Freaks strands, then sweep up whatever is left: the one-off trophies, the money and spending totals, the garages, and the two trophies whose methods were still unconfirmed at launch. Once the last one pops, the platinum, Vice Got a Price!, follows at once.',
  },
];

export function trophiesForStage(trophies, stage) {
  return trophies.filter((t) => t.stage === stage);
}

export function renderRoadmapSteps(container, trophies) {
  container.replaceChildren();
  for (const step of ROADMAP_STEPS) {
    const div = document.createElement('div');
    div.className = 'step';
    const h = document.createElement('h3');
    h.textContent = step.title;
    const hours = document.createElement('p');
    hours.className = 'hours';
    hours.textContent = step.hours;
    const body = document.createElement('p');
    body.textContent = step.body;
    const list = document.createElement('p');
    const names = trophiesForStage(trophies, step.stage).map((t) => t.name);
    list.textContent = 'Trophies in this step (' + names.length + '): ' + names.join(', ') + '.';
    div.append(h, hours, body, list);
    container.append(div);
  }
}

export function renderMissables(container, trophies) {
  container.replaceChildren();
  const flagged = trophies.filter((t) => t.missable);
  if (flagged.length === 0) {
    container.textContent = 'No missable trophies are flagged.';
    return;
  }
  for (const t of flagged) {
    const card = document.createElement('div');
    card.className = 'missable-card';
    const h = document.createElement('h3');
    h.textContent = 'Potentially missable: ' + t.name + ' (' + t.grade + ')';
    const desc = document.createElement('p');
    desc.textContent = 'Official description: ' + t.description;
    const guide = document.createElement('p');
    guide.textContent = t.guide;
    const src = document.createElement('p');
    src.textContent = 'Sources: ' + t.sources.map((s) => s.name).join(', ') + '.';
    card.append(h, desc, guide, src);
    container.append(card);
  }
  const note = document.createElement('p');
  note.textContent = 'That is the full missable list: 1 of 55. Every other trophy can be earned after the story in free-roam.';
  container.append(note);
}
