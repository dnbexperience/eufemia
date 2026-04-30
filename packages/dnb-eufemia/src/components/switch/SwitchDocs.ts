import type { PropertiesTableProps } from '../../shared/types'
import {
  labelSrOnlyDocProperty,
  statusDocProperty,
  skeletonDocProperty,
  spacingDocProperty,
} from '../../shared/sharedDocsProperties'

export const SwitchProperties: PropertiesTableProps = {
  checked: {
    doc: 'Determine whether the switch is checked or not. The default will be `false`.',
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
    doc: 'The size of the switch. For now there is `medium` (default) and `large`.',
    type: ['"default"', '"medium"', '"large"'],
    status: 'optional',
  },
  status: statusDocProperty,
  statusState: {
    doc: 'Defines the state of the status. Defaults to `error`.',
    type: [
      '"error"',
      '"warning"',
      '"information"',
      '"success"',
      '"marketing"',
    ],
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional [FormStatus](/uilib/components/form-status/properties/) properties.',
    type: 'FormStatus',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'GlobalStatus',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  skeleton: skeletonDocProperty,
  ref: {
    doc: 'By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingDocProperty,
}

export const SwitchEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user.',
    type: '({ checked: boolean; event }) => void',
    status: 'optional',
  },
  onChangeEnd: {
    doc: 'Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean { checked, event }.',
    type: '({ checked: boolean; event }) => void',
    status: 'optional',
  },
  onClick: {
    doc: 'Will be called on click.',
    type: '({ checked: boolean; event: MouseEvent, preventDefault: () => void }) => void',
    status: 'optional',
  },
}
