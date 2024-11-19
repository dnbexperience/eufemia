import React from 'react'
import type { FieldProps, Identifier, SubmitState } from '../types'

export type FieldErrorIdsRef = Record<StateTypes, string>
export type MountedFieldsRef = Record<Identifier, boolean>
export type StateTypes = 'error' | 'warning' | 'info'
export type StateContent =
  | FieldProps<unknown>['error']
  | FieldProps<unknown>['warning']
  | FieldProps<unknown>['info']
export type StateBasis = {
  identifier: Identifier
  type: StateTypes
  content: StateContent
  stateId?: string
  showInitially?: boolean
  show?: boolean
}
export type StateRecord = Record<
  Identifier,
  Array<Omit<StateBasis, 'identifier'>>
>
export type StateMessage = string
export type StateWithMessage = StateBasis & {
  message: StateMessage
}
export type StatesWithMessages = StateBasis & {
  messages: Array<StateWithMessage>
}
export type StatusContentState = { id: string; text: React.ReactNode }
export type StatusContent = {
  error: StatusContentState
  warning: StatusContentState
  info: StatusContentState
}

export type FieldBlockContextProps = {
  setBlockRecord?: ({
    identifier,
    type,
    stateId,
    content,
    showInitially,
    show,
  }: StateBasis) => void
  setFieldState?: (identifier: Identifier, fieldState: SubmitState) => void
  showFieldError?: (identifier: Identifier, showError: boolean) => void
  hasErrorProp?: boolean
  composition?: true
  disableStatusSummary?: boolean
  fieldStateIdsRef?: React.MutableRefObject<FieldErrorIdsRef>
  mountedFieldsRef?: React.MutableRefObject<MountedFieldsRef>
}

const FieldBlockContext = React.createContext<
  FieldBlockContextProps | undefined
>(undefined)

export default FieldBlockContext
