---
showTabs: true
---

import {
StepIndicatorStatic,
StepIndicatorStrict,
StepIndicatorLoose,
StepIndicatorCustomized,
StepIndicatorSidebar,
StepIndicatorTextOnly,
StepIndicatorCustomRenderer,
StepIndicatorRouter,
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

### StepIndicator with a router

<StepIndicatorRouter />

### StepIndicator customized

Completely customized step indicator.

<StepIndicatorCustomized />

### StepIndicator with text only

<StepIndicatorTextOnly />

### StepIndicator with a custom renderer.

<StepIndicatorCustomRenderer />
