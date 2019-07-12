---
draft: true
---

import Examples from 'Pages/uilib/components/form-set/Examples'

## Description

The `FormSet` component gives You both a HTML form element `<form>` by default and also a React provider for [FormRow](/uilib/components/form-row). This way You can define more globally e.g. if all the rows should be displayed **vertically**.

```jsx
<FormSet direction="vertical">
  <FormRow>/** Components are now vertical aligned */</FormRow>
  <FormRow>/** Components are now vertical aligned */</FormRow>
</FormSet>
```

## Demos

<Examples />
