import { PropertiesTableProps } from '../../shared/types'

export const StepIndicatorProperties: PropertiesTableProps = {
  mode: {
    doc: 'Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.',
    type: [`'static'`, `'strict'`, `'loose'`],
    status: 'required',
  },
  data: {
    doc: 'Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See below for properties of `STEP_DATA`.',
    type: ['[Step Item](#step-item-properties)[]', 'string[]'],
    status: 'required',
  },
  current_step: {
    doc: 'Defines the initial step starting from 0. Also defines the furthest step visited when `mode="strict"`. Will update to the new step if changed (but will not trigger the `on_change` event). Defaults to `0`.',
    type: 'number',
    status: 'optional',
  },
  overview_title: {
    doc: 'The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`. Defaults to `Steps Overview`.',
    type: 'string',
    status: 'optional',
  },
  step_title: {
    doc: 'Label for `<StepIndicatorTriggerButton />` and screen reader text for `<StepIndicatorItem />`. Must contain `%step` and `%count` to interpolate `current_step` and `stepCount` into the text. Defaults to `Step %step of %count`.',
    type: 'string',
    status: 'optional',
  },
  hide_numbers: {
    doc: 'Define whether to show automatically counted numbers or not. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  no_animation: {
    doc: 'If set to `true`, the height animation on step change and list expansion will be omitted. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  expandedInitially: {
    doc: 'Set to `true` to have the list be expanded initially. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  outset: {
    doc: 'Whether or not to break out (using negative margins) on larger screens. Defaults to `false`. Same as `outset` in [Card](/uilib/components/card/properties).',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text for status shown below the step indicator when it is not expanded. Defaults to `undefined`.',
    type: 'string',
    status: 'optional',
  },
  status_state: {
    doc: 'The type of status shown when the `status` prop is set. Defaults to `warn`.',
    type: `['warn', 'info', 'error']`,
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const StepIndicatorEvents: PropertiesTableProps = {
  on_click: {
    doc: 'Will be called when the user clicks on any clickable step in the list. Is called right before `on_change`. Receives parameter `{ event, item, current_step, currentStep }`.',
    type: 'function',
    status: 'optional',
  },
  on_change: {
    doc: 'Will be called when the user changes step by clicking in the steps list (changing the `current_step` prop does not trigger the event). Receives parameter `{ event, item, current_step, currentStep }`.',
    type: 'function',
    status: 'optional',
  },
}

export const StepIndicatorStepProperties: PropertiesTableProps = {
  title: {
    doc: 'The title of the step.',
    type: ['string', 'React.ReactNode'],
    status: 'required',
  },
  is_current: {
    doc: 'If set to `true`, this item step will be set as the current selected step. This can be used instead of `current_step` on the main component.',
    type: 'boolean',
    status: 'optional',
  },
  inactive: {
    doc: 'If set to `true`, this item step will be handled as an inactive step and will not be clickable. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, this step will be handled the same as `inactive` as well as getting a disabled mouseover and `aria-disabled="true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Is used to set the status text.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  status_state: {
    doc: 'In case the status state should be `info` or `error`. Defaults to `warn`.',
    type: [`'warn'`, `'info'`, `'error'`],
    status: 'optional',
  },
}

export const StepIndicatorStepEvents: PropertiesTableProps = {
  on_click: {
    doc: "Called when user clicks the step. Is called right before the main component's `on_click`. Receives parameter `{ event, item, current_step, currentStep }`",
    type: 'function',
    status: 'optional',
  },
}
