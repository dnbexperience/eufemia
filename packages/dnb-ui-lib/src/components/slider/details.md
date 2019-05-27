| Properties | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| `value`    | _(mandatory)_ the `vlaue` of the slider. Also the event callback result. |
| `id`       | _(optional)_ the `id` of the input. Default will be a random id.         |
| `min`      | _(optional)_ the minimum value.                                          |
| `max`      | _(optional)_ the maxium value.                                           |
| `step`     | _(optional)_ the steps the slider takes on changing the value.           |
| `vertical` | _(optional)_ show the slider vertically.                                 |
| `reverse`  | _(optional)_ show the slider reversed.                                   |
| `disabled` | _(optional)_ disable the slider.                                         |

| Events            | Description                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `on_init`         | _(optional)_ will be called once the component is ready to use. The callback value is a number `{ value }` |
| `on_change`       | _(optional)_ will be called on state changes made by the user. The callback value is a number `{ value }`  |
| `on_state_update` | _(optional)_ will be called once the parameter `value` changes its value.                                  |
