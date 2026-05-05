import { createContext } from 'react'
import type { DlProps } from '../../../../elements/Dl'

export type SummaryListContextProps = {
  layout?: DlProps['layout']
  isNested?: boolean
  verifyChild?: () => void
}

const SummaryListContext = createContext<
  SummaryListContextProps | undefined
>(undefined)

export default SummaryListContext
