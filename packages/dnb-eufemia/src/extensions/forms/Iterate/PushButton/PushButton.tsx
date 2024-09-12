import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import { useSwitchContainerMode } from '../hooks'
import { omitDataValueReadWriteProps, Path } from '../../types'
import { add } from '../../../../icons'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'

export type Props = ButtonProps & {
  path?: Path
  pushValue: unknown | ((value: unknown) => void)

  /**
   * Used internally
   */
  value?: unknown
}

function PushButton(props: Props) {
  const { handlePathChange } = useContext(DataContext) || {}
  const iterateItemContext = useContext(IterateItemContext)
  const { handlePush } = iterateItemContext ?? {}

  const { pushValue, className, path, children, ...restProps } = props
  const buttonProps = omitDataValueReadWriteProps(restProps)
  const value = useDataValue().getValueByPath(path)

  if (value !== undefined && !Array.isArray(value)) {
    throw new Error('PushButton received a non-array value')
  }

  const { setLastItemContainerMode } = useSwitchContainerMode({
    path,
  })

  const handleClick = useCallback(async () => {
    const newValue =
      typeof pushValue === 'function' ? pushValue(value) : pushValue

    if (handlePush) {
      // Inside an Iterate element - make the change through the Iterate component
      handlePush(newValue)
    } else {
      // If not inside an iterate, it could still manipulate a source data set through useFieldProps
      await handlePathChange?.(path, [...(value ?? []), newValue])
    }

    setTimeout(() => {
      setLastItemContainerMode('view')
    }, 100) // UX improvement because of the "openDelay"
  }, [
    handlePathChange,
    handlePush,
    path,
    pushValue,
    setLastItemContainerMode,
    value,
  ])

  return (
    <Button
      className={classnames('dnb-forms-iterate-push-button', className)}
      variant="secondary"
      icon={add}
      icon_position="left"
      on_click={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}

PushButton._supportsSpacingProps = true
export default PushButton
