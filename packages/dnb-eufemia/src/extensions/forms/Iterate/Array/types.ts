import { Path, UseFieldProps, Validator } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'

export type ContainerMode = 'view' | 'edit' | 'auto'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | React.ReactNode
  | ((value: any, index: number) => React.ReactNode)
export type Props = Omit<
  FlexContainerProps,
  keyof Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>
> &
  Pick<
    UseFieldProps<Value, undefined | Value>,
    | 'value'
    | 'defaultValue'
    | 'emptyValue'
    | 'onChange'
    | 'validateInitially'
  > & {
    children: ElementChild | Array<ElementChild>
    path?: Path
    countPath?: Path
    countPathLimit?: number
    validator?: Validator<Value>
    withoutFlex?: boolean
    placeholder?: React.ReactNode
    containerMode?: ContainerMode
    countPathTransform?: (params: { value: any; index: number }) => any
  }
