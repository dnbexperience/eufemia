import ComponentBox from 'Tags/ComponentBox'

# Textarea

This is a demo on how to get a `textarea` style on a vanilla HTML element. You may have a look at the [React Textarea component](/uilib/components/textarea) as well.

## Demos

<ComponentBox hideCode caption="Default Textarea">
{`
<label className="dnb-form-label" htmlFor="textarea-default">Label:</label>
<textarea id="textarea-default" className="dnb-textarea" rows="2" cols="20" defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
`}
</ComponentBox>

<ComponentBox hideCode caption="Disabled Textarea">
{`
<label className="dnb-form-label" htmlFor="textarea-disabled">Label:</label>
<textarea id="textarea-disabled" className="dnb-textarea" rows="5" cols="33" disabled defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra lacinia bibendum hendrerit porttitor volutpat nam duis nisl scelerisque sapien erat" />
`}
</ComponentBox>
