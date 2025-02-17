/* eslint-disable @typescript-eslint/no-explicit-any */

export type PointerPath = string | Array<string>
export type JsonValue = unknown
export type JsonObject = Record<string | number, unknown> | Array<unknown>

/**
 * Lookup a json pointer in an object
 */
export function get<T = JsonObject>(obj: T, pointer: PointerPath) {
  const refTokens = Array.isArray(pointer) ? pointer : parse(pointer)

  for (let i = 0; i < refTokens.length; ++i) {
    const tok = refTokens[i]
    if (!(typeof obj == 'object' && tok in obj)) {
      throw new Error('Invalid reference token: ' + tok)
    }
    obj = obj[tok] as T
  }

  return obj as T
}

/**
 * Sets a value on an object
 */
export function set<T = JsonObject>(
  obj: T,
  pointer: PointerPath,
  value: JsonValue
) {
  const refTokens = (
    Array.isArray(pointer) ? pointer : parse(pointer)
  ) as Array<number | string>
  let nextTok = refTokens[0]

  if (refTokens.length === 0) {
    throw Error('Cannot set the root object')
  }

  for (let i = 0; i < refTokens.length - 1; ++i) {
    let tok = refTokens[i]
    if (typeof tok !== 'string' && typeof tok !== 'number') {
      tok = String(tok)
    }
    if (
      tok === '__proto__' ||
      tok === 'constructor' ||
      tok === 'prototype'
    ) {
      continue
    }
    if (tok === '-' && Array.isArray(obj)) {
      tok = obj.length
    }
    nextTok = refTokens[i + 1] as string

    if (!(tok in (obj as JsonObject))) {
      if (nextTok.match(/^(\d+|-)$/)) {
        obj[tok] = []
      } else {
        obj[tok] = {}
      }
    }
    if (Object.isFrozen(obj[tok])) {
      obj[tok] = { ...obj[tok] }
    }
    obj = obj[tok] as T
  }

  if (nextTok === '-' && Array.isArray(obj)) {
    nextTok = obj.length
  }

  obj[nextTok] = value
}

/**
 * Removes an attribute
 */
export function remove<T = JsonObject>(obj: T, pointer: PointerPath) {
  const refTokens = Array.isArray(pointer) ? pointer : parse(pointer)
  const finalToken = refTokens[refTokens.length - 1]
  if (finalToken === undefined) {
    throw new Error('Invalid JSON pointer for remove: "' + pointer + '"')
  }

  const parent = get(obj, refTokens.slice(0, -1))
  if (Array.isArray(parent)) {
    const index = +finalToken
    if (finalToken === '' && isNaN(index)) {
      throw new Error('Invalid array index: "' + finalToken + '"')
    }

    Array.prototype.splice.call(parent, index, 1)
  } else {
    delete parent[finalToken]
  }
}

/**
 * Returns a (pointer -> value) dictionary for an object
 */
export function dict<T = JsonObject>(obj: T, descend = null) {
  const results = {}
  walk(
    obj,
    function (value, pointer: string) {
      results[pointer] = value
    },
    descend
  )
  return results
}

/**
 * Iterates over an object
 */
export function walk<T = JsonObject>(obj: T, iterator, descend = null) {
  const refTokens = []

  descend =
    descend ||
    function (value) {
      const type = Object.prototype.toString.call(value)
      return type === '[object Object]' || type === '[object Array]'
    }

  function next(cur) {
    if (Array.isArray(cur)) {
      cur = cur.reduce((acc, cur, i) => {
        acc[i] = cur
        return acc
      }, {})
    }

    Object.keys(cur).forEach((key) => {
      refTokens.push(String(key))
      if (descend(cur[key])) {
        next(cur[key])
      } else {
        iterator(cur[key], compile(refTokens))
      }
      refTokens.pop()
    })
  }

  next(obj)
}

/**
 * Tests if an object has a value for a json pointer
 */
export function has<T = JsonObject>(obj: T, pointer: PointerPath) {
  try {
    get<T>(obj, pointer)
  } catch (e) {
    return false
  }
  return true
}

/**
 * Escapes a reference token
 */
export function escape(str: string) {
  return str.toString().replace(/~/g, '~0').replace(/\//g, '~1')
}

/**
 * Unescape a reference token
 */
export function unescape(str: string) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~')
}

/**
 * Converts a json pointer into a array of reference tokens
 */
export function parse(pointer: Extract<PointerPath, string>): PointerPath {
  if (pointer === '') {
    return []
  }
  if (pointer?.charAt(0) !== '/') {
    throw new Error('Invalid JSON pointer: ' + pointer)
  }
  return pointer.substring(1).split(/\//).map(unescape)
}

/**
 * Builds a json pointer from a array of reference tokens
 */
export function compile(refTokens: Extract<PointerPath, Array<string>>) {
  if (refTokens.length === 0) {
    return ''
  }
  return '/' + refTokens.map(escape).join('/')
}
