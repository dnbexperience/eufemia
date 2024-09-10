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
import ElementBlockContext from './ElementBlockContext'
import FieldBoundaryContext from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { ContainerMode } from '../Array/types'

export type ElementSectionProps = {
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
  openDelay?: number
} & ElementSectionProps

function ElementBlock(props: Props & FlexContainerProps) {
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
  const omitFocusManagementRef = useRef(false)
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
        omitFocusManagementRef.current = true
        switchContainerMode('edit')
      }
    }
  }, [hasError, hasSubmitError, isNew, mode])

  useEffect(() => {
    determineMode()
  }, [determineMode])

  const { handleRemove, previousContainerMode, containerMode } =
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
        !omitFocusManagementRef.current &&
        !hasSubmitError &&
        containerMode === mode && // ensure we match the correct mode
        containerMode !== previousContainerMode // ensure we have a new mode
      ) {
        if (state === 'opened') {
          localContextRef.current?.elementRef?.current?.focus?.()
        } else if (state === 'closed') {
          // Wait until the element is removed, then check if we can set focus
          window.requestAnimationFrame(() => {
            // try to focus on the second last element
            try {
              if (
                // But not when we focus is already inside our element
                !document.activeElement?.closest(
                  '.dnb-forms-iterate__element'
                )
              ) {
                const elements =
                  localContextRef.current?.containerRef.current.querySelectorAll<HTMLDivElement>(
                    '.dnb-forms-iterate__element'
                  )
                elements[elements.length - 1].focus()
              }
            } catch (e) {
              /* do nothing */
            }
          })
        }
      }

      omitFocusManagementRef.current = false
    },
    [containerMode, hasSubmitError, mode, previousContainerMode]
  )

  // - Remove the block with animation, if it's in the right mode
  const handleAnimationEnd = useCallback(
    (state) => {
      if (!openRef.current && isRemoving.current) {
        isRemoving.current = false
        localContextRef.current?.fulfillRemove?.()
      }

      setFocus(state)
      onAnimationEnd?.(state)
    },
    [onAnimationEnd, setFocus]
  )
  const handleRemoveBlock = useCallback(() => {
    isRemoving.current = true
    handleRemove?.({ keepItems: true })
    setOpenState(false)
  }, [handleRemove, setOpenState])

  return (
    <ElementBlockContext.Provider value={{ handleRemoveBlock }}>
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
    </ElementBlockContext.Provider>
  )
}

ElementBlock._supportsSpacingProps = true
export default ElementBlock
