export type PointerPath = string | Array<string>
export type JsonValue = unknown
export type JsonObject = Record<string | number, unknown> | Array<unknown>

type DescendFn = (value: JsonValue) => boolean
type WalkIterator = (value: JsonValue, pointer: string) => boolean | void

/**
 * Lookup a json pointer in an object
 */
export function get<T = JsonObject>(obj: T, pointer: PointerPath) {
  const refTokens = Array.isArray(pointer) ? pointer : parse(pointer)

  let current: JsonValue = obj
  for (let i = 0; i < refTokens.length; ++i) {
    const tok = refTokens[i]
    if (!(typeof current === 'object' && tok in current)) {
      throw new Error('Invalid reference token: ' + tok)
    }
    current = (current as Record<string, JsonValue>)[tok]
  }

  return current as T
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
  let nextTok: number | string = refTokens[0]

  if (refTokens.length === 0) {
    throw Error('Cannot set the root object')
  }

  let current = obj as Record<number | string, JsonValue>

  for (let i = 0; i < refTokens.length - 1; ++i) {
    let tok: number | string = refTokens[i]
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
    if (tok === '-' && Array.isArray(current)) {
      tok = current.length
    }
    nextTok = refTokens[i + 1] as string

    if (!(tok in current)) {
      if (nextTok.match(/^(\d+|-)$/)) {
        current[tok] = []
      } else {
        current[tok] = {}
      }
    }
    if (Object.isFrozen(current[tok])) {
      current[tok] = { ...(current[tok] as object) }
    }
    current = current[tok] as Record<number | string, JsonValue>
  }

  if (nextTok === '-' && Array.isArray(current)) {
    nextTok = current.length
  }

  // Prevent prototype pollution via the final token (e.g. "/__proto__").
  if (
    nextTok === '__proto__' ||
    nextTok === 'constructor' ||
    nextTok === 'prototype'
  ) {
    return
  }

  current[nextTok] = value
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
    delete (parent as Record<string, JsonValue>)[finalToken]
  }
}

/**
 * Returns a (pointer -> value) dictionary for an object
 */
export function dict<T = JsonObject>(
  obj: T,
  descend: DescendFn | null = null
) {
  const results: Record<string, JsonValue> = {}
  walk(
    obj,
    (value, pointer) => {
      results[pointer] = value
    },
    descend
  )
  return results
}

/**
 * Iterates over an object
 */
export function walk<T = JsonObject>(
  obj: T,
  iterator: WalkIterator,
  descend: DescendFn | null = null
) {
  const refTokens: Array<string> = []

  const descendFn: DescendFn =
    descend ||
    ((value) => {
      const type = Object.prototype.toString.call(value)
      return type === '[object Object]' || type === '[object Array]'
    })

  next(obj, refTokens, iterator, descendFn)
}

function next(
  cur: JsonValue,
  refTokens: Array<string>,
  iterator: WalkIterator,
  descend: DescendFn
): boolean | undefined {
  if (Array.isArray(cur)) {
    cur = cur.reduce<Record<string, JsonValue>>((acc, item, i) => {
      acc[i] = item
      return acc
    }, {})
  }

  let res: boolean | void
  for (const key in cur as Record<string, JsonValue>) {
    refTokens.push(String(key))
    const node = (cur as Record<string, JsonValue>)[key]
    if (descend(node)) {
      res = next(node, refTokens, iterator, descend)
    } else {
      res = iterator(node, compile(refTokens))
    }
    if (res === false) {
      return false
    }
    refTokens.pop()
  }
  return undefined
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
 * Tests if a value is a forms path / json pointer.
 */
export function isPath(path: unknown): path is string {
  return typeof path === 'string' && path.startsWith('/')
}

/**
 * Escapes a reference token
 */
export function escape(str: string): string {
  return str.toString().replace(/~/g, '~0').replace(/\//g, '~1')
}

/**
 * Unescape a reference token
 */
export function unescape(str: string): string {
  return str.replace(/~1/g, '/').replace(/~0/g, '~')
}

/**
 * Converts a json pointer into an array of reference tokens
 */
export function parse(
  pointer: Extract<PointerPath, string>
): Array<string> {
  if (pointer === '') {
    return []
  }
  if (pointer?.charAt(0) !== '/') {
    throw new Error('Invalid JSON pointer: ' + pointer)
  }
  return pointer.substring(1).split(/\//).map(unescape)
}

/**
 * Builds a json pointer from an array of reference tokens
 */
export function compile(
  refTokens: Extract<PointerPath, Array<string>>
): string {
  if (refTokens.length === 0) {
    return ''
  }
  return '/' + refTokens.map(escape).join('/')
}
