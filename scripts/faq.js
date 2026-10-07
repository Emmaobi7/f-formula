/**
 * The F-Formula — Frequently Asked Questions Data & Logic
 * Section 10: Frequently Asked Questions
 */

export const faqData = [
  {
    id: 'faq-1',
    question: 'What exactly is The F-Formula?',
    answer: 'The F-Formula is a structured 3-phase educational framework designed by Marni Kinrys to teach men the natural progression of flirtation, conversation dynamics, and non-verbal calibration—without memorizing scripts or using manipulative pickup routines.'
  },
  {
    id: 'faq-2',
    question: 'What formats and materials are included?',
    answer: 'You receive the complete foundation manual (PDF), HD video breakdown scenario analyses, portable MP3 audio masterclasses, printable situational field reference sheets, and all 4 included bonus resources.'
  },
  {
    id: 'faq-3',
    question: 'How and when will I receive access?',
    answer: 'Access is immediate. As soon as your order completes, you will receive an email containing your private access details to view, listen to, or download all resources on your smartphone, tablet, or computer.'
  },
  {
    id: 'faq-4',
    question: 'Is this framework suitable if I am introverted?',
    answer: 'Yes. The methodology does not ask you to become an extroverted or loud personality. It focuses on internalizing conversational timing, presence, and reading cues so your authentic humor and natural personality lead the interaction.'
  },
  {
    id: 'faq-5',
    question: 'How does the 60-day guarantee work?',
    answer: 'You have a full 60 days to review the entire manual, watch the video walk-throughs, and listen to the audio sessions. If you feel the framework hasn’t provided the conversational clarity you expected, simply email support for a prompt, complete refund.'
  },
  {
    id: 'faq-6',
    question: 'Is my order and billing information discreet?',
    answer: 'Yes. All transactions are protected by 256-bit SSL encryption. Billing is completely discreet with no awkward references on your statement.'
  }
];

/**
 * Initializes accessible accordion interaction
 */
export function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetId = trigger.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      // Toggle current
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      targetPanel.classList.toggle('is-open', !isExpanded);
      targetPanel.setAttribute('aria-hidden', String(isExpanded));
    });
  });
}
