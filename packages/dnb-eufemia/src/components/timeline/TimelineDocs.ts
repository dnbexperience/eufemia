import type { PropertiesTableProps } from '../../shared/types'

export const TimelineProperties: PropertiesTableProps = {
  data: {
    doc: 'List of [timeline items](/uilib/components/timeline/properties#timelineitem-properties) to render. Each object in data can include all properties from [Timeline.Item properties](/uilib/components/timeline/properties#timelineitem-properties).',
    type: 'Array<TimelineItemProps>',
    status: 'optional',
  },
  children: {
    doc: 'Content of the component. Can be used instead of property `data`, by adding [Timeline Item](/uilib/components/timeline/properties#timelineitem-properties) as children `<Timeline.Item {...props} />`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const TimelineItemProperties: PropertiesTableProps = {
  title: {
    doc: 'Title of the Timeline item.',
    type: 'React.ReactNode',
    status: 'required',
  },
  state: {
    doc: 'The component state. Options: `completed` | `current` | `upcoming`.',
    type: ['completed', 'current', 'upcoming'],
    status: 'required',
  },
  subtitle: {
    doc: 'Subtitle of the Timeline item, displayed below the `title`. Also supports passing an array of subtitles. The subtitle is usually a date of the timeline item.',
    type: ['React.ReactNode', 'React.ReactNode[]'],
    status: 'optional',
  },
  infoMessage: {
    doc: 'Info message, displayed in a [FormStatus of state info](/uilib/components/form-status#displaying-info-status), below the `subtitle` if it exists.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Override icon displaying on the left side (Not recommended). Default: `check` for state `completed`, `pin` for state `current`, and `calendar` for state `upcoming`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  iconAlt: {
    doc: 'Alt label describing the icon provided.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
}
