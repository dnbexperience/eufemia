import React from 'react'
import { DlProps } from '../../../../elements/Dl'

export type SummaryListContextProps = {
  layout?: DlProps['layout']
  isNested?: boolean
}

const SummaryListContext = React.createContext<
  SummaryListContextProps | undefined
>(undefined)

export default SummaryListContext
