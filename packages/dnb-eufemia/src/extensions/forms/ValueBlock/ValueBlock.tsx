import React, { Fragment, useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { warn } from '../../../shared/helpers'
import { Dd, Dl, Dt, Span } from '../../../elements'
import { FormLabel } from '../../../components'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'
import { ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'
import ValueBlockContext from './ValueBlockContext'

/**
 * Props are documented in ValueDocs.ts
 */
export type Props = Omit<ValueProps<unknown>, 'value'> & {
  children?: React.ReactNode

  /**
   * Used internally by the Composition component
   */
  composition?: boolean

  /**
   * Used internally by the Composition component
   */
  gap?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | false
}

function ValueBlock(props: Props) {
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)

  const {
    className,
    label: labelProp,
    inline,
    maxWidth = props.composition ? props.maxWidth : 'large',
    placeholder,
    showEmpty,
    children,
    composition,
    gap = 'xx-small',
  } = props

  const label = inline ? null : labelProp

  const ref = useRef<HTMLElement>(null)
  useNotInSummaryList(valueBlockContext?.composition ? null : ref, label)

  if (
    (children === undefined || children === null || children === false) &&
    !showEmpty &&
    !placeholder
  ) {
    return null
  }

  let content = null

  const compositionClass =
    composition &&
    classnames(
      `dnb-forms-value-block__composition--${
        composition === true ? 'horizontal' : composition
      }`
    )

  if (summaryListContext) {
    const Element = summaryListContext.isNested
      ? Dl
      : summaryListContext.layout === 'horizontal'
      ? Dl.Item
      : Fragment

    if (!label && valueBlockContext?.composition) {
      content = (
        <span
          className={classnames(
            'dnb-forms-value-block__content',
            gap && `dnb-forms-value-block__content--gap-${gap}`
          )}
        >
          {children}
        </span>
      ) ?? (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )
    } else {
      content = (
        <Element>
          <SummaryListContext.Provider
            value={{ ...summaryListContext, isNested: true }}
          >
            {label && (
              <Dt className="dnb-forms-value-block__label">
                <strong>{label}</strong>
              </Dt>
            )}
            <Dd
              className={classnames(
                summaryListContext.layout !== 'grid' &&
                  !summaryListContext.isNested &&
                  maxWidth &&
                  `dnb-forms-value-block--max-width-${maxWidth}`,
                compositionClass
              )}
            >
              {children ? (
                <span
                  className={classnames(
                    'dnb-forms-value-block__content',
                    gap && `dnb-forms-value-block__content--gap-${gap}`
                  )}
                >
                  {children}
                </span>
              ) : (
                <span className="dnb-forms-value-block__placeholder">
                  {placeholder}
                </span>
              )}
            </Dd>
          </SummaryListContext.Provider>
        </Element>
      )
    }
  } else {
    content = (
      <Span
        ref={ref}
        className={classnames(
          'dnb-forms-value-block',
          inline && 'dnb-forms-value-block--inline',
          maxWidth && `dnb-forms-value-block--max-width-${maxWidth}`,
          compositionClass,
          className
        )}
        {...pickSpacingProps(props)}
      >
        {label && (
          <FormLabel
            element="strong" // enhance a11y: https://www.w3.org/WAI/WCAG21/Techniques/html/H49
            className="dnb-forms-value-block__label"
            labelDirection={inline ? 'horizontal' : 'vertical'}
          >
            {label}
          </FormLabel>
        )}
        {children ? (
          <span
            className={classnames(
              'dnb-forms-value-block__content',
              gap && `dnb-forms-value-block__content--gap-${gap}`
            )}
          >
            {children}
          </span>
        ) : (
          <span className="dnb-forms-value-block__placeholder">
            {placeholder}
          </span>
        )}
      </Span>
    )
  }

  return (
    <ValueBlockContext.Provider value={props}>
      {content}
    </ValueBlockContext.Provider>
  )
}

function useNotInSummaryList(
  ref: React.RefObject<HTMLElement>,
  label?: React.ReactNode
) {
  useEffect(() => {
    if (ref?.current) {
      try {
        const sibling = ref.current.previousElementSibling

        if (
          sibling?.classList.contains('dnb-forms-value-block') &&
          !ref.current.closest('.dnb-forms-summary-list')
        ) {
          warn.apply(
            warn,
            [
              'Value components as siblings should be wrapped inside a Value.SummaryList!',
              label,
            ].filter(Boolean)
          )
        }
      } catch (error) {
        //
      }
    }
  }, [label, ref])
}

ValueBlock._supportsSpacingProps = true
export default ValueBlock
