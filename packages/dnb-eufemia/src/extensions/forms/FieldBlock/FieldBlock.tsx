import React, { useMemo, useContext, useState, useCallback } from 'react'
import classnames from 'classnames'
import { Space, FormLabel, FormStatus } from '../../../components'
import { FormError, ComponentProps, FieldProps } from '../types'
import FieldBlockContext from './FieldBlockContext'
import { findElementInChildren } from '../../../shared/component-helper'
import type { FormLabelAllProps } from '../../../components/FormLabel'

export type Props = Pick<
  FieldProps,
  | keyof ComponentProps
  | 'layout'
  | 'label'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled'
> & {
  forId?: string
  contentClassName?: string
  children: React.ReactNode
  /** Use true if you have more than one form element */
  asFieldset?: boolean
  /** Width of outer block element */
  width?: false | 'small' | 'medium' | 'large' | 'stretch'
  /** Width of contents block, while label etc can be wider if space is available */
  contentWidth?: 'small' | 'medium' | 'large' | 'stretch'
  /** Typography size */
  size?: 'medium' | 'large'
} & React.HTMLAttributes<HTMLDivElement>

function FieldBlock(props: Props) {
  const nestedFieldBlockContext = useContext(FieldBlockContext)

  const {
    className,
    forId,
    layout = 'vertical',
    label,
    asFieldset,
    info,
    warning,
    error: errorProp,
    disabled,
    width,
    contentWidth,
    size,
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
    (identifier, error) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.setError(identifier, error)
        return
      }

      setFieldErrorRecord((existing) => {
        if (error) {
          return {
            ...existing,
            [identifier]: error,
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [identifier]: removed, ...newRecord } = existing
          return newRecord
        }
      })
    },
    [nestedFieldBlockContext]
  )

  const setShowError = useCallback(
    (identifier, show) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.setShowError(identifier, show)
        return
      }

      setShowFieldErrorRecord((existing) => {
        if (show) {
          return {
            ...existing,
            [identifier]: true,
          }
        } else {
          const { [identifier]: removed, ...newRecord } = existing
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
      .filter(([identifier]) => showFieldErrorRecord[identifier] === true)
      .map(([, error]) => error)
    return errors.length > 0
      ? new Error(errors.map((error) => error.message).join(' | '))
      : undefined
  }, [errorProp, fieldErrorRecord, showFieldErrorRecord])

  const mainClasses = classnames(
    'dnb-forms-field-block',
    width !== undefined && `dnb-forms-field-block--width-${width}`,
    className
  )
  const gridClasses = classnames(
    'dnb-forms-field-block__grid',
    `dnb-forms-field-block--layout-${layout}`
  )

  // A child component with a label was found, use fieldset/legend instead of div/label
  const enableFieldset = useEnableFieldset({
    label,
    asFieldset,
    children,
    nestedFieldBlockContext,
  })

  const state = error || warning || info
  const stateStatus = error
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  const labelProps: FormLabelAllProps = {
    element: enableFieldset ? 'legend' : 'label',
    forId: enableFieldset ? undefined : forId,
    space: { top: 0, bottom: 'x-small' },
    size,
    disabled,
  }

  return (
    <FieldBlockContext.Provider
      value={{
        setError,
        setShowError,
      }}
    >
      <Space
        element={enableFieldset ? 'fieldset' : 'div'} // use fieldset and legend to enhance a11y
        className={mainClasses}
        {...rest}
      >
        <div className={gridClasses}>
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}

          <div
            className={classnames(
              'dnb-forms-field-block__contents',
              contentWidth !== undefined &&
                `dnb-forms-field-block__contents--width-${contentWidth}`,
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
        </div>
      </Space>
    </FieldBlockContext.Provider>
  )
}

function useEnableFieldset({
  label,
  asFieldset,
  children,
  nestedFieldBlockContext,
}) {
  return useMemo(() => {
    if (asFieldset === false) {
      return false
    }

    let result = asFieldset

    if (label && !result && !nestedFieldBlockContext) {
      let count = 0

      findElementInChildren(children, (child: React.ReactElement) => {
        if (
          child?.props?.label ||
          child?.type?.['_formElement'] === true
        ) {
          count++
        }
        if (count > 1) {
          return (result = true)
        }
      })
    }

    return Boolean(result)
  }, [asFieldset, children, label, nestedFieldBlockContext])
}

FieldBlock._supportsSpacingProps = true
export default FieldBlock
