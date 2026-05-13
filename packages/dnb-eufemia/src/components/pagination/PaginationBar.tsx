/**
 * Web Pagination Component
 *
 */

import {
  Fragment,
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { HTMLProps, ReactElement, ReactNode, RefObject } from 'react'
import clsx from 'clsx'
import {
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'

import {
  calculatePagination,
  getDotsAriaLabel,
} from './PaginationCalculation'
import PaginationContext from './PaginationContext'
import Context from '../../shared/Context'
import Anchor from '../anchor/Anchor'
import type { AnchorAllProps } from '../anchor/Anchor'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import styleProperties from '../../style/themes/ui/properties'
import type { LocaleProps, SpaceTypeAll } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import { applySpacing } from '../space/SpacingUtils'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type PaginationBarProps = {
  /**
   * The title used in every button shown in the bar. Defaults to Side %s.
   */
  buttonTitle?: string

  /**
   *  The title used in the previous page button. Defaults to Forrige side.
   */
  prevTitle?: string

  /**
   *  The title used in the next page button. Defaults to Neste side.
   */
  nextTitle?: string

  /**
   * The title used in the dots. Relevant for screen readers. Defaults to %s flere sider.
   */
  morePages?: string

  /**
   * Reference to the parent component. Used to contain height between updates.
   */
  contentRef?: RefObject<HTMLElement>

  /**
   *  the given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: ReactNode | (() => ReactNode)

  skeleton?: SkeletonShow

  space?: SpaceTypeAll
}

export type PaginationBarAllProps = PaginationBarProps &
  LocaleProps &
  HTMLProps<HTMLElement>

type PaginationBarContext = {
  currentPageInternal: number
  pageCountInternal: number
  disabled: boolean
  transformPaginationButton?: (
    pageNumber: number
  ) => ReactElement<AnchorAllProps | ButtonProps>
  onPageUpdate: (cb: () => void) => void
  setState: (state: { currentPageInternal: number }) => void
  updatePageContent: (currentPageInternal: number) => void
}

const PaginationBar = (localProps: PaginationBarAllProps) => {
  const context = useContext(PaginationContext)

  const props = extendPropsWithContext(
    localProps,
    {},
    context.pagination
  ) as PaginationBarProps & PaginationBarContext

  const {
    currentPageInternal,
    pageCountInternal,
    disabled,
    skeleton,
    space,
    transformPaginationButton,
  } = props

  // because of accessibility
  const focusPage = () => {
    const { onPageUpdate, contentRef } = props

    onPageUpdate(() => {
      try {
        const elem = contentRef.current
        elem.focus()
      } catch (e) {
        //
      }
    })
  }

  const keepPageHeight = () => {
    try {
      const elem = props.contentRef.current
      const pageHeight = elem.offsetHeight
      elem.style.height = `${pageHeight / 16}rem`
      elem.style.minHeight = elem.style.height // because of the "min-height: inherit;" in &__indicator
    } catch (e) {
      //
    }

    const { onPageUpdate } = props

    onPageUpdate(() => {
      try {
        const elem = props.contentRef.current
        elem.style.height = 'auto'
        elem.style.minHeight = elem.style.height
      } catch (e) {
        //
      }
    })
  }

  const setPage = (currentPageInternal: number, event = null) => {
    keepPageHeight()

    const { setState: setContextState, updatePageContent } = props
    setContextState({
      currentPageInternal,
    })
    updatePageContent(currentPageInternal)

    dispatchCustomElementEvent(props, 'onChange', {
      pageNumber: currentPageInternal,
      ...props,
      event,
    })
  }

  const setPrevPage = () => {
    setPage(props.currentPageInternal - 1)
  }
  const setNextPage = () => {
    setPage(props.currentPageInternal + 1)
  }

  const clickHandler = ({ pageNumber, event }) => {
    setPage(pageNumber, event)
    focusPage()
  }

  const { getTranslation } = useContext(Context)
  const { buttonTitle, prevTitle, nextTitle, morePages } =
    extendPropsWithContext(
      props,
      {},
      getTranslation(props as LocaleProps).Pagination
    )

  const prevIsDisabled =
    currentPageInternal > -1 ? currentPageInternal === 1 : true
  const nextIsDisabled =
    currentPageInternal > -1
      ? currentPageInternal === pageCountInternal ||
        pageCountInternal === 0
      : true

  const paginationBarRef = useRef<HTMLDivElement>(null)
  const currentScreenSize = useResizeObserver(paginationBarRef)

  const pageNumberGroups = calculatePagination(
    pageCountInternal,
    currentPageInternal,
    currentScreenSize === 'small'
  )

  const renderPageButton = (
    pageNumber: number,
    extraClassName?: string
  ) => {
    const isCurrent = pageNumber === currentPageInternal
    const label = buttonTitle.replace('%s', String(pageNumber))

    if (transformPaginationButton) {
      const element = transformPaginationButton(pageNumber)

      if (isCurrent && element.type === Anchor) {
        return (
          <span
            key={pageNumber}
            className={clsx(
              'dnb-pagination__button',
              'dnb-pagination__button--current',
              extraClassName
            )}
            aria-label={label}
            aria-current="page"
          >
            {String(pageNumber)}
          </span>
        )
      }

      return cloneElement(element, {
        key: pageNumber,
        className: clsx(
          'dnb-pagination__button',
          isCurrent && 'dnb-pagination__button--current',
          extraClassName,
          element.props.className
        ),
        'aria-label': label,
        'aria-current': isCurrent ? 'page' : undefined,
        ...(element.type === Button && {
          variant: isCurrent ? 'primary' : 'secondary',
          disabled,
          skeleton,
        }),
        onClick: (event: React.MouseEvent) => {
          element.props.onClick?.(event as never)
          clickHandler({ pageNumber, event })
        },
        children: String(pageNumber),
      })
    }

    return (
      <Button
        key={pageNumber}
        className={clsx('dnb-pagination__button', extraClassName)}
        text={String(pageNumber)}
        aria-label={label}
        variant={isCurrent ? 'primary' : 'secondary'}
        disabled={disabled}
        skeleton={skeleton}
        aria-current={isCurrent ? 'page' : null}
        onClick={(event) => clickHandler({ pageNumber, event })}
      />
    )
  }

  const isButtonTransform =
    transformPaginationButton &&
    transformPaginationButton(1).type === Button

  const renderPrevButton = () => {
    if (transformPaginationButton && !isButtonTransform) {
      if (prevIsDisabled) {
        return null
      }

      const prevPage = currentPageInternal - 1
      const element = transformPaginationButton(prevPage)

      return cloneElement(element, {
        key: 'left-arrow',
        className: clsx(
          'dnb-pagination__button',
          'dnb-pagination__button--prev',
          element.props.className
        ),
        'aria-label': prevTitle,
        onClick: (event: React.MouseEvent) => {
          element.props.onClick?.(event as never)
          setPrevPage()
        },
        children: <IconPrimary icon="chevron_left" />,
      })
    }

    return (
      <Button
        key="left-arrow"
        disabled={disabled || prevIsDisabled}
        skeleton={skeleton}
        variant="tertiary"
        icon="chevron_left"
        iconPosition="left"
        text={prevTitle}
        onClick={setPrevPage}
        title={prevIsDisabled ? null : prevTitle}
      />
    )
  }

  const renderNextButton = () => {
    if (transformPaginationButton && !isButtonTransform) {
      if (nextIsDisabled) {
        return null
      }

      const nextPage = currentPageInternal + 1
      const element = transformPaginationButton(nextPage)

      return cloneElement(element, {
        key: 'right-arrow',
        className: clsx(
          'dnb-pagination__button',
          'dnb-pagination__button--next',
          element.props.className
        ),
        'aria-label': nextTitle,
        onClick: (event: React.MouseEvent) => {
          element.props.onClick?.(event as never)
          setNextPage()
        },
        children: <IconPrimary icon="chevron_right" />,
      })
    }

    return (
      <Button
        key="right-arrow"
        disabled={disabled || nextIsDisabled}
        skeleton={skeleton}
        variant="tertiary"
        icon="chevron_right"
        iconPosition="right"
        text={nextTitle}
        onClick={setNextPage}
        title={nextIsDisabled ? null : nextTitle}
      />
    )
  }

  return (
    <div
      ref={paginationBarRef}
      {...applySpacing(
        { space },
        {
          className: clsx(
            'dnb-pagination__bar',
            pageCountInternal >= 8 && 'dnb-pagination--many-pages'
          ),
        }
      )}
    >
      <div className="dnb-pagination__bar__wrapper">
        {(!transformPaginationButton || isButtonTransform) && (
          <div className="dnb-pagination__bar__skip">
            {renderPrevButton()}
            {renderNextButton()}
          </div>
        )}

        <div className="dnb-pagination__bar__inner">
          {transformPaginationButton &&
            !isButtonTransform &&
            renderPrevButton()}

          {(pageNumberGroups?.[0] || []).map((pageNumber) =>
            renderPageButton(pageNumber)
          )}

          {pageNumberGroups.slice(1).map((numbersList, idx) => (
            <Fragment key={idx}>
              <IconPrimary
                role="separator"
                aria-orientation="vertical"
                aria-hidden={false}
                title={getDotsAriaLabel({
                  morePages,
                  numbersList,
                  pageNumberGroups,
                })}
                className="dnb-pagination__dots"
                icon="more"
                size="medium"
              />

              {numbersList.map((pageNumber) =>
                renderPageButton(
                  pageNumber,
                  String(pageNumber).length > 3
                    ? 'dnb-pagination__button--large-number'
                    : undefined
                )
              )}
            </Fragment>
          ))}

          {transformPaginationButton &&
            !isButtonTransform &&
            renderNextButton()}
        </div>
      </div>

      <span className="dnb-sr-only" aria-live="assertive">
        {buttonTitle.replace('%s', String(currentPageInternal))}
      </span>
    </div>
  )
}

export const useResizeObserver = (element) => {
  const [currentSize, setSize] = useState('large')
  const resizeObserver = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    try {
      const handleSizeChange = (width) => {
        if (width <= getSizeInPx('small') && currentSize !== 'small') {
          setSize('small')
        } else if (
          width <= getSizeInPx('medium') &&
          currentSize !== 'medium'
        ) {
          setSize('medium')
        } else if (
          width <= getSizeInPx('large') &&
          currentSize !== 'large'
        ) {
          setSize('large')
        } else if (
          width <= getSizeInPx('x-large') &&
          currentSize !== 'x-large'
        ) {
          setSize('x-large')
        } else if (
          width <= getSizeInPx('xx-large') &&
          currentSize !== 'xx-large'
        ) {
          setSize('xx-large')
        }
      }

      // eslint-disable-next-line compat/compat
      resizeObserver.current = new ResizeObserver((entries) => {
        handleSizeChange(entries[0].contentRect.width)
      })

      resizeObserver.current?.observe(element.current)
      handleSizeChange(element.current.clientWidth)
    } catch (e) {
      //
    }

    return () => {
      resizeObserver.current?.disconnect()
    }
  }, [element]) // eslint-disable-line

  return currentSize
}

const getSizeInPx = (size) => {
  const styleSize = styleProperties[`--layout-${size}`]

  if (styleSize.includes('em')) {
    return parseFloat(styleSize.replace(/(rem|em)$/, '')) * 16
  }

  return parseFloat(styleSize.replace(/(px)$/, ''))
}

withComponentMarkers(PaginationBar, {
  _supportsSpacingProps: true,
})

export default PaginationBar
