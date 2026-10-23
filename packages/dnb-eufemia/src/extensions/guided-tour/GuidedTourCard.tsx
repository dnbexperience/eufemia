import type { ReactNode } from 'react'
import Button from '../../components/button/Button'
import Flex from '../../components/flex/Flex'
import P from '../../elements/P'
import useTranslation from '../../shared/useTranslation'

export type GuidedTourCardProps = {
  bodyId: string
  content: ReactNode
  progress: string
  showBack: boolean
  isLast: boolean
  onNext: () => void
  onBack: () => void
}

export default function GuidedTourCard({
  bodyId,
  content,
  progress,
  showBack,
  isLast,
  onNext,
  onBack,
}: GuidedTourCardProps) {
  const tr = useTranslation().GuidedTour

  return (
    <Flex.Stack gap="small">
      <Flex.Item id={bodyId} grow>
        {content}
      </Flex.Item>
      <Flex.Horizontal justify="space-between" align="center">
        <P size="small" className="dnb-guided-tour__progress">
          {progress}
        </P>

        <Flex.Horizontal gap="x-small">
          {showBack && (
            <Button
              variant="secondary"
              size="small"
              text={tr.backButtonText}
              onClick={onBack}
            />
          )}
          <Button
            size="small"
            text={isLast ? tr.doneButtonText : tr.nextButtonText}
            onClick={onNext}
          />
        </Flex.Horizontal>
      </Flex.Horizontal>
    </Flex.Stack>
  )
}
