import React from 'react'
import classnames from 'classnames'
import { removeUndefinedProps } from '../../../../shared/component-helper'
import SummaryListContext from './SummaryListContext'
import Dl, { DlAllProps } from '../../../../elements/Dl'
import ValueProvider from '../Provider/ValueProvider'
import { ValueProps } from '../../types'

export type Props = Omit<DlAllProps, 'label'> & {
  transformLabel?: ValueProps['transformLabel']
  inheritVisibility?: ValueProps['inheritVisibility']
  inheritLabel?: ValueProps['inheritLabel']
}

function SummaryList(props: Props) {
  const {
    className,
    children,
    layout,
    transformLabel,
    inheritVisibility,
    inheritLabel,
    ...rest
  } = props

  const valueProviderProps = removeUndefinedProps({
    transformLabel,
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
