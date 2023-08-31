import React from 'react'
import classnames from 'classnames'
import { Div, Span } from '../../../elements'
import { FormLabel, FormStatus } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import { FormError } from '../types'
import type { FieldProps } from '../field-types'

export type Props = ComponentProps &
  Pick<
    FieldProps,
    | 'layout'
    | 'label'
    | 'labelDescription'
    | 'labelSecondary'
    | 'info'
    | 'warning'
    | 'error'
  > & {
    forId?: string
    contentClassName?: string
    children: React.ReactNode
    /** Width of outer block element */
    width?: 'small' | 'medium' | 'large'
    /** Width of contents block, while label etc can be wider if space is available */
    contentsWidth?: 'small' | 'medium' | 'large' | 'stretch'
  }

function FieldBlock(props: Props) {
  const {
    className,
    forId,
    layout = 'vertical',
    label,
    labelDescription,
    labelSecondary,
    info,
    warning,
    error,
    width,
    contentsWidth,
    contentClassName,
    children,
  } = props

  const cn = classnames(
    'dnb-forms-field-block',
    `dnb-forms-field-block--layout-${layout}`,
    width !== undefined && `dnb-forms-field-block--width-${width}`,
    className,
  )

  return (
    <Div className={cn} {...forwardSpaceProps(props)}>
      {labelDescription || labelSecondary ? (
        <div className={classnames('dnb-forms-field-block__label')}>
          {label || labelDescription ? (
            <FormLabel for_id={forId} space={{ bottom: 'x-small' }}>
              {label}
              {labelDescription && (
                <span className="dnb-forms-field-block__label-description">
                  {labelDescription}
                </span>
              )}
            </FormLabel>
          ) : (
            <>&nbsp;</>
          )}
          {labelSecondary && (
            <Span className="dnb-forms-field-block__label-secondary">
              {labelSecondary}
            </Span>
          )}
        </div>
      ) : (
        label && (
          <FormLabel for_id={forId} space={{ bottom: 'x-small' }}>
            {label}
          </FormLabel>
        )
      )}

      <div
        className={classnames(
          'dnb-forms-field-block__contents',
          contentsWidth !== undefined &&
            `dnb-forms-field-block__contents--width-${contentsWidth}`,
          contentClassName
        )}
      >
        {children}
      </div>

      {error && (
        <div className="dnb-forms-field-block__status">
          <FormStatus
            state="error"
            id={forId ? `${forId}-form-status` : undefined}
            text={error?.message}
            label={label}
            space={{ top: 'x-small' }}
          />
        </div>
      )}
      {warning && (
        <div className="dnb-forms-field-block__status">
          <FormStatus
            state="warn"
            id={forId ? `${forId}-form-status` : undefined}
            text={
              (warning instanceof Error && warning.message) ||
              (warning instanceof FormError && warning.message) ||
              warning?.toString()
            }
            label={label}
            space={{ top: 'x-small' }}
          />
        </div>
      )}
      {info && (
        <div className="dnb-forms-field-block__status">
          <FormStatus
            state="info"
            id={forId ? `${forId}-form-status` : undefined}
            text={
              (info instanceof Error && info.message) ||
              (info instanceof FormError && info.message) ||
              info?.toString()
            }
            label={label}
            space={{ top: 'x-small' }}
          />
        </div>
      )}
    </Div>
  )
}

FieldBlock._supportsEufemiaSpacingProps = true
export default FieldBlock
