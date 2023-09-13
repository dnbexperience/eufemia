import React, { useMemo, useContext, useState, useCallback } from 'react'
import classnames from 'classnames'
import { Div, Span } from '../../../elements'
import { FormLabel, FormStatus } from '../../../components'
import {
  FormError,
  ComponentProps,
  FieldProps,
  pickSpacingProps,
} from '../types'
import FieldBlockContext from './FieldBlockContext'

export type Props = Pick<
  FieldProps,
  | keyof ComponentProps
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
  const nestedFieldBlockContext = useContext(FieldBlockContext)

  const {
    className,
    forId,
    layout = 'vertical',
    label,
    labelDescription,
    labelSecondary,
    info,
    warning,
    error: errorProp,
    width,
    contentsWidth,
    contentClassName,
    children,
  } = props

  const [fieldErrorRecord, setFieldErrorRecord] = useState<
    Record<string, FormError>
  >({})
  const [showFieldErrorRecord, setShowFieldErrorRecord] = useState<
    Record<string, boolean>
  >({})

  const setError = useCallback(
    (id, error) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.setError(id, error)
        return
      }

      setFieldErrorRecord((existing) => {
        if (error) {
          return {
            ...existing,
            [id]: error,
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: removed, ...newRecord } = existing
          return newRecord
        }
      })
    },
    [nestedFieldBlockContext]
  )

  const setShowError = useCallback(
    (id, show) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.setShowError(id, show)
        return
      }

      setShowFieldErrorRecord((existing) => {
        if (show) {
          return {
            ...existing,
            [id]: true,
          }
        } else {
          const { [id]: removed, ...newRecord } = existing
          return newRecord
        }
      })
    },
    [nestedFieldBlockContext]
  )

  const error = useMemo(() => {
    if (errorProp) {
      return errorProp
    }
    const errors = Object.entries(fieldErrorRecord)
      .filter(([id]) => showFieldErrorRecord[id] === true)
      .map(([, error]) => error)
    return errors.length > 0
      ? new Error(errors.map((error) => error.message).join(' | '))
      : undefined
  }, [errorProp, fieldErrorRecord, showFieldErrorRecord])

  const cn = classnames(
    'dnb-forms-field-block',
    `dnb-forms-field-block--layout-${layout}`,
    width !== undefined && `dnb-forms-field-block--width-${width}`,
    className
  )

  return (
    <FieldBlockContext.Provider
      value={{
        setError,
        setShowError,
      }}
    >
      <Div className={cn} {...pickSpacingProps(props)}>
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

        {(error && (
          <div className="dnb-forms-field-block__status">
            <FormStatus
              state="error"
              id={forId ? `${forId}-form-status` : undefined}
              text={error?.message}
              label={label}
              space={{ top: 'x-small' }}
            />
          </div>
        )) ||
          (warning && (
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
          )) ||
          (info && (
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
          ))}
      </Div>
    </FieldBlockContext.Provider>
  )
}

FieldBlock._supportsEufemiaSpacingProps = true
export default FieldBlock
