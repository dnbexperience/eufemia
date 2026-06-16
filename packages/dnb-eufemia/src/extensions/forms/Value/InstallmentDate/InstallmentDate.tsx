import { clsx } from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { InstallmentDateValue } from '../../Field/InstallmentDate'

export type ValueInstallmentDateProps = ValueProps<InstallmentDateValue>

function InstallmentDate(props: ValueInstallmentDateProps) {
  const { label: defaultLabel, lastDayLabel } =
    useTranslation().InstallmentDate

  const { value, className, label, ...rest } = useValueProps(props)

  const displayValue =
    value === 'last'
      ? lastDayLabel
      : value != null
        ? String(value)
        : undefined

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-installment-date', className)}
      label={label ?? defaultLabel}
      {...rest}
    >
      {displayValue}
    </ValueBlock>
  )
}

withComponentMarkers(InstallmentDate, {
  _supportsSpacingProps: true,
})

export default InstallmentDate
