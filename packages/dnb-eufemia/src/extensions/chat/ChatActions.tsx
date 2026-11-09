import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import type { ChatActionProps, ChatActionsProps } from './types'

export function ChatActions(props: ChatActionsProps) {
  const { className, ...rest } = props

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-actions', className),
  })

  return <div {...rootProps} />
}

export function ChatAction({
  label,
  selected,
  className,
  ...rest
}: ChatActionProps) {
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
