import React, { useContext, useMemo } from 'react'
import clsx from 'clsx'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { convertJsxToString } from '../../../../shared/component-helper'
import Context from '../../DataContext/Context'
import type { ListFormatProps } from '../../../../components/list-format'
import ListFormat from '../../../../components/list-format'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = ValueProps<Array<number | string>> & ListFormatProps

function ArraySelection(props: Props) {
  const { fieldInternalsRef } = useContext(Context) || {}
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
      const data = fieldInternalsRef?.current?.[
        path + '/arraySelectionData'
      ]?.props as unknown as Array<{
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
  }, [value, path, format, variant, listType, fieldInternalsRef])

  return (
    // @ts-ignore -- strictFunctionTypes
    <ValueBlock
      className={clsx('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {list}
    </ValueBlock>
  )
}

withComponentMarkers(ArraySelection, {
  _supportsSpacingProps: true,
})

export default ArraySelection
