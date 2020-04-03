---
showTabs: true
---

## Events

| Events                                  | Description                                                                                                                                                            |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`                             | _(optional)_ will be called on value changes made by the user. Returns an object with the value as a string and the a native event: `{ value, cleaned_value, event }`. |
| [Input](/uilib/components/input/events) | _(optional)_ all `Input` events are supported.                                                                                                                         |

**NB:** `cleaned_value` is only returned if the createNumberMask is used by either using `number_mask` or `currency_mask`.
