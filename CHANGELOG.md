## December, 4. 2019

### New DNB font

General information: All existing and new components uses the new (and slightly larger) text styles, but the existing height of the components is not affected by this and has NOT changed.

[Typography](/uilib/typography) changes:

- **h1** `DNB Sans Medium` 48px / 56px line height
- **h1 small** `DNB Sans Medium` 34px / 40px line height
- **h2** `DNB Sans Medium` 26px / 32px line height
- **h3 / Lead** `DNB Sans Medium` 20px / 28px line height
- **Body text** `DNB Sans Regular` 18px / 24px line height
- **Body text medium** `DNB Sans Medium` 18px / 24px line height
- **Small text** `DNB Sans Regular` 16px / 20px line height
- **Small text medium** `DNB Sans Medium` 16px / 20px line height

**Number features** are removed as we do not need them anymore.

### Colors

[Colors](/uilib/usage/customisation/colors) changes:

- `accent-yellow`, witch replaces `signal-yellow`
- `accent-yellow-30`, witch replaces `signal-yellow-30`
- `signal-orange` is moved from Profile to UX color

New [Colors](/uilib/usage/customisation/colors):

- Profile color `lavender`
- Profile color `sand-yellow`
- Profile color `pistachio`
- UX color `success-green`

### Icons

- secondary `log_in`

### Components and Elements

[Components](/uilib/components) and [Elements](/uilib/elements) features and changes:

### Components changes

- **Button** signal button changes:
  - background color change (`accent-yellow`)
  - text color change (`ocean-green`)
  - outline color change (`ocean-green`)
  - inactive / disabled color: `accent-yellow-30`
- **Dropdown**
  - dropdown text error state color: `fire-red`
- **Table** header icon change: from `chevron` to `arrow`

Get more details about the `dnb-ui-lib` [v6 release](/uilib/about-the-lib/releases/v6-info)

## November, 30. 2019

New [Icons](/icons):

- primary `reset`
- primary `reset`
- primary `arrow_top`
- primary `arrow_right`
- primary `arrow_bottom`
- primary `arrow_left`
- secondary `settings`
- secondary `home`
- secondary `refresh`
- secondary `add_file`
- secondary `view_on`
- secondary `view_off`

Get more details about the `dnb-ui-lib` [v5.8 release](/uilib/about-the-lib/releases/v5.8-info)

## November, 16. 2019

- New [secondary icons](/icons/secondary): `arrow_up`, `arrow_down`, `arrow_right`, `arrow_left`, `view`, `view_off`, `settings`, `refresh`, `add_file`

## November, 6. 2019

- [GlobalStatus](/uilib/components/global-status): modified background color
- [Icon](/uilib/components/icon): new feature; rounded border
- Made the `core` and `basis` CSS packages robuster on running in ePlatform environment

## October, 30. 2019

- New component in the `dnb-ui-lib`: [Number](/uilib/components/number)
- New [colors](/uilib/usage/customisation/colors):
  1. `fire-red`, witch replaces `cherry-red` (_default error color_)
  1. `fire-red-8`, witch replaces `cherry-red-8`
- Icons changes:
  1. primary `save` is now => secondary `download`
  1. secondary `save_alt_01` is now => primary `save`
  1. primary `error` got removed

Get more details about the `dnb-ui-lib` [v5 release](/uilib/about-the-lib/releases/v5-info)

## October, 14. 2019

- New [secondary icons](/icons/secondary): `undo` and `redo`

## October, 2. 2019

- New [secondary icons](/icons/secondary): `send` and `upload`

## September, 23. 2019

- New component to show `404` and `500` status: [GlobalError](/uilib/components/global-error)

## August, 24. 2019

- Read more about the `dnb-ui-lib` [v4.10 release](/uilib/releases/v4.10-info)
- New component in the `dnb-ui-lib`: [GlobalStatus](/uilib/components/global-status)
- Updated [FormStatus](/uilib/components/form-status) with new text color and new icon
- Added link to example usage of a [Table](/uilib/elements/tables#working-demo) styles using `react-table`
- Added info about [Custom project Icons](/uilib/components/icon#custom-project-icons)

## July, 21. 2019

- Major Release of `dnb-ui-lib`: Read more about the [v4 release](/uilib/releases/v4-info)
- New component in the `dnb-ui-lib`: [Space](/uilib/components/space) for easy spacing capabilities
- New component in the `dnb-ui-lib`: [Slider](/uilib/components/slider) with add/subtract buttons

## June, 26. 2019

- The `dnb-ui-lib` got new helpers for [Spacing](/uilib/usage/layout/spacing#spacing-helpers) and [Layout](/uilib/usage/layout)
- Added first [Demo App](/uilib/getting-started/demos)

## June, 19. 2019

- New components in the `dnb-ui-lib`: [ToggleButton](/uilib/components/toggle-button) as well as two layout components [FormSet](/uilib/components/form-set) and [FormRow](/uilib/components/form-row)

## June, 5. 2019

- New corner radius (border-radius) on `Dropdown` and `DatePicker`: 4px (0.25rem)

## June, 3. 2019

- New component in the `dnb-ui-lib`: [Textarea](/uilib/components/textarea). Got also a wider corner radius by `16px (1rem)`

## May, 27. 2019

- New components in the `dnb-ui-lib`: [Checkbox](/uilib/components/checkbox) and [Radio](/uilib/components/radio) button

## May, 19. 2019

- New component in the `dnb-ui-lib`: Circular [ProgressIndicator](/uilib/components/progress-indicator) bar (spinner with animation)

## May, 8. 2019

- New component in the `dnb-ui-lib`: [DatePicker](/uilib/components/date-picker) with range/period support

## April, 26. 2019

**Changes to the default styles**

- DNB [section](/uilib/components/section) `.dnb-section` got two new default colors `.dnb-section--emerald-green` and `.dnb-section--signal-orange`.

## March, 22. 2019

**Changes to the default styles**

- New Primary and Secondary Icons where added (link_out, pencil, bubble, save)
- Enhanced the behavior of the Input Component with a entered text (dirty) state, changing the typography color to Emerald Green

## March, 12. 2019

**Changes to the default styles**

- Toggle Switch got new states and look & feel
- New Primary Icons where added (information)
- Overall Component enhancements

## March, 6. 2019

**Changes to the default styles**

- ErrorMessage (FormStatus) got a smaller text size (14px)
- Several "v1" walk though, into detail changes

## February, 21. 2019

**Changes to the default styles**

- Anchor (Text Link): Has now white background color on focus state
- Tables how now always a bottom border
- Button got a new look for all states
- Input got a new look for all states
- Dropdown got a new look for all states

**UI library**

- **Breaking change:** [Styles](/uilib/usage/customisation/styling) got new structure. You have now to declare the [HTML Elements with a class](/uilib/elements#how-to-use)

---

## February, 14. 2019

- Anchor (Text Link): Removed underline on hover and active states
- Tables (the default once) has now always a border line on the bottom

---

## January 2019

**Changes to the default styles**

- Change from 1px to 2px outline on input for error state
- Signal Orange is replaced by Emerald Green for focus state
- Tab and StepIndicator (Progress bar) have now Sea Green Alt underline
- The Switch component has now an outline of 2px
- Hover on Tabs looks more like an anchor
- Color change: Sea Green 4% -> Mint Green 12%

Get more [details about releases](/uilib/releases) or have a look on all [release notes on GitHub](https://github.com/dnbexperience/eufemia/releases)

---
