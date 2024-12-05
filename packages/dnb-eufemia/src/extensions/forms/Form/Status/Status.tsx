import React, { useCallback, useContext, useRef } from 'react'
import classnames from 'classnames'
import Visibility from '../Visibility'
import DataContext from '../../DataContext/Context'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import useMounted from '../../../../shared/helpers/useMounted'
import setStatus, { Status } from './setStatus'
import {
  Button,
  Flex,
  HeightAnimation,
  Section,
} from '../../../../components'
import { HeightAnimationAllProps } from '../../../../components/HeightAnimation'
import { P } from '../../../../elements'
import { useTranslation } from '../../hooks'
import MainHeading from '../MainHeading'
import SubmitButton from '../SubmitButton'

export type Props = {
  success?: {
    title?: React.ReactNode
    description?: React.ReactNode
    buttonText?: React.ReactNode
    buttonHref?: string
    buttonClickHandler?: () => void
  }
  error?: {
    title?: React.ReactNode
    description?: React.ReactNode
    retryButton?: React.ReactNode
    cancelButton?: React.ReactNode
  }
  onCancel?: () => void
  children: React.ReactNode
  className?: string
}

function StatusContainer(props: Props) {
  const { success, error, onCancel, className, children, ...restProps } =
    props

  const translations = useTranslation()

  const { id, formState } = useContext(DataContext) || {}

  const { data } = useSharedState<{
    activeStatus?: Status
  }>(id)
  const { activeStatus } = data || {}

  const mountedRef = useMounted()
  const innerRef = useRef<HTMLDivElement>(null)
  const onAnimationEnd: HeightAnimationAllProps['onAnimationEnd'] =
    useCallback(
      (state) => {
        if (mountedRef.current && state === 'opened') {
          innerRef.current.focus?.()
        }
      },
      [mountedRef]
    )

  // To keep the content visible while hiding it with the HightAnimation
  const currentStatusRef = useRef<Status>()
  if (activeStatus) {
    currentStatusRef.current = activeStatus
  }

  const onCancelHandler = useCallback(() => {
    if (id) {
      setStatus(id, undefined)
    }
    onCancel?.()
  }, [id, onCancel])

  const childrenAreVisible =
    typeof activeStatus !== 'undefined'
      ? !(activeStatus === activeStatus)
      : undefined
  const statusContentIsVisible =
    typeof activeStatus !== 'undefined'
      ? activeStatus === activeStatus
      : false

  let statusContent = null

  if (currentStatusRef.current === 'success') {
    const tr = translations.StatusSuccess
    const {
      title,
      description,
      buttonText,
      buttonHref,
      buttonClickHandler,
    } = success || {}

    statusContent = (
      <Section
        variant="info"
        innerSpace={{ top: 'large', bottom: 'xx-large' }}
        {...restProps}
      >
        <Flex.Stack gap="large">
          <MainHeading>{title ?? tr.title}</MainHeading>
          <P>{description ?? tr.description}</P>
          <Button
            href={buttonClickHandler ? undefined : buttonHref ?? '/'}
            on_click={buttonClickHandler}
          >
            {buttonText ?? tr.buttonText}
          </Button>
        </Flex.Stack>
      </Section>
    )
  } else if (currentStatusRef.current === 'error') {
    const tr = translations.StatusError
    const { title, description, cancelButton, retryButton } = error || {}

    statusContent = (
      <Section
        variant="transparent"
        innerSpace={{ top: 'large', bottom: 'xx-large' }}
        {...restProps}
      >
        <Flex.Stack gap="large">
          <MainHeading>{title ?? tr.title}</MainHeading>
          <HeightAnimation>
            <P>
              {formState === 'pending'
                ? tr.retryingText
                : description ?? tr.description}
            </P>
          </HeightAnimation>
          <Flex.Horizontal>
            <Button variant="secondary" onClick={onCancelHandler}>
              {cancelButton ?? tr.cancelButton}
            </Button>
            <SubmitButton>{retryButton ?? tr.retryButton}</SubmitButton>
          </Flex.Horizontal>
        </Flex.Stack>
      </Section>
    )
  }

  return (
    <div
      className={classnames(
        'dnb-forms-status',
        activeStatus && `dnb-forms-status--${activeStatus}`,
        'dnb-no-focus',
        className
      )}
      tabIndex={-1}
      ref={innerRef}
    >
      <Visibility
        visible={statusContentIsVisible}
        onAnimationEnd={onAnimationEnd}
        animate
      >
        {statusContent}
      </Visibility>

      <Visibility
        visible={childrenAreVisible}
        onAnimationEnd={onAnimationEnd}
        animate
        keepInDOM
      >
        {children}
      </Visibility>
    </div>
  )
}

StatusContainer.setStatus = setStatus
StatusContainer._supportsSpacingProps = true

export default StatusContainer
