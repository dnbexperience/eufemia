import { useContext } from 'react'
import DataContext from '../../DataContext/Context'

export default function useDataContext() {
  return useContext(DataContext)
}
