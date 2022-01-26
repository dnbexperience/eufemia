---
showTabs: true
---

## Properties

### `Timeline` properties

| Properties                                  | Description                                                                                                                                                                                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                      | _(optional)_ List of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) to render. Each object in data can include all properties from [Timeline.Item properties](/uilib/components/timeline/properties#timelineitem-properties). |
| `children`                                  | _(optional)_ Content of the component. Can be used instead of property `data`, by adding [Timeline Item](/uilib/components/timeline/properties#timelineitem-properties) as children `<Timeline.Item {...props} />`.                                            |
| `skeleton`                                  | _(optional)_ Applies loading skeleton.                                                                                                                                                                                                                         |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                                                                                                                                                          |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                          |

### `Timeline.Item` properties

| Properties    | Description                                                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | _(required)_ Name/title of the Timeline item.                                                                                                                                     |
| `state`       | _(required)_ The component state. Options: `completed` \| `current` \| `upcoming`.                                                                                                |
| `date`        | _(optional)_ Date of the Timeline item, displayed below the `name`.                                                                                                                |
| `infoMessage` | _(optional)_ Info message, displayed in a [FormStatus of state info](/uilib/components/form-status#formstatus-displaying-info-status), below the `date` if it exists.              |
| `icon`        | _(optional)_ Override icon displaying on the left side (Not recommended). Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming` . |
| `iconAlt`     | _(optional)_ Alt label describing the icon provided.                                                                                                                               |
| `skeleton`    | _(optional)_ Applies loading skeleton.                                                                                                                                             |
