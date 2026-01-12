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
    return <Component {...convertCamelCasePropsToSnakeCase(props)} />
  }

  Object.defineProperty(Derived, 'name', {
    value: Base.name,
  })

  for (const name in Base) {
    Object.defineProperty(Derived, name, {
      value: Base[name],
    })
  }

  // @ts-expect-error - TypeScript doesn't understand dynamic class extension
  return Derived
}

/**
 * Converts camel case props to snake case props.
 */
export function convertCamelCasePropsToSnakeCase<P>(
  props: P,
  validProperties?: Array<string> | ReadonlyArray<string>
): P {
  const isFrozen = Object.isFrozen(props)
  const newProps = isFrozen ? { ...props } : props
  const hasValidProperties = Array.isArray(validProperties)

  for (const key in props) {
    switch (key) {
      case 'className': {
        continue
      }
    }

    if (/^[a-z]+[A-Z]/.test(key)) {
      const name = toSnakeCase(key)
      if (hasValidProperties && !validProperties?.includes(name)) {
        continue
      }
      newProps[name] = props[key]
      delete newProps[key]
    }
  }

  return isFrozen ? Object.freeze(newProps) : newProps
}

export type AssertNoMissing<
  T extends readonly string[],
  P extends Record<string, unknown>,
> = Exclude<
  Extract<keyof P, `${string}_${string}`>,
  T[number]
> extends never
  ? T
  : never
type KeysMatching<T, P extends string> = Extract<keyof T, P>
export type KeysWithUnderscore<T> = KeysMatching<T, `${string}_${string}`>

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
