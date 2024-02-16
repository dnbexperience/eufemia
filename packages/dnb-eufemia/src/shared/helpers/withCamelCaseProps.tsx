/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { toSnakeCase } from '../component-helper'

/**
 * withCamelCaseProps is a HOC for function components
 * it will return a React Component where all snake_case props gets converted to camelCase
 *
 * Use the same for TypeScript types by using: ToCamelCase
 *
 * @param Base the original function or class
 * @returns extended function or class
 */
export function withCamelCaseProps<TBase, P>(
  Base: React.FunctionComponent<P> & TBase
): typeof Base {
  const Component: React.ComponentType = Base

  const Derived = (props: P) => {
    return <Component {...convertCamelCaseProps(props)} />
  }

  Object.defineProperty(Derived, 'name', {
    value: Base.name,
  })

  for (const name in Base) {
    Object.defineProperty(Derived, name, {
      value: Base[name],
    })
  }

  // @ts-ignore
  return Derived
}

/**
 * withCamelCaseProps is a HOC for classes
 * it will return a React Component where all snake_case props gets converted to camelCase
 *
 * Use the same for TypeScript types by using: ToCamelCase
 *
 * @param Base the original function or class
 * @returns extended function or class
 */
export function classWithCamelCaseProps<
  TBase extends React.ComponentClass,
>(Base: TBase): typeof Base {
  const Component: React.ComponentClass = Base

  // Bug? https://github.com/microsoft/TypeScript/issues/37142
  // @ts-ignore
  class Derived extends Base {
    _prevProps: Record<string, unknown>
    _elem: React.ReactElement

    componentDidMount() {
      // ensures we do not run componentDidMount twice
    }

    render() {
      if (this.props !== this._prevProps) {
        this._prevProps = this.props
        this._elem = (
          // @ts-ignore
          <Component {...convertCamelCaseProps(this.props)} />
        )
      }

      return this._elem
    }
  }

  Object.defineProperty(Derived, 'name', {
    value: Base.name,
  })

  Object.defineProperty(Derived, 'displayName', {
    value: Base.displayName || Base.name,
  })

  return Derived
}

export function convertCamelCaseProps<P>(props: P) {
  const isFrozen = Object.isFrozen(props)
  const newProps = isFrozen ? { ...props } : props

  for (const key in props) {
    switch (key) {
      case 'className': {
        continue
      }
    }

    if (/^[a-z]+[A-Z]/.test(key)) {
      newProps[toSnakeCase(key)] = props[key]
      delete newProps[key]
    }
  }

  return isFrozen ? Object.freeze(newProps) : newProps
}

/**
 * Convert recursively Types from snake_case to camelCase
 *
 * Use it like so:
 * OriginalProps & ToCamelCase<OriginalProps>
 *
 * Disclaimer: Be careful using these with required props
 * - ToCamelCase makes the required snake_case props also required in camelCase
 * - ToCamelCasePartial removes required for the camelCase props
 * - ToCamelCaseFlat is like ToCamelCase, but it will not convert nested objects for performance boost
 * - ToCamelCasePartialFlat is like ToCamelCasePartial, but it will not convert nested objects for performance boost
 */
export type ToCamelCasePartial<T> = Partial<ToCamelCase<T>>
export type ToCamelCase<T> = T extends object
  ? {
      [K in keyof T as ConvertSnakeToCamelCase<K & string>]:
        | T[K]
        | ToCamelCase<T[K]>
    }
  : T
export type IncludeCamelCase<T> = Partial<T> & ToCamelCasePartial<T>
type ConvertSnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<ConvertSnakeToCamelCase<U>>}`
    : S

type ConvertObjectKeysToCamelCase<T> = {
  [K in keyof T as ConvertSnakeToCamelCase<K & string>]: T[K]
}
export type ToCamelCaseFlat<T> = T extends object
  ? ConvertObjectKeysToCamelCase<T>
  : T
export type ToCamelCasePartialFlat<T> = Partial<ToCamelCaseFlat<T>>
