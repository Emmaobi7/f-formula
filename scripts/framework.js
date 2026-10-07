/**
 * The F-Formula — Framework Data & Component Renderer
 * Section 3: The Framework
 */

export const frameworkPhases = [
  {
    number: '01',
    tag: 'Movement I',
    title: 'Foundation & Calibration',
    description: 'Establishing genuine presence, reading subtle social cues, and creating comfortable mutual curiosity without forced routines or awkward pressure.',
    focusLabel: 'Primary Objective',
    focusValue: 'Comfort & Rapport'
  },
  {
    number: '02',
    tag: 'Movement II',
    title: 'Playful Tension & Banter',
    description: 'Introducing calibrated wit, subtle subtext, and vocal inflection to shift the interaction from a polite conversation into genuine romantic chemistry.',
    focusLabel: 'Primary Objective',
    focusValue: 'Chemistry & Spark'
  },
  {
    number: '03',
    tag: 'Movement III',
    title: 'Transition & Escalation',
    description: 'Recognizing receptive signals with clarity and moving the dynamic forward seamlessly—deepening connection and setting up the next encounter.',
    focusLabel: 'Primary Objective',
    focusValue: 'Intimacy & Direction'
  }
];

/**
 * Initializes interactive phase states & optional dynamic mounting
 */
export function initFrameworkSection() {
  const container = document.getElementById('frameworkProgressionTrack');
  if (!container) return;

  // Render from data if container is empty or dynamically managed
  if (container.children.length === 0) {
    container.innerHTML = frameworkPhases.map((phase) => `
      <article class="framework-phase-card reveal-on-scroll" tabindex="0" aria-label="Phase ${phase.number}: ${phase.title}">
        <div class="phase-header-row">
          <span class="phase-numeral">${phase.number}</span>
          <span class="phase-pill-tag">${phase.tag}</span>
        </div>
        <h3 class="phase-title">${phase.title}</h3>
        <p class="phase-description">${phase.description}</p>
        <div class="phase-focus-row">
          <span class="phase-focus-label">${phase.focusLabel}</span>
          <span class="phase-focus-value">${phase.focusValue}</span>
        </div>
      </article>
    `).join('');
  }
}
