import React, { useContext, useMemo } from 'react'
import StringValue from '../String'
import { Path, ValueProps } from '../../types'
import { useValueProps } from '../../hooks'
import useDataValue from '../../hooks/useDataValue'
import Context from '../../DataContext/Context'
import { convertJsxToString } from '../../../../shared/component-helper'
import { Data } from '../../Field/Selection'

export type Props = ValueProps<string> & {
  dataPath?: Path
}

function Selection(props: Props) {
  const { fieldInternalsRef } = useContext(Context) || {}
  const { path, dataPath, value, ...rest } = useValueProps(props)
  const { getValueByPath } = useDataValue()

  const valueToDisplay = useMemo<string | undefined>(() => {
    const fieldProp = fieldInternalsRef?.current?.[path]?.props

    if (path || dataPath) {
      let list = getValueByPath(dataPath)?.map?.((props) => ({ props }))

      if (!list) {
        list = fieldProp?.children as Array<
          Omit<JSX.Element, 'props'> & { props: Data[number] }
        >
      }

      const title = list?.find?.((child) => child.props.value === value)
        ?.props?.title

      return title ? convertJsxToString(title) : value
    }

    return value
  }, [dataPath, fieldInternalsRef, getValueByPath, path, value])

  return <StringValue value={valueToDisplay} path={path} {...rest} />
}

Selection._supportsSpacingProps = true
export default Selection
