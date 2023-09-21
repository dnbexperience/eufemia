import React, { useMemo, useContext, useState, useCallback } from 'react'
import classnames from 'classnames'
import { Space, FormLabel, FormStatus } from '../../../components'
import { FormError, ComponentProps, FieldProps } from '../types'
import FieldBlockContext from './FieldBlockContext'
import { findElementInChildren } from '../../../shared/component-helper'

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
  width?: false | 'small' | 'medium' | 'large'
  /** Width of contents block, while label etc can be wider if space is available */
  contentsWidth?: 'small' | 'medium' | 'large' | 'stretch'
} & React.HTMLAttributes<HTMLDivElement>

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
    ...rest
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

  // A child component with a label was found, use fieldset/legend instead of div/label
  const enableFieldset = findElementInChildren(
    children,
    (child: React.ReactElement) => child.props.label
  )

  const state = error || warning || info
  const stateStatus = error
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  return (
    <FieldBlockContext.Provider
      value={{
        setError,
        setShowError,
      }}
    >
      <Space
        element={enableFieldset ? 'fieldset' : 'div'} // use fieldset and legend to enhance a11y
        className={cn}
        {...rest}
      >
        {labelDescription || labelSecondary ? (
          <div className="dnb-forms-field-block__label">
            {label || labelDescription ? (
              <FormLabel
                element={enableFieldset ? 'legend' : 'label'}
                for_id={forId}
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
              <span className="dnb-forms-field-block__label-secondary">
                {labelSecondary}
              </span>
            )}
          </div>
        ) : (
          label && (
            <FormLabel
              element={enableFieldset ? 'legend' : 'label'}
              for_id={forId}
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
            contentClassName
          )}
        >
          {children}
        </div>

        {stateStatus && (
          <div className="dnb-forms-field-block__status">
            <FormStatus
              state={stateStatus}
              id={forId ? `${forId}-form-status` : undefined}
              text={
                error?.message ||
                (state instanceof Error && state.message) ||
                (state instanceof FormError && state.message) ||
                state?.toString()
              }
              label={label as string}
              space={{ top: 'x-small' }}
            />
          </div>
        )}
      </Space>
    </FieldBlockContext.Provider>
  )
}

FieldBlock._supportsEufemiaSpacingProps = true
export default FieldBlock
