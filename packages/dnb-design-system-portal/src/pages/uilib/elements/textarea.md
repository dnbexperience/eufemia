---
draft: true
---

import CodeBlock from 'Tags/CodeBlock'
import ComponentBox from 'Tags/ComponentBox'

## Textarea

<CodeBlock reactLive hideCode>
{`
<div className="dnb-form-group dnb-form-group__position--vertical">
  <label htmlFor="textarea-default">
    Label:
  </label>
  <textarea data-dnb-test="textarea-default" id="textarea-default" rows="2" cols="20" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
</div>
`}
</CodeBlock>

<CodeBlock reactLive hideCode>
{`
<div className="dnb-form-group">
  <label htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" rows="5" cols="33" disabled defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
</div>
`}
</CodeBlock>

<ComponentBox hideCode>
{`
<div className="dnb-form-group dnb-form-group__position--vertical">
  <label htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" className="status--error" rows="5" cols="33" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
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
  <div className="dnb-form-group dnb-form-group__position--vertical" >
    <textarea id="gravida" rows="3" cols="33" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
    <FormStatus status="info" text="Message to the user" />
  </div>
</div>
`}
</ComponentBox>
