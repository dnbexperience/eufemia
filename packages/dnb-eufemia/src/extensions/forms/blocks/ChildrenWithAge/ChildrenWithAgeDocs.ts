import { PropertiesTableProps } from '../../../../shared/types'

export const ChildrenWithAgeProperties: PropertiesTableProps = {
  mode: {
    doc: '`summary` for a `Value.*` version, `edit` for an editable field version. Defaults to `edit`.',
    type: 'number',
    status: 'optional',
  },
  enableAdditionalQuestions: {
    doc: '[`joint-responsibility`, `daycare`]',
    type: 'array',
    status: 'optional',
  },
  toWizardStep: {
    doc: 'If defined, a `Wizard.EditButton` will be shown.',
    type: 'number',
    status: 'optional',
  },
  hideStepControls: {
    doc: 'Hides the step controls for the number input fields',
    type: 'boolean',
    status: 'optional',
  },
}
