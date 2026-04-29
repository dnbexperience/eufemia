import { useContext } from 'react'
import Context, { ContextComponents, ContextProps } from './Context'
import {
  extendPropsWithContext,
  extendExistingPropsWithContext,
  type Contexts,
} from './helpers/extendPropsWithContext'
import { pickFormElementProps } from './helpers/filterValidProps'
import { removeUndefinedProps } from './component-helper'

export type UseComponentDefaultsOptions = {
  /**
   * Pick form element props (skeleton, disabled, vertical, labelDirection)
   * from context.formElement and merge them.
   */
  formElement?: boolean

  /**
   * Remove undefined props before merging,
   * allowing context and default values to take effect.
   */
  removeUndefined?: boolean

  /**
   * Only merge context values for props that already exist on the component.
   * Uses extendExistingPropsWithContext instead of extendPropsWithContext.
   * This prevents unknown context keys from leaking to DOM attributes.
   */
  onlyExisting?: boolean

  /**
   * Additional context sources to merge, such as group contexts
   * (e.g. TagGroupContext, AvatarGroupContext).
   */
  additionalContexts?: Contexts
}

/**
 * Hook that consolidates the common context-merging boilerplate
 * found across Eufemia components.
 *
 * Replaces the repeated pattern of:
 * 1. useContext(Context)
 * 2. extendPropsWithContext(localProps, defaultProps, context?.X, { skeleton: context?.skeleton }, ...)
 * 3. Optional pickFormElementProps(context?.formElement)
 * 4. Optional removeUndefinedProps
 *
 * @param localProps - The component's local/incoming props
 * @param defaultProps - The component's default props
 * @param contextKey - The key in the shared context for this component (e.g. 'Badge', 'Button')
 * @param options - Additional options for form elements, removeUndefined, etc.
 * @returns A tuple of [mergedProps, context]
 */
export function useComponentDefaults<Props>(
  localProps: Props,
  defaultProps: Partial<Props>,
  contextKey?: keyof ContextComponents | null,
  options: UseComponentDefaultsOptions = {}
): [Props, ContextProps] {
  const context = useContext(Context)

  const {
    formElement = false,
    removeUndefined = false,
    onlyExisting = false,
    additionalContexts,
  } = options

  const contexts: Contexts = []

  if (contextKey && context?.[contextKey]) {
    contexts.push(context[contextKey] as Record<string, unknown>)
  }

  contexts.push({ skeleton: context?.skeleton })

  if (formElement && context?.formElement) {
    contexts.push(pickFormElementProps(context.formElement))
  }

  if (additionalContexts) {
    for (const ctx of additionalContexts) {
      if (ctx) {
        contexts.push(ctx)
      }
    }
  }

  let sourceProps: Props
  if (removeUndefined) {
    sourceProps = {
      ...defaultProps,
      ...removeUndefinedProps({
        ...(localProps as Record<string, unknown>),
      }),
    } as Props
  } else {
    sourceProps = localProps
  }

  const mergeFn = onlyExisting
    ? extendExistingPropsWithContext
    : extendPropsWithContext

  const mergedProps = mergeFn(
    sourceProps,
    defaultProps,
    ...contexts
  ) as Props

  return [mergedProps, context]
}
