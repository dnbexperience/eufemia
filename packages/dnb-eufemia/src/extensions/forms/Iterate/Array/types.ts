import { CustomErrorMessages, UseFieldProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'

type ErrorMessages = {
  required?: string
  schema?: string
} & CustomErrorMessages

export type ContainerMode = 'view' | 'edit'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | React.ReactNode
  | ((value: any, index: number) => React.ReactNode)
export type Props = UseFieldProps<
  Value,
  undefined | Value,
  ErrorMessages
> & {
  children: ElementChild | Array<ElementChild>
  placeholder?: React.ReactNode
  defaultValue?: Value
} & Omit<FlexContainerProps, 'children' | 'width'>
