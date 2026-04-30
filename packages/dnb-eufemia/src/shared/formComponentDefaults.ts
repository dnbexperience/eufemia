/**
 * Common default property values shared across form input components.
 *
 * These defaults are used with extendPropsWithContext to provide
 * consistent initial values for status, label, and skeleton properties.
 */
export const formComponentDefaults = {
  id: null,
  label: null,
  labelDirection: 'vertical' as const,
  labelSrOnly: null,
  status: null,
  statusState: 'error' as const,
  statusProps: null,
  statusNoAnimation: null,
  globalStatus: null,
  suffix: null,
  disabled: null,
  skeleton: null,
  stretch: null,
}
