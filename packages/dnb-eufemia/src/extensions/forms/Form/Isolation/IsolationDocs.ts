import { PropertiesTableProps } from '../../../../shared/types'
import {
  ProviderEvents,
  ProviderProperties,
} from '../../DataContext/Provider/ProviderDocs'

export const IsolationProperties: PropertiesTableProps = {
  dispatchHandleRef: {
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
  onDispatch: {
    doc: 'Will be called on a nested form context dispatch (commit) – if validation has passed.',
    type: 'function',
    status: 'optional',
  },
  ...ProviderEvents,
  onSubmit: undefined,
  onSubmitRequest: undefined,
  onSubmitComplete: undefined,
}
