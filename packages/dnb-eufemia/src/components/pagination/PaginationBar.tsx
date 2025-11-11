/**
 * Web Pagination Component
 *
 */

import React, { useContext, useRef, useEffect, useState } from 'react'
import classnames from 'classnames'
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
import Button from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import styleProperties from '../../style/themes/theme-ui/properties'
import { LocaleProps, SpaceTypeAll } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import { createSpacingClasses } from '../space/SpacingUtils'

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
  contentRef?: React.RefObject<HTMLElement>

  /**
   *  the given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: React.ReactNode | (() => React.ReactNode)

  skeleton: SkeletonShow

  space?: SpaceTypeAll
}

export type PaginationBarAllProps = PaginationBarProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>

type PaginationBarContext = {
  currentPageInternal: number
  pageCountInternal: number
  disabled: boolean
  onPageUpdate: (cb: () => void) => void
  setState: (state: { currentPageInternal: number }) => void
  updatePageContent: (currentPageInternal: number) => void
}

const defaultProps = {
  buttonTitle: null,
  prevTitle: null,
  nextTitle: null,
  morePages: null,
  contentRef: null,
  children: null,
  space: null,
}

const PaginationBar = (localProps: PaginationBarAllProps) => {
  const context = useContext(PaginationContext)

  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.pagination
  ) as PaginationBarProps & PaginationBarContext

  const {
    currentPageInternal,
    pageCountInternal,
    disabled,
    skeleton,
    space,
  } = props

  const spacingClasses = createSpacingClasses({ space })

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
      defaultProps,
      getTranslation(props as LocaleProps).Pagination
    )

  const prevIsDisabled =
    currentPageInternal > -1 ? currentPageInternal === 1 : true
  const nextIsDisabled =
    currentPageInternal > -1
      ? currentPageInternal === pageCountInternal ||
        pageCountInternal === 0
      : true

  const paginationBarRef = useRef(null)
  const currentScreenSize = useResizeObserver(paginationBarRef)

  const pageNumberGroups = calculatePagination(
    pageCountInternal,
    currentPageInternal,
    currentScreenSize === 'small'
  )

  return (
    <div
      ref={paginationBarRef}
      className={classnames(
        'dnb-pagination__bar',
        pageCountInternal >= 8 && 'dnb-pagination--many-pages',
        spacingClasses
      )}
    >
      <div className="dnb-pagination__bar__wrapper">
        <div className="dnb-pagination__bar__skip">
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
        </div>

        <div className="dnb-pagination__bar__inner">
          {(pageNumberGroups?.[0] || []).map((pageNumber) => (
            <Button
              key={pageNumber}
              className="dnb-pagination__button"
              text={String(pageNumber)}
              aria-label={buttonTitle.replace('%s', String(pageNumber))}
              variant={
                pageNumber === currentPageInternal
                  ? 'primary'
                  : 'secondary'
              }
              disabled={disabled}
              skeleton={skeleton}
              aria-current={
                pageNumber === currentPageInternal ? 'page' : null
              }
              onClick={(event) => clickHandler({ pageNumber, event })}
            />
          ))}

          {pageNumberGroups.slice(1).map((numbersList, idx) => (
            <React.Fragment key={idx}>
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

              {numbersList.map((pageNumber) => {
                return (
                  <Button
                    key={(pageNumber || 0) + idx}
                    className={classnames(
                      'dnb-pagination__button',
                      String(pageNumber).length > 3
                        ? 'dnb-pagination__button--large-number'
                        : null
                    )}
                    text={String(pageNumber)}
                    aria-label={buttonTitle.replace(
                      '%s',
                      String(pageNumber)
                    )}
                    variant={
                      pageNumber === currentPageInternal
                        ? 'primary'
                        : 'secondary'
                    }
                    disabled={disabled}
                    skeleton={skeleton}
                    aria-current={
                      pageNumber === currentPageInternal ? 'page' : null
                    }
                    onClick={(event) =>
                      clickHandler({ pageNumber, event })
                    }
                  />
                )
              })}
            </React.Fragment>
          ))}
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
  const resizeObserver = useRef(null)

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

PaginationBar._supportsSpacingProps = true

export default PaginationBar
