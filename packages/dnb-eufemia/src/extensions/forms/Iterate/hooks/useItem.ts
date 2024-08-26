import { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'

export default function useItem() {
  const item = useContext(IterateItemContext)
  return item
}
