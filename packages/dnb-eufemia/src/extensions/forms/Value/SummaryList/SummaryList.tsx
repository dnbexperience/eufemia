import React from 'react'
import classnames from 'classnames'
import { removeUndefinedProps } from '../../../../shared/component-helper'
import SummaryListContext from './SummaryListContext'
import Dl, { DlAllProps } from '../../../../elements/Dl'
import ValueProvider from '../Provider/ValueProvider'

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

  const valueProviderProps = removeUndefinedProps({
    inheritVisibility,
    inheritLabel,
  })

  return (
    <SummaryListContext.Provider value={{ layout }}>
      <Dl
        className={classnames('dnb-forms-summary-list', className)}
        layout={layout}
        {...rest}
      >
        <ValueProvider {...valueProviderProps}>{children}</ValueProvider>
      </Dl>
    </SummaryListContext.Provider>
  )
}

SummaryList._supportsSpacingProps = true

export default SummaryList
