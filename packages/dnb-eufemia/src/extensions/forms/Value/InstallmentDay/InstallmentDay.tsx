import { useContext } from 'react'
import { clsx } from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import SharedContext from '../../../../shared/Context'
import { LOCALE } from '../../../../shared/defaults'
import type { InstallmentDayValue } from '../../Field/InstallmentDay'
import { getInstallmentDayDisplayValue } from '../../Field/InstallmentDay/InstallmentDayDisplay'

export type ValueInstallmentDayProps = ValueProps<InstallmentDayValue>

function InstallmentDay(props: ValueInstallmentDayProps) {
  const {
    label: defaultLabel,
    lastDayLabel,
    dayDisplay,
  } = useTranslation().InstallmentDay

  const { locale: contextLocale } = useContext(SharedContext)
  const locale = contextLocale || LOCALE

  const { value, className, label, ...rest } = useValueProps(props)

  const displayValue = getInstallmentDayDisplayValue(value, {
    dayDisplay,
    lastDayLabel,
    locale,
  })

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
