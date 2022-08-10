---
showTabs: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Demos

### Default form-label

<ComponentBox data-visual-test="form-label-default">
	{/* jsx */ `
<FormLabel for_id="alone-1">
  Default horizontal FormLabel:
</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />
	`}
</ComponentBox>

### Vertical form-label

<ComponentBox data-visual-test="form-label-vertical">
	{/* jsx */ `
<FormLabel for_id="alone-2" label_direction="vertical">
  Vertical FormLabel:
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />
	`}
</ComponentBox>

### Vertical form-label without a `for_id`

<ComponentBox>
	{/* jsx */ `
<FormLabel vertical={true}>
  Without for_id (select me):
</FormLabel>
<Checkbox label="Checkbox" />
	`}
</ComponentBox>

### Linked label (pattern)

<ComponentBox>
	{/* jsx */ `
<form className="dnb-form">
  <div className="dnb-form__item">
    <div className="dnb-form__cell">
      <FormLabel
        for_id="switch-1"
        text="Form Label (click me):"
      />
    </div>
    <div className="dnb-form__cell">
      <Switch
        id="switch-1"
        value="Value of switch"
      />
    </div>
  </div>
</form>
	`}
</ComponentBox>
