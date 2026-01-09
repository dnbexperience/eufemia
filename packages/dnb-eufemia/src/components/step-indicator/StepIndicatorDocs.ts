import type { PropertiesTableProps } from '../../shared/types'

export const StepIndicatorProperties: PropertiesTableProps = {
  mode: {
    doc: 'Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.',
    type: [`'static'`, `'strict'`, `'loose'`],
    status: 'required',
  },
  data: {
    doc: 'Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See below for properties of `STEP_DATA`.',
    type: ['[Step Item](#step-item-properties)[]', 'string[]'],
    status: 'required',
  },
  currentStep: {
    doc: 'Defines the initial step starting from 0. Also defines the furthest step visited when `mode="strict"`. Will update to the new step if changed (but will not trigger the `onChange` event). Defaults to `0`.',
    type: 'number',
    status: 'optional',
  },
  overviewTitle: {
    doc: 'The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`. Defaults to `Steps Overview`.',
    type: 'string',
    status: 'optional',
  },
  stepTitle: {
    doc: 'Label for `<StepIndicatorTriggerButton />` and screen reader text for `<StepIndicatorItem />`. Must contain `%step` and `%count` to interpolate `currentStep` and `stepCount` into the text. Defaults to `Step %step of %count`.',
    type: 'string',
    status: 'optional',
  },
  hideNumbers: {
    doc: 'Define whether to show automatically counted numbers or not. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  noAnimation: {
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
  statusState: {
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
  onClick: {
    doc: 'Will be called when the user clicks on any clickable step in the list. Is called right before `onChange`. Receives parameter `{ event, item, currentStep, currentStep }`.',
    type: 'function',
    status: 'optional',
  },
  onChange: {
    doc: 'Will be called when the user changes step by clicking in the steps list (changing the `currentStep` prop does not trigger the event). Receives parameter `{ event, item, currentStep, currentStep }`.',
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
  isCurrent: {
    doc: 'If set to `true`, this item step will be set as the current selected step. This can be used instead of `currentStep` on the main component.',
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
  statusState: {
    doc: 'In case the status state should be `info` or `error`. Defaults to `warn`.',
    type: [`'warn'`, `'info'`, `'error'`],
    status: 'optional',
  },
}

export const StepIndicatorStepEvents: PropertiesTableProps = {
  onClick: {
    doc: "Called when user clicks the step. Is called right before the main component's `onClick`. Receives parameter `{ event, item, currentStep, currentStep }`",
    type: 'function',
    status: 'optional',
  },
}
