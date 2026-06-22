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
    /**
     * `React.ReactNode` or a function so you can get the current value as the first function parameter, and the index as the second parameter as well as the array of internal items as the third parameter.
     */
    children: ElementChild | Array<ElementChild>
    /**
     * A path (JSON Pointer) to the array to iterate over.
     */
    path?: Path
    /**
     * A path (JSON Pointer) to nested array items.
     */
    itemPath?: Path
    /**
     * Limit the number of rendered items to iterate over. Defaults to `undefined`.
     */
    limit?: number
    /**
     * When `true` it will reverse the order of the items.
     */
    reverse?: boolean
    /**
     * A path (JSON Pointer) to the array length.
     */
    countPath?: Path
    /**
     * Will limit the iterate amount by given "countPathLimit" value.
     */
    countPathLimit?: number
    /**
     * The minimum amount of items required to iterate over.
     */
    minItems?: number
    /**
     * The maximum amount of items to iterate over before showing the error.
     */
    maxItems?: number
    /** Custom validator function called when the array value changes. */
    onChangeValidator?: Validator<Value>
    /**
     * When `true` it will omit the Flex.Stack wrapper so it can be used for tables and lists.
     */
    withoutFlex?: boolean
    /**
     * When `true` it will animate the height of the items.
     */
    animate?: boolean
    /**
     * Will be shown if the value or data context value is empty.
     */
    placeholder?: ReactNode
    /**
     * Defines the container mode for all nested containers. Can be `view`, `edit` or `auto`. When using `auto`, it will automatically open if there is an error in the container. When a new item is added, the item before it will change to `view` mode, if it had no validation errors. Defaults to `auto`.
     */
    containerMode?: ContainerMode
    /**
     * If the array is required. It does not automatically inherit the `required` property in the same way that `Field.*` components do. You may provide a custom error message to give the user a more useful message than the default one: `errorMessages={{ 'Field.errorRequired': 'Custom message' }}`.
     */
    required?: boolean
    /** Custom error messages for validation states. */
    errorMessages?: DefaultErrorMessages
    /**
     * Will transform the current value before it is displayed.
     */
    countPathTransform?: (params: { value: any; index: number }) => any

    // internal
    validateValue?: () => void
    omitSectionPath?: boolean
  }
