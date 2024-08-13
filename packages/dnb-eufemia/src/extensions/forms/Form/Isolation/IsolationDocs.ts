import { PropertiesTableProps } from '../../../../shared/types'
import {
  ProviderEvents,
  ProviderProperties,
} from '../../DataContext/Provider/ProviderDocs'

export const IsolationProperties: PropertiesTableProps = {
  path: {
    doc: 'JSON Pointer to define the object key for all the generated nested field data.',
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
    type: 'React.Ref',
    status: 'optional',
  },
  ...ProviderProperties,
  minimumAsyncBehaviorTime: undefined,
  asyncSubmitTimeout: undefined,
  scrollTopOnSubmit: undefined,
  sessionStorageId: undefined,
  filterSubmitData: undefined,
  globalStatusId: undefined,
}

export const IsolationEvents: PropertiesTableProps = {
  onCommit: {
    doc: 'Will be called on a nested form context commit – if validation has passed.',
    type: 'function',
    status: 'optional',
  },
  ...ProviderEvents,
  onSubmit: undefined,
  onSubmitRequest: undefined,
  onSubmitComplete: undefined,
}
