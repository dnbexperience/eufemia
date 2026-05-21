import { useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Dialog from '../dialog/Dialog'
import Button from '../button/Button'
import Flex from '../flex/Flex'
import List from '../list/List'
import SharedContext from '../../shared/Context'
import { FilterContext } from './FilterContext'
import FilterIndicator from './FilterIndicator'
import { filter as filterIcon } from '../../icons'

export type FilterMoreProps = {
  label?: string
  className?: string
  children?: ReactNode
}

function FilterMore({ label, className, children }: FilterMoreProps) {
  const sharedContext = useContext(SharedContext)
  const { moreLabel, moreTitle, showResultsButton } =
    sharedContext.getTranslation({}).Filter

  const buttonLabel = label ?? moreLabel
  const context = useContext(FilterContext)
  const [open, setOpen] = useState(false)

  if (!context) {
    throw new Error('Filter.More must be used inside a Filter.Container.')
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const resultCount = context.resultCount
  const resultLoading = context.resultLoading

  return (
    <>
      <Button
        variant="tertiary"
        icon={filterIcon}
        iconPosition="left"
        onClick={handleOpen}
        className={clsx('dnb-filter__more-trigger', className)}
      >
        {buttonLabel}
      </Button>

      <Dialog
        title={moreTitle}
        open={open}
        onClose={handleClose}
        omitTriggerButton
        verticalAlignment="top"
      >
        <Dialog.Body>
          <List.Container separated>{children}</List.Container>

          {(resultCount !== undefined || resultLoading) && (
            <Flex.Horizontal
              align="center"
              top="medium"
              gap="small"
              className="dnb-filter__more-result"
            >
              <Button onClick={handleClose}>
                {showResultsButton.replace(
                  '%count',
                  String(resultCount ?? 0)
                )}
              </Button>
              {resultLoading && <FilterIndicator />}
            </Flex.Horizontal>
          )}
        </Dialog.Body>
      </Dialog>
    </>
  )
}

export default FilterMore
