import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'
import { Card, HeightAnimation } from '../../../../../components'
import SectionContainerContext, {
  SectionContainerContextState,
} from './SectionContainerContext'
import { Props as FlexContainerProps } from '../../../../../components/flex/Container'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'

export type ContainerMode = 'view' | 'edit' | 'auto'
export type SectionContainerProps = {
  /**
   * Defines the variant of the ViewContainer or EditContainer. Can be `outline`.
   * Defaults to `outline`.
   */
  variant?: 'outline' | 'basic' | 'filled'
}

export type Props = {
  mode: ContainerMode
  open?: boolean | undefined
  ariaLabel?: string
  omitFocusManagementRef?: React.MutableRefObject<boolean>
} & SectionContainerProps

function SectionContainer(props: Props & FlexContainerProps) {
  const {
    mode,
    open,
    ariaLabel,
    onAnimationEnd,
    className,
    children,
    variant = 'outline',
    omitFocusManagementRef = { current: undefined },
    ...restProps
  } = props

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

  const { containerMode } = contextRef.current

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

  const setFocus = useCallback(
    (state) => {
      if (state === 'opened') {
        if (
          !omitFocusManagementRef.current &&
          !contextRef.current.hasSubmitError
        ) {
          containerRef?.current?.focus?.()
        }
        omitFocusManagementRef.current = false
      }
    },
    [omitFocusManagementRef]
  )

  // - Remove the block with animation, if it's in the right mode
  const handleAnimationEnd = useCallback(
    (state) => {
      setFocus(state)
      onAnimationEnd?.(state)
    },
    [onAnimationEnd, setFocus]
  )

  return (
    <HeightAnimation
      className={classnames(
        'dnb-forms-section-block',
        variant && `dnb-forms-section-block--variant-${variant}`,
        omitFocusManagementRef.current &&
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
      <Card
        stack
        innerSpace={variant === 'basic' ? false : 'small'}
        filled={variant === 'filled'}
        className="dnb-forms-section-block__inner"
        {...restProps}
        aria-label={ariaLabel}
        innerRef={containerRef}
        tabIndex={-1}
      >
        {children}
      </Card>
    </HeightAnimation>
  )
}

SectionContainer._supportsSpacingProps = true
export default SectionContainer
