import { useId } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Button from '../../components/Button'
import HeightAnimation from '../../components/HeightAnimation'
import { chevron_down } from '../../icons'

type AiCollapsibleProps = {
  label: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
}

// A toggle button with content that opens below it
function AiCollapsible({
  label,
  open,
  onToggle,
  children,
}: AiCollapsibleProps) {
  const id = useId()

  return (
    <>
      <Button
        variant="tertiary"
        size="medium"
        icon={chevron_down}
        iconPosition="right"
        className={clsx(
          'dnb-ai-collapsible__toggle',
          open && 'dnb-ai-collapsible__toggle--open'
        )}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {label}
      </Button>

      <HeightAnimation open={open} id={id}>
        {children}
      </HeightAnimation>
    </>
  )
}

export default AiCollapsible
