import type { HTMLAttributes, ReactNode } from 'react'
import type {
  DefaultErrorMessages,
  Path,
  UseFieldProps,
  Validator,
} from '../../types'
import type { FlexContainerAllProps as FlexContainerProps } from '../../../../components/flex/Container'
import type { IterateItemContextState } from '../IterateItemContext'

export type ContainerMode = 'view' | 'edit' | 'auto'
export type Value = Array<unknown | Record<string, unknown>>
export type ElementChild =
  | ReactNode
  | ((
      value: any,
      index: number,
      arrayItems: Array<IterateItemContextState>
    ) => ReactNode)
export type IterateArrayProps = Omit<
  FlexContainerProps,
  keyof Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'id'>
> &
  Pick<
    UseFieldProps<Value, undefined | Value>,
    | 'value'
    | 'defaultValue'
    | 'emptyValue'
    | 'onChange'
    | 'validateInitially'
    | 'validateContinuously'
    | 'schema'
  > & {
    /** Render function or React nodes for each array item. When a function, receives `(value, index, arrayItems)`. */
    children: ElementChild | Array<ElementChild>
    /** JSON Pointer path to the array data in the form data context. */
    path?: Path
    /** JSON Pointer sub-path within each array item for value access. */
    itemPath?: Path
    /** Maximum number of items to render from the array. */
    limit?: number
    /** If `true`, renders array items in reverse order. */
    reverse?: boolean
    /** JSON Pointer path to a counter value that tracks the number of items. */
    countPath?: Path
    /** Maximum value the counter at `countPath` can reach. */
    countPathLimit?: number
    /** Minimum number of items required. Triggers a validation error if fewer. */
    minItems?: number
    /** Maximum number of items allowed. Triggers a validation error if more. */
    maxItems?: number
    /** Custom validator function called when the array value changes. */
    onChangeValidator?: Validator<Value>
    /** If `true`, renders children without a Flex container wrapper. */
    withoutFlex?: boolean
    /** If `true`, animates item additions and removals. */
    animate?: boolean
    /** Content to display when the array is empty. */
    placeholder?: ReactNode
    /** Controls the initial display mode for items: `view`, `edit`, or `auto`. */
    containerMode?: ContainerMode
    /** If `true`, at least one item is required. */
    required?: boolean
    /** Custom error messages for validation states. */
    errorMessages?: DefaultErrorMessages
    /** Transform function applied to each item before updating the count path. */
    countPathTransform?: (params: { value: any; index: number }) => any

    // internal
    validateValue?: () => void
    omitSectionPath?: boolean
  }
