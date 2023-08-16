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
  }

export default function FieldBlock(props: Props) {
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
    children,
  } = props

  return (
    <Div
      className={classnames('dnb-forms-field-block', className)}
      {...forwardSpaceProps(props)}
    >
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

      {children}

      {error && (
        <FormStatus text={error?.message} space={{ top: 'x-small' }} />
      )}
      {warning && (
        <FormStatus
          state="warn"
          text={
            (warning instanceof Error && warning.message) ||
            (warning instanceof FormError && warning.message) ||
            info?.toString()
          }
          space={{ top: 'x-small' }}
        />
      )}
      {info && (
        <FormStatus
          state="info"
          text={
            (info instanceof Error && info.message) ||
            (info instanceof FormError && info.message) ||
            info?.toString()
          }
          space={{ top: 'x-small' }}
        />
      )}
    </Div>
  )
}
