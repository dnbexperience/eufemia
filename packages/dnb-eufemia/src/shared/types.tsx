import type React from 'react'
import type { GetTranslationProps } from './Context'
export * from '../components/space/types'

export type ResponsiveProp<T> = {
  small?: T
  medium?: T
  large?: T
}

export type LocaleProps = GetTranslationProps

export type DataAttributeTypes = {
  /**
   * When using HTMLAttributes on object to define props,
   * we need not get data-* attributes as valid types:
   *
   * triggerAttributes={{
   *   'data-testid': 'html-selector'
   * }}
   *
   * Effects: triggerAttributes, closeButtonAttributes
   */
  [property: `data-${string}`]: string
}

/**
 * The DynamicElement is a type to define a dynamic element type.
 */
export type DynamicElement<
  E = HTMLElement,
  P = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>,
> = React.ElementType<P> | string

export type DynamicElementParams<T = Record<string, unknown>> = T

export type PropertiesTableProps = Record<
  string,
  {
    type: string | string[]
    defaultValue?: string
    doc: string
    status: 'optional' | 'internal' | 'required' | 'deprecated'
  }
>

export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>
    }
  : T

type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * Utility to ensure a type is not `any` even when `noImplicitAny` is disabled.
 * If `T` is `any`, the result is `never` to surface a type error.
 */
export type NotAny<T> = IsAny<T> extends true ? never : T
