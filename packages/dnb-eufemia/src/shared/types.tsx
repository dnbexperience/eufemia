import React from 'react'
import type { GetTranslationProps } from './Context'
export * from '../components/space/types'

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

export type DynamicElement<P = React.HTMLProps<HTMLElement>> =
  | keyof JSX.IntrinsicElements
  | React.FunctionComponent<P>
