import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueStringProps = ValueProps<string>

type StringComponentProps = ValueStringProps & {
  /** For internal use only. Renders the resolved value, after all value transformations ran. */
  renderValue?: (value: ReactNode) => ReactNode
}

function StringComponent(props: StringComponentProps) {
  const { value, className, renderValue, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-string', className)}
      {...rest}
    >
      {renderValue ? renderValue(value) : value}
    </ValueBlock>
  )
}

withComponentMarkers(StringComponent, {
  _supportsSpacingProps: true,
})

export default StringComponent
