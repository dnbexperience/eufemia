import FieldProvider from '../Field/Provider/FieldProvider'

export { default as Handler } from './Handler'
export { default as Element } from './Element'
export { default as Appearance } from './Appearance'
export { default as SubmitButton } from './SubmitButton'
export { default as SubmitIndicator } from './SubmitIndicator'
export { default as SubmitConfirmation } from './SubmitConfirmation'
export { default as ButtonRow } from './ButtonRow'
export { default as MainHeading } from './MainHeading'
export { default as SubHeading } from './SubHeading'
export { default as Visibility } from './Visibility'
export { default as Section } from './Section'
export { default as Status } from './Status'
export { default as Card } from './Card'
export { default as Isolation } from './Isolation'
export { default as Snapshot } from './Snapshot'
export { default as useData } from './data-context/useData'
export { default as setData } from './data-context/setData'
export { default as getData } from './data-context/getData'
export { default as clearData } from './data-context/clearData'
export { default as useValidation } from './data-context/useValidation'
export { default as useTranslation } from '../hooks/useTranslation'
export { default as useSnapshot } from '../hooks/useSnapshot'

/**
 * Can be removed in v11
 * @deprecated Use `useTranslation` instead
 */
export { default as useLocale } from '../hooks/useTranslation'

/**
 * Can be removed in v11
 * @deprecated Use `useValidation` instead
 */
export { default as useError } from './data-context/useValidation'

/**
 * Can be removed in v11
 * @deprecated Use `Field.Provider` instead
 */
export const FieldProps = FieldProvider
