# Responsive Smoke Checklist

Use this checklist after each rollout step before moving to the next step.

## Pre-Flight
- Run `npm run check`.
- Verify no runtime crash on app load.

## Desktop (>= 1024px)
- Top nav renders and stays usable while scrolling.
- Sidebar renders once, no duplicate sections/algo links.
- Clicking sidebar entries scrolls to the matching algo card.
- No horizontal page overflow.

## Tablet (768px to 1023px)
- Content stacks cleanly and remains readable.
- Sidebar/mobile menu interaction does not block core content.
- Algo cards do not overflow container width.

## Mobile (< 768px)
- Mobile menu trigger remains reachable while scrolling.
- Menu opens/closes without covering critical controls permanently.
- Algo controls (buttons/inputs/dropdowns) stay within viewport width.
- Text is readable without horizontal scrolling.

## Visualizer Behavior
- Start/Reset controls still work for sampled algos in each folder group.
- Step counters/status values update correctly while animations run.
- No duplicate algo instances appear in the main content.
- Section anchors and `id` targets are unique.
