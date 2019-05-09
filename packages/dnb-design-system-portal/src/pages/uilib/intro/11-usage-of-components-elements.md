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
/* Application root */
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'
```

- [Components can be imported](!/uilib/usage/first-steps/the-basics#compiler) both as:

```js
/* Named imports */
import { Button, ... } from 'dnb-ui-lib'
```

```js
/* Default imports */
import MyButton from 'dnb-ui-lib/components/Button'
```

- HTML elements can be consumed as:

```html
<!-- Classic HTML syntax with class definition -->
<h1 class="dnb-h1">Title</h1>
```

```jsx
/* React JSX */
import { H1, P, ... } from 'dnb-ui-lib'

render(<H1>Title</H1>)
```

Read more about using elements as [React JSX](!/uilib/elements#react-jsx)

---

[Next - Quality and Tests](/uilib/intro/12-quality-and-tests?fullscreen)

</Intro>
