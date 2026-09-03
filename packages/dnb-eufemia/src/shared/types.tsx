import type { DetailedHTMLProps, ElementType, HTMLAttributes } from 'react'
import type { GetTranslationProps } from './Context'
export * from '../components/space/types'

export type ResponsiveProp<T> = {
  small?: T
  medium?: T
  large?: T
}

export type LocaleProps = GetTranslationProps

export type DataAttributes = {
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
  P = DetailedHTMLProps<HTMLAttributes<E>, E>,
> = ElementType<P> | string

export type DynamicElementParams<T = Record<string, unknown>> = T

export type PropertiesTableProps = Record<
  string,
  {
    type: string | string[]
    defaultValue?: string
    doc: string
    status: 'optional' | 'internal' | 'required' | 'deprecated'
    /**
     * The Eufemia version in which this property or event was introduced,
     * as a semver string (e.g. `'11.2.0'`). Optional. When set by an author
     * it is treated as the source of truth; otherwise it may be inferred from
     * git history by the LLM metadata generator.
     */
    since?: string
    /**
     * The Eufemia version in which this property or event was deprecated,
     * as a semver string (e.g. `'11.4.0'`). Typically set together with
     * `status: 'deprecated'`.
     */
    deprecatedIn?: string
    /**
     * The Eufemia version in which this property or event was removed,
     * as a semver string (e.g. `'12.0.0'`).
     */
    removedIn?: string
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
