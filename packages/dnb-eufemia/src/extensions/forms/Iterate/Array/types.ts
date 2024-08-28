import { Path, UseFieldProps } from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'

export type ContainerMode = 'view' | 'edit'
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
    'value' | 'emptyValue' | 'onChange'
  > & {
    children: ElementChild | Array<ElementChild>
    path?: Path
    countPath?: Path
    countPathLimit?: number
    countPathTransform?: (params: { value: any; index: number }) => any
    withoutFlex?: boolean
    placeholder?: React.ReactNode
  }
export type ContainerModeWhen = (
  isNew: boolean
) => ContainerMode | undefined
