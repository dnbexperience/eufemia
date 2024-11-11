import React from 'react'
import { DlProps } from '../../../../elements/Dl'

export type SummaryListContextProps = {
  layout?: DlProps['layout']
  isNested?: boolean
  verifyChild?: () => void
}

const SummaryListContext = React.createContext<
  SummaryListContextProps | undefined
>(undefined)

export default SummaryListContext
