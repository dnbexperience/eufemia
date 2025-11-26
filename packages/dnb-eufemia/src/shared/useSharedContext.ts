import { useContext } from 'react'
import Context, { ContextProps } from './Context'

const useSharedContext = <T>() => useContext(Context) as ContextProps & T

export default useSharedContext
