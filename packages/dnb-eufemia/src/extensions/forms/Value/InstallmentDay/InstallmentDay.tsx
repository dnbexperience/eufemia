import { clsx } from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { InstallmentDayValue } from '../../Field/InstallmentDay'

export type ValueInstallmentDayProps = ValueProps<InstallmentDayValue>

function InstallmentDay(props: ValueInstallmentDayProps) {
  const { label: defaultLabel, lastDayLabel } =
    useTranslation().InstallmentDay

  const { value, className, label, ...rest } = useValueProps(props)

  const displayValue =
    value === 'last'
      ? lastDayLabel
      : value != null
        ? String(value)
        : undefined

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-installment-day', className)}
      label={label ?? defaultLabel}
      {...rest}
    >
      {displayValue}
    </ValueBlock>
  )
}

withComponentMarkers(InstallmentDay, {
  _supportsSpacingProps: true,
})

export default InstallmentDay
