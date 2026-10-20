import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import type { AiActionProps, AiActionsProps } from './types'

export function AiActions(props: AiActionsProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-actions', className),
  })

  return <div {...rootProps} />
}

export function AiAction({
  label,
  selected,
  className,
  ...rest
}: AiActionProps) {
  return (
    <Button
      variant="tertiary"
      size="small"
      iconSize="default"
      bounding
      selected={selected}
      aria-pressed={selected}
      className={clsx('dnb-ai-actions__action', className)}
      aria-label={label}
      tooltip={label}
      {...rest}
    />
  )
}
