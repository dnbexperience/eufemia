import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'
import { Flex, HeightAnimation } from '../../../../components'
import IterateElementContext, {
  IterateElementContextState,
} from '../IterateElementContext'
import ElementBlockContext from './ElementBlockContext'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { ContainerMode } from '../Array/types'

export type Props = {
  mode: ContainerMode
  open?: boolean | undefined
  ariaLabel?: string
  openDelay?: number
}

function ElementBlock(props: Props & FlexContainerProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const contextRef = useRef<IterateElementContextState>()
  contextRef.current = useContext(IterateElementContext)
  const { handleRemove, containerMode, isNew, hasError } =
    contextRef.current ?? {}

  const {
    mode,
    open,
    ariaLabel,
    onAnimationEnd,
    className,
    children,
    openDelay = 100,
    ...restProps
  } = props

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

  // - Remove the block with animation, if it's in the right mode
  const handleAnimationEnd = useCallback(
    (state) => {
      const preventFocusOnErrorOpening = !contextRef.current?.hasError
      if (preventFocusOnErrorOpening) {
        if (state === 'opened') {
          contextRef.current?.elementRef?.current?.focus?.()
        } else {
          // Wait until the element is removed, then check if we can set focus
          window.requestAnimationFrame(() => {
            // try to focus on the second last element
            try {
              if (
                // But not when we focus is already inside our element
                !document.activeElement?.closest(
                  '.dnb-form-iterate__element'
                )
              ) {
                const elements =
                  contextRef.current?.containerRef.current.querySelectorAll<HTMLDivElement>(
                    '.dnb-form-iterate__element'
                  )
                elements[elements.length - 1].focus()
              }
            } catch (e) {
              /**/
            }
          })
        }
      }

      if (!openRef.current && isRemoving.current) {
        isRemoving.current = false
        contextRef.current?.fulfillRemove?.()
      }

      onAnimationEnd?.(state)
    },
    [onAnimationEnd]
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
          'dnb-form-iterate-block',
          isNew && 'dnb-form-iterate-block--new',
          hasError && 'dnb-form-iterate-block--error',
          className
        )}
        open={openRef.current}
        onAnimationEnd={handleAnimationEnd}
        duration={450}
        keepInDOM // Ensure fields get mounted so they will sync with the data context
      >
        <Flex.Vertical
          className="dnb-form-iterate-block__inner"
          {...restProps}
          element="section"
          aria-label={ariaLabel}
        >
          {children}
        </Flex.Vertical>
      </HeightAnimation>
    </ElementBlockContext.Provider>
  )
}

ElementBlock._supportsSpacingProps = true
export default ElementBlock
