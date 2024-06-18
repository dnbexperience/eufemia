import React, { useCallback, useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import SharedContext, { AnyLocale } from '../../../../shared/Context'

export type Props = StringValueProps & {
  variant?: 'long' | 'short'
  locale?: AnyLocale
}

function DateComponent(props: Props) {
  const translations = useTranslation().Date
  const { locale: contextLocale } = useContext(SharedContext)
  const locale = props.locale ?? contextLocale
  const variant = props.variant ?? 'long'

  const toInput = useCallback(
    (value: string) => {
      if (!value) {
        return undefined
      }

      const date = new Date(value)
      const options = {
        day: 'numeric',
        month: variant,
        year: 'numeric',
      } as const

      const formattedDate =
        typeof Intl !== 'undefined'
          ? new Intl.DateTimeFormat(locale, options).format(date)
          : date.toLocaleString(locale, options)

      return formattedDate
    },
    [locale, variant]
  )

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
    toInput,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
