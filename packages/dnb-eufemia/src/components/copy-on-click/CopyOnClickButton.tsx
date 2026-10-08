/**
 * Web CopyOnClick.Button Component
 */

import { useCallback, useRef } from 'react'
import type { CopyOnClickButtonProps } from './types'
import { useTranslation } from '../../shared'
import mergeProps from '../../shared/helpers/mergeProps'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import Button from '../button/Button'
import Tooltip from '../Tooltip'
import copyIcon from '../../icons/copy'
import useCopyToClipboard from './useCopyToClipboard'

export default function CopyOnClickButton({
  copyContent,
  tooltipContent,
  title,
  icon = copyIcon,
  variant = 'tertiary',
  ref,
  ...rest
}: CopyOnClickButtonProps) {
  const elementRef = useRef<HTMLElement>(null)
  const combinedRef = useCombinedRef(ref, elementRef)
  const { active, hasCopied, copy } = useCopyToClipboard()

  const {
    CopyOnClick: { clipboardCopy, buttonTitle },
  } = useTranslation()

  const onClick = useCallback(() => {
    if (copyContent) {
      copy(copyContent)
    }
  }, [copy, copyContent])

  const isIconOnly = !rest.text && !rest.children

  return (
    <>
      <Button
        icon={icon}
        variant={variant}
        title={title ?? (isIconOnly ? buttonTitle : undefined)}
        ref={combinedRef}
        {...mergeProps(
          { className: 'dnb-copy-on-click__button', onClick },
          rest
        )}
      />
      {hasCopied && (
        <Tooltip open={active} targetElement={elementRef}>
          {tooltipContent ?? clipboardCopy}
        </Tooltip>
      )}
    </>
  )
}
