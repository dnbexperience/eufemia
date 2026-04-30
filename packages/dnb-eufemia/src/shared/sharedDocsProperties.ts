import type { PropertiesTableProps } from './types'

// Shared property definitions used across multiple component *Docs.ts files.
// Follow the pattern established in components/stat/StatDocsUtils.ts.

export const skeletonDocProperty: PropertiesTableProps[string] = {
  doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
  type: 'boolean',
  status: 'optional',
}

export const spacingDocProperty: PropertiesTableProps[string] = {
  doc: 'Spacing properties like `top` or `bottom` are supported.',
  type: ['string', 'object'],
  status: 'optional',
}

export const statusDocProperty: PropertiesTableProps[string] = {
  doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
  type: ['"error"', '"information"', 'boolean'],
  status: 'optional',
}

export const statusStateDocProperty: PropertiesTableProps[string] = {
  doc: 'Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.',
  type: ['"error"', '"information"'],
  status: 'optional',
}

export const statusPropsDocProperty: PropertiesTableProps[string] = {
  doc: 'Use an object to define additional FormStatus properties.',
  type: 'object',
  status: 'optional',
}

export const globalStatusDocProperty: PropertiesTableProps[string] = {
  doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
  type: 'object',
  status: 'optional',
}

export const labelDocProperty: PropertiesTableProps[string] = {
  doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
  type: 'React.ReactNode',
  status: 'optional',
}

export const labelDirectionDocProperty: PropertiesTableProps[string] = {
  doc: 'Use `labelDirection="horizontal"` to change the label layout direction. Defaults to `vertical`.',
  type: ['"horizontal"', '"vertical"'],
  status: 'optional',
}

export const labelSrOnlyDocProperty: PropertiesTableProps[string] = {
  doc: 'Use `true` to make the label only readable by screen readers.',
  type: 'boolean',
  status: 'optional',
}

export const formStatusDocProperties: PropertiesTableProps = {
  status: statusDocProperty,
  statusState: statusStateDocProperty,
  statusProps: statusPropsDocProperty,
  globalStatus: globalStatusDocProperty,
}

export const formLabelDocProperties: PropertiesTableProps = {
  label: labelDocProperty,
  labelDirection: labelDirectionDocProperty,
  labelSrOnly: labelSrOnlyDocProperty,
}
