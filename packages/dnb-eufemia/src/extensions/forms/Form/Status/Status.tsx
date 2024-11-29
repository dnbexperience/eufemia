import React, { useCallback, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Visibility from '../Visibility'
import DataContext from '../../DataContext/Context'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import setStatus, { Status } from './setStatus'
import { Button, Flex, Section } from '../../../../components'
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

  const { id } = useContext(DataContext) || {}

  const { data } = useSharedState<{
    activeStatus?: Status
  }>(id)
  const { activeStatus } = data || {}

  // To ensure we not animate on first render.
  // When there are several Examples rendered at the same time,
  // the first one will animate on the first render.
  const animateRef = useRef(undefined)
  useEffect(() => {
    animateRef.current = true
  }, [])

  const innerRef = useRef<HTMLDivElement>(null)
  const onVisible = useCallback(() => {
    if (animateRef.current) {
      innerRef.current.focus?.()
    }
  }, [])

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
      buttonHref = '/',
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
          {buttonHref && (
            <Button href={buttonHref}>
              {buttonText ?? tr.buttonText}
            </Button>
          )}
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
          <P>{description ?? tr.description}</P>
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
        onVisible={onVisible}
        animate={animateRef.current}
      >
        {statusContent}
      </Visibility>

      <Visibility
        visible={childrenAreVisible}
        onVisible={onVisible}
        animate={animateRef.current}
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
