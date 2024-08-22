import React, { useContext, useMemo } from 'react'
import StringValue from '../String'
import { ValueProps } from '../../types'
import { useValueProps } from '../../hooks'

import Context from '../../DataContext/Context'

import { convertJsxToString } from '../../../../shared/component-helper'

export type Props = ValueProps<string>

function Selection(props: Props) {
  const { fieldPropsRef } = useContext(Context) || {}
  const { path, value, ...rest } = useValueProps(props)

  const valueFromField = useMemo(() => {
    if (path && value) {
      const selection = fieldPropsRef.current[path][
        'children'
      ] as Array<JSX.Element>

      const option = selection.find((child) => child.props.value === value)

      return option?.props?.title
        ? convertJsxToString(option?.props?.title)
        : value
    }

    return value
  }, [fieldPropsRef, path, value])

  return <StringValue value={valueFromField} {...rest} />
}

Selection._supportsSpacingProps = true
export default Selection
