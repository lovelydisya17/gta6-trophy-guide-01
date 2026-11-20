# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/lovelydisya17/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/lovelydisya17/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Leonida Ledger: an offline guide and tracker for all 55 GTA VI PlayStation 5 trophies, with a roadmap to the platinum, missable flags, filters by kind, a spoiler setting that hides story trophies until earned, and progress export/import saved in the browser.

## What it is

Leonida Ledger covers the full GTA VI trophy list on PlayStation 5: 55 trophies in total, 1 platinum, 2 gold, 6 silver and 46 bronze. Every trophy has its official name, description and grade, plus a written guide that names its sources. The whole run is offline and single-player, rated about 200 hours at difficulty 4 out of 10, and every trophy is earnable in one playthrough. There are no online trophies and no mission gold medals, so you can play the missions however you like.

The platinum is **Vice Got a Price!** It pops the moment the other 54 trophies are all earned, so there is nothing to do for that one directly. Follow the roadmap and it follows on its own.

## The roadmap to platinum

The guide is built around three steps, each with its own time estimate and the trophies that belong to it:

1. **Step 1: Play the story, grab the one missable (60-80 hours).** Finish all five chapters and enjoy the story. Progress toward the 100% checklist already counts even though the checklist itself only becomes visible after the story. Do the Chapter 1 meditation for Positive Mental Attitude before Chapter 1 ends: after the mission Down to Earth, talk to Lucia in the kitchen in the morning, follow her to the balcony and accept. Scan vehicles with the WAiNK app and study animals with binoculars as you travel, do optional missions as they appear, and start the stranger and character questlines when they are marked.
2. **Step 2: The 100% completion checklist (about 100 hours).** After the story, open Progress, Stats, 100% Completion and work the checklist: all robberies, underwater discoveries, shooting ranges, drone races and Bret quests in full, plus the partial targets, any 100 optional missions, 200 of 277 vehicles scanned, 100 of 255 animals studied, 300 stunts, 15 of 18 meditations and any 70 of 80 challenges. This step also earns most of the silver trophies and the gold A Long Road. Nothing here is missable.
3. **Step 3: Strangers and Freaks, then cleanup (10-20 hours).** Finish the 8 counting Strangers and Freaks strands, then sweep up whatever is left: the one-off trophies, the money and spending totals, the garages, and the two trophies whose methods were still unconfirmed at launch. Once the last one pops, the platinum follows at once.

## Trophy categories covered

Every trophy is tagged by kind, and the tracker lets you filter by kind, by grade, by earned state, and by search text. The 55 trophies break down as:

| Kind | Count | What it covers |
| --- | --- | --- |
| Story | 12 | Trophies earned by playing through the five chapters |
| Misc | 13 | One-off and situational trophies |
| Crime | 9 | Robberies, wanted level and other criminal activity |
| Activity | 7 | Side activities such as shooting ranges and drone races |
| Side | 7 | Strangers and Freaks strands and character questlines |
| Collectible | 5 | Scanning, studying and other collection progress |
| Completion | 1 | The 100% completion trophy |
| Platinum | 1 | Vice Got a Price!, awarded for earning the other 54 |

Use the kind filter when you want to focus on one type of play, for example clearing all collectibles in a session, or the grade filter when you want to chase the remaining silver and gold trophies first.

## Missables: only one to worry about

Only 1 of the 55 trophies is potentially missable: **Positive Mental Attitude**. It is a Chapter 1 meditation with Lucia, and the guide spells out exactly when and how to do it before Chapter 1 ends. Every other trophy can be earned after the story in free-roam, so there is no need to restart for anything else. The Missables tab lists that single trophy with its full guide and sources, and states plainly that the list is complete at 1 of 55.

Two guides were still unconfirmed at launch, **Bad Luck, I Guess** and **The Truth Is Out There**, and the guide marks them as such rather than guessing a method. If you are following the guide, treat those two as cleanup items to check again once their methods are confirmed.

## Before you start: saves, cheats and replay

Three facts from the guide are worth knowing before your first session, because they shape how you play the whole run:

- **Keep chapter saves.** There is no mission replay, but free-roam continues after the story, so anything you miss can still be done afterwards, except the one missable above. The game has 15 manual save slots plus 1 autosave, and the guide recommends keeping a save at the start and end of each chapter, which gives you a way back if something goes wrong mid-chapter.
- **Do not use cheats.** Cheats disable trophies and saving, so a cheat used at any point can cost you progress you cannot get back in that save.
- **The checklist only appears after the story.** You cannot see the 100% completion checklist until the story is finished, but the work you do during the story already counts toward it, so scanning vehicles, studying animals and doing optional missions as you travel is never wasted effort.

## How progress tracking works

The Tracker tab is a checklist of all 55 trophies. Click a trophy to mark it earned, click again to unmark it. A progress bar at the top of the page shows how many of the 55 you have earned, and each trophy card shows its grade, kind, description and guide.

The spoiler setting is a checkbox labelled "Hide story spoilers until earned". While it is on, any story trophy you have not earned yet stays hidden, so you can browse the rest of the guide without seeing what happens later in the story. Once you earn a story trophy it appears normally. The setting itself is saved, so it stays the way you left it when you come back.

There is also a demo seed: a "Load demo progress" button (or `?demo=1` in the URL) marks 13 early-game trophies as earned, so you can see what the tracker looks like partway through a run without clicking through them by hand. Use Reset progress to clear everything and start from zero.

## What the tracker stores locally

Everything is stored in your browser only, in `localStorage`. Nothing is sent to a server, there is no account, and the app works with the network off.

- Earned trophy names are stored under the key `leonida-ledger-progress-v1` as a JSON list of trophy names.
- The spoiler setting is stored under the key `leonida-ledger-spoilers-v1` (`1` for hidden, `0` for shown).
- Export progress downloads a file called `gta6-trophy-progress.json` containing the app name, the game, a timestamp and your earned list. Keep that file as a backup, or move your progress to another browser or device.
- Import progress reads a file in that same format, or a plain JSON list of trophy names, and replaces your current earned list with the imported one. If the file has no earned list in it, the import is rejected with an error instead of wiping your progress.
- Clearing your browser data for this site, or using a different browser or device, starts you from an empty tracker unless you import an exported file first.

## Sources

Each trophy guide names its sources, drawn from the trophy lists and guides the data was checked against: Exophase, PSNProfiles, PowerPyx, Push Square and KeenGamer. The facts on the page, difficulty 4/10, about 200 hours, one playthrough, 15 manual save slots plus 1 autosave, and cheats disabling trophies and saving, are credited to PowerPyx. The data file also notes that there is no mission replay and that free-roam continues after the story.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in desktop Chrome. The guide is static files under app/ and works with the network off. Use `node serve.ts --port <n>` to serve on a different port.

## Files

- `app/index.html` — the page: tracker, roadmap and missables tabs, search, filters, spoiler checkbox, export, import and reset controls.
- `app/data/trophies.json` — all 55 trophies with names, descriptions, grades, kinds, stages, missable flags, guides and sources.
- `app/app.js` — renders the tracker and wires up the controls.
- `app/filters.js` — kind, grade, search and earned-state filtering, plus the spoiler rule.
- `app/roadmap.js` — the three roadmap steps and the missables view.
- `app/store.js` — localStorage progress, the spoiler setting, export, import and the demo seed.
- `serve.ts` — a small static server for the app/ directory on http://localhost:8080.
- `screenshots/` — screenshots of the tracker, guide, roadmap and missables views.

---

<sub>Entered on [make.fun](https://make.fun/?ref=w285c9pc&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
