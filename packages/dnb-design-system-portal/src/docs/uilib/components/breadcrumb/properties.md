---
showTabs: true
---

## Properties

### `Breadcrumb` properties

| Properties                                  | Description                                                                                                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                      | _(optional)_ List of pages to render as breadcrumbitems. Each object in data can include all properties from [BreadcrumbItem props](/uilib/components/breadcrumb/properties#breadcrumbitem-properties). |
| `children`                                  | _(optional)_ Content of the component. Can be used instead of property `data`, by adding Breadcrumbitem children `<Breadcrumb.Item {...props} />`.                                                      |
| `skeleton`                                  | _(optional)_ Applies loading skeleton.                                                                                                                                                                  |
| `variant`                                   | _(optional)_ Override the variant of the component. Options: `single` \| `multiple` \| `collapse`.                                                                                                      |
| `onClick`                                   | _(optional)_ Handle click event on "Back" for variant `single` and "Back to..." for variant `collapse`.                                                                                                 |
| `href`                                      | _(optional)_ For variant `single`, set `href` for button click. Can be used instead of property `onClick`.                                                                                              |
| `navText`                                   | _(optional)_ Every `<nav>` on a page needs an unique aria-label text.                                                                                                                                   |
| `goBackText`                                | _(optional)_ Override with a custom 'Back' text for variant `single` (Not recommended).                                                                                                                 |
| `homeText`                                  | _(optional)_ Override with a custom 'Home' text (Not recommended).                                                                                                                                      |
| `backToText`                                | _(optional)_ Override with a custom 'Back to...' text (Not recommended) .                                                                                                                               |
| `styleType`                                 | _(optional)_ Use one of the Section component style types (style_type). Defaults to `transparent`.                                                                                                      |
| `collapsedStyleType`                        | _(optional)_ Use one of the Section component style types (style_type). Defaults to `pistachio`.                                                                                                        |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                                                                                                   |
| `isCollapsed`                               | _(optional)_ For variant `collapse`, override isCollapsed for the collapsed content by updating this value using the provided property `onClick`.                                                       |
| `spacing`                                   | _(optional)_ Include spacing properties from [Section](/uilib/components/section/properties) in breadcrumb. If only `true` is given, the spacing will be `small`. Defaults to `false`.                  |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                   |

### `Breadcrumb.Item` properties

| Properties          | Description                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `text`              | _(optional)_ Text displaying inside Breadcrumb item.                                               |
| `variant`           | _(optional)_ The component variant. Options: `home` \| `previous` \| `current`.                    |
| `icon`              | _(optional)_ Override icon displaying on the left side (Not recommended). Default: `chevron_left`. |
| `href` or `onClick` | _(optional)_ Set what happens when the user clicks on the item.                                    |
| `skeleton`          | _(optional)_ Applies loading skeleton.                                                             |
