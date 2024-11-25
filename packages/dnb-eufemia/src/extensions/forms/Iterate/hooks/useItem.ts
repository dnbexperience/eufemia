import { useContext } from 'react'
import IterateItemContext, {
  IterateItemContextState,
} from '../IterateItemContext'

export type UseItemReturn<Value = unknown> = Omit<
  IterateItemContextState,
  'value'
> & {
  value: Value
}

export default function useItem<Value = unknown>() {
  const item = useContext(IterateItemContext)
  return item as UseItemReturn<Value>
}
