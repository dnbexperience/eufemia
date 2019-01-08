---
status: 'wip'
---

import FormSpacing from './assets/form-spacing.svg'
import FormSpacingDetails from './assets/form-spacing-details.svg'
import LabelStack from './assets/label-stack.svg'
import FormDivision from './assets/form-division.svg'
import ProgressSteps from './assets/progress-steps.svg'
import FormSummary from './assets/form-summary.svg'
import FormError from './assets/form-error.svg'

import Img from 'Tags/Img'

## Description

> "The HTML < form > element represents a document section that contains interactive controls for submitting information to a web server."
>
> \ - **MDN**

---

NB! Accessability - labels and placeholders

#### Eufemia form designs

Forms in Eufemia are regarded as patterns because of their unpredictable and varying content and structure. However, their individual components and elements have design guidelines, rules and behaviours.

Use Eufemia's spatial system to lay out forms.

<Img src={FormSpacingDetails} caption="Form elements with spacing system implemented" alt="Form spacing" height="176" />

Break up sections using a heading, light background color and space.
<Img src={FormDivision} caption="Partition form parts using color, space and headings" alt="Form division" height="960" />

When designing forms, make sure to design for small, as well as desktop-sized displays.
<Img src={LabelStack} caption="Stack labels over inputs when width is an issue" alt="Label stacking" height="184" />

##### General Guidelines

- All input fields have a border-radius equal to half their height.
- All input fields have a border color of Sea Green Alt (#008484).
- All input fields have a background color of Sea Green 4 (#f5fafa).
- All input fields have a ‘hover’ border color of of Sea Green 4 (#f5fafa).
- All input fields have a 'focus' border color of of Signal Orange (#ff5400).
- All input fields text is always Emerald Green (#14555A)) color.
- Text on regular inputs (or labels for checkboxes and radio buttons) use the xxx text style.
- Form labels use the xxx text style.
- Text input, textarea and select have xxx left/right padding.

Example illustrations

##### Spacing Guidelines

#### Horizontal and vertical spacing

<Img src={FormSpacing} caption="Horizontal and vertical spacing" alt="Form spacing" height="296" />

### Steps

Avoid long single-page forms with multiple sections. Break the form up into steps. this reduces the cognative load on the user and allows them to focus on each task.
Another reason to break up the form is that it can be easier to deal with errors. A long single page form may look daunting to fix if there are multiple errors. Whereas a single section with a few errors may seem less.

Use a progress (steps) indicator. Progress indicators help the user create a mental model of the tasks ahead. They also add a sense of progression.

<Img src={ProgressSteps} caption="Progress through a form" alt="Form progress" height="216" />

### Focus states/ Tabbing

### Hints

### Responsiveness

#### Errors

Errors should always be explained in simple language and inline or below the source of the error.

<Img src={FormError} caption="Form error" alt="Form error" height="128" />

### Fieldset

The HTML < fieldset > element is used to group several controls as well as labels within a web form.

The fieldset is pattern for grouping parts of HTML forms. It can be replicated using other container types and headers such as divs and h3's (in lieu of a legend) etc.

### Form summary

A form summary is a list of outcomes from a completed form. In the example below, the list appears on the right...
TODO: complete

<Img src={FormSummary} caption="Form summary is...." alt="Form summary" height="272" />
