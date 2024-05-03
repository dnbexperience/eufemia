import { UseFieldProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { IterateElementContextState } from '../IterateElementContext'

export type ContainerMode = 'view' | 'edit'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | React.ReactNode
  | ((value: any, index: number) => React.ReactNode)
export type Props = Omit<FlexContainerProps, 'children' | 'width'> & {
  children: ElementChild | Array<ElementChild>
  value?: UseFieldProps<Value, undefined | Value>['value']
  defaultValue?: UseFieldProps<Value, undefined | Value>['value']
  path?: UseFieldProps<Value, undefined | Value>['path']
  withoutFlex?: boolean
  concatWith?: Value | unknown
  emptyValue?: UseFieldProps<Value, undefined | Value>['emptyValue']
  placeholder?: React.ReactNode
  onChange?: UseFieldProps<Value, undefined | Value>['onChange']
  onDone?: (item: UseFieldProps<Value, undefined | Value>['value']) => void
  mapInternalData?: (
    data: IterateElementContextState,
    index: number,
    array: Array<IterateElementContextState>
  ) => Value
}
