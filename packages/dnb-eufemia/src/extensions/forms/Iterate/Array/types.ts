import { Path, UseFieldProps } from '../../types'
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
    'value' | 'defaultValue' | 'emptyValue' | 'onChange'
  > & {
    children: ElementChild | Array<ElementChild>
    path?: Path
    countPath?: Path
    countPathLimit?: number
    withoutFlex?: boolean
    placeholder?: React.ReactNode
    minimumContainerItems?: number
    containerMode?: ContainerMode
    countPathTransform?: (params: { value: any; index: number }) => any
    hideContainerToolbarWhen?: (
      index: number,
      items: Array<ElementChild>
    ) => boolean
  }
