import React, { useCallback, useContext, useRef } from 'react'
import classnames from 'classnames'
import Visibility from '../Visibility'
import DataContext from '../../DataContext/Context'
import {
  SharedStateId,
  useSharedState,
} from '../../../../shared/helpers/useSharedState'
import useMounted from '../../../../shared/helpers/useMounted'
import setContent, { InfoOverlayContent } from './setContent'
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
  /**
   * The content to show.
   * If not given, the children will be shown.
   * Can be `success`, `error` or a custom content.
   */
  content?: InfoOverlayContent
  onCancel?: () => void

  /** Predefined content */
  success?: {
    title?: React.ReactNode
    description?: React.ReactNode
    buttonText?: React.ReactNode
    buttonHref?: string
    buttonClickHandler?: () => void
  }
  /** Predefined content */
  error?: {
    title?: React.ReactNode
    description?: React.ReactNode
    retryButton?: React.ReactNode
    cancelButton?: React.ReactNode
  }

  // Various props
  id?: SharedStateId
  children: React.ReactNode
  className?: string
}

function InfoOverlay(props: Props) {
  const { id: idProp, formState } = useContext(DataContext)

  const {
    id = idProp,
    content: contentProp,
    success,
    error,
    onCancel,
    className,
    children,
    ...restProps
  } = props

  const { data } = useSharedState<{
    content?: InfoOverlayContent
  }>(id)
  const { content = contentProp } = data || {}

  const translations = useTranslation()
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
  const currentContentRef = useRef<InfoOverlayContent>()
  if (content) {
    currentContentRef.current = content
  }

  const onCancelHandler = useCallback(() => {
    if (id) {
      setContent(id, undefined)
    }
    onCancel?.()
  }, [id, onCancel])

  const childrenAreVisible =
    typeof content !== 'undefined' ? !(content === content) : undefined
  const statusContentIsVisible =
    typeof content !== 'undefined' ? content === content : false
  const status =
    typeof content === 'string' && !content.includes(' ')
      ? content
      : undefined

  let statusContent = content

  if (currentContentRef.current === 'success') {
    const tr = translations.InfoOverlaySuccess
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
  } else if (currentContentRef.current === 'error') {
    const tr = translations.InfoOverlayError
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
        'dnb-forms-info-overlay',
        status && `dnb-forms-info-overlay--${status}`,
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

InfoOverlay.setContent = setContent
InfoOverlay._supportsSpacingProps = true

export default InfoOverlay
