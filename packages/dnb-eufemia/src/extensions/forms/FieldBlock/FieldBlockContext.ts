import { createContext } from 'react'
import type { ReactNode } from 'react'
import type { FieldProps, Identifier, SubmitState } from '../types'

export type FieldState = 'error' | 'warning' | 'information'
export type StateContent =
  | FieldProps<unknown>['error']
  | FieldProps<unknown>['warning']
  | FieldProps<unknown>['info']
export type StateBasis = {
  identifier: Identifier
  type: FieldState
  content: StateContent
  stateId?: string
  showInitially?: boolean
  show?: boolean
}
export type StateRecord = Record<
  Identifier,
  Array<Omit<StateBasis, 'identifier'>>
>
export type StateMessage = ReactNode
export type StateWithMessage = StateBasis & {
  message: StateMessage
}
export type StatesWithMessages = StateBasis & {
  messages: Array<StateWithMessage>
}
export type StatusContentState = { id: string; text: ReactNode }
export type StatusContent = {
  error: StatusContentState
  warning: StatusContentState
  information: StatusContentState
}

export type FieldBlockContextProps = {
  setBlockRecord?: (
    {
      identifier,
      type,
      stateId,
      content,
      showInitially,
      show,
    }: StateBasis,
    options?: { remove?: boolean }
  ) => void
  collectMessages?: (record: StateBasis) => void
  setFieldState?: (identifier: Identifier, fieldState: SubmitState) => void
  showFieldError?: (identifier: Identifier, showError: boolean) => void
  hasErrorProp?: boolean
  composition?: true
  disableStatusSummary?: boolean
  statusId?: string
}

const FieldBlockContext = createContext<
  FieldBlockContextProps | undefined
>(undefined)

export default FieldBlockContext
