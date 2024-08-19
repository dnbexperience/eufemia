import { getFieldEventsWithTypes } from '../FieldDocs'

export const selectCountryGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object', optional: true }
)
