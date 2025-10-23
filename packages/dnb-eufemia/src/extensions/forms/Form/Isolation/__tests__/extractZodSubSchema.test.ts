import * as z from 'zod/v4'
import {
  extractZodSubSchema,
  unwrap,
  decodePointerSegment,
} from '../extractZodSubSchema'

describe('extractZodSubSchema', () => {
  // Base schema used across tests
  const base = z.object({
    mySchema: z.object({
      secondSubSchema: z.object({
        id: z.string(),
        arr: z.array(z.object({ val: z.number() })),
        tuple: z.tuple([z.string(), z.number()]),
        rec: z.record(z.string(), z.number()),
        // a wrapped object to test unwrap-chains
        wrapped: z
          .object({ x: z.string().min(1) })
          .optional()
          .nullable()
          .default({ x: 'def' })
          .catch({ x: 'catch' })
          .readonly()
          .nonoptional(), // end up with the inner object schema after unwrap
        // keys that require JSON Pointer decoding (~0/~1)
        special: z.object({
          'a/b': z.object({
            '~tilde': z.string(),
          }),
        }),
        // shapes for union/intersection error checks
        u: z.union([z.string(), z.number()]),
        i: z.intersection(
          z.object({ a: z.string() }),
          z.object({ b: z.number() })
        ),
      }),
    }),
  })

  it('returns root for empty pointer / "/" / "#/"', () => {
    expect(extractZodSubSchema(base, '')).toBe(base)
    expect(extractZodSubSchema(base, '/')).toBe(base)
    expect(extractZodSubSchema(base, '#/')).toBe(base)
  })

  it('navigates into plain object paths', () => {
    const sub = extractZodSubSchema(base, '/mySchema/secondSubSchema')
    expect(sub).toBeInstanceOf(z.ZodObject)
    // Should validate as root
    sub.parse({
      id: 'ok',
      arr: [],
      tuple: ['s', 1],
      rec: {},
      wrapped: { x: 'y' },
      special: { 'a/b': { '~tilde': 't' } },
      u: 's',
      i: { a: 'a', b: 2 },
    })
  })

  it('array element traversal via any index segment', () => {
    const el = extractZodSubSubschema('/mySchema/secondSubSchema/arr/0') // any index points to element type
    function extractZodSubSubschema(p: string) {
      return extractZodSubSubSchemaCompat(base, p)
    }
    function extractZodSubSubSchemaCompat(root: z.ZodTypeAny, p: string) {
      return extractZodSubSchema(root, p)
    }

    expect(el).toBeInstanceOf(z.ZodObject)
    // element schema validates element-as-root:
    el.parse({ val: 123 })
  })

  it('tuple item traversal (valid index)', () => {
    const item0 = extractZodSubSchema(
      base,
      '/mySchema/secondSubSchema/tuple/0'
    )
    const item1 = extractZodSubSchema(
      base,
      '/mySchema/secondSubSchema/tuple/1'
    )
    expect(item0).toBeInstanceOf(z.ZodString)
    expect(item1).toBeInstanceOf(z.ZodNumber)
    item0.parse('ok')
    expect(() => item0.parse(1)).toThrow()
    item1.parse(42)
  })

  it('tuple item traversal (index out of range)', () => {
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/tuple/2')
    ).toThrow(/Tuple index out of range: 2/)
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/tuple/-1')
    ).toThrow(/Tuple index out of range: -1/)
    expect(() =>
      extractZodSubSchema(
        base,
        '/mySchema/secondSubSchema/tuple/not-a-number'
      )
    ).toThrow(/Tuple index out of range: not-a-number/)
  })

  it('record traversal returns value schema regardless of key', () => {
    const recVal = extractZodSubSchema(
      base,
      '/mySchema/secondSubSchema/rec/anyKey'
    )
    expect(recVal).toBeInstanceOf(z.ZodNumber)
    recVal.parse(7)
    expect(() => recVal.parse('nope')).toThrow()
  })

  it('unwraps through optional/nullable/default/catch/readonly/nonoptional layers', () => {
    // Traverse into 'wrapped' object, then into property 'x'
    const inner = extractZodSubSchema(
      base,
      '/mySchema/secondSubSchema/wrapped/x'
    )
    expect(inner).toBeInstanceOf(z.ZodString)
    inner.parse('hello')
    expect(() => inner.parse('')).toThrow() // min(1) enforced
  })

  it('JSON Pointer decoding (~1 -> "/", ~0 -> "~")', () => {
    const tildeProp = extractZodSubSchema(
      base,
      '/mySchema/secondSubSchema/special/a~1b/~0tilde'
    )
    expect(tildeProp).toBeInstanceOf(z.ZodString)
    tildeProp.parse('works')
  })

  it('missing key throws helpful error', () => {
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/nope')
    ).toThrow(/Key 'nope' not found in object shape/)
  })

  it('union path is rejected as ambiguous', () => {
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/u/anything')
    ).toThrow(/Pointer into union is ambiguous/i)
  })

  it('intersection path is rejected as ambiguous', () => {
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/i/anything')
    ).toThrow(/Pointer into intersection is ambiguous/i)
  })

  it('unsupported traversal (e.g., into a primitive)', () => {
    // Trying to go "inside" a string should error
    expect(() =>
      extractZodSubSchema(base, '/mySchema/secondSubSchema/id/extra')
    ).toThrow(/Unsupported traversal at 'extra'/)
  })

  it('hash-prefixed pointer ("#/...") is supported', () => {
    const sub = extractZodSubSchema(
      base,
      '#/mySchema/secondSubSchema/rec/any'
    )
    expect(sub).toBeInstanceOf(z.ZodNumber)
  })
})

