/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { toCamelCase } from '../component-helper'

/**
 * withSnakeCaseProps is a HOC for function components
 * it will return a React Component where all snake_case props gets converted to camelCase
 *
 * Use the same for TypeScript types by using: ToSnakeCase
 *
 * @param Base the original function or class
 * @returns extended function or class
 */
export function withSnakeCaseProps<TBase, P>(
  Base: React.FunctionComponent<P> & TBase
): typeof Base {
  const Component: React.ComponentType = Base

  const Derived = (props: P) => {
    return <Component {...Object.freeze(convertSnakeCaseProps(props))} />
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
 * withSnakeCaseProps is a HOC for classes
 * it will return a React Component where all snake_case props gets converted to camelCase
 *
 * Use the same for TypeScript types by using: ToSnakeCase
 *
 * @param Base the original function or class
 * @returns extended function or class
 */
export function classWithSnakeCaseProps<
  TBase extends React.ComponentClass
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
          <Component
            {...Object.freeze(convertSnakeCaseProps(this.props))}
          />
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

export function convertSnakeCaseProps<P>(props: P) {
  const newProps = { ...props }

  for (const key in props) {
    if (key.includes('_') && /^[a-z]+/.test(key) && !/[A-Z]/.test(key)) {
      newProps[toCamelCase(key)] = props[key]
      delete newProps[key]
    }
  }

  return newProps
}

/**
 * Convert recursively Types from camelCase to snake_case
 *
 * Use it like so:
 * OriginalProps & ToSnakeCase<OriginalProps>
 *
 * Disclaimer: Be careful using these with required props
 * - ToSnakeCase makes the required camelCase props also required in snake_case
 * - ToSnakeCasePartial removes required for the snake_case props
 *
 */
export type ToSnakeCasePartial<T> = Partial<ToSnakeCase<T>>
export type ToSnakeCase<T> = T extends object
  ? {
      [K in keyof T as ConvertCamelToSnakeCase<K & string>]:
        | T[K]
        | ToSnakeCase<T[K]>
    }
  : T
export type IncludeSnakeCase<T> = Partial<T> & ToSnakeCasePartial<T>
type ConvertCamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? '_'
        : ''}${Lowercase<T>}${ConvertCamelToSnakeCase<U>}`
    : S
