import React, { useCallback, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'
import { useSharedState } from '../../shared/helpers/useSharedState'
import { convertJsxToString } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import Section from '../Section'
import { P } from '../../elements'
import Flex from '../Flex'
import CardContext from '../card/CardContext'
import { SpacingProps } from '../space/types'
import Dialog from '../Dialog'
import { question as QuestionIcon, close as CloseIcon } from '../../icons'

export type HelpProps = {
  title?: React.ReactNode
  content?: React.ReactNode
  open?: boolean
  renderAs?: 'inline' | 'dialog'
}

export type HelpButtonInlineProps = HelpButtonProps & {
  contentId?: string
  help?: HelpProps
}

export type HelpButtonInlineSharedStateDataProps = {
  isOpen: boolean
  isUserIntent?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement>
}

export default function HelpButtonInline(props: HelpButtonInlineProps) {
  const { contentId, size, help, className, children, ...rest } = props
  const controlId = useId(contentId)

  const { data, update } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(controlId, {
      isOpen: help?.open ?? false,
    })
  const { isOpen, isUserIntent } = data || {}
  const wasOpenRef = useRef(undefined)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClickHandler = useCallback(
    ({ event }: { event: React.MouseEvent<HTMLButtonElement> }) => {
      event.preventDefault() // Because when used inside a FormLabel
      update({ isOpen: !isOpen, isUserIntent: !isOpen, buttonRef })
      wasOpenRef.current = !isOpen
    },
    [isOpen, update]
  )

  return (
    <>
      <HelpButtonInstance
        bounding
        size={size ?? 'small'}
        icon={HelpButtonIcon}
        title={
          !isOpen && !wasOpenRef.current
            ? convertJsxToString(help?.title)
            : undefined
        }
        {...rest}
        id={controlId}
        className={classnames(
          'dnb-help-button__inline',
          isOpen && 'dnb-help-button__inline--open',
          isUserIntent && 'dnb-help-button__inline--user-intent',
          typeof wasOpenRef.current === 'boolean' &&
            'dnb-help-button__inline--was-open',
          className
        )}
        aria-controls={`${controlId}-content`}
        on_click={onClickHandler}
        innerRef={buttonRef}
      />

      {!contentId && (
        <HelpButtonInlineContent contentId={controlId} help={help}>
          {children}
        </HelpButtonInlineContent>
      )}
    </>
  )
}

export type HelpButtonInlineContentProps = SpacingProps & {
  contentId: string
  className?: string
  children?: React.ReactNode
  help?: HelpProps
  breakout?: boolean
}

export function HelpButtonInlineContent(
  props: HelpButtonInlineContentProps
) {
  const {
    contentId,
    className,
    children,
    help: helpProp,
    breakout = true,
    ...rest
  } = props
  const { data, update } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(contentId)
  const { isOpen, isUserIntent, buttonRef } = data || {}
  const { open, title, content, renderAs } = helpProp || {}

  const innerRef = useRef<HTMLDivElement>(null)
  const cardContext = useContext(CardContext)
  const isInsideCard = Boolean(cardContext) && breakout

  useEffect(() => {
    if (isOpen && isUserIntent) {
      window.requestAnimationFrame(() => {
        innerRef.current?.focus({ preventScroll: true })
      })
    }
  }, [isOpen, isUserIntent])

  const onClose = useCallback(() => {
    update({ isOpen: false, isUserIntent: false })
  }, [update])

  const keydownHandler = useCallback(
    (event) => {
      switch (event.code) {
        case 'Escape':
          onClose()
          buttonRef.current?.focus()
          break
      }
    },
    [buttonRef, onClose]
  )

  if (renderAs === 'dialog') {
    return (
      <Dialog
        title={title}
        omitTriggerButton
        openState={isOpen ?? open}
        onClose={onClose}
      >
        {content}
        {children}
      </Dialog>
    )
  }

  return (
    <HeightAnimation
      className={classnames('dnb-help-button__content', className)}
      open={isOpen ?? open ?? false}
    >
      <Section
        id={`${contentId}-content`}
        aria-label={convertJsxToString(title)}
        className="dnb-no-focus"
        tabIndex={-1}
        innerRef={innerRef}
        onKeyDown={keydownHandler}
        breakout={isInsideCard}
        roundedCorner={!isInsideCard}
        innerSpace={
          isInsideCard
            ? { top: 'small', bottom: 'medium' }
            : {
                top: 'small',
                bottom: 'medium',
                left: 'medium',
                right: 'x-small',
              }
        }
        backgroundColor="lavender"
        {...rest}
      >
        <Flex.Vertical gap="x-small">
          {title && <P medium>{title}</P>}
          {content && <P>{content}</P>}
        </Flex.Vertical>
        {children}
      </Section>
    </HeightAnimation>
  )
}

function HelpButtonIcon() {
  return (
    <>
      <QuestionIcon />
      <CloseIcon />
    </>
  )
}

HelpButtonInline._supportsSpacingProps = true
HelpButtonInlineContent._supportsSpacingProps = true