describe('decodePointerSegment', () => {
  it('decodes ~1 to "/"', () => {
    expect(decodePointerSegment('a~1b')).toBe('a/b')
  })

  it('decodes ~0 to "~"', () => {
    expect(decodePointerSegment('~0home')).toBe('~home')
  })

  it('decodes both and leaves others intact', () => {
    expect(decodePointerSegment('x~1y~0z')).toBe('x/y~z')
    expect(decodePointerSegment('plain')).toBe('plain')
    expect(decodePointerSegment('')).toBe('')
  })

  it('is not over-greedy (only ~0 and ~1)', () => {
    // "~2" should remain as-is per RFC 6901
    expect(decodePointerSegment('a~2b')).toBe('a~2b')
  })
})

describe('unwrap', () => {
  it('returns same schema for non-wrapped types', () => {
    const s = z.string()
    expect(unwrap(s)).toBe(s)
  })

  it('unwraps Optional', () => {
    const inner = z.string().min(1)
    const opt = z.optional(inner)
    expect(unwrap(opt)).toBe(inner)
  })

  it('unwraps Nullable', () => {
    const inner = z.number().int()
    const nul = z.nullable(inner)
    expect(unwrap(nul)).toBe(inner)
  })

  it('unwraps Default', () => {
    const inner = z.string()
    const def = inner.default('x')
    expect(unwrap(def)).toBe(inner)
  })

  it('unwraps Catch', () => {
    const inner = z.number().min(0)
    const withCatch = inner.catch(0)
    expect(unwrap(withCatch)).toBe(inner)
  })

  it('unwraps NonOptional', () => {
    // make it optional first, then nonoptional(), result should unwrap to the true inner
    const inner = z.string()
    const non = inner.optional().nonoptional()
    const unwrapped = unwrap(non)
    expect(unwrapped).toBeInstanceOf(z.ZodString)
    // Test that they have the same behavior
    expect(unwrapped.parse('test')).toBe('test')
    expect(() => unwrapped.parse(123)).toThrow()
  })

  it('unwraps Readonly', () => {
    const inner = z.object({ a: z.string() })
    const ro = z.readonly(inner)
    expect(unwrap(ro)).toBe(inner)
  })

  it('unwraps Lazy', () => {
    const inner = z.object({ a: z.string() })
    const lazy = z.lazy(() => inner)
    expect(unwrap(lazy)).toBe(inner)
  })

  it('unwraps Promise', () => {
    const inner = z.string()
    const p = z.promise(inner)
    expect(unwrap(p)).toBe(inner)
  })

  it('unwraps Pipe (out type)', () => {
    // Create a pipe where the output type of the first schema matches input of the second
    const inSchema = z.string().transform((s) => s.length) // outputs number
    const outSchema = z.number().min(0)
    const piped = inSchema.pipe(outSchema)
    // unwrap should pick the final (out) schema of the pipe
    expect(unwrap(piped)).toBe(outSchema)
  })

  it('unwraps long wrapper chains (idempotent)', () => {
    const base = z.object({ x: z.string().min(1) })
    const chained = z
      .readonly(
        z.lazy(() =>
          z.promise(
            z.optional(
              z.nullable(base.default({ x: 'd' }).catch({ x: 'c' }))
            )
          )
        )
      )
      .nonoptional() // long chain

    expect(unwrap(chained)).toBe(base)

    // calling unwrap multiple times should be stable
    expect(unwrap(unwrap(chained))).toBe(base)
  })
})
