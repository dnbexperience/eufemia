import { useCallback, useContext, useMemo } from 'react'
import { clsx } from 'clsx'
import { Button } from '../../../../components'
import type { ButtonProps } from '../../../../components/Button'
import IterateItemContext from '../IterateItemContext'
import {
  useArrayLimit,
  useItemPath,
  useSwitchContainerMode,
} from '../hooks'
import type { Path } from '../../types'
import { omitDataValueReadWriteProps } from '../../types'
import add from '../../../../icons/add'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import useAddButtonRef from '../hooks/useAddButtonRef'
import useCombinedRef from '../../../../shared/helpers/useCombinedRef'
import { convertJsxToString } from '../../../../shared/component-helper'
import mergeProps from '../../../../shared/helpers/mergeProps'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type IteratePushButtonProps = ButtonProps & {
  path?: Path
  itemPath?: Path
  pushValue: unknown | ((value: unknown) => void)

  /**
   * Used internally
   */
  value?: unknown
}

function PushButton(props: IteratePushButtonProps) {
  const { handlePathChange } = useContext(DataContext) || {}
  const iterateItemContext = useContext(IterateItemContext)
  const { handlePush } = iterateItemContext ?? {}

  const {
    pushValue,
    className,
    path,
    itemPath,
    text,
    children,
    ...restProps
  } = props
  const buttonProps = omitDataValueReadWriteProps(restProps)

  const { absolutePath, resolvedPath } = useItemPath({ path, itemPath })
  const targetPath = absolutePath || resolvedPath
  const addButtonRef = useAddButtonRef(
    handlePush && !absolutePath ? undefined : targetPath
  )
  const ref = useCombinedRef(props.ref, addButtonRef)

  const { value: arrayValue } = useDataValue<Array<unknown>>(
    path || absolutePath
  )

  const { hasReachedLimit, setShowStatus } = useArrayLimit(path)

  if (arrayValue !== undefined && !Array.isArray(arrayValue)) {
    throw new Error('PushButton received a non-array value')
  }

  const { setLastItemContainerMode } = useSwitchContainerMode(path)

  const handleClick = useCallback(async () => {
    if (hasReachedLimit) {
      setShowStatus(true)
      return // stop here
    }

    const newValue =
      typeof pushValue === 'function' ? pushValue(arrayValue) : pushValue

    if (handlePush && !absolutePath) {
      // Inside an Iterate element - make the change through the Iterate component
      handlePush(newValue)
    } else {
      // If not inside an iterate, it could still manipulate a source data set through useFieldProps
      await handlePathChange?.(targetPath, [
        ...(arrayValue ?? []),
        newValue,
      ])
    }

    if (!absolutePath) {
      setTimeout(() => {
        setLastItemContainerMode('view')
      }, 100) // UX improvement because of the "openDelay"
    }
  }, [
    arrayValue,
    absolutePath,
    handlePathChange,
    handlePush,
    hasReachedLimit,
    targetPath,
    pushValue,
    setLastItemContainerMode,
    setShowStatus,
  ])

  const content = useMemo(() => {
    if (children || text) {
      const str = convertJsxToString(children || text)

      if (str.includes('{nextItemNo}')) {
        const nextItemNo = (arrayValue?.length || 0) + 1
        return str.replace('{nextItemNo}', String(nextItemNo))
      }
    }

    return children || text
  }, [arrayValue?.length, children, text])

  return (
    <Button
      {...mergeProps<ButtonProps>(
        {
          className: clsx('dnb-forms-iterate-push-button', className),
          variant: 'secondary',
          icon: add,
          iconPosition: 'left',
          onClick: handleClick,
        },
        buttonProps
      )}
      ref={ref}
    >
      {content}
    </Button>
  )
}

withComponentMarkers(PushButton, {
  _supportsSpacingProps: true,
})

export default PushButton
