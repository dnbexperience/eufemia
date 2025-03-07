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
import { Path, ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'
import IterateItemContext from '../Iterate/IterateItemContext'
import { convertJsxToString } from '../../../shared/component-helper'
import VisibilityContext from '../Form/Visibility/VisibilityContext'
import Visibility from '../Form/Visibility/Visibility'
import HelpButtonInline, {
  HelpButtonInlineContent,
  HelpProps,
} from '../../../components/help-button/HelpButtonInline'
import useId from '../../../shared/helpers/useId'

/**
 * Props are documented in ValueDocs.ts
 */
export type Props = Omit<ValueProps<unknown>, 'value'> & {
  id?: string

  /** The id to link a element with */
  forId?: string

  /**
   * Provide help content for the value.
   */
  help?: HelpProps

  /**
   * The layout of the value block.
   * (Undocumented for now, as there is only one layout option, vertical.)
   */
  layout?: 'vertical'

  /**
   * Used internally by the Composition component
   */
  composition?: boolean

  /**
   * Used internally by the Composition component
   */
  gap?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | false

  children?: React.ReactNode
}

function ValueBlock(props: Props) {
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)
  const { prerenderFieldProps } = useContext(DataContext) || {}
  const { index: iterateIndex } = useContext(IterateItemContext) || {}

  const id = useId(props.id ?? props.forId)

  const {
    className,
    label: labelProp,
    path,
    itemPath,
    labelSrOnly,
    transformLabel = (label: Props['label']) => label,
    inline,
    maxWidth = props.composition ? props.maxWidth : 'large',
    placeholder,
    showEmpty,
    children,
    composition,
    help,
    layout = 'vertical',
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
  useNotInSummaryList(
    valueBlockContext?.composition ? null : ref,
    label,
    path,
    itemPath
  )

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
    `dnb-forms-value-block__content--gap-${gap === false ? 'none' : gap}`,
    maxWidth && `dnb-forms-value-block--max-width-${maxWidth}`
  )

  const hasHelp = help?.title || help?.content

  if (summaryListContext) {
    const Item = summaryListContext.isNested
      ? Dl
      : summaryListContext.layout === 'horizontal'
      ? Dl.Item
      : Fragment

    if (!label && !hasHelp && valueBlockContext?.composition) {
      content = <span className={defaultClass}>{children}</span> ?? (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )
    } else {
      const { layout } = summaryListContext
      content = (
        <SummaryListContext.Provider
          value={{ ...summaryListContext, isNested: true }}
        >
          <Item>
            <Dt
              className={classnames(
                'dnb-forms-value-block__label',
                ((!label && !hasHelp) || labelSrOnly) && 'dnb-sr-only'
              )}
            >
              <VisibilityWrapper>
                {label && <strong>{label}</strong>}
                {hasHelp && (
                  <HelpButtonInline contentId={`${id}-help`} help={help} />
                )}
              </VisibilityWrapper>
            </Dt>
            <Dd
              className={classnames(
                layout !== 'grid' &&
                  !summaryListContext.isNested &&
                  maxWidth &&
                  `dnb-forms-value-block--max-width-${maxWidth}`,
                compositionClass
              )}
            >
              <VisibilityWrapper>
                {hasHelp && (
                  <HelpButtonInlineContent
                    element="span"
                    contentId={`${id}-help`}
                    className="dnb-forms-value-block__help"
                    help={help}
                    breakout={layout === 'vertical'}
                    outset={layout === 'vertical'}
                  />
                )}
                {children ? (
                  <span className={defaultClass}>{children}</span>
                ) : (
                  <span className="dnb-forms-value-block__placeholder">
                    {placeholder}
                  </span>
                )}
              </VisibilityWrapper>
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
          compositionClass,
          className
        )}
        {...pickSpacingProps(props)}
      >
        {(label || hasHelp) && (
          <FormLabel
            element="strong" // enhance a11y: https://www.w3.org/WAI/WCAG21/Techniques/html/H49
            className={classnames(
              'dnb-forms-value-block__label',
              maxWidth && `dnb-forms-value-block--max-width-${maxWidth}`
            )}
            labelDirection={inline ? 'horizontal' : 'vertical'}
            srOnly={labelSrOnly}
          >
            <span>
              {label && (
                <span className="dnb-forms-value-block__label__content">
                  {label}
                </span>
              )}
              {hasHelp && (
                <HelpButtonInline contentId={`${id}-help`} help={help} />
              )}
            </span>
          </FormLabel>
        )}
        {hasHelp && (
          <HelpButtonInlineContent
            element="span"
            contentId={`${id}-help`}
            className="dnb-forms-value-block__help"
            help={help}
            breakout={layout === 'vertical'}
            outset={layout === 'vertical'}
          />
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
  label?: React.ReactNode,
  path?: Path,
  itemPath?: Path
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
              'Value components as siblings should be wrapped inside a Value.SummaryList:',
              { label, path, itemPath },
            ].filter(Boolean)
          )
        }
      } catch (error) {
        //
      }
    }
  }, [itemPath, label, path, ref])
}

ValueBlock._supportsSpacingProps = true
export default ValueBlock

const transformLabelParameters = {
  convertJsxToString,
} as unknown as Parameters<Props['transformLabel']>[1]

function VisibilityWrapper({ children }) {
  const visibilityContext = useContext(VisibilityContext)

  if (visibilityContext) {
    return (
      <Visibility element="span" {...visibilityContext.props}>
        {children}
      </Visibility>
    )
  }

  return children
}
