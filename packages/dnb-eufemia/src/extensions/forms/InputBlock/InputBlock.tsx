import React from 'react'
import classnames from 'classnames'
import { Div, Span } from '../../../elements'
import { FormLabel, FormStatus } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import { FormError } from '../types'
import type { InputProps } from '../input-types'

export type Props = ComponentProps &
  Pick<
    InputProps,
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

export default function InputBlock(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    forId,
    layout,
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
      className={classnames('dnb-forms-input-block', className)}
      data-testid={dataTestId ?? 'input-block'}
      {...forwardSpaceProps(props)}
    >
      {(label || labelDescription || labelSecondary) && (
        <div className="dnb-forms-input-block__label-block">
          {label || labelDescription ? (
            <FormLabel
              for_id={forId}
              label_direction={layout}
              space={{ bottom: 'x-small' }}
            >
              {label}
              {labelDescription && (
                <span className="dnb-forms-input-block__label-description">
                  {labelDescription}
                </span>
              )}
            </FormLabel>
          ) : (
            <>&nbsp;</>
          )}
          {labelSecondary && (
            <Span
              className="dnb-forms-input-block__label-secondary"
              // space={{ bottom: 'xxx-small' }}
            >
              {labelSecondary}
            </Span>
          )}
        </div>
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
