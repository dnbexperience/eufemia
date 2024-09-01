import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'
import { Flex, HeightAnimation } from '../../../../../components'
import SectionContainerContext, {
  SectionContainerContextState,
} from './SectionContainerContext'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

export type ContainerMode =
  | 'view'
  | 'edit'
  | 'openWhenFieldValidationError'
export type SectionContainerProps = {
  /**
   * Defines the variant of the ViewContainer or EditContainer. Can be `outline`.
   * Defaults to `outline`.
   */
  variant?: 'outline' | 'basic'
}

export type Props = {
  mode: ContainerMode
  open?: boolean | undefined
  ariaLabel?: string
} & SectionContainerProps

function SectionContainer(props: Props & FlexContainerProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const containerRef = useRef<HTMLDivElement>()
  const contextRef = useRef<
    SectionContainerContextState & {
      hasError?: boolean
      hasSubmitError?: boolean
    }
  >()
  contextRef.current = useContext(SectionContainerContext) || {}

  const { hasError, hasSubmitError } =
    useContext(FieldBoundaryContext) || {}
  contextRef.current.hasError = hasError
  contextRef.current.hasSubmitError = hasSubmitError

  // - Set the container mode to "edit" if we have an error
  if (hasSubmitError) {
    contextRef.current.containerMode = 'edit'
  }

  const { switchContainerMode, containerMode } = contextRef.current

  const {
    mode,
    open,
    ariaLabel,
    onAnimationEnd,
    className,
    children,
    variant = 'outline',
    ...restProps
  } = props

  const openRef = useRef(open ?? containerMode === mode)
  const setOpenState = useCallback((open: boolean) => {
    openRef.current = open
    forceUpdate()
  }, [])

  useEffect(() => {
    // - Set the open state, if it's controlled
    if (typeof open !== 'undefined') {
      setOpenState(open)
    } else {
      // - Open the block with animation, if it's in the right mode
      if (openRef.current !== (containerMode === mode)) {
        setOpenState(containerMode === mode)
      }
    }
  }, [containerMode, mode, open, setOpenState])

  // - Remove the block with animation, if it's in the right mode
  const handleAnimationEnd = useCallback(
    (state) => {
      // - Keep the block open if we have an error
      if (contextRef.current.hasSubmitError) {
        switchContainerMode?.('edit')
      }

      if (state === 'opened') {
        if (!contextRef.current.hasSubmitError) {
          containerRef?.current?.focus?.()
        }
      }

      onAnimationEnd?.(state)
    },
    [onAnimationEnd, switchContainerMode]
  )

  const preventAnimationRef = useRef(true)
  useEffect(() => {
    setTimeout(() => {
      preventAnimationRef.current = false
      forceUpdate()
    }, 1000) // Initially, we don't want to animate
  }, [])

  return (
    <HeightAnimation
      className={classnames(
        'dnb-forms-section-block',
        variant && `dnb-forms-section-block--variant-${variant}`,
        preventAnimationRef.current &&
          'dnb-forms-section-block--no-animation',
        contextRef.current.hasSubmitError &&
          'dnb-forms-section-block--error',
        className
      )}
      open={openRef.current}
      onAnimationEnd={handleAnimationEnd}
      duration={450}
      keepInDOM // Ensure fields get mounted so they will sync with the data context
    >
      <Flex.Stack
        className="dnb-forms-section-block__inner"
        {...restProps}
        element="section"
        aria-label={ariaLabel}
        innerRef={containerRef}
        tabIndex={-1}
      >
        {children}
      </Flex.Stack>
    </HeightAnimation>
  )
}

SectionContainer._supportsSpacingProps = true
export default SectionContainer
