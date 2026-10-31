import { clsx } from 'clsx'
import type { ValueStringProps as StringValueProps } from '../String'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueNameProps = StringValueProps

function Name(props: ValueNameProps) {
  const translations = useTranslation().Name

  // Apply the default after useValueProps, so an inherited label wins
  const { value, className, label, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-string', className)}
      label={label ?? translations.label}
      {...rest}
    >
      {value}
    </ValueBlock>
  )
}
withComponentMarkers(Name, { _supportsSpacingProps: true })

Name.First = function FirstName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.FirstName.label,
  }

  return <Name {...nameProps} />
}
Name.First['_supportsSpacingProps'] = true

Name.Last = function LastName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.LastName.label,
  }

  return <Name {...nameProps} />
}
Name.Last['_supportsSpacingProps'] = true

Name.Company = function CompanyName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.CompanyName.label,
  }

  return <Name {...nameProps} />
}
Name.Company['_supportsSpacingProps'] = true

export default Name
