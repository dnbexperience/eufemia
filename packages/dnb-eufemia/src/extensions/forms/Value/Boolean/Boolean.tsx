import React, { useContext } from 'react'
import ValueBlock from '../../ValueBlock'
import { useDataValue } from '../../hooks'
import { ValueProps } from '../../types'
import { pickSpacingProps } from '../../../../components/layout/utils'
import SharedContext from '../../../../shared/Context'

export type Props = ValueProps<boolean>

function BooleanComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { className, label, placeholder, showEmpty, value, inline } =
    useDataValue(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...pickSpacingProps(props)}
    >
      {value === true || value === false
        ? value === true
          ? sharedContext?.translation.Forms.booleanYes
          : sharedContext?.translation.Forms.booleanNo
        : null}
    </ValueBlock>
  )
}

BooleanComponent._supportsEufemiaSpacingProps = true
export default BooleanComponent
