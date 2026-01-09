import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classnames from 'classnames'
import { warn } from '../../../shared/helpers'
import { Dd, Dl, Dt, Span } from '../../../elements'
import type { DlProps } from '../../../elements/Dl'
import { FormLabel } from '../../../components'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'
import ValueProviderContext from '../Value/Provider/ValueProviderContext'
import ValueBlockContext from './ValueBlockContext'
import DataContext from '../DataContext/Context'
import type { Path, ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'
import IterateItemContext from '../Iterate/IterateItemContext'
import { replaceItemNo } from '../Iterate/ItemNo'
import { convertJsxToString } from '../../../shared/component-helper'
import VisibilityContext from '../Form/Visibility/VisibilityContext'
import Visibility from '../Form/Visibility/Visibility'
import type {
  HelpProps} from '../../../components/help-button/HelpButtonInline';
import HelpButtonInline, {
  HelpButtonInlineContent
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

function ValueBlock(localProps: Props) {
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)
  const { prerenderFieldProps } = useContext(DataContext) || {}
  const { index: iterateIndex } = useContext(IterateItemContext) || {}

  const { extend } = useContext(ValueProviderContext)
  const props = extend(localProps)

  const id = useId(props.id ?? props.forId)
  const defaultLayout = summaryListContext?.isNested
    ? 'horizontal'
    : 'vertical'

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
    layout = defaultLayout,
    gap = 'xx-small',
  } = props

  const label = useMemo(() => {
    if (inline) {
      return null
    }

    let label = labelProp

    if (iterateIndex !== undefined) {
      label = replaceItemNo(labelProp, iterateIndex)
    }

    const canRenderToString = React.isValidElement(label)
      ? typeof (label as any).type === 'string' // Not a custom component
      : true

    return canRenderToString
      ? transformLabel(label, transformLabelParameters)
      : label
  }, [inline, iterateIndex, labelProp, transformLabel])

  const hide =
    prerenderFieldProps ||
    (isValueEmpty(children) && !showEmpty && !placeholder)
  const hasHelp = help?.title || help?.content
  const isComposition = composition === true
  const isCompositionInContext = valueBlockContext?.composition
  const isCompositionInContextWithoutLabel =
    !label && isCompositionInContext

  const ref = useRef<HTMLElement>(null)
  useNotInSummaryList(
    isCompositionInContext ? null : ref,
    label,
    path,
    itemPath
  )

  const summaryListLayout = summaryListContext?.layout
  const getHelpContent = useCallback(
    (layout: DlProps['layout'], { renderOnNextLine = false } = {}) => {
      const breakout =
        layout === 'vertical' || summaryListLayout === 'vertical'
      const content = hasHelp && (
        <HelpButtonInlineContent
          element="span"
          contentId={`${id}-help`}
          className="dnb-forms-value-block__help"
          help={help}
          breakout={breakout}
          outset={breakout}
        />
      )

      return hasHelp && renderOnNextLine ? (
        <span className="dnb-forms-value-block__help--next-line">
          {content}
        </span>
      ) : (
        content
      )
    },
    [hasHelp, help, id, summaryListLayout]
  )

  let content = null

  const defaultClass = classnames(
    'dnb-forms-value-block__content',
    `dnb-forms-value-block__content--gap-${gap === false ? 'none' : gap}`,
    maxWidth && `dnb-forms-value-block__content--max-width-${maxWidth}`
  )
  const compositionClass =
    isComposition && 'dnb-forms-value-block__composition--horizontal'

  if (hide) {
    return <></>
  }

  if (summaryListContext && !isCompositionInContextWithoutLabel) {
    const Item = summaryListContext.isNested
      ? Dl
      : summaryListContext.layout === 'horizontal'
      ? Dl.Item
      : Fragment

    if (!label && !hasHelp && isCompositionInContext) {
      content = children ? (
        <span className={defaultClass}>{children}</span>
      ) : (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )
    } else {
      const defaultLayout =
        isCompositionInContext && label ? 'horizontal' : 'vertical'
      const { layout = defaultLayout } = summaryListContext

      content = (
        <SummaryListContext.Provider
          value={{ ...summaryListContext, isNested: true }}
        >
          <Item>
            <Dt
              className={classnames(
                'dnb-forms-value-block__label',
                ((!label && !hasHelp) || labelSrOnly) && 'dnb-sr-only',
                className
              )}
            >
              <VisibilityWrapper>
                {label && <strong>{label}</strong>}
                {hasHelp && (
                  <span className="dnb-help-button__word-joiner">
                    <HelpButtonInline
                      contentId={`${id}-help`}
                      help={help}
                    />
                  </span>
                )}
              </VisibilityWrapper>
            </Dt>
            <Dd
              className={classnames(
                compositionClass,
                maxWidth &&
                  `dnb-forms-value-block__content--max-width-${maxWidth}`
              )}
            >
              <VisibilityWrapper>
                {!isCompositionInContextWithoutLabel
                  ? getHelpContent(layout)
                  : null}
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
          {isCompositionInContextWithoutLabel && hasHelp
            ? getHelpContent(layout, { renderOnNextLine: true })
            : null}
        </SummaryListContext.Provider>
      )
    }
  } else {
    content = (
      <>
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
              className={classnames('dnb-forms-value-block__label')}
              labelDirection={inline ? 'horizontal' : 'vertical'}
              srOnly={labelSrOnly}
            >
              {label && (
                <span className="dnb-forms-value-block__label__content">
                  {label}
                </span>
              )}
              {hasHelp && (
                <span className="dnb-help-button__word-joiner">
                  <HelpButtonInline contentId={`${id}-help`} help={help} />
                </span>
              )}
            </FormLabel>
          )}
          {!isCompositionInContextWithoutLabel
            ? getHelpContent(layout)
            : null}
          {children ? (
            <span className={defaultClass}>{children}</span>
          ) : (
            <span className="dnb-forms-value-block__placeholder">
              {placeholder}
            </span>
          )}
        </Span>

        {isCompositionInContextWithoutLabel && hasHelp
          ? getHelpContent(layout, { renderOnNextLine: true })
          : null}
      </>
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

export function isValueEmpty(value: unknown) {
  return value === undefined || value === null || value === false
}
