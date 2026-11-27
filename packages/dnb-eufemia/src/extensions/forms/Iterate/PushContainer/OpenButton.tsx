import { useCallback, useContext, useMemo } from 'react'
import { clsx } from 'clsx'
import type { ButtonProps } from '../../../../components/Button'
import Button from '../../../../components/Button'
import add from '../../../../icons/add'
import IterateItemContext from '../IterateItemContext'
import PushContainerContext from './PushContainerContext'
import mergeProps from '../../../../shared/helpers/mergeProps'
import useCombinedRef from '../../../../shared/helpers/useCombinedRef'
import { convertJsxToString } from '../../../../shared/component-helper'

type Props = ButtonProps

function OpenButton(props: Props) {
  const { className, text, children, ...restProps } = props
  const { switchContainerMode } = useContext(IterateItemContext) || {}
  const { entries, addButtonRef } = useContext(PushContainerContext) || {}
  const ref = useCombinedRef(props.ref, addButtonRef)

  const handleClick = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  const content = useMemo(() => {
    if (children || text) {
      const str = convertJsxToString(children || text)

      if (str.includes('{nextItemNo}')) {
        const nextItemNo = (entries?.length || 0) + 1
        return str.replace('{nextItemNo}', String(nextItemNo))
      }
    }

    return children || text
  }, [entries?.length, children, text])

  return (
    <Button
      className={clsx('dnb-forms-iterate__open-button', className)}
      variant="secondary"
      icon={add}
      iconPosition="left"
      {...mergeProps({ onClick: handleClick }, restProps)}
      ref={ref}
    >
      {content}
    </Button>
  )
}

export default OpenButton
