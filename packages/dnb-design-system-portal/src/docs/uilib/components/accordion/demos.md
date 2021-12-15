---
showTabs: true
---

import {
AccordionDefaultExample,
AccordionLargeContentExample,
AccordionCustomisationExample,
AccordionContainerExample,
AccordionGroupExample
} from 'Docs/uilib/components/accordion/Examples'

## Demos

### Single Accordion

<AccordionDefaultExample />

### Accordion with large title and content

<AccordionLargeContentExample />

### Grouped Accordion

**NB:** Please have a read on the [unexpected behavior](/uilib/components/accordion/info#unexpected-behavior) thoughts.

<AccordionGroupExample />

### Customized Accordion

<AccordionCustomisationExample />

### Accordion with a single container

A single container is only used for wider screens (desktop).  When the users' screen is narrower (mobile), it will change to a normal accordion. The change happens with CSS only, so it will not interrupt any React render.

<AccordionContainerExample />
