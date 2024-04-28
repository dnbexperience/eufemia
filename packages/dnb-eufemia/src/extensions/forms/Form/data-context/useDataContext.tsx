import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import DataContext, { ContextState } from '../../DataContext/Context'
import { Path } from '../../types'

type UseDataContextProps = { path?: Path }

export default function useDataContext(props?: UseDataContextProps) {
  const { path = null } = props || {}

  const [, forceUpdate] = useReducer(() => ({}), {})
  const initialDataContext = useContext(DataContext)
  const localDataContextRef = useRef<ContextState>(initialDataContext)

  useMemo(() => {
    localDataContextRef.current = initialDataContext
  }, [initialDataContext])

  const connection = useCallback((context: ContextState) => {
    localDataContextRef.current = context
    forceUpdate()
  }, [])

  useMemo(() => {
    localDataContextRef.current?.setRerenderConnection?.({
      connection,
      path,
    })
  }, [connection, path])

  return localDataContextRef.current
}
