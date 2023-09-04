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
    children: React.ReactNode
    /** Width of outer block element */
    width?: 'medium' | 'large'
    /** Width of contents block, while label etc can be wider if space is available */
    contentsWidth?: 'medium' | 'large' | 'stretch'
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
    children,
  } = props

  const cn = classnames(
    'dnb-forms-field-block',
    width !== undefined && `dnb-forms-field-block--width-${width}`,
    className,
  )

  return (
    <Div className={cn} {...forwardSpaceProps(props)}>
      {labelDescription || labelSecondary ? (
        <div className="dnb-forms-field-block__label-block">
          {label || labelDescription ? (
            <FormLabel
              for_id={forId}
              label_direction={layout}
              space={{ bottom: 'x-small' }}
            >
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
          <FormLabel
            for_id={forId}
            label_direction={layout}
            space={{ bottom: 'x-small' }}
          >
            {label}
          </FormLabel>
        )
      )}

      <div
        className={classnames(
          'dnb-forms-field-block__contents',
          contentsWidth !== undefined &&
            `dnb-forms-field-block__contents--width-${contentsWidth}`,
        )}
      >
        {children}
      </div>

      {error && (
        <FormStatus
          state="error"
          id={forId ? `${forId}-form-status` : undefined}
          text={error?.message}
          label={label}
          space={{ top: 'x-small' }}
        />
      )}
      {warning && (
        <FormStatus
          state="warn"
          id={forId ? `${forId}-form-status` : undefined}
          text={
            (warning instanceof Error && warning.message) ||
            (warning instanceof FormError && warning.message) ||
            info?.toString()
          }
          label={label}
          space={{ top: 'x-small' }}
        />
      )}
      {info && (
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
      )}
    </Div>
  )
}

FieldBlock._supportsEufemiaSpacingProps = true
export default FieldBlock
