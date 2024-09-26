import React from 'react'
import classnames from 'classnames'
import SummaryListContext from './SummaryListContext'
import Dl, { DlAllProps } from '../../../../elements/Dl'

export type Props = Omit<DlAllProps, 'label'> & {
  inheritVisibility?: boolean
  inheritLabel?: boolean
}

function SummaryList(props: Props) {
  const {
    className,
    children,
    layout,
    inheritVisibility,
    inheritLabel,
    ...rest
  } = props
  return (
    <SummaryListContext.Provider
      value={{ layout, inheritVisibility, inheritLabel }}
    >
      <Dl
        className={classnames('dnb-forms-summary-list', className)}
        layout={layout}
        {...rest}
      >
        {children}
      </Dl>
    </SummaryListContext.Provider>
  )
}

SummaryList._supportsSpacingProps = true

export default SummaryList
