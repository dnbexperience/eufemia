---
header: 'UI Library'
title: 'Web Components'
draft: false
order: 7
---

import dnb from 'dnb-ui-lib/src/web-components'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` components in all other frameworks like Dojo, Vue and Angular.

---

##### Example

```jsx
// Method #1
import dnb from 'dnb-ui-lib'
dnb.enableWebComponents()

// Method #2
import 'dnb-ui-lib/web-components'

// Method #3 - note, web-component without "s"
import 'dnb-ui-lib/components/button/web-component'
```

Now we can use our web components right away in our markup.

### Button

<!-- prettier-ignore-start -->

```html
<dnb-button icon="chevron-right" text="Custom Element" />
```

<div class="example-box">
  <dnb-button icon="chevron-right" text="Custom Element" />
</div>

### Input

```html
<dnb-form-label for_id="form-input">Label for this Input</dnb-form-label>
<dnb-input id="form-input" placeholder="My Placeholder">My Value</dnb-input>
```

<div class="example-box">
  <dnb-form-label for_id="form-input" >Label for this Input</dnb-form-label>
  <dnb-input id="form-input" placeholder="My Placeholder">My Value</dnb-input>
</div>

<!-- prettier-ignore-end -->
