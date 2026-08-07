import { createContext } from 'react'

export type EditContainerContextState = {
  confirmChanges: () => void
  restoreOriginalData: () => void
}

const EditContainerContext = createContext<
  EditContainerContextState | undefined
>(undefined)

export default EditContainerContext
