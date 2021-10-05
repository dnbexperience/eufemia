## August, 17. 2021

- New v2 [StepIndicator](/uilib/components/step-indicator) with new look and behavior. [v1](/uilib/components/step-indicator/demos-v1) can still be used for legacy reasons until the next breaking release.

## April, 5. 2021

- `success-green` changes its color from `#008000` to `#007B5E`.

## March, 23. 2021

- Make Anchor / Link better accessible by providing a title when target is set to blank.

## March, 3. 2021

- Applied new Eufemia appearance and styles on a couple of components.

## February, 2. 2021

- A good amount of new icons where added. See [code commit](https://github.com/dnbexperience/eufemia/pull/755) for more details.

## January, 28. 2021

- Change the [Number](/uilib/components/number) currency display from `symbol` to `narrowSymbol` when locale is `no`.
- Change the [Tabs](/uilib/components/tabs) spacing from 80px to 40px as basis, and use 32px for small viewports.
- Change the [Tabs](/uilib/components/tabs) line color from `mint-green-50` to `black-8`.

## December, 15. 2020

Added Eufemia Icon library, with many new icons.

These icons got replaced:

- `search` to `loupe`
- `settings` to `cog`
- `print` to `printer`
- `pencil` to `edit`
- `view_off` to `hide`
- `file` to `document`
- `file_add` to `document_add`
- `contract` to `document_contract`
- `link_out` to `launch`
- `logout` to `log_out`
- `login` to `log_in`
- `without_bankid` to `pin_code`
- `bankid_on_mobile` to `bankid_mobile`
- `bankid_with_qr` to `bankid_qr`
- `check_alt_01` removed

  <!-- - `refresh` to `repeat` -->
  <!-- - `settings` to `cog` -->

## November, 8. 2020

- New [grey colors](/uilib/usage/customisation/colors):
  - `black-55` (#737373)
  - `black-20` (#cccccc) which replaces `black-30` (~~#b3b3b3~~)
  - `black-8` (#ebebeb)
  - `black-3` (#f8f8f8)
- New docs about [maintainability](/uilib/getting-started/maintainability).
- New component [Skeleton](/uilib/components/skeleton)
- Updated Modal & Drawer UI [Modal & Drawer](/uilib/components/modal)
- **Ol Lists** do now support the `type` HTML attribute in order to use like _letters_ and _roman numerals_
- **DNB Medium** font got an enhancement regarding readability on Windows.

## July, 3. 2020

New [Icons](/icons/secondary):

- secondary `chatbot`
- secondary `location`
- secondary `contract`
- secondary `support`

## June, 18. 2020

New [Icons](/icons/secondary):

- secondary `bankid`
- secondary `bankid_on_mobile`
- secondary `bankid_with_qr`
- secondary `without_bankid`
- secondary `person`

## June, 4. 2020

- The [color](/quickguide-designer/colors) `Sea green alt` is removed and got replaced by `Sea green`
- The `DNB` font got updates on the bold weight, mostly effected Windows users
- New component [Autocomplete](/uilib/components/autocomplete)
- New component [Pagination](/uilib/components/pagination) including infinity scroller
- New component [Heading](/uilib/components/heading)
- New [secondary icons](/icons/secondary): `pay_from`, `transfer_to`
- Modal got a [Drawer mode](/uilib/components/modal/demos#drawer-mode) and has now a dark background color
- **Breaking Changes** to the UMD [bundles](/uilib/usage/first-steps/bundles) structure (v7), including ESM (mjs)
- **Breaking Changes** to headings:

  - `.dnb-h1` is now `.dnb-h--xx-large`
  - `.dnb-h1--small` is now `.dnb-h--x-large`
  - `.dnb-h2` is now `.dnb-h--large`
  - `.dnb-h3` is now `.dnb-h--medium` / `.dnb-lead`
  - For `.dnb-h4`, `.dnb-h5` and `.dnb-h6` se [v7 release notes](/uilib/about-the-lib/releases/v7-info#heading-changes)

Check out the [detailed migration guide](/uilib/about-the-lib/releases/v7-info#migration)

Figma typography styles got updated as well:

- ~~h1~~ `Heading xx-large`
- ~~h1 small~~ `Heading x-large`
- ~~h2~~ `Heading large`
- ~~Lead~~ `Text lead`
- ~~Body~~ `Text basis` and `Text basis (Medium)`
- ~~Small~~ `Text small` and `Text small / (Medium)`
- ~~X-Small~~ `Text x-small` and `Text x-small (Medium)`

## January, 30. 2020

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
- **X-Small text** `DNB Sans Regular` 14px / 16px line height
- **X-Small text medium** `DNB Sans Medium` 14px / 16px line height

**Number features** are removed as we do not need them anymore.

### Colors

[Colors](/uilib/usage/customisation/colors) changes:

- `accent-yellow`, which replaces `signal-yellow`
- `accent-yellow-30`, which replaces `signal-yellow-30`
- `signal-orange` is moved from Profile to UX color

New [Colors](/uilib/usage/customisation/colors):

- Profile color `lavender`
- Profile color `sand-yellow`
- Profile color `pistachio`
- UX color `success-green`

### Icons

- secondary `login` and `logout`

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

Get more details about the `@dnb/eufemia` [v6 release](/uilib/about-the-lib/releases/v6-info)

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

Get more details about the `@dnb/eufemia` [v5.8 release](/uilib/about-the-lib/releases/v5.8-info)

## November, 16. 2019

- New [secondary icons](/icons/secondary): `arrow_up`, `arrow_down`, `arrow_right`, `arrow_left`, `view`, `view_off`, `settings`, `refresh`, `add_file`

## November, 6. 2019

- [GlobalStatus](/uilib/components/global-status): modified background color
- [Icon](/uilib/components/icon): new feature; rounded border
- Made the `core` and `basis` CSS packages robuster on running in ePlatform environment

## October, 30. 2019

- New component in the `@dnb/eufemia`: [Number](/uilib/components/number)
- New [colors](/uilib/usage/customisation/colors):
  1. `fire-red`, which replaces `cherry-red` (_default error color_)
  1. `fire-red-8`, which replaces `cherry-red-8`
- Icons changes:
  1. primary `save` is now => secondary `download`
  1. secondary `save_alt_01` is now => primary `save`
  1. primary `error` got removed

Get more details about the `@dnb/eufemia` [v5 release](/uilib/about-the-lib/releases/v5-info)

## October, 14. 2019

- New [secondary icons](/icons/secondary): `undo` and `redo`

## October, 2. 2019

- New [secondary icons](/icons/secondary): `send` and `upload`

## September, 23. 2019

- New component to show `404` and `500` status: [GlobalError](/uilib/components/global-error)

## August, 24. 2019

- Read more about the `@dnb/eufemia` [v4.10 release](/uilib/releases/v4.10-info)
- New component in the `@dnb/eufemia`: [GlobalStatus](/uilib/components/global-status)
- Updated [FormStatus](/uilib/components/form-status) with new text color and new icon
- Added link to example usage of a [Table](/uilib/elements/tables#working-demo) styles using `react-table`
- Added info about [Custom project Icons](/uilib/components/icon#custom-project-icons)

## July, 21. 2019

- Major Release of `@dnb/eufemia`: Read more about the [v4 release](/uilib/releases/v4-info)
- New component in the `@dnb/eufemia`: [Space](/uilib/components/space) for easy spacing capabilities
- New component in the `@dnb/eufemia`: [Slider](/uilib/components/slider) with add/subtract buttons

## June, 26. 2019

- The `@dnb/eufemia` got new helpers for [Spacing](/uilib/usage/layout/spacing#spacing-helpers) and [Layout](/uilib/usage/layout)
- Added first [Demo App](/uilib/getting-started/demos)

## June, 19. 2019

- New components in the `@dnb/eufemia`: [ToggleButton](/uilib/components/toggle-button) as well as two layout components [FormSet](/uilib/components/form-set) and [FormRow](/uilib/components/form-row)

## June, 5. 2019

- New corner radius (border-radius) on `Dropdown` and `DatePicker`: 4px (0.25rem)

## June, 3. 2019

- New component in the `@dnb/eufemia`: [Textarea](/uilib/components/textarea). Got also a wider corner radius by `16px (1rem)`

## May, 27. 2019

- New components in the `@dnb/eufemia`: [Checkbox](/uilib/components/checkbox) and [Radio](/uilib/components/radio) button

## May, 19. 2019

- New component in the `@dnb/eufemia`: Circular [ProgressIndicator](/uilib/components/progress-indicator) bar (spinner with animation)

## May, 8. 2019

- New component in the `@dnb/eufemia`: [DatePicker](/uilib/components/date-picker) with range/period support

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
