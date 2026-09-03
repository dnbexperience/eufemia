import { createContext } from 'react'

export type EditContainerContextState = {
  restoreOriginalData: () => void

  /** True while an async "onDone" Promise is pending */
  isPending?: boolean
  setIsPending?: (isPending: boolean) => void
}

const EditContainerContext = createContext<
  EditContainerContextState | undefined
>(undefined)

export default EditContainerContext
