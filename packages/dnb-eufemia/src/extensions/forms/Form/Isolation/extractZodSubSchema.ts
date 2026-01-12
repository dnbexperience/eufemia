import * as z from 'zod'
import { Path } from '../../types'

/**
 * Extract a Zod subschema using a JSON Pointer like "/mySchema/secondSubSchema".
 * Supports objects, arrays, tuples, and records. For unions/intersections,
 */
export function extractZodSubSchema(
  root: z.ZodTypeAny,
  pointer: Path
): z.ZodTypeAny {
  if (!pointer) return root
  const normalized = pointer.startsWith('#') ? pointer.slice(1) : pointer
  if (normalized === '/' || normalized === '') return root

  const parts = normalized.split('/').slice(1).map(decodePointerSegment)
  let cur: z.ZodTypeAny = root

  for (const part of parts) {
    cur = unwrap(cur)

    if (cur instanceof z.ZodObject) {
      const shape = cur.shape
      if (!Object.hasOwn(shape, part)) {
        throw new Error(`Key '${part}' not found in object shape`)
      }
      cur = shape[part as keyof typeof shape] as z.ZodTypeAny
      continue
    }

    if (cur instanceof z.ZodArray) {
      // JSON Pointer into arrays is typically a numeric index; for schema traversal
      // every index points to the element type
      cur = cur.element as z.ZodTypeAny
      continue
    }

    if (cur instanceof z.ZodTuple) {
      const idx = Number(part)
      const items = cur.def.items as unknown as z.ZodTypeAny[] | undefined
      if (!Array.isArray(items)) {
        throw new Error('Tuple items are unavailable for traversal')
      }
      if (!Number.isInteger(idx) || idx < 0 || idx >= items.length) {
        throw new Error(`Tuple index out of range: ${part}`)
      }
      cur = items[idx]
      continue
    }

    if (cur instanceof z.ZodRecord) {
      // All keys share the same value schema
      cur = cur.valueType as z.ZodTypeAny
      continue
    }

    if (
      cur instanceof z.ZodUnion ||
      cur instanceof z.ZodDiscriminatedUnion
    ) {
      // Ambiguous: which branch?
      throw new Error(
        'Pointer into union is ambiguous. Choose a branch explicitly.'
      )
    }

    if (cur instanceof z.ZodIntersection) {
      // Also ambiguous: intersection has two sides; you must specify policy.
      throw new Error(
        'Pointer into intersection is ambiguous. Decide how to traverse.'
      )
    }

    const typeName = (cur as z.ZodTypeAny).type || cur.constructor.name
    throw new Error(
      `Unsupported traversal at '${part}' for schema type '${typeName}'`
    )
  }

  return cur
}

// Minimal unwrapping so pointers work "through" wrappers
export function unwrap(t: z.ZodTypeAny | unknown): z.ZodTypeAny {
  return t instanceof z.ZodOptional ||
    t instanceof z.ZodNullable ||
    t instanceof z.ZodDefault ||
    t instanceof z.ZodCatch ||
    t instanceof z.ZodNonOptional ||
    t instanceof z.ZodPrefault ||
    t instanceof z.ZodSuccess ||
    t instanceof z.ZodReadonly ||
    t instanceof z.ZodLazy ||
    t instanceof z.ZodPromise
    ? unwrap(t.unwrap())
    : t instanceof z.ZodPipe
    ? unwrap(t.out)
    : (t as z.ZodTypeAny)
}

export function decodePointerSegment(seg: string) {
  // JSON Pointer unescape: ~1 -> /, ~0 -> ~
  return seg.replace(/~1/g, '/').replace(/~0/g, '~')
}
