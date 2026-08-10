import { createContext } from 'react'

export type EditContainerContextState = {
  restoreOriginalData: () => void
}

const EditContainerContext = createContext<
  EditContainerContextState | undefined
>(undefined)

export default EditContainerContext
