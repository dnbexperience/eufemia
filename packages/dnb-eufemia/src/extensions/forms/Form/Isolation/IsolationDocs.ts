import type { PropertiesTableProps } from '../../../../shared/types'
import {
  ProviderEvents,
  ProviderProperties,
} from '../../DataContext/Provider/ProviderDocs'

export const IsolationProperties: PropertiesTableProps = {
  path: {
    doc: 'JSON Pointer to define the object key for all the generated nested field data. When provided, Form.Isolation will inherit schema validation from the parent Form.Handler for fields within this path.',
    type: 'string',
    status: 'optional',
  },
  transformOnCommit: {
    doc: 'Transform the data before it gets committed to the form. The first parameter is the isolated data object. The second parameter is the outer context data object (Form.Handler).',
    type: 'function',
    status: 'optional',
  },
  commitHandleRef: {
    doc: 'Provide a ref to a function that can be called from any location to commit the data to the form.',
    type: 'React.RefObject',
    status: 'optional',
  },
  bubbleValidation: {
    doc: 'Prevent the form from being submitted when there are fields with errors inside the Form.Isolation.',
    type: 'boolean',
    status: 'optional',
  },
  preventUncommittedChanges: {
    doc: 'Prevents uncommitted changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.',
    type: 'boolean',
    status: 'optional',
  },
  resetDataAfterCommit: {
    doc: 'If set to `true`, the Form.Isolation will reset its data context after committing the data to the outer context.',
    type: 'boolean',
    status: 'optional',
  },
  dataReference: {
    doc: 'Provide a reference by using `Form.Isolation.createDataReference`.',
    type: 'IsolationDataReference',
    status: 'optional',
  },
  ...ProviderProperties,
  minimumAsyncBehaviorTime: undefined,
  asyncSubmitTimeout: undefined,
  scrollTopOnSubmit: undefined,
  sessionStorageId: undefined,
  globalStatusId: undefined,
}

export const IsolationEvents: PropertiesTableProps = {
  onCommit: {
    doc: 'Will be called on a nested form context commit – if validation has passed. The first parameter is the committed data object. The second parameter is an object containing a method to clear the internal data `{ clearData }`.',
    type: 'function',
    status: 'optional',
  },
  ...ProviderEvents,
  onSubmit: undefined,
  onSubmitRequest: undefined,
  onSubmitComplete: undefined,
}
