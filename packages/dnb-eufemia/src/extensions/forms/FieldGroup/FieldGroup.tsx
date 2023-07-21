import React, { useState, useCallback, useMemo } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import { FormError } from '../types'
import { forwardSpaceProps } from '../utils'
import InputBlock from '../InputBlock'
import type { InputProps } from '../input-types'

export interface FieldGroupContextState {
  setFieldError?: (id: string, error: FormError) => void
  setShowFieldError?: (id: string, showError: boolean) => void
}

export const FieldGroupContext = React.createContext<
  FieldGroupContextState | undefined
>(undefined)

export type Props = ComponentProps &
  Pick<
    InputProps,
    | 'label'
    | 'labelDescription'
    | 'labelSecondary'
    | 'info'
    | 'warning'
    | 'error'
  > & {
    children: React.ReactNode
  }

export default function FieldGroup(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
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
      <InputBlock
        className={classnames('dnb-forms-field-group', className)}
        data-testid={dataTestId ?? 'field-group'}
        label={label}
        labelDescription={labelDescription}
        labelSecondary={labelSecondary}
        info={info}
        warning={warning}
        error={error ?? blockError}
        {...forwardSpaceProps(props)}
      >
        {children}
      </InputBlock>
    </FieldGroupContext.Provider>
  )
}
