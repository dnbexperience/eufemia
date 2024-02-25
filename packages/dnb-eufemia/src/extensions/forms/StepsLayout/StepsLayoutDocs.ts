import { PropertiesTableProps } from '../../../shared/types'

export const StepsLayoutProperties: PropertiesTableProps = {
  initialActiveIndex: {
    doc: 'What step should show initially (defaults to 0 for the first one).',
    type: 'number',
    status: 'optional',
  },
  mode: {
    doc: 'How to show the steps. Inherited from StepIndicator. Defaults to `strict`.',
    type: 'string',
    status: 'optional',
  },
  variant: {
    doc: 'Sets the StepIndicator to be either `sidebar` or `drawer`. Defaults to `sidebar`.',
    type: 'string',
    status: 'optional',
  },
  noAnimation: {
    doc: 'Determines if the height animation for step items and the drawer button will run. Inherited from StepIndicator. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  sidebarId: {
    doc: 'Sets the id for `<StepIndicator.Sidebar />` Inherited from StepIndicator.',
    type: 'string',
    status: 'required',
  },
  scrollTopOnStepChange: {
    doc: 'True for the UI to scroll to the top of the page when navigating between steps.',
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
}

export const StepsLayoutEvents: PropertiesTableProps = {
  onStepChange: {
    doc: 'Will be called when the user navigate to a different step, with step `index` as the first argument and `previous` or `next` (string) as the second argument. Asynchronous functions are supported and will enable `enableAsyncBehavior` automatically.',
    type: 'function',
    status: 'optional',
  },
}
