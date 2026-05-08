import { useCallback } from 'react'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import {
  chevron_down as ChevronDown,
  chevron_up as ChevronUp,
} from '../../icons'
import { useSharedState } from '../../shared/helpers/useSharedState'
import useTranslation from '../../shared/useTranslation'

export type ListShowMoreButtonSharedState = {
  expanded: boolean
}

export type ListShowMoreButtonProps = {
  id: string
  showMore?: string
  showLess?: string
} & Omit<ButtonProps, 'id' | 'text' | 'icon' | 'onClick' | 'variant'>

function ListShowMoreButton(props: ListShowMoreButtonProps) {
  const { id, showMore, showLess, ...rest } = props

  const {
    List: {
      showMore: showMoreTranslation,
      showLess: showLessTranslation,
    } = {},
  } = useTranslation()

  const resolvedShowMore = showMore ?? showMoreTranslation
  const resolvedShowLess = showLess ?? showLessTranslation

  const { data, update } = useSharedState<ListShowMoreButtonSharedState>(
    id,
    {
      expanded: false,
    }
  )

  const expanded = data?.expanded ?? false

  const handleClick = useCallback(() => {
    update({ expanded: !expanded })
  }, [expanded, update])

  return (
    <Button
      variant="tertiary"
      text={expanded ? resolvedShowLess : resolvedShowMore}
      icon={expanded ? ChevronUp : ChevronDown}
      iconPosition="right"
      onClick={handleClick}
      aria-expanded={expanded}
      aria-controls={typeof id === 'string' ? id : undefined}
      {...rest}
    />
  )
}

ListShowMoreButton._supportsSpacingProps = true

export default ListShowMoreButton
