---
status: 'wip'
---

import Img from 'Tags/Img'
import FormSpacing from './assets/form-spacing.svg'
import FormSpacingDetails from './assets/form-spacing-details.svg'
import LabelStack from './assets/label-stack.svg'
import FormDivision from './assets/form-division.svg'
import ProgressSteps from './assets/progress-steps.svg'
import FormSummary from './assets/form-summary.svg'
import FormError from './assets/form-error.svg'

## Description

> The HTML < form > element represents a document section that contains interactive controls for submitting information to a web server.
>
> - **MDN**

---

## Eufemia form designs

Forms in Eufemia are regarded as patterns because of their unpredictable and varying content and structure. However, their individual components and elements have design guidelines, rules and behaviors.

Use Eufemia's spatial system to lay out forms.

<Img src={FormSpacingDetails} caption="Form elements with spacing system implemented" alt="Form spacing" />

Break up sections using a heading, light background color and space.
<Img src={FormDivision} caption="Partition form parts using color, space and headings" alt="Form division" />

### Horizontal and vertical spacing

#### Some general tips

1. use the Eufemia spacing system to lay out forms
2. allow enough space around form inputs and buttons for touch devices
3. group form sections using alternating colored backgrounds and extra vertical space

<Img src={FormSpacing} caption="Horizontal and vertical spacing" alt="Form spacing" />

### Steps

Avoid long single-page forms with multiple sections. Break the form up into steps. this reduces the cognitive load on the user and allows them to focus on each task.
Another reason to break up the form is that it can be easier to deal with errors. A long single page form may look daunting to fix if there are multiple errors. Whereas a single section with a few errors may seem less.

Use a progress (steps) indicator. Progress indicators help the user create a mental model of the tasks ahead. They also add a sense of progression.

<Img src={ProgressSteps} caption="Progress through a form" alt="Form progress" />

### Responsiveness

Form are notoriously difficult to 'retro-fit' on small displays such as mobile phones. Try to lay the form out in a simple vertical stacking format as much as possible. Form labels and their corresponding elements may need to stack vertically on small displays and revert to an inline layout on more generous displays.

<Img src={LabelStack} caption="Stack labels over inputs when width is an issue" alt="Label stacking" />

### Errors

Errors should always be explained in simple language and inline or below the source of the error.

<Img src={FormError} caption="Form error" alt="Form error" />
