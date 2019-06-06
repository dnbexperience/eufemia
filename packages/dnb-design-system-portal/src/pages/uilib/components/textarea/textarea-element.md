---
draft: true
---

import CodeBlock from 'Tags/CodeBlock'
import ComponentBox from 'Tags/ComponentBox'

<CodeBlock reactLive hideCode caption="Default Textarea">
{`
<FormRow vertical={true}>
  <label className="dnb-label" htmlFor="textarea-default">
    Label:
  </label>
  <textarea id="textarea-default" className="dnb-textarea" rows="2" cols="20" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
</FormRow>
`}
</CodeBlock>

<CodeBlock reactLive hideCode caption="Disabled Textarea">
{`
<FormRow>
  <label className="dnb-label" htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" className="dnb-textarea" rows="5" cols="33" disabled defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
</FormRow>
`}
</CodeBlock>

<ComponentBox hideCode caption="Textarea with status message">
{`
<FormRow vertical={true}>
  <label className="dnb-label" htmlFor="vestibulum">
    Label:
  </label>
  <textarea id="vestibulum" className="dnb-textarea status--error" rows="5" cols="33" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
  <FormStatus text="Message to the user" />
</FormRow>
`}
</ComponentBox>

<ComponentBox hideCode>
{`
<FormRow vertical={true}>
  <label className="dnb-label" htmlFor="gravida">
    Label:
  </label>
  <textarea id="gravida" className="dnb-textarea" rows="3" cols="33" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
  <FormStatus status="info" text="Message to the user" />
</FormRow>
`}
</ComponentBox>
