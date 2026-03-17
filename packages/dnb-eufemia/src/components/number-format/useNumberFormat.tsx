import { useContext } from 'react'
import { format } from './NumberUtils'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  NumberFormatOptionParams,
  NumberFormatValue,
} from './NumberUtils'

function useNumberFormat(
  value: NumberFormatValue,
  options: NumberFormatOptionParams = {}
) {
  const context = useContext(Context)
  const params = extendPropsWithContext(
    options,
    { locale: context.locale },
    context.NumberFormat
  )

  return format(value, params)
}

export default useNumberFormat
