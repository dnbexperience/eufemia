import React, { useCallback, useContext, useMemo } from 'react'
import classnames from 'classnames'
import Button, { ButtonProps } from '../../../../components/Button'
import { add } from '../../../../icons'
import IterateItemContext from '../IterateItemContext'
import PushContainerContext from './PushContainerContext'
import { convertJsxToString } from '../../../../shared/component-helper'

type Props = ButtonProps

function OpenButton(props: Props) {
  const { className, text, children, ...restProps } = props
  const { switchContainerMode } = useContext(IterateItemContext) || {}
  const { entries } = useContext(PushContainerContext) || {}

  const handleClick = useCallback(() => {
    switchContainerMode?.('edit')
  }, [switchContainerMode])

  const content = useMemo(() => {
    if (children || text) {
      const str = convertJsxToString(children || text)

      if (str.includes('{nextItemNr}')) {
        const nextItemNr = (entries?.length || 0) + 1
        return str.replace('{nextItemNr}', String(nextItemNr))
      }
    }

    return children || text
  }, [entries?.length, children, text])

  return (
    <Button
      className={classnames('dnb-forms-iterate-open-button', className)}
      variant="secondary"
      icon={add}
      icon_position="left"
      on_click={handleClick}
      {...restProps}
    >
      {content}
    </Button>
  )
}

export default OpenButton
