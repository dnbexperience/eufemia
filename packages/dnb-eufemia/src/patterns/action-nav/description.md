---
status: 'wip'
---

## Description

This is a navigation pattern which appears at the bottom of step-by-step forms.
It consists of a containing navigation 'bar', a set of navigation buttons plus various other form-related actions such as 'Exit', to quit the process or download to download a copy in XX format.

It provides a way to navigate through a form in a series of steps allowing the user to go backwards and forwards if necessary.

### When to use it

When forms are very long and daunting or simply because each certain actions/choices change the form going forward.

### When not to use it

It should not be used as a navigation pattern for navigating between regular web documents (the browser handles this already).

### How to use it & variations

The 'Next' step button should not be enabled before the user has correctly filled out the form in the current view. The 'Back' button should be enabled so that users can view what they filled out in the previous view. If the user navigates forward after having viewed the previous step, any details they had filled should still be in place.
Usually there are just two columns separating the action groups but more can be added if necessary. (Flexbox provides multiple ways to lay out these type of patterns - space-around, space-between etc.)

### Good practices

Provide a textual indication of what the next step is about because users should and need to know where they are in the process.

Keep the navigation buttons in the same position throughout the process.

Provide enough space between navigation buttons to avoid erroneous actions on touch enabled devices.

Above all - Keep It Simple. Good navigation shouldn't require too much mental processing by the user. It should guide them.
