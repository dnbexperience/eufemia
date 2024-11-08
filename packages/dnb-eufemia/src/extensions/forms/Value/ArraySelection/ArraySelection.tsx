import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { convertJsxToString } from '../../../../shared/component-helper'
import Context from '../../DataContext/Context'
import ListFormat, {
  ListFormatProps,
} from '../../../../components/list-format'

export type Props = ValueProps<Array<number | string>> & ListFormatProps

function ArraySelection(props: Props) {
  const { fieldPropsRef } = useContext(Context) || {}
  const {
    path,
    value,
    format,
    className,
    variant = 'text',
    listType,
    ...rest
  } = useValueProps(props)

  const list = useMemo(() => {
    let valueToUse = value

    if (path) {
      const data = fieldPropsRef?.current?.[
        path + '/arraySelectionData'
      ] as Array<{
        value: string
        title: string | React.ReactNode
      }>

      valueToUse =
        data?.map?.(({ title }) => convertJsxToString(title)) || value
    }

    if (typeof valueToUse === 'undefined') {
      return undefined
    }

    return (
      <ListFormat
        value={valueToUse}
        format={format}
        variant={variant}
        listType={listType}
      />
    )
  }, [fieldPropsRef, path, value, variant, listType])

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {list}
    </ValueBlock>
  )
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
