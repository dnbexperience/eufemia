---
title: 'v11 Migration Reference'
description: 'Compact rename reference for AI agents and automated migration tools'
---

# v11 Compact Rename Reference

This file contains every v10 → v11 rename in a single, dense reference optimized for AI agents and automated migration tools. Use it for automated migration or quick lookups. For behavioral changes, removals, code examples, and the step-by-step migration procedure, see [v11-info.mdx](./v11-info.mdx).

Renames are marked with a **Scope** column:

- **Global** = safe to find-and-replace across the entire codebase (Eufemia-specific names that won't collide with other code).
- **Component name(s)** = must be scoped to JSX using that specific component (generic names that exist in non-Eufemia code).

### Common property renames (apply to multiple components)

These renames follow the same pattern everywhere they appear. Apply them as global find-and-replace within Eufemia component JSX. All entries marked **Global** are safe for codebase-wide replacement.

| Old                      | New                 | Scope  | Components                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status_state`           | `statusState`       | Global | Autocomplete, Button, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Slider, StepIndicator, Switch, Textarea, ToggleButton, ToggleButton.Group                                                                                                          |
| `status_props`           | `statusProps`       | Global | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group                                                                                                                                         |
| `status_no_animation`    | `statusNoAnimation` | Global | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group                                                                                                                                         |
| `label_direction`        | `labelDirection`    | Global | Autocomplete, DatePicker, Dropdown, FormLabel, Input, InputMasked, ProgressIndicator, Radio.Group, Textarea, ToggleButton.Group                                                                                                                                                  |
| `label_sr_only`          | `labelSrOnly`       | Global | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio.Group, Switch, Textarea, ToggleButton.Group                                                                                                                                                              |
| `label_position`         | `labelPosition`     | Global | Checkbox, Radio, Switch                                                                                                                                                                                                                                                          |
| `no_animation`           | `noAnimation`       | Global | Accordion, Autocomplete, DatePicker, Dropdown, DrawerList, FormStatus, GlobalStatus, Modal/Dialog/Drawer, Skeleton, StepIndicator                                                                                                                                                |
| `icon_size`              | `iconSize`          | Global | Autocomplete, Button, FormStatus, GlobalStatus, ProgressIndicator, ToggleButton                                                                                                                                                                                                  |
| `icon_position`          | `iconPosition`      | Global | Autocomplete, Button, Dropdown, ToggleButton                                                                                                                                                                                                                                     |
| `inner_ref` / `innerRef` | `ref`               | Global | Anchor, Button, Checkbox, Dropdown, Element, FormLabel, HeightAnimation, Input, InputMasked, PortalRoot, Radio, ScrollView, Section, Space, Switch, Textarea, Typography, Flex.Item, Flex.Container, Field.String, Field.Number, Field.Password, Field.PhoneNumber, Form.Element |
| `selected_key`           | `selectedKey`       | Global | Autocomplete, Dropdown, DrawerList, Tabs                                                                                                                                                                                                                                         |
| `default_value`          | `defaultValue`      | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `prevent_selection`      | `preventSelection`  | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `prevent_close`          | `preventClose`      | Global | Autocomplete, Dropdown, DrawerList, DatePicker, Modal/Dialog/Drawer                                                                                                                                                                                                              |
| `keep_open`              | `keepOpen`          | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `independent_width`      | `independentWidth`  | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `fixed_position`         | `fixedPosition`     | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `enable_body_lock`       | `enableBodyLock`    | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `align_drawer`           | `alignDrawer`       | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `list_class`             | `listClass`         | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `portal_class`           | `portalClass`       | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `no_scroll_animation`    | `noScrollAnimation` | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `skip_portal`            | `skipPortal`        | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `min_height`             | `minHeight`         | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `max_height`             | `maxHeight`         | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `observer_element`       | `observerElement`   | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `cache_hash`             | `cacheHash`         | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `wrapper_element`        | `wrapperElement`    | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `options_render`         | `optionsRender`     | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `skip_keysearch`         | `skipKeysearch`     | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `page_offset`            | `pageOffset`        | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `ignore_events`          | `ignoreEvents`      | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `action_menu`            | `actionMenu`        | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `is_popup`               | `isPopup`           | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |
| `prevent_focus`          | `preventFocus`      | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                                                                                                                               |

### Common event renames

All entries below are safe for global find-and-replace — these snake_case event names are Eufemia-specific and won't collide with other code.

| Old                | New              | Scope  | Components                                                                                                                                                                      |
| ------------------ | ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`        | `onChange`       | Global | Accordion, Autocomplete, Checkbox, DatePicker, Dropdown, DrawerList, Input, InputMasked, Pagination, Radio, Radio.Group, Slider, Switch, Tabs, ToggleButton, ToggleButton.Group |
| `on_click`         | `onClick`        | Global | Button, Pagination.InfinityLoadButton, StepIndicator, Tabs, Table.ClickableHead                                                                                                 |
| `on_focus`         | `onFocus`        | Global | Autocomplete, Input, InputMasked, Tabs, Textarea                                                                                                                                |
| `on_blur`          | `onBlur`         | Global | Autocomplete, Input, InputMasked, Textarea                                                                                                                                      |
| `on_submit`        | `onSubmit`       | Global | DatePicker, Input, InputMasked                                                                                                                                                  |
| `on_key_down`      | `onKeyDown`      | Global | Input, Textarea                                                                                                                                                                 |
| `on_state_update`  | `onStateUpdate`  | Global | DrawerList, Input, InputMasked, Radio, Radio.Group, Switch, ToggleButton                                                                                                        |
| `on_select`        | `onSelect`       | Global | Autocomplete, Dropdown, DrawerList                                                                                                                                              |
| `on_pre_change`    | `onPreChange`    | Global | DrawerList                                                                                                                                                                      |
| `on_resize`        | `onResize`       | Global | DrawerList                                                                                                                                                                      |
| `on_type`          | `onType`         | Global | Autocomplete, DatePicker                                                                                                                                                        |
| `on_complete`      | `onComplete`     | Global | ProgressIndicator                                                                                                                                                               |
| `on_change_end`    | `onChangeEnd`    | Global | Switch                                                                                                                                                                          |
| `on_show_password` | `onShowPassword` | Global | Field.Password                                                                                                                                                                  |
| `on_hide_password` | `onHidePassword` | Global | Field.Password                                                                                                                                                                  |

### Semantic renames (not just casing — must use correct new name)

⚠️ These renames change the name itself, not just the casing. A naive snake_case → camelCase conversion will produce the **wrong** name. Each must be scoped to the listed components — see the [find-and-replace safety guide](./v11-info.mdx#find-and-replace-safety-guide) for collision risks.

| Old                                  | New                               | ⚠️ Wrong naive conversion | Scope                                                               |
| ------------------------------------ | --------------------------------- | ------------------------- | ------------------------------------------------------------------- |
| `on_show`                            | `onOpen`                          | ~~`onShow`~~              | Autocomplete, Dropdown, DrawerList, DatePicker                      |
| `on_hide`                            | `onClose`                         | ~~`onHide`~~              | Autocomplete, Dropdown, DrawerList, DatePicker                      |
| `triangle_position`                  | `arrowPosition`                   | ~~`trianglePosition`~~    | Autocomplete, Dropdown, DrawerList                                  |
| `opened`                             | `open`                            | —                         | Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date |
| `input_icon`                         | `icon`                            | ~~`inputIcon`~~           | Autocomplete                                                        |
| `clear`                              | `showClearButton`                 | —                         | Input, InputMasked                                                  |
| `visible`                            | `show`                            | —                         | ProgressIndicator                                                   |
| `active` / `forceOpen`               | `open`                            | —                         | Tooltip                                                             |
| `position`                           | `placement`                       | —                         | Tooltip                                                             |
| `children`                           | `label`                           | —                         | Checkbox, ProgressIndicator                                         |
| `as`                                 | `element`                         | —                         | H (heading element)                                                 |
| `size`                               | `span`                            | —                         | Flex.Item, Card                                                     |
| `accordion`                          | `mode="accordion"`                | —                         | Table                                                               |
| `prerender`                          | `keepInDOM`                       | —                         | Tabs, Accordion                                                     |
| `isCollapsed`                        | `collapsed`                       | —                         | Breadcrumb                                                          |
| `styleType` / `style_type`           | `backgroundColor`                 | —                         | Breadcrumb, Dialog.Body, Drawer.Body                                |
| `spacing`                            | `innerSpace={{ block: 'value' }}` | ⚠️ Must use object form   | Section, Dialog.Body, Drawer.Body                                   |
| `input_class`                        | `inputClassName`                  | ~~`inputClass`~~          | Input, InputMasked                                                  |
| `textarea_class`                     | `textareaClassName`               | ~~`textareaClass`~~       | Textarea                                                            |
| `contentSpacing` / `content_spacing` | `contentInnerSpace`               | —                         | Tabs                                                                |
| `tabsSpacing` / `tabs_spacing`       | `tabsInnerSpace`                  | —                         | Tabs                                                                |
| `on_show`                            | `onShow`                          | (kept as-is)              | GlobalStatus (NOT renamed to `onOpen`)                              |
| `on_hide`                            | `onHide`                          | (kept as-is)              | GlobalStatus (NOT renamed to `onClose`)                             |
| `openState="opened"`                 | `open={true}`                     | —                         | Modal/Dialog/Drawer                                                 |
| `openState="closed"`                 | `open={false}`                    | —                         | Modal/Dialog/Drawer                                                 |
| `align_autocomplete`                 | `align`                           | —                         | Autocomplete                                                        |
| `align_dropdown`                     | `align`                           | —                         | Dropdown                                                            |
| `show_label`                         | `showDefaultLabel`                | ~~`showLabel`~~           | ProgressIndicator                                                   |

### Status value renames

Apply to all components that accept `statusState`, `state`, `variant`, or `confirmType`:

| Old value | New value       | Components                                                                                                                                                  |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'info'`  | `'information'` | FormStatus (`state`, `variant`), GlobalStatus (`state`), Section (`variant`), Slider (`statusState`), StepIndicator (`statusState`), Dialog (`confirmType`) |
| `'warn'`  | `'warning'`     | All components with `statusState`                                                                                                                           |

### CSS class renames

| Old CSS class                               | New CSS class                                              |
| ------------------------------------------- | ---------------------------------------------------------- |
| `dnb-autocomplete--opened`                  | `dnb-autocomplete--open`                                   |
| `dnb-dropdown--opened`                      | `dnb-dropdown--open`                                       |
| `dnb-drawer-list--opened`                   | `dnb-drawer-list--open`                                    |
| `dnb-date-picker--opened`                   | `dnb-date-picker--open`                                    |
| `dnb-progress-indicator--visible`           | `dnb-progress-indicator--show`                             |
| `dnb-anchor--contrast`                      | `dnb-anchor--surface-dark`                                 |
| `dnb-number-format--selectall`              | `dnb-number-format--select-all`                            |
| `dnb-section--spacing-*`                    | Removed (use `innerSpace` prop)                            |
| `.dnb-p--medium`                            | `.dnb-t__weight--medium`                                   |
| `.dnb-p--bold`                              | `.dnb-t__weight--bold`                                     |
| `.dnb-p__size--xx-large`                    | `.dnb-t__size--xx-large` + `.dnb-t__line-height--xx-large` |
| `.dnb-p__size--x-large`                     | `.dnb-t__size--x-large` + `.dnb-t__line-height--x-large`   |
| `.dnb-p__size--large`                       | `.dnb-t__size--large` + `.dnb-t__line-height--large`       |
| `.dnb-p__size--basis`                       | `.dnb-t__size--basis` + `.dnb-t__line-height--basis`       |
| `.dnb-p__size--medium`                      | `.dnb-t__size--medium` + `.dnb-t__line-height--medium`     |
| `.dnb-p--small` / `.dnb-p__size--small`     | `.dnb-t__size--small` + `.dnb-t__line-height--small`       |
| `.dnb-p--x-small` / `.dnb-p__size--x-small` | `.dnb-t__size--x-small` + `.dnb-t__line-height--x-small`   |

### Component-specific property renames

These properties are unique to a single component and only listed once here. Apply each rename only within JSX of the listed component.

#### Accordion

| Old                            | New                          |
| ------------------------------ | ---------------------------- |
| `expandBehaviour`              | `expandBehavior`             |
| `expanded_ssr`                 | `expandedSsr`                |
| `heading_level`                | `headingLevel`               |
| `single_container`             | `singleContainer`            |
| `left_component`               | `leftComponent`              |
| `flush_remembered_state`       | `flushRememberedState`       |
| `prevent_rerender_conditional` | `preventRerenderConditional` |
| `remember_state`               | `rememberState`              |
| `prevent_rerender`             | `preventRerender`            |
| `allow_close_all` (Group)      | `allowCloseAll`              |
| `expanded_id` (Group/Provider) | `expandedId`                 |

#### Anchor

| Old                   | New     |
| --------------------- | ------- |
| `scrollToHashHandler` | Removed |

#### Autocomplete

| Old                        | New                     |
| -------------------------- | ----------------------- |
| `no_options`               | `noOptions`             |
| `show_all`                 | `showAll`               |
| `aria_live_options`        | `ariaLiveOptions`       |
| `indicator_label`          | `indicatorLabel`        |
| `show_options_sr`          | `showOptionsSr`         |
| `selected_sr`              | `selectedSr`            |
| `submit_button_title`      | `submitButtonTitle`     |
| `submit_button_icon`       | `submitButtonIcon`      |
| `input_ref`                | `inputRef`              |
| `keep_value`               | `keepValue`             |
| `keep_selection`           | `keepSelection`         |
| `keep_value_and_selection` | `keepValueAndSelection` |
| `show_clear_button`        | `showClearButton`       |
| `disable_filter`           | `disableFilter`         |
| `disable_reorder`          | `disableReorder`        |
| `disable_highlighting`     | `disableHighlighting`   |
| `show_submit_button`       | `showSubmitButton`      |
| `submit_element`           | `submitElement`         |
| `input_element`            | `inputElement`          |
| `search_in_word_index`     | `searchInWordIndex`     |
| `search_numbers`           | `searchNumbers`         |
| `input_value`              | `inputValue`            |
| `open_on_focus`            | `openOnFocus`           |
| `drawer_class`             | `drawerClass`           |
| `selectall`                | `selectAll`             |

#### Button

| Old                | New                                                        |
| ------------------ | ---------------------------------------------------------- |
| `custom_content`   | `customContent`                                            |
| `class`            | `className`                                                |
| `variant="signal"` | Removed — use `variant="primary"` or `variant="secondary"` |

#### Card

| Old       | New     |
| --------- | ------- |
| `spacing` | Removed |
| `size`    | `span`  |

#### DatePicker

| Old                                 | New                 |
| ----------------------------------- | ------------------- |
| `start_date`                        | `startDate`         |
| `end_date`                          | `endDate`           |
| `start_month`                       | `startMonth`        |
| `end_month`                         | `endMonth`          |
| `min_date`                          | `minDate`           |
| `max_date`                          | `maxDate`           |
| `mask_order`                        | `maskOrder`         |
| `mask_placeholder`                  | `maskPlaceholder`   |
| `date_format`                       | `dateFormat`        |
| `return_format`                     | `returnFormat`      |
| `hide_navigation`                   | `hideNavigation`    |
| `hide_days`                         | `hideDays`          |
| `only_month`                        | `onlyMonth`         |
| `hide_last_week`                    | `hideLastWeek`      |
| `disable_autofocus`                 | `disableAutofocus`  |
| `enable_keyboard_nav`               | `enableKeyboardNav` |
| `show_input`                        | `showInput`         |
| `show_submit_button`                | `showSubmitButton`  |
| `show_cancel_button`                | `showCancelButton`  |
| `show_reset_button`                 | `showResetButton`   |
| `submit_button_text`                | `submitButtonText`  |
| `cancel_button_text`                | `cancelButtonText`  |
| `reset_button_text`                 | `resetButtonText`   |
| `reset_date`                        | `resetDate`         |
| `first_day`                         | `firstDay`          |
| `addon_element`                     | `addonElement`      |
| `align_picker`                      | `alignPicker`       |
| `close_on_select` (shortcuts)       | `closeOnSelect`     |
| `on_days_render`                    | `onDaysRender`      |
| `on_type`                           | `onType`            |
| `on_cancel`                         | `onCancel`          |
| `on_reset`                          | `onReset`           |
| `YYYY` (in dateFormat/returnFormat) | `yyyy`              |
| `DD` (in dateFormat/returnFormat)   | `dd`                |

#### DatePicker onChange return object (event object properties)

| Old                   | New                |
| --------------------- | ------------------ |
| `days_between`        | `daysBetween`      |
| `is_valid`            | `isValid`          |
| `is_valid_start_date` | `isValidStartDate` |
| `is_valid_end_date`   | `isValidEndDate`   |

#### Definition lists (Dl)

| Old         | New      |
| ----------- | -------- |
| `direction` | `layout` |

#### Divider (Horizontal Rule)

| Old          | New        |
| ------------ | ---------- |
| `light`      | Removed    |
| `medium`     | Removed    |
| `fullscreen` | `breakout` |

#### DrawerList

| Old                    | New                  |
| ---------------------- | -------------------- |
| `handle_dismiss_focus` | `handleDismissFocus` |
| `prepared_data`        | Removed              |

#### DrawerListDataArrayObject (data array items)

| Old              | New             | Scope                                               |
| ---------------- | --------------- | --------------------------------------------------- |
| `selected_key`   | `selectedKey`   | Dropdown, Autocomplete, DrawerList, Field.Selection |
| `selected_value` | `selectedValue` | Dropdown, Autocomplete, DrawerList, Field.Selection |
| `suffix_value`   | `suffixValue`   | Dropdown, Autocomplete, DrawerList, Field.Selection |
| `search_content` | `searchContent` | Dropdown, Autocomplete, DrawerList, Field.Selection |
| `class_name`     | `className`     | Dropdown, Autocomplete, DrawerList, Field.Selection |

#### Dropdown

| Old               | New              |
| ----------------- | ---------------- |
| `more_menu`       | `moreMenu`       |
| `trigger_element` | `triggerElement` |
| `open_on_focus`   | `openOnFocus`    |
| `on_show_focus`   | `onOpenFocus`    |
| `on_hide_focus`   | `onCloseFocus`   |

#### Flex

| Old             | New                         |
| --------------- | --------------------------- |
| `spacing`       | `gap`                       |
| `rowGap={true}` | Remove prop (same behavior) |

#### FormLabel

| Old       | New      |
| --------- | -------- |
| `for_id`  | `forId`  |
| `sr_only` | `srOnly` |

#### FormStatus

| Old                      | New             |
| ------------------------ | --------------- |
| `text_id`                | `textId`        |
| `width_selector`         | `widthSelector` |
| `width_element`          | `widthElement`  |
| `variant` value `'flat'` | `'plain'`       |

#### GlobalError

| Old      | New                |
| -------- | ------------------ |
| `status` | `statusCode`       |
| `code`   | `errorMessageCode` |

#### GlobalStatus

| Old                              | New                    |
| -------------------------------- | ---------------------- |
| `hide_close_button`              | `hideCloseButton`      |
| `close_text`                     | `closeText`            |
| `default_title`                  | `defaultTitle`         |
| `status_anchor_text`             | `statusAnchorText`     |
| `omit_set_focus`                 | `omitSetFocus`         |
| `omit_set_focus_on_update`       | `omitSetFocusOnUpdate` |
| `status_id`                      | `statusId`             |
| `status_anchor_url`              | `statusAnchorUrl`      |
| `status_anchor_label`            | `statusAnchorLabel`    |
| `buffer_delay`                   | `bufferDelay`          |
| `autoclose`                      | `autoClose`            |
| `autoscroll`                     | `autoScroll`           |
| `on_adjust`                      | `onAdjust`             |
| `remove_on_unmount` (Controller) | `removeOnUnmount`      |

#### Heading

| Old               | New              |
| ----------------- | ---------------- |
| `debug_counter`   | `debugCounter`   |
| `skip_correction` | `skipCorrection` |

#### Icon

| Old             | New            |
| --------------- | -------------- |
| `inherit_color` | `inheritColor` |

#### Input

| Old                     | New                   |
| ----------------------- | --------------------- |
| `input_state`           | `inputState`          |
| `submit_button_title`   | `submitButtonTitle`   |
| `clear_button_title`    | `clearButtonTitle`    |
| `keep_placeholder`      | `keepPlaceholder`     |
| `input_attributes`      | `inputAttributes`     |
| `input_element`         | `inputElement`        |
| `inner_element`         | `innerElement`        |
| `submit_element`        | `submitElement`       |
| `submit_button_variant` | `submitButtonVariant` |
| `submit_button_icon`    | `submitButtonIcon`    |
| `submit_button_status`  | `submitButtonStatus`  |
| `selectall`             | `selectAll`           |
| `on_submit_focus`       | `onSubmitFocus`       |
| `on_submit_blur`        | `onSubmitBlur`        |
| `on_clear`              | `onClear`             |

#### InputMasked

| Old                                   | New                                |
| ------------------------------------- | ---------------------------------- |
| `number_mask`                         | `numberMask`                       |
| `currency_mask`                       | `currencyMask`                     |
| `mask_options`                        | `maskOptions`                      |
| `number_format`                       | `numberFormat`                     |
| `as_currency`                         | `asCurrency`                       |
| `as_number`                           | `asNumber`                         |
| `as_percent`                          | `asPercent`                        |
| `show_mask`                           | `showMask`                         |
| `show_guide`                          | Removed                            |
| `keep_char_positions`                 | Removed                            |
| `placeholder_char`                    | Removed                            |
| `pipe`                                | Removed                            |
| Function-based masks (`MaskFunction`) | Removed — use array masks directly |
| `{ mask: ... }` object form           | Removed — use array masks directly |

#### Logo (API redesign)

| Old             | New                                                        |
| --------------- | ---------------------------------------------------------- |
| `brand`         | Removed — import SVG component and use `svg` prop          |
| `variant`       | Removed — import specific variant directly                 |
| `size`          | `height` (numeric) or `inheritSize` (for `size='inherit'`) |
| `inherit_color` | `inheritColor`                                             |
| `alt`           | Removed                                                    |
| `ratio`         | Removed                                                    |

#### Modal / Dialog / Drawer

| Old                             | New                           |
| ------------------------------- | ----------------------------- |
| `class`                         | `className`                   |
| `focus_selector`                | `focusSelector`               |
| `labelled_by`                   | `labelledBy`                  |
| `open_delay`                    | `openDelay`                   |
| `content_id`                    | `contentId`                   |
| `dialog_title`                  | `dialogTitle`                 |
| `close_title`                   | `closeTitle`                  |
| `hide_close_button`             | `hideCloseButton`             |
| `close_button_attributes`       | `closeButtonAttributes`       |
| `prevent_core_style`            | `preventCoreStyle`            |
| `animation_duration`            | `animationDuration`           |
| `no_animation_on_mobile`        | `noAnimationOnMobile`         |
| `min_width`                     | `minWidth`                    |
| `max_width`                     | `maxWidth`                    |
| `align_content`                 | `alignContent`                |
| `container_placement`           | `containerPlacement`          |
| `vertical_alignment`            | `verticalAlignment`           |
| `open_state`                    | `openState`                   |
| `direct_dom_return`             | `directDomReturn`             |
| `omit_trigger_button`           | `omitTriggerButton`           |
| `open_modal`                    | `openModal`                   |
| `close_modal`                   | `closeModal`                  |
| `trigger_attributes`            | `triggerAttributes`           |
| `overlay_class`                 | `overlayClass`                |
| `content_class`                 | `contentClass`                |
| `modal_content`                 | `modalContent`                |
| `header_content`                | `headerContent`               |
| `bar_content`                   | `barContent`                  |
| `dialog_role`                   | `dialogRole`                  |
| `bypass_invalidation_selectors` | `bypassInvalidationSelectors` |
| `content_ref`                   | `contentRef`                  |
| `scroll_ref`                    | `scrollRef`                   |
| `prevent_overlay_close`         | `preventOverlayClose`         |
| `title_class` (Header)          | `titleClass`                  |
| `shadow_class` (Navigation)     | `shadowClass`                 |
| `on_open`                       | `onOpen`                      |
| `on_close`                      | `onClose`                     |
| `on_close_prevent`              | `onClosePrevent`              |

#### NumberFormat

| Old                 | New                |
| ------------------- | ------------------ |
| `omit_rounding`     | `rounding="omit"`  |
| `currency_display`  | `currencyDisplay`  |
| `currency_position` | `currencyPosition` |
| `always_selectall`  | `alwaysSelectAll`  |
| `selectall`         | `selectAll`        |
| `copy_selection`    | `copySelection`    |
| `clean_copy_value`  | `cleanCopyValue`   |

#### P (paragraph)

| Old             | New                                  |
| --------------- | ------------------------------------ |
| `medium={true}` | `weight='medium'`                    |
| `bold={true}`   | `weight='bold'`                      |
| `modifier`      | Removed — use `weight` and/or `size` |

#### Pagination

| Old                          | New                        |
| ---------------------------- | -------------------------- |
| `place_maker_before_content` | `placeMarkerBeforeContent` |
| `startup_page`               | `startupPage`              |
| `current_page`               | `currentPage`              |
| `page_count`                 | `pageCount`                |
| `startup_count`              | `startupCount`             |
| `parallel_load_count`        | `parallelLoadCount`        |
| `min_wait_time`              | `minWaitTime`              |
| `use_load_button`            | `useLoadButton`            |
| `hide_progress_indicator`    | `hideProgressIndicator`    |
| `set_content_handler`        | `setContentHandler`        |
| `reset_content_handler`      | `resetContentHandler`      |
| `reset_pagination_handler`   | `resetPaginationHandler`   |
| `end_infinity_handler`       | `endInfinityHandler`       |
| `page_element`               | `pageElement`              |
| `fallback_element`           | `fallbackElement`          |
| `marker_element`             | `markerElement`            |
| `indicator_element`          | `indicatorElement`         |
| `button_title`               | `buttonTitle`              |
| `prev_title`                 | `prevTitle`                |
| `next_title`                 | `nextTitle`                |
| `more_pages`                 | `morePages`                |
| `is_loading_text`            | `isLoadingText`            |
| `load_button_text`           | `loadButton.text`          |
| `on_startup`                 | `onStartup`                |
| `on_load`                    | `onLoad`                   |
| `on_end`                     | `onEnd`                    |

#### PaymentCard

| Old                                   | New              |
| ------------------------------------- | ---------------- |
| `product_code`                        | `productCode`    |
| `card_number`                         | `cardNumber`     |
| `card_status`                         | `cardStatus`     |
| `raw_data`                            | `rawData`        |
| `not_active` (cardStatus value)       | `notActive`      |
| `order_in_process` (cardStatus value) | `orderInProcess` |
| `new_order` (cardStatus value)        | `newOrder`       |

#### ProgressIndicator

| Old               | New                |
| ----------------- | ------------------ |
| `indicator_label` | `indicatorLabel`   |
| `show_label`      | `showDefaultLabel` |
| `class`           | `className`        |

#### Radio / Radio.Group

| Old                              | New               |
| -------------------------------- | ----------------- |
| `layout_direction` (Radio.Group) | `layoutDirection` |

#### Skeleton

| Old          | New         |
| ------------ | ----------- |
| `aria_busy`  | `ariaBusy`  |
| `aria_ready` | `ariaReady` |

#### Space

| Old           | New          |
| ------------- | ------------ |
| `no_collapse` | `noCollapse` |

#### Stat

| Old                            | New                         |
| ------------------------------ | --------------------------- |
| `Stat.Amount`                  | Removed — use `Stat.Number` |
| `Stat.Info variant="default"`  | Use `variant="plain"`       |
| `Stat.Label variant="default"` | Use `variant="plain"`       |

#### StepIndicator

| Old                   | New                       |
| --------------------- | ------------------------- |
| `is_current`          | `isCurrent`               |
| `current_step`        | `currentStep`             |
| `overview_title`      | `overviewTitle`           |
| `step_title`          | `stepTitle`               |
| `hide_numbers`        | `hideNumbers`             |
| `on_item_render`      | Removed                   |
| `sidebarId`           | Removed — use `id`        |
| `step_title_extended` | Removed — use `stepTitle` |

#### Table

| Old                                 | New                |
| ----------------------------------- | ------------------ |
| `accordion`                         | `mode="accordion"` |
| `accordionChevronPlacement="start"` | `"left"`           |
| `accordionChevronPlacement="end"`   | `"right"`          |
| `onClosed`                          | `onClose`          |
| `onOpened`                          | `onOpen`           |

#### Tabs

| Old                | New               |
| ------------------ | ----------------- |
| `content_style`    | `contentStyle`    |
| `tab_element`      | `tabElement`      |
| `tabs_style`       | `tabsStyle`       |
| `nav_button_edge`  | `navButtonEdge`   |
| `prevent_rerender` | `preventRerender` |
| `focus_key`        | `focusKey`        |
| `no_border`        | `noBorder`        |
| `on_mouse_enter`   | `onMouseEnter`    |

#### Tag

| Old        | New                                             |
| ---------- | ----------------------------------------------- |
| `onDelete` | Removed — use `onClick` + `variant="removable"` |

#### Textarea

| Old                   | New                  |
| --------------------- | -------------------- |
| `textarea_state`      | `textareaState`      |
| `autoresize_max_rows` | `autoResizeMaxRows`  |
| `autoresize`          | `autoResize`         |
| `textarea_attributes` | `textareaAttributes` |
| `textarea_element`    | `textareaElement`    |

#### ToggleButton

| Old                        | New               |
| -------------------------- | ----------------- |
| `left_component`           | `leftComponent`   |
| `layout_direction` (Group) | `layoutDirection` |

#### Tooltip

| Old                    | New              |
| ---------------------- | ---------------- |
| `position`             | `placement`      |
| `active` / `forceOpen` | `open`           |
| `size="basis"`         | `size="default"` |

#### Upload

| Old                 | New                 |
| ------------------- | ------------------- |
| `variant="normal"`  | `variant="default"` |
| `fileListAriaLabel` | `listAriaLabel`     |

### Translation key renames

| Old                                 | New                                | Component         |
| ----------------------------------- | ---------------------------------- | ----------------- |
| `HelpButton.aria_role`              | `HelpButton.ariaRole`              | HelpButton        |
| `Autocomplete.no_options`           | `Autocomplete.noOptions`           | Autocomplete      |
| `Autocomplete.show_all`             | `Autocomplete.showAll`             | Autocomplete      |
| `Autocomplete.aria_live_options`    | `Autocomplete.ariaLiveOptions`     | Autocomplete      |
| `Autocomplete.indicator_label`      | `Autocomplete.indicatorLabel`      | Autocomplete      |
| `Autocomplete.show_options_sr`      | `Autocomplete.showOptionsSr`       | Autocomplete      |
| `Autocomplete.selected_sr`          | `Autocomplete.selectedSr`          | Autocomplete      |
| `Autocomplete.submit_button_title`  | `Autocomplete.submitButtonTitle`   | Autocomplete      |
| `Input.submit_button_title`         | `Input.submitButtonTitle`          | Input             |
| `Input.clear_button_title`          | `Input.clearButtonTitle`           | Input             |
| `ProgressIndicator.indicator_label` | `ProgressIndicator.indicatorLabel` | ProgressIndicator |
| `PaymentCard.text_card_number`      | Removed                            | PaymentCard       |
| `PaymentCard.text_blocked`          | `PaymentCard.textBlocked`          | PaymentCard       |
| `PaymentCard.text_expired`          | `PaymentCard.textExpired`          | PaymentCard       |
| `PaymentCard.text_not_active`       | `PaymentCard.textNotActive`        | PaymentCard       |
| `PaymentCard.text_new_order`        | `PaymentCard.textNewOrder`         | PaymentCard       |
| `PaymentCard.text_order_in_process` | `PaymentCard.textOrderInProcess`   | PaymentCard       |
| `PaymentCard.text_replaced`         | `PaymentCard.textReplaced`         | PaymentCard       |
| `PaymentCard.text_renewed`          | `PaymentCard.textRenewed`          | PaymentCard       |
| `PaymentCard.text_new`              | `PaymentCard.textNew`              | PaymentCard       |
| `PaymentCard.text_unknown`          | `PaymentCard.textUnknown`          | PaymentCard       |
| `Skeleton.aria_busy`                | `Skeleton.ariaBusy`                | Skeleton          |
| `Skeleton.aria_ready`               | `Skeleton.ariaReady`               | Skeleton          |
| `Pagination.button_title`           | `Pagination.buttonTitle`           | Pagination        |
| `Pagination.prev_title`             | `Pagination.prevTitle`             | Pagination        |
| `Pagination.next_title`             | `Pagination.nextTitle`             | Pagination        |
| `Pagination.more_pages`             | `Pagination.morePages`             | Pagination        |
| `Pagination.is_loading_text`        | `Pagination.isLoadingText`         | Pagination        |
| `Pagination.load_button_text`       | `Pagination.loadButtonText`        | Pagination        |
| `TimelineItem.alt_label_completed`  | `TimelineItem.altLabelCompleted`   | Timeline          |
| `TimelineItem.alt_label_current`    | `TimelineItem.altLabelCurrent`     | Timeline          |
| `TimelineItem.alt_label_upcoming`   | `TimelineItem.altLabelUpcoming`    | Timeline          |
| `NumberFormat.clipboard_copy`       | `NumberFormat.clipboardCopy`       | NumberFormat      |
| `NumberFormat.not_available`        | `NumberFormat.notAvailable`        | NumberFormat      |
| `StepIndicator.overview_title`      | `StepIndicator.overviewTitle`      | StepIndicator     |
| `StepIndicator.step_title`          | `StepIndicator.stepTitle`          | StepIndicator     |
| `GlobalError.code`                  | `GlobalError.errorMessageCode`     | GlobalError       |
| `GlobalStatus.close_text`           | `GlobalStatus.closeText`           | GlobalStatus      |
| `GlobalStatus.default_title`        | `GlobalStatus.defaultTitle`        | GlobalStatus      |
| `GlobalStatus.status_anchor_text`   | `GlobalStatus.statusAnchorText`    | GlobalStatus      |
| `CopyOnClick.clipboard_copy`        | `CopyOnClick.clipboardCopy`        | CopyOnClick       |
| `Modal.dialog_title`                | `Modal.dialogTitle`                | Modal             |
| `Modal.close_title`                 | `Modal.closeTitle`                 | Modal             |
| `PhoneNumber.label`                 | `PhoneNumber.numberLabel`          | Field.PhoneNumber |

### SCSS mixin renames

| Old                       | New                     | File                        |
| ------------------------- | ----------------------- | --------------------------- |
| `focus-visible`           | `focusVisible`          | `style/core/utilities.scss` |
| `IS_FF`                   | `isFirefox`             | `style/core/utilities.scss` |
| `IS_CHROME`               | `isChrome`              | `style/core/utilities.scss` |
| `IS_SAFARI_MOBILE`        | `isSafariMobile`        | `style/core/utilities.scss` |
| `IS_SAFARI_DESKTOP`       | `isSafariDesktop`       | `style/core/utilities.scss` |
| `headingSize_xx-large`    | `headingSizeXxLarge`    | `typography-mixins.scss`    |
| `headingSize_x-large`     | `headingSizeXLarge`     | `typography-mixins.scss`    |
| `headingSize_large`       | `headingSizeLarge`      | `typography-mixins.scss`    |
| `headingSize_medium`      | `headingSizeMedium`     | `typography-mixins.scss`    |
| `headingSize_basis`       | `headingSizeBasis`      | `typography-mixins.scss`    |
| `headingSize_small`       | `headingSizeSmall`      | `typography-mixins.scss`    |
| `headingSize_x-small`     | `headingSizeXSmall`     | `typography-mixins.scss`    |
| `typography_lead`         | `typographyLead`        | `typography-mixins.scss`    |
| `headingSpacing_xx-large` | `headingSpacingXxLarge` | `typography-mixins.scss`    |
| `headingSpacing_x-large`  | `headingSpacingXLarge`  | `typography-mixins.scss`    |
| `headingSpacing_large`    | `headingSpacingLarge`   | `typography-mixins.scss`    |
| `extendFocusRing`         | Removed                 | `style/core/utilities.scss` |
| `componentReset`          | Removed                 | `style/core/scopes.scss`    |

### Eufemia Forms renames

| Old                                         | New                                                          | Scope                   |
| ------------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| `validator`                                 | `onChangeValidator`                                          | All Field.\* components |
| `continuousValidation`                      | `validateContinuously`                                       | All Field.\* components |
| `focusWhenOpen`                             | `focusOnOpen`                                                | All Field.\* components |
| `Form.useError`                             | `Form.useValidation`                                         | Hook rename             |
| `Form.useLocale`                            | `Form.useTranslation`                                        | Hook rename             |
| `Form.useErrorMessage`                      | Removed — use `errorMessages` prop                           | Hook removal            |
| `internal.error`                            | `error`                                                      | Error handling          |
| `{itemNr}` (Iterate label)                  | `{itemNo}`                                                   | Form.Iterate            |
| `Form.FieldProps`                           | `Field.Provider`                                             | Component rename        |
| `StepsLayout`                               | `Wizard.Container`                                           | Component rename        |
| `StepsLayout.Step`                          | `Wizard.Step`                                                | Component rename        |
| `StepsLayout.NextButton`                    | `Wizard.Buttons`                                             | Component rename        |
| `StepsLayout.PreviousButton`                | `Wizard.Buttons`                                             | Component rename        |
| `StepsLayout.Buttons`                       | `Wizard.Buttons`                                             | Component rename        |
| `StepsLayout.useStep`                       | `Wizard.useStep`                                             | Hook rename             |
| `Iterate.ArrayPushButton`                   | `Iterate.PushButton`                                         | Component rename        |
| `Iterate.ArrayRemoveElementButton`          | `Iterate.RemoveButton`                                       | Component rename        |
| `withValue` (Form.Visibility)               | `hasValue`                                                   | Form.Visibility         |
| `pathValue` / `whenValue` (Form.Visibility) | `visibleWhen`                                                | Form.Visibility         |
| `filterSubmitData` (DataContext.Provider)   | Use `filterData` in `onSubmit`/`onChange` event              | DataContext.Provider    |
| `active` (Wizard.Step)                      | `include`                                                    | Wizard.Step             |
| `activeWhen` (Wizard.Step)                  | `includeWhen`                                                | Wizard.Step             |
| `requireCommit` (Iterate.PushContainer)     | `preventUncommittedChanges`                                  | Iterate.PushContainer   |
| `country` (Field.PostalCodeAndCity)         | `countryCode`                                                | Field.PostalCodeAndCity |
| `Card.Provider` / `Form.Card.Provider`      | Removed (including `disableCardBreakout`)                    | Forms                   |
| `radio-list` variant (Field.Selection)      | Removed — use List with `variant="radio"`                    | Field.Selection         |
| `show_password` (Field.Password)            | Use translation `Password.ariaLabelShow`                     | Field.Password          |
| `hide_password` (Field.Password)            | Use translation `Password.ariaLabelHide`                     | Field.Password          |
| `variant` (Wizard.Container)                | Removed                                                      | Wizard.Container        |
| `scrollTopOnStepChange` (Wizard.Container)  | Removed — now default. Use `omitScrollManagement` to disable | Wizard.Container        |
| `sidebarId` (Wizard.Container)              | Removed — use `id`                                           | Wizard.Container        |

#### errorMessages key renames

| Old key            | New key                             |
| ------------------ | ----------------------------------- |
| `required`         | `Field.errorRequired`               |
| `pattern`          | `Field.errorPattern`                |
| `minLength`        | `StringField.errorMinLength`        |
| `maxLength`        | `StringField.errorMaxLength`        |
| `minimum`          | `NumberField.errorMinimum`          |
| `maximum`          | `NumberField.errorMaximum`          |
| `exclusiveMinimum` | `NumberField.errorExclusiveMinimum` |
| `exclusiveMaximum` | `NumberField.errorExclusiveMaximum` |
| `multipleOf`       | `NumberField.errorMultipleOf`       |

### Import path changes

| Old import                                                                  | New import                                                                          | Notes              |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------ |
| `@dnb/eufemia/components/input/InputPassword`                               | `import { Field } from '@dnb/eufemia/extensions/forms'` then use `<Field.Password>` | Component moved    |
| `@dnb/eufemia/fragments/drawer-list/DrawerList` (`ItemContent`)             | `@dnb/eufemia/fragments/drawer-list/DrawerListItem` (`ItemContent`)                 | Named export moved |
| `@dnb/eufemia/components/form-row/FormRowHelpers` (`includeValidProps`)     | `@dnb/eufemia/shared/helpers/filterValidProps` (`pickFormElementProps`)             | Renamed            |
| `@dnb/eufemia/components/form-row/FormRowHelpers` (`prepareFormRowContext`) | `@dnb/eufemia/shared/helpers/filterValidProps` (`prepareFormElementContext`)        | Renamed            |
| `@dnb/eufemia/components/input-masked/InputMaskedHooks`                     | `@dnb/eufemia/components/input-masked/hooks`                                        | Path changed       |
| `@dnb/eufemia/components/input-masked/addons/createNumberMask`              | Removed — use built-in `numberMask` prop                                            | Deleted            |
| `@dnb/eufemia/components/input-masked/addons/emailMask`                     | Removed — use `mask` prop directly                                                  | Deleted            |
| `@dnb/eufemia/components/input` (`inputPropTypes`)                          | Removed                                                                             | PropTypes removed  |
| `@dnb/eufemia/components/button` (`buttonVariantPropType`)                  | Removed                                                                             | PropTypes removed  |
| `@dnb/eufemia/components/space/types` (`SectionSpacing`)                    | `InnerSpaceType` from same path                                                     | Type renamed       |

### Theming path changes

| Old path                       | New path                               |
| ------------------------------ | -------------------------------------- |
| `style/themes/theme-ui/`       | `style/themes/ui/`                     |
| `style/themes/theme-sbanken/`  | `style/themes/sbanken/`                |
| `style/themes/theme-eiendom/`  | `style/themes/eiendom/`                |
| `style/themes/theme-carnegie/` | `style/themes/carnegie/`               |
| `ui-theme-tags` CSS package    | Removed — use class-based selectors    |
| `ui-theme-fonts` CSS package   | Removed — included in `ui-theme-basis` |

### TypeScript type renames

For the full list of 60+ type renames across context types, stuttering names, plural-to-singular, and non-prefixed types, see the [TypeScript](./v11-info.mdx#typescript) section. The most commonly encountered ones:

#### Context value types

| Before                    | After                    |
| ------------------------- | ------------------------ |
| `AccordionContextProps`   | `AccordionContextValue`  |
| `TooltipContextProps`     | `TooltipContextValue`    |
| `HeadingContextProps`     | `HeadingContextValue`    |
| `DrawerListContextProps`  | `DrawerListContextValue` |
| `UploadContextProps`      | `UploadContextValue`     |
| `DatePickerContextValues` | `DatePickerContextValue` |
| `CardContextState`        | `CardContextValue`       |
| `SliderContextTypes`      | `SliderContextValue`     |
| `SkeletonContextProps`    | `SkeletonContextValue`   |
| `ListContext` (type)      | `ListContextValue`       |

#### Component event types

| Before                        | After                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `AutocompleteClearEvent`      | `AutocompleteOnClearParams`                                                                                           |
| `AutocompleteTypeEvent`       | `AutocompleteOnTypeParams`                                                                                            |
| `AutocompleteFocusEvent`      | `AutocompleteOnFocusParams`                                                                                           |
| `AutocompleteBlurEvent`       | `AutocompleteOnBlurParams`                                                                                            |
| `AutocompleteChangeEvent`     | `AutocompleteOnChangeParams`                                                                                          |
| `AutocompleteSelectEvent`     | `AutocompleteOnSelectParams`                                                                                          |
| `OnChangeParams` (Checkbox)   | `CheckboxOnChangeParams`                                                                                              |
| `OnClickParams` (Checkbox)    | `CheckboxOnClickParams`                                                                                               |
| `OnChangeEventProps` (Slider) | `SliderOnChangeParams`                                                                                                |
| `ThumbStateEnums` (Slider)    | `SliderThumbState`                                                                                                    |
| `ModalPropTypes`              | `ModalAllProps`                                                                                                       |
| `FormStatusState`             | Now only accepts `'error'` \| `'warning'` \| `'information'` \| `'success'` \| `'marketing'` (no `string \| boolean`) |

#### Props Type Exports (`Props` → prefixed names)

| Module path                             | Before  | After                      |
| --------------------------------------- | ------- | -------------------------- |
| `components/card`                       | `Props` | `CardProps`                |
| `components/flex/Horizontal`            | `Props` | `HorizontalProps`          |
| `components/flex/Stack`                 | `Props` | `StackProps`               |
| `components/flex/Vertical`              | `Props` | `VerticalProps`            |
| `extensions/forms/Field/String`         | `Props` | `FieldStringProps`         |
| `extensions/forms/Field/Number`         | `Props` | `FieldNumberProps`         |
| `extensions/forms/Field/Boolean`        | `Props` | `FieldBooleanProps`        |
| `extensions/forms/Field/Selection`      | `Props` | `FieldSelectionProps`      |
| `extensions/forms/Value/String`         | `Props` | `ValueStringProps`         |
| `extensions/forms/Value/Number`         | `Props` | `ValueNumberProps`         |
| `extensions/forms/Form/Handler`         | `Props` | `FormHandlerProps`         |
| `extensions/forms/Iterate/Array`        | `Props` | `IterateArrayProps`        |
| `extensions/forms/Wizard/Step`          | `Props` | `WizardStepProps`          |
| `extensions/forms/FieldBlock`           | `Props` | `FieldBlockProps`          |
| `extensions/forms/ValueBlock`           | `Props` | `ValueBlockProps`          |
| `extensions/forms/DataContext/Provider` | `Props` | `DataContextProviderProps` |

The same pattern applies to all Field, Value, Form, Iterate, and Wizard sub-components (91 types total).

#### NumberFormat type renames

| Before                   | After                          |
| ------------------------ | ------------------------------ |
| `formatReturnValue`      | `NumberFormatReturnValue`      |
| `formatValue`            | `NumberFormatValue`            |
| `formatOptionParams`     | `NumberFormatOptionParams`     |
| `formatReturnType`       | `NumberFormatReturnType`       |
| `formatTypes`            | `NumberFormatType`             |
| `formatCurrencyPosition` | `NumberFormatCurrencyPosition` |
