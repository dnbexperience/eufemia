import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'
import { Flex, HeightAnimation } from '../../../../components'
import IterateItemContext, {
  IterateItemContextState,
} from '../IterateItemContext'
import ArrayItemAreaContext from './ArrayItemAreaContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { ContainerMode } from './types'

export type ArrayItemAreaProps = {
  /**
   * Defines the variant of the ViewContainer, EditContainer or PushContainer. Can be `outline` or `basic`.
   * Defaults to `outline`.
   */
  variant?: 'outline' | 'basic'
}

export type Props = {
  mode: ContainerMode
  open?: boolean | undefined
  ariaLabel?: string
  openDelay?: number
} & ArrayItemAreaProps

function ArrayItemArea(props: Props & FlexContainerProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const {
    mode,
    open,
    ariaLabel,
    onAnimationEnd,
    className,
    children,
    openDelay = 100,
    variant = 'outline',
    ...restProps
  } = props

  const localContextRef = useRef<IterateItemContextState>()
  const { hasError, hasSubmitError } =
    useContext(FieldBoundaryContext) || {}
  localContextRef.current = useContext(IterateItemContext) || {}
  const nextFocusElementRef = useRef<HTMLElement>()
  const { isNew, value } = localContextRef.current
  if (hasSubmitError || !value) {
    localContextRef.current.containerMode = 'edit'
  }
  if (localContextRef.current.containerMode === 'auto') {
    localContextRef.current.containerMode = 'view'
  }

  const determineMode = useCallback(() => {
    const { initialContainerMode, switchContainerMode } =
      localContextRef.current
    if (
      mode === 'edit' &&
      !hasSubmitError &&
      initialContainerMode === 'auto'
    ) {
      // - Set the container mode to "edit" if we have an error
      if (hasError && !isNew) {
        switchContainerMode('edit', { omitFocusManagement: true })
      }
    }
  }, [hasError, hasSubmitError, isNew, mode])

  useEffect(() => {
    determineMode()
  }, [determineMode])

  const { handleRemove, index, previousContainerMode, containerMode } =
    localContextRef.current

  const openRef = useRef(open ?? (containerMode === mode && !isNew))
  const isRemoving = useRef(false)

  const setOpenState = useCallback((open: boolean) => {
    openRef.current = open
    forceUpdate()
  }, [])

  useEffect(() => {
    if (!isRemoving.current) {
      // - Set the open state, if it's controlled
      if (typeof open !== 'undefined') {
        setOpenState(open)
      } else {
        // - Open the block with animation, if it's in the right mode
        if (openRef.current !== (containerMode === mode)) {
          if (isNew) {
            setTimeout(() => {
              setOpenState(containerMode === mode)
            }, openDelay) // in order to apply the animation
          } else {
            setOpenState(containerMode === mode)
          }
        }
      }
    }
  }, [containerMode, isNew, mode, open, openDelay, setOpenState])

  const setFocus = useCallback(
    (state) => {
      if (
        localContextRef.current.modeOptions?.omitFocusManagement !==
          true &&
        !hasSubmitError &&
        containerMode === mode && // ensure we match the correct mode
        containerMode !== previousContainerMode // ensure we have a new mode
      ) {
        if (state === 'opened') {
          localContextRef.current.elementRef?.current?.focus?.()
        } else if (state === 'closed') {
          nextFocusElementRef.current?.focus?.()
        }
      }
    },
    [containerMode, hasSubmitError, mode, previousContainerMode]
  )

  // - Remove the block with animation, if it's in the right mode
  const handleAnimationEnd = useCallback(
    (state) => {
      if (!openRef.current && isRemoving.current) {
        isRemoving.current = false
        localContextRef.current.fulfillRemove?.()
      }

      setFocus(state)
      onAnimationEnd?.(state)
    },
    [onAnimationEnd, setFocus]
  )

  const handleRemoveItem = useCallback(() => {
    try {
      // Because "previousElementSibling" did not work in Jest/JSDOM
      nextFocusElementRef.current = Array.from(
        localContextRef.current.elementRef.current.parentElement.childNodes
      ).at(index - 1) as HTMLElement
    } catch (e) {
      //
    }
    isRemoving.current = true
    handleRemove?.({ keepItems: true })
    setOpenState(false)
  }, [handleRemove, index, setOpenState])

  return (
    <ArrayItemAreaContext.Provider value={{ handleRemoveItem }}>
      <HeightAnimation
        className={classnames(
          'dnb-forms-section-block',
          variant && `dnb-forms-section-block--variant-${variant}`,
          isNew && 'dnb-forms-section-block--new',
          hasSubmitError && 'dnb-forms-section-block--error',
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
        >
          {children}
        </Flex.Stack>
      </HeightAnimation>
    </ArrayItemAreaContext.Provider>
  )
}

ArrayItemArea._supportsSpacingProps = true
export default ArrayItemArea
