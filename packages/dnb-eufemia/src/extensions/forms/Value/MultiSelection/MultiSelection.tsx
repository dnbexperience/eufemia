import { useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { useValueProps } from '../../hooks'
import useDataValue from '../../hooks/useDataValue'
import type { Path, ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import { convertJsxToString } from '../../../../shared/component-helper'
import Context from '../../DataContext/Context'
import type { ListFormatProps } from '../../../../components/list-format'
import ListFormat from '../../../../components/list-format'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { MultiSelectionItem } from '../../Field/MultiSelection'

export type ValueMultiSelectionProps = ValueProps<Array<number | string>> &
  ListFormatProps & {
    /**
     * Data to resolve values to their display titles. Array of objects with `value` and `title` properties.
     */
    data?: Array<MultiSelectionItem>

    /**
     * The path to the context data (Form.Handler).
     * The context data object needs to have a `value` and a `title` property.
     */
    dataPath?: Path
  }

function MultiSelection(props: ValueMultiSelectionProps) {
  const { fieldInternalsRef } = useContext(Context) || {}
  const {
    path,
    data,
    dataPath,
    value,
    format,
    className,
    variant = 'text',
    listType,
    ...rest
  } = useValueProps(props)
  const { value: dataPathValue } = useDataValue<
    Array<{ value: number | string; title: ReactNode }>
  >(dataPath, undefined, { pathType: 'absolute' })

  const list = useMemo(() => {
    let valueToUse = value

    if (path || dataPath || data) {
      let items:
        | Array<{ value: number | string; title: ReactNode }>
        | undefined

      // Try field internals first (set by Field.MultiSelection)
      if (path) {
        items = fieldInternalsRef?.current?.[path + '/multiSelectionData']
          ?.props as unknown as Array<{
          value: number | string
          title: ReactNode
        }>
      }

      // Fall back to dataPath from context
      if (!items && dataPath) {
        items = dataPathValue
      }

      // Fall back to direct data prop
      if (!items && data) {
        items = data
      }

      if (items && value) {
        const selectedItems = items.filter((item) =>
          value.includes(item.value)
        )
        valueToUse = selectedItems.map(({ title }) =>
          convertJsxToString(title)
        )
      }
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
  }, [
    value,
    path,
    data,
    dataPath,
    format,
    variant,
    listType,
    fieldInternalsRef,
    dataPathValue,
  ])

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-multi-selection', className)}
      {...rest}
    >
      {list}
    </ValueBlock>
  )
}

withComponentMarkers(MultiSelection, {
  _supportsSpacingProps: true,
})

export default MultiSelection
