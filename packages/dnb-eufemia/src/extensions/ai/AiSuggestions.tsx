import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import useTranslation from './hooks/useTranslation'
import { ai } from '../../icons'
import type { AiSuggestionProps, AiSuggestionsProps } from './types'

export function AiSuggestions(props: AiSuggestionsProps) {
  const { className, ...rest } = props
  const translation = useTranslation().Ai

  const rootProps = useSpacing(props, {
    role: 'group',
    'aria-label': translation.suggestions,
    ...rest,
    className: clsx('dnb-ai-suggestions', className),
  })

  return <div {...rootProps} />
}

export function AiSuggestion(props: AiSuggestionProps) {
  const {
    suggestion,
    variant = 'chip',
    icon = ai,
    children,
    onClick,
    className,
    ...rest
  } = props

  const content = children ?? suggestion
  const classNames = clsx(
    'dnb-ai-suggestion',
    `dnb-ai-suggestion--${variant}`,
    className
  )

  const cardProps = useSpacing(props, {
    ...rest,
    className: classNames,
  })

  if (variant === 'card') {
    return (
      <button
        type="button"
        {...cardProps}
        onClick={(event) => onClick?.({ suggestion, event })}
      >
        <Icon
          icon={icon}
          size="medium"
          className="dnb-ai-suggestion__icon"
        />
        <span className="dnb-ai-suggestion__text">{content}</span>
      </button>
    )
  }

  return (
    <Button
      variant="secondary"
      size="medium"
      icon={icon}
      iconPosition="left"
      className={classNames}
      onClick={({ event }) => onClick?.({ suggestion, event })}
      {...rest}
    >
      {content}
    </Button>
  )
}
