---
header: 'UI Library'
title: 'Web Components'
draft: false
---

import dnb from 'dnb-ui-lib/web-components'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` Components in all other frameworks like Dojo, Vue and Angular.

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

```html
<!-- Button -->
<dnb-button icon="chevron-right" text="Custom Element" />

<!-- Input -->
<dnb-form-label for_id="form-input" >Label for this Input</dnb-form-label>
<dnb-input id="form-input" value="My Value" placeholder="My Placeholder" />
```

<dnb-button icon="chevron-right" text="Custom Element" />

<dnb-form-label for_id="form-input" >Label for this Input</dnb-form-label>
<dnb-input id="form-input" value="My Value" placeholder="My Placeholder" />
