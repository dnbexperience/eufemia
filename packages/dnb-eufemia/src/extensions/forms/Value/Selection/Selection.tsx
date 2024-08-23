import React, { useContext, useMemo } from 'react'
import StringValue from '../String'
import { ValueProps } from '../../types'
import { useValueProps } from '../../hooks'

import Context from '../../DataContext/Context'

import { convertJsxToString } from '../../../../shared/component-helper'
import { Data } from '../../Field/Selection'

export type Props = ValueProps<string>

function Selection(props: Props) {
  const { fieldPropsRef } = useContext(Context) || {}
  const { path, value, ...rest } = useValueProps(props)

  const valueFromField = useMemo<string | undefined>(() => {
    if (!path || (path && !fieldPropsRef.current[path])) {
      return value
    }
    // Children is not defined on FieldProps, hence the lack of dot notation
    const selection = fieldPropsRef.current[path]['children'] as Array<
      Omit<JSX.Element, 'props'> & { props: Data[number] }
    >

    const option = selection.find((child) => child.props.value === value)
    const title = option?.props?.title

    return title ? convertJsxToString(title) : value
  }, [fieldPropsRef, path, value])

  return <StringValue value={valueFromField} {...rest} />
}

Selection._supportsSpacingProps = true
export default Selection
