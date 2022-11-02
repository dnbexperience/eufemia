---
showTabs: true
---

import {
StepIndicatorStatic,
StepIndicatorStrict,
StepIndicatorLoose,
StepIndicatorCustomized,
StepIndicatorUrls,
StepIndicatorSidebar,
StepIndicatorTextOnly,
StepIndicatorCustomRenderer
} from 'Docs/uilib/components/step-indicator/Examples'

## Demos

### StepIndicator in loose mode

Every step can be clicked.

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-loose" />` somewhere in your layout.

<StepIndicatorLoose />

### StepIndicator in strict mode

Every visited step can be clicked, including the current step.

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-strict" />` somewhere in your layout.

<StepIndicatorStrict />

### StepIndicator in static mode

None of the steps are clickable.

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-static" />` somewhere in your layout.

<StepIndicatorStatic />

### StepIndicator with sidebar

<StepIndicatorSidebar />

### StepIndicator customized

Completely customized step indicator.

<StepIndicatorCustomized />

### StepIndicator with text only

<StepIndicatorTextOnly />

### StepIndicator with a custom renderer.

<StepIndicatorCustomRenderer />

### StepIndicator with urls

**NB:** The URL support is deprecated. You have to handle this kind of logic internally in your application from v10 of `@dnb/eufemia`.

You find more [v1 demos here](/uilib/components/step-indicator/demos-v1).

<StepIndicatorUrls />
