---
draft: true
---

import CodeBlock from 'Tags/CodeBlock'
import ComponentBox from 'Tags/ComponentBox'

## Textarea

<CodeBlock reactLive hideCode>
{`
<div className="dnb-form-group">
  <label htmlFor="gravida">
    Label:
  </label>
  <textarea id="gravida" rows="5" cols="33">
    Nec litora inceptos vestibulum id interdum donec gravida nostra
    lacinia bibendum hendrerit porttitor volutpat nam duis nisl
    scelerisque sapien erat
  </textarea>
</div>
`}
</CodeBlock>

<CodeBlock reactLive hideCode>
{`
<div className="dnb-form-group dnb-form-group__position--vertical">
  <label htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" rows="5" cols="33" disabled>
    Nec litora inceptos vestibulum id interdum donec gravida nostra
    lacinia bibendum hendrerit porttitor volutpat nam duis nisl
    scelerisque sapien erat
  </textarea>
</div>
`}
</CodeBlock>

<ComponentBox hideCode>
{`
<div className="dnb-form-group dnb-form-group__position--vertical">
  <label htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" className="status--error" rows="5" cols="33">
    Nec litora inceptos vestibulum id interdum donec gravida nostra
    lacinia bibendum hendrerit porttitor volutpat nam duis nisl
    scelerisque sapien erat
  </textarea>
  <FormStatus text="Message to the user" />
</div>
`}
</ComponentBox>

<ComponentBox hideCode>
{`
<div className="dnb-form-group">
  <label htmlFor="gravida">
    Label:
  </label>
  <div className="dnb-form-group dnb-form-group__position--vertical">
    <textarea id="gravida" rows="3" cols="33">
      Nec litora inceptos vestibulum id interdum donec gravida nostra
      lacinia bibendum hendrerit porttitor volutpat nam duis nisl
      scelerisque sapien erat
    </textarea>
    <FormStatus status="info" text="Message to the user" />
  </div>
</div>
`}
</ComponentBox>
