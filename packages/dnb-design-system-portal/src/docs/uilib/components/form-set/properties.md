---
showTabs: true
---

## Properties

| Properties                                       | Description                                                                                                                                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`                                        | _(optional)_ define what HTML element should be used. Defaults to `<form>`.                                                                                                                                                          |
| `no_form`                                        | _(optional)_ if set to `true`, then a `div` HTML element will be used instead of `form`. Defaults to `false`.                                                                                                                        |
| `prevent_submit`                                 | _(optional)_ if set to `true`, components inside can't cause a page refresh. The event `on_submit` will sill be triggered. Defaults to `false`.                                                                                      |
| `disabled`                                       | _(optional)_ if set to `true`, every component inside will be disabled. Defaults to `false`.                                                                                                                                         |
| [FormRow](/uilib/components/form-row/properties) | _(optional)_ Beside the own properties, **FormSet** can provide the [FormRow](/uilib/components/form-row/properties) properties down to `FormRow`. This works in React based applications by using the React Context under the hood. |
| [Space](/uilib/components/space/properties)      | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                |
