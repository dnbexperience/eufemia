import React, { useState, useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { FormError, ComponentProps, FieldProps } from '../types'
import { forwardSpaceProps } from '../utils'
import FieldBlock from '../FieldBlock'

export interface FieldGroupContextState {
  setFieldError?: (id: string, error: FormError) => void
  setShowFieldError?: (id: string, showError: boolean) => void
}

export const FieldGroupContext = React.createContext<
  FieldGroupContextState | undefined
>(undefined)

export type Props = Pick<
  FieldProps,
  | keyof ComponentProps
  | 'label'
  | 'labelDescription'
  | 'labelSecondary'
  | 'info'
  | 'warning'
  | 'error'
> & {
  children: React.ReactNode
}

function FieldGroup(props: Props) {
  const {
    className,
    label,
    labelDescription,
    labelSecondary,
    info,
    warning,
    error,
    children,
  } = props

  const [fieldErrorRecord, setFieldErrorRecord] = useState<
    Record<string, FormError>
  >({})
  const [showFieldErrorRecord, setShowFieldErrorRecord] = useState<
    Record<string, boolean>
  >({})

  const setFieldError = useCallback((id, error) => {
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
  }, [])

  const setShowFieldError = useCallback((id, show) => {
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
  }, [])

  const blockError = useMemo(() => {
    const errors = Object.entries(fieldErrorRecord)
      .filter(([id]) => showFieldErrorRecord[id] === true)
      .map(([, error]) => error)
    return errors.length > 0
      ? new Error(errors.map((error) => error.message).join(' | '))
      : undefined
  }, [fieldErrorRecord, showFieldErrorRecord])

  return (
    <FieldGroupContext.Provider
      value={{
        setFieldError,
        setShowFieldError,
      }}
    >
      <FieldBlock
        className={classnames('dnb-forms-field-group', className)}
        label={label}
        labelDescription={labelDescription}
        labelSecondary={labelSecondary}
        info={info}
        warning={warning}
        error={error ?? blockError}
        {...forwardSpaceProps(props)}
      >
        {children}
      </FieldBlock>
    </FieldGroupContext.Provider>
  )
}

FieldGroup._supportsEufemiaSpacingProps = true
export default FieldGroup
