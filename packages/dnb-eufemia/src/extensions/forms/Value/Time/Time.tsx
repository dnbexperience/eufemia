import { useCallback, useContext } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { AnyLocale } from '../../../../shared/Context'
import SharedContext from '../../../../shared/Context'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueTimeProps = StringValueProps & {
  locale?: AnyLocale
}

function TimeComponent(props: ValueTimeProps) {
  const translations = useTranslation().Time
  const { locale: contextLocale } = useContext(SharedContext)
  const locale = props.locale ?? contextLocale

  const toInput = useCallback(
    (value: string) => {
      if (!value) {
        return undefined
      }

      const parts = value.split(':')

      if (parts.length < 2) {
        return value
      }

      const [hours, minutes, seconds] = parts
      const date = new Date()
      date.setHours(Number(hours), Number(minutes), Number(seconds) || 0)

      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        ...(seconds ? { second: '2-digit' } : {}),
      }

      return new Intl.DateTimeFormat(locale, options).format(date)
    },
    [locale]
  )

  const stringProps: ValueTimeProps = {
    ...props,
    label: props.label ?? translations.label,
    // @ts-expect-error - strictFunctionTypes
    toInput,
  }

  return <StringValue {...stringProps} />
}

withComponentMarkers(TimeComponent, {
  _supportsSpacingProps: true,
})

export default TimeComponent
