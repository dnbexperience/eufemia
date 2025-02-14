import React from 'react'
import type { GetTranslationProps } from './Context'
export * from '../components/space/types'
export * from './PropertiesTable'

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
  'data-testid'?: string

  /**
   * In future we want to use this below.
   * But its supported from TS v4.4 - so we may wait some more months.
   */
  // [property: `data-${string}`]: string
}

/**
 * The DynamicElement is a type to define a dynamic element type.
 */
export type DynamicElement<
  E = HTMLElement,
  P = React.DetailedHTMLProps<React.HTMLAttributes<E>, E>,
> = React.ElementType<P> | string

export type DynamicElementParams<T = Record<string, unknown>> = T

export type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>
    }
  : T
