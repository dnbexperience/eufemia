import { PropertiesTableProps } from '../../../../shared/types'

export const SubmitConfirmationProperties: PropertiesTableProps = {
  preventSubmitWhen: {
    doc: 'Use this function to prevent the original `onSubmit` from being called. It receives an object as the first parameter. Read more about the parameters in the info section. It should return a boolean value that determines whether the confirmation routine (submit prevention) should be active or not. It defaults to be active by default.',
    type: 'function',
    status: 'optional',
  },
  renderWithState: {
    doc: 'This function is called whenever the submit confirmation state changes. It receives an object as the first parameter. Read more about the parameters in the info section. The function is expected to return a React Element to render.',
    type: 'function',
    status: 'optional',
  },
}

export const SubmitConfirmationEvents: PropertiesTableProps = {
  onSubmitResult: {
    doc: 'This function is called whenever the `onSubmit` event returns a result. It receives an object as the first parameter, including the `submitState`. Read more about the parameters in the info section.',
    type: 'function',
    status: 'optional',
  },
  onStateChange: {
    doc: 'This function is called whenever the submit confirmation state changes. It takes an object as the first parameter. Read more about the parameters in the info section.',
    type: 'function',
    status: 'optional',
  },
}
