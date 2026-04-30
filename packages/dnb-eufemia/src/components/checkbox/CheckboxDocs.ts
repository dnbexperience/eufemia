import type { PropertiesTableProps } from '../../shared/types'
import {
  labelSrOnlyDocProperty,
  statusDocProperty,
  statusStateDocProperty,
  globalStatusDocProperty,
  skeletonDocProperty,
  spacingDocProperty,
} from '../../shared/sharedDocsProperties'

export const CheckboxProperties: PropertiesTableProps = {
  checked: {
    doc: 'Determine whether the checkbox is checked or not. The default is `false`.',
    type: 'boolean',
    status: 'optional',
  },
  title: {
    doc: 'The `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelPosition: {
    doc: 'Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: ['"left"', '"right"'],
    status: 'optional',
  },
  labelSrOnly: labelSrOnlyDocProperty,
  size: {
    doc: 'The size of the checkbox. For now there is `medium` (default) and `large`.',
    type: ['"default"', '"medium"', '"large"'],
    status: 'optional',
  },
  indeterminate: {
    doc: 'Controls the checkbox indeterminate (partial) state.',
    type: 'boolean',
    status: 'optional',
  },
  status: statusDocProperty,
  statusState: statusStateDocProperty,
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties. See [FormStatus](/uilib/components/form-status/properties/).',
    type: 'FormStatusProps',
    status: 'optional',
  },
  globalStatus: globalStatusDocProperty,
  skeleton: skeletonDocProperty,
  suffix: {
    doc: 'Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  ref: {
    doc: 'By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingDocProperty,
}

export const CheckboxEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user.',
    type: '({ checked: boolean; event: ChangeEvent }) => void',
    status: 'optional',
  },
  onClick: {
    doc: 'Will be called on click.',
    type: '({ checked: boolean; event: MouseEvent, preventDefault: () => void }) => void',
    status: 'optional',
  },
}
