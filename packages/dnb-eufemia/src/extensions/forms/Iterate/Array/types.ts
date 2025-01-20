import {
  DefaultErrorMessages,
  Path,
  UseFieldProps,
  Validator,
} from '../../types'
import { Props as FlexContainerProps } from '../../../../components/flex/Container'
import { IterateItemContextState } from '../IterateItemContext'

export type ContainerMode = 'view' | 'edit' | 'auto'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | React.ReactNode
  | ((
      value: any,
      index: number,
      arrayItems: Array<IterateItemContextState>
    ) => React.ReactNode)
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
    | 'continuousValidation'
    | 'validateContinuously'
  > & {
    children: ElementChild | Array<ElementChild>
    path?: Path
    itemPath?: Path
    limit?: number
    countPath?: Path
    countPathLimit?: number
    onChangeValidator?: Validator<Value>
    withoutFlex?: boolean
    animate?: boolean
    placeholder?: React.ReactNode
    containerMode?: ContainerMode
    required?: boolean
    errorMessages?: DefaultErrorMessages
    countPathTransform?: (params: { value: any; index: number }) => any

    // internal
    validateValue?: () => void
  }
