import { Path, UseFieldProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'

export type ContainerMode = 'view' | 'edit'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | React.ReactNode
  | ((value: any, index: number) => React.ReactNode)
export type Props = Omit<FlexContainerProps, 'children' | 'width'> & {
  children: ElementChild | Array<ElementChild>
  value?: UseFieldProps<Value, undefined | Value>['value']
  path?: Path
  countPath?: Path
  countPathTransform?: (params: { value: any; index: number }) => any
  withoutFlex?: boolean
  emptyValue?: UseFieldProps<Value, undefined | Value>['emptyValue']
  placeholder?: React.ReactNode
  onChange?: UseFieldProps<Value, undefined | Value>['onChange']
}
