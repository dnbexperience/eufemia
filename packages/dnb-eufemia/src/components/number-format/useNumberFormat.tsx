import { useContext } from 'react'
import { format } from './NumberUtils'
import Context from '../../shared/Context'
import usePropsWithContext from '../../shared/hooks/usePropsWithContext'
import type { formatOptionParams, formatValue } from './NumberUtils'

function useNumberFormat(
  value: formatValue,
  options: formatOptionParams = {}
) {
  const context = useContext(Context)
  const params = usePropsWithContext(
    options,
    { locale: context.locale },
    context.NumberFormat
  )

  return format(value, params)
}

export default useNumberFormat
