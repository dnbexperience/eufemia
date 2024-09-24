import { PropertiesTableProps } from '../../../../shared/types'

export const SubmitConfirmationProperties: PropertiesTableProps = {
  onStateChange: {
    doc: 'This function is called whenever the submit confirmation state changes. It takes an object as the first parameter, which contains the current state as `submitState` and the `setSubmitState` function for updating the state.',
    type: 'function',
    status: 'optional',
  },
  renderWithState: {
    doc: 'This function is called whenever the submit confirmation state changes. It receives an object as the first parameter, which contains the current state as `submitState` and the connectWithDialog function to link the confirmation dialog to the submit button. Alternatively, you can use the `submitHandler` and `cancelHandler` functions for handling the submission and cancellation processes. The function is expected to return a React Element to render.',
    type: 'function',
    status: 'optional',
  },
}
