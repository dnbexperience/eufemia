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
  renderAs?: 'inline' | 'dialog'
  /** Only for the "inline" variant */
  open?: boolean
  /** Only for the "inline" variant */
  breakout?: boolean
  /** Only for the "inline" variant */
  outset?: boolean
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
  outset?: boolean
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
    outset = true,
    ...rest
  } = props
  const { data, update } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(contentId)
  const { isOpen, isUserIntent, buttonRef } = data || {}
  const {
    open,
    title,
    content,
    renderAs,
    breakout: breakoutProp = true,
    outset: outsetProp = true,
  } = helpProp || {}

  const innerRef = useRef<HTMLDivElement>(null)
  const cardContext = useContext(CardContext)
  const breakoutFromLayout =
    Boolean(cardContext) && breakout && breakoutProp
  const outsetFromLayout = outset && outsetProp

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

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.currentTarget === event.target) {
        // Firefox returns a whitespace (" ") on event.key when pressing space,
        // therefore using .trim() can help normalize this.
        // While userEvent.keyboard('{Space}') might return 'Unknown' on event.code,
        // making a direct comparison less reliable across all platforms.
        switch (event.key.trim() || event.code) {
          case 'Enter':
          case 'Space':
          case 'Escape':
            event.preventDefault()
            window.requestAnimationFrame(() => {
              onClose()
              buttonRef.current?.focus()
            })
            break
        }
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
        onKeyDown={onKeyDown}
        outset={outsetFromLayout}
        breakout={breakoutFromLayout}
        roundedCorner={!breakoutFromLayout}
        innerSpace={
          breakoutFromLayout
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
          {title && <P weight="medium">{title}</P>}
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
