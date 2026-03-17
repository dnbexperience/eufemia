import { useContext } from 'react'
import type { ContextProps } from './Context'
import Context from './Context'

const useSharedContext = <T>() => useContext(Context) as ContextProps & T

export default useSharedContext
