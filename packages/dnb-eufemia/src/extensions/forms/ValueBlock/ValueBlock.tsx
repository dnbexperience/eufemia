import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classnames from 'classnames'
import { warn } from '../../../shared/helpers'
import { Dd, Dl, Dt, Span } from '../../../elements'
import { FormLabel } from '../../../components'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'
import ValueBlockContext from './ValueBlockContext'
import DataContext from '../DataContext/Context'
import { ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'
import IterateElementContext from '../Iterate/IterateItemContext'
import { convertJsxToString } from '../../../shared/component-helper'

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
  const { prerenderFieldProps } = useContext(DataContext) || {}
  const { index: iterateIndex } = useContext(IterateElementContext) || {}

  const {
    className,
    label: labelProp,
    labelSrOnly,
    transformLabel = (label: Props['label']) => label,
    inline,
    maxWidth = props.composition ? props.maxWidth : 'large',
    placeholder,
    showEmpty,
    children,
    composition,
    gap = 'xx-small',
  } = props

  const label = useMemo(() => {
    if (inline) {
      return null
    }

    let label = labelProp

    if (iterateIndex !== undefined) {
      label = convertJsxToString(labelProp).replace(
        '{itemNo}',
        String(iterateIndex + 1)
      )
    }

    return transformLabel(label, transformLabelParameters)
  }, [inline, iterateIndex, labelProp, transformLabel])

  const ref = useRef<HTMLElement>(null)
  useNotInSummaryList(valueBlockContext?.composition ? null : ref, label)

  const hide =
    prerenderFieldProps ||
    ((children === undefined || children === null || children === false) &&
      !showEmpty &&
      !placeholder)

  if (hide) {
    return <></>
  }

  let content = null

  const compositionClass =
    composition &&
    classnames(
      `dnb-forms-value-block__composition--${
        composition === true ? 'horizontal' : composition
      }`
    )
  const defaultClass = classnames(
    'dnb-forms-value-block__content',
    `dnb-forms-value-block__content--gap-${gap === false ? 'none' : gap}`
  )

  if (summaryListContext) {
    const Item = summaryListContext.isNested
      ? Dl
      : summaryListContext.layout === 'horizontal'
      ? Dl.Item
      : Fragment

    if (!label && valueBlockContext?.composition) {
      content = <span className={defaultClass}>{children}</span> ?? (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )
    } else {
      content = (
        <SummaryListContext.Provider
          value={{ ...summaryListContext, isNested: true }}
        >
          <Item>
            <Dt
              className={classnames(
                'dnb-forms-value-block__label',
                (!label || labelSrOnly) && 'dnb-sr-only'
              )}
            >
              {label && <strong>{label}</strong>}
            </Dt>
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
                <span className={defaultClass}>{children}</span>
              ) : (
                <span className="dnb-forms-value-block__placeholder">
                  {placeholder}
                </span>
              )}
            </Dd>
          </Item>
        </SummaryListContext.Provider>
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
          <span className={defaultClass}>{children}</span>
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

const transformLabelParameters = {
  convertJsxToString,
} as unknown as Parameters<Props['transformLabel']>[1]
