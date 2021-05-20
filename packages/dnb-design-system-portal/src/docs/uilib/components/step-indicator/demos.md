---
showTabs: true
---

import {
StepIndicatorDefault,
StepIndicatorCustomized,
StepIndicatorUrls,
StepIndicatorNavigation,
StepIndicatorTextOnly,
StepIndicatorCustomRenderer
} from 'Pages/uilib/components/step-indicator/Examples'

## Demos

### StepIndicator with navigation

Every visited step can be clicked.

<StepIndicatorDefault />

### StepIndicator customized

Completely customized step indicator.

<StepIndicatorCustomized />

### Default StepIndicator with no navigation

<StepIndicatorNavigation />

### Default StepIndicator with strings only

<StepIndicatorTextOnly />

### StepIndicator with custom renderer.

<StepIndicatorCustomRenderer />

### StepIndicator with urls

**NB:** The URL support is deprecated. You have to handle this kind of logic internal in your application from v10 of `@dnb/eufemia`.

<StepIndicatorUrls />
