---
fullscreen: true
draft: true
order: 13
---

<Intro>

# Usage of components and elements

Components and styles for HTML elements can be consumed differently. But for the sake of the matter of keeping the rule of **The Single Source of Truth**, use the NPM Package: [**dnb-ui-lib**](https://www.npmjs.com/package/dnb-ui-lib)

- It is recommended to use ES import syntax
- [Import styles](!/uilib/usage/customisation/consume-styles) application wide:

```js
/* In Your Application root */
import 'dnb-ui-lib/style/core'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'
```

- [Components can be imported](!/uilib/usage/first-steps/the-basics#compiler) both as:

```js
/* Named imports */
import { Button, ... } from 'dnb-ui-lib'
import { Button, ... } from 'dnb-ui-lib/components'
```

```js
/* or default imports */
import MyButton from 'dnb-ui-lib/components/Button'
```

- HTML elements can be consumed as:

```html
<!-- Classic HTML syntax with CSS class definition -->
<h1 class="dnb-h1">Title</h1>
```

```js
/* or React JSX */
import { H1, P, Link, ... } from 'dnb-ui-lib'
import { H1, P, Anchor, ... } from 'dnb-ui-lib/elements'
import H1 from 'dnb-ui-lib/elements/H1'

render(<H1>Title</H1>)
```

Read more about using elements as [React JSX](!/uilib/elements#react-jsx)

---

<IntroFooter href="/uilib/intro/12-quality-and-tests" text="Next - Quality and Tests" />

</Intro>
