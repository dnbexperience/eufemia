import { PropertiesTableProps } from '../../shared/types'

export const ProgressIndicatorProperties: PropertiesTableProps = {
  progress: {
    doc: 'A number between 0-100, if not supplied a continous loading-type animation will be used.',
    type: ['string', 'number'],
    defaultValue: 'undefined',
    status: 'optional',
  },
  visible: {
    doc: 'Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation.',
    type: 'boolean',
    defaultValue: 'true',
    status: 'optional',
  },
  type: {
    doc: 'Defines the type.',
    type: [`'circular'`, `'linear'`],
    defaultValue: `'circular'`,
    status: 'optional',
  },
  noAnimation: {
    doc: 'Disables the fade-in and fade-out animation.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  size: {
    doc: 'Defines the size.',
    type: [`'default'`, `'small'`, `'medium'`, `'large'`, `'huge'`],
    defaultValue: `'default'`,
    status: 'optional',
  },
  label: {
    doc: 'Show a custom label to the right or under the indicator.',
    type: 'React.ReactNode',
    defaultValue: 'undefined',
    status: 'optional',
  },
  labelDirection: {
    doc: 'Sets the position of the label.',
    type: [`'horizontal'`, '`vertical`'],
    defaultValue: `'horizontal'`,
    status: 'optional',
  },
  showDefaultLabel: {
    doc: 'If set to `true` a default label (from text locales) will be shown.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  indicator_label: {
    doc: 'Use this to override the default label from text locales.',
    type: 'string',
    defaultValue: 'undefined',
    status: 'optional',
  },
  title: {
    doc: 'Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.',
    type: 'string',
    defaultValue: 'undefined',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ProgressIndicatorDeprecatedProperties: PropertiesTableProps =
  {
    no_animation: {
      doc: 'use `noAnimation`.',
      type: ' boolean',
      status: 'deprecated',
    },
    label_direction: {
      doc: 'use `labelDirection`.',
      type: 'string',
      status: 'deprecated',
    },
    show_label: {
      doc: 'use `showDefaultLabel`.',
      type: 'boolean',
      status: 'deprecated',
    },
    children: {
      doc: 'use the `label` prop instead.',
      type: 'React.ReactNode',
      status: 'deprecated',
    },
  }

export const ProgressIndicatorEvents: PropertiesTableProps = {
  onComplete: {
    doc: "Will be called once it's no longer `visible`.",
    type: 'function',
    defaultValue: 'undefined',
    status: 'optional',
  },
}
export const ProgressIndicatorDeprecatedEvents: PropertiesTableProps = {
  on_complete: {
    doc: 'use `onComplete`.',
    type: 'function',
    status: 'deprecated',
  },
}
