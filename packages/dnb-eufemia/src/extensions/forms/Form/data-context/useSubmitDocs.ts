import { PropertiesTableProps } from '../../../../shared/types'

export const UseSubmitReturnProperties: PropertiesTableProps = {
  submit: {
    doc: "Triggers form submit. Runs validation and calls the form's onSubmit when valid. Use when the submit button is rendered outside Form.Element (e.g. in a modal footer). Returns a Promise that resolves with the submit result or undefined.",
    type: '() => Promise<EventStateObject | undefined>',
    status: 'required',
  },
}

export const UseSubmitParameters: PropertiesTableProps = {
  id: {
    doc: 'Optional id (string, function, object or React Context) to link to a Form.Handler outside the component tree. When provided, the hook can be used without being inside Form.Handler.',
    type: 'SharedStateId',
    status: 'optional',
  },
}
