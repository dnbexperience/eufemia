import type { PropertiesTableProps } from '../../../../shared/types'

export const WizardContainerProperties: PropertiesTableProps = {
  initialActiveIndex: {
    doc: 'What step should show initially (defaults to 0 for the first one).',
    type: 'number',
    status: 'optional',
  },
  mode: {
    doc: 'How to show the wizard. Inherited from StepIndicator. Defaults to `strict`.',
    type: 'string',
    status: 'optional',
  },
  omitScrollManagement: {
    doc: 'True to omit scroll management.',
    type: 'boolean',
    status: 'optional',
  },
  omitFocusManagement: {
    doc: 'True to omit focus management.',
    type: 'boolean',
    status: 'optional',
  },
  noAnimation: {
    doc: 'If set to `true`, the height animation on step change and list expansion will be omitted. Inherited from StepIndicator. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  keepInDOM: {
    doc: 'Determines if all steps should be kept in the DOM. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  validationMode: {
    doc: 'Determines if and how the validation will be bypassed.',
    type: ['bypassOnNavigation'],
    status: 'optional',
  },
  expandedInitially: {
    doc: 'Set to `true` to have the list be expanded initially. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  outset: {
    doc: 'Whether or not to break out (using negative margins) on larger screens. Same as `outset` in [Card](/uilib/components/card/properties). But defaults to `true`',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'Contents (Step components).',
    type: 'React.Node',
    status: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
  variant: {
    doc: 'There is no variant in the current version. This prop does nothing. Old docs: Sets the StepIndicator to be either `sidebar` or `drawer`. Defaults to `sidebar`.',
    type: 'string',
    status: 'deprecated',
  },
  sidebarId: {
    doc: 'There is no longer any sidebar. This prop does nothing. Old docs: Sets the id for `<StepIndicator.Sidebar />` Inherited from StepIndicator.',
    type: 'string',
    status: 'deprecated',
  },
}

export const WizardContainerEvents: PropertiesTableProps = {
  onStepChange: {
    doc: 'Will be called when the user navigate to a different step, with step `index` as the first argument and `previous` or `next` (or `stepListModified` when a step gets replaced) as the second argument, and as the third parameter an options object containing a `preventNavigation` function, an `id` if given on the `Wizard.Step` and a `previousStep` object containing the previous `index` (and `id` if given on the `Wizard.Step`). When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related Form.Handler props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`.',
    type: 'function',
    status: 'optional',
  },
}
