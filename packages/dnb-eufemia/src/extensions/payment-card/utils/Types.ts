// ---- Instance types ----
// These interfaces describe the daggy values returned by constructors/unit variants.
// Each value has a @@tag discriminant and a cata() method for exhaustive pattern matching.

export type DNB = {
  '@@tag': 'Colored' | 'Sbanken'
  cata<R>(handlers: {
    Colored: (color: string) => R
    Sbanken: (color: string) => R
  }): R
}

export type Visa = {
  '@@tag': 'Colored' | 'Platinum'
  cata<R>(handlers: {
    Colored: (color: string) => R
    Platinum: () => R
  }): R
}

export type Mastercard = {
  '@@tag': 'Default' | 'Dark'
  cata<R>(handlers: { Default: () => R; Dark: () => R }): R
}

export type CardType = {
  '@@tag': 'Visa' | 'Mastercard' | 'None'
  cata<R>(handlers: {
    Visa: () => R
    Mastercard: () => R
    None: () => R
  }): R
}

export type BankAxept = {
  '@@tag': 'White' | 'Black' | 'Gold' | 'Black20' | 'Gray' | 'GrayDark'
  cata<R>(handlers: {
    White: () => R
    Black: () => R
    Gold: () => R
    Black20: () => R
    Gray: () => R
    GrayDark: () => R
  }): R
}

export type Saga = {
  '@@tag': 'Gold' | 'Platinum' | 'None'
  cata<R>(handlers: { Gold: () => R; Platinum: () => R; None: () => R }): R
}

export type PB = {
  '@@tag': 'Default' | 'None'
  cata<R>(handlers: { Default: () => R; None: () => R }): R
}

export type ProductType = {
  '@@tag':
    | 'Saga'
    | 'Pluss'
    | 'Intro'
    | 'Bedrift'
    | 'Business'
    | 'PrivateBanking'
    | 'Corporate'
    | 'WorldElite'
    | 'None'
  cata<R>(handlers: {
    Saga: () => R
    Pluss: () => R
    Intro: () => R
    Bedrift: () => R
    Business: () => R
    PrivateBanking: () => R
    Corporate: () => R
    WorldElite: () => R
    None: () => R
  }): R
}

export type BankAxeptType = {
  '@@tag': 'BankAxept' | 'Credit' | 'None'
  cata<R>(handlers: {
    BankAxept: () => R
    Credit: () => R
    None: () => R
  }): R
}

// ---- Static constructor types ----
// These interfaces describe the namespace objects that hold variant
// constructors (functions) and unit variants (pre-created instances).

type DNBConstructors = {
  Colored: (color: string) => DNB
  Sbanken: (color: string) => DNB
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type VisaConstructors = {
  Colored: (color: string) => Visa
  Platinum: Visa
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type MastercardConstructors = {
  Default: Mastercard
  Dark: Mastercard
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type CardTypeConstructors = {
  Visa: CardType
  Mastercard: CardType
  None: CardType
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type BankAxeptConstructors = {
  White: BankAxept
  Black: BankAxept
  Gold: BankAxept
  Black20: BankAxept
  Gray: BankAxept
  GrayDark: BankAxept
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type SagaConstructors = {
  Gold: Saga
  Platinum: Saga
  None: Saga
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type PBConstructors = {
  Default: PB
  None: PB
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type ProductTypeConstructors = {
  Saga: ProductType
  Pluss: ProductType
  Intro: ProductType
  Bedrift: ProductType
  Business: ProductType
  PrivateBanking: ProductType
  Corporate: ProductType
  WorldElite: ProductType
  None: ProductType
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

type BankAxeptTypeConstructors = {
  BankAxept: BankAxeptType
  Credit: BankAxeptType
  None: BankAxeptType
  is: (val: unknown) => boolean
  '@@type': string
  '@@tags': string[]
}

// ---- Tagged sum instances ----

const daggy = createDaggy()

export const DNB = daggy.taggedSum('DNB', {
  Colored: ['color'],
  Sbanken: ['color'],
}) as DNBConstructors

export const Visa = daggy.taggedSum('Visa', {
  Colored: ['color'],
  Platinum: [],
}) as VisaConstructors

export const Mastercard = daggy.taggedSum('Mastercard', {
  Default: [],
  Dark: [],
}) as MastercardConstructors

export const CardType = daggy.taggedSum('CardType', {
  Visa: [],
  Mastercard: [],
  None: [],
}) as CardTypeConstructors

export const BankAxept = daggy.taggedSum('BankAxept', {
  White: [],
  Black: [],
  Gold: [],
  Black20: [],
  Gray: [],
  GrayDark: [],
}) as BankAxeptConstructors

export const Saga = daggy.taggedSum('Saga', {
  Gold: [],
  Platinum: [],
  None: [],
}) as SagaConstructors

// PrivateBanking
export const PB = daggy.taggedSum('PB', {
  Default: [],
  None: [],
}) as PBConstructors

export const ProductType = daggy.taggedSum('ProductType', {
  Saga: [],
  Pluss: [],
  Intro: [],
  Bedrift: [],
  Business: [],
  PrivateBanking: [],
  Corporate: [],
  WorldElite: [],
  None: [],
}) as ProductTypeConstructors

export const BankAxeptType = daggy.taggedSum('BankAxeptType', {
  BankAxept: [],
  Credit: [],
  None: [],
}) as BankAxeptTypeConstructors

const Types = {
  DNB,
  Saga,
  PB,
  Mastercard,
  ProductType,
  CardType,
  BankAxept,
  BankAxeptType,
  Visa,
}

export default Types

// ---- createDaggy implementation ----
// A custom implementation of daggy's taggedSum pattern for creating
// discriminated union types with exhaustive pattern matching via cata().
// Uses dynamic property creation internally, so types are loosely defined.

type DaggyObj = Record<string, any>

function createDaggy() {
  const TAG = '@@tag'
  const VALUES = '@@values'
  const TYPE = '@@type'
  const RET_TYPE = '@@ret_type'
  const TAGS = '@@tags'

  let cachedDesc: PropertyDescriptor | null = null

  function taggedSum(
    typeName: string,
    constructors: Record<string, string[]>
  ): DaggyObj {
    const proto: DaggyObj = { cata: sum$cata, toString: sum$toString }
    const tags = Object.keys(constructors)
    const typeRep: DaggyObj = {
      toString: typeRepToString,
      prototype: proto,
      is: isType(typeName),
      '@@type': typeName,
      '@@tags': tags,
    }
    proto['constructor'] = typeRep

    tags.forEach(function (tag) {
      const fields = constructors[tag]
      const tagProto = Object.create(proto) as DaggyObj
      defProp(tagProto, TAG, tag)

      if (fields.length === 0) {
        typeRep[tag] = makeValue(fields, tagProto, [], 0)
        typeRep[tag].is = sum$isUnit(typeRep[tag])
        return // stop here
      }

      typeRep[tag] = makeConstructor(fields, tagProto)
      typeRep[tag].is = sum$isVariant(typeRep[tag])
      typeRep[tag][TAG] = tag
      typeRep[tag][RET_TYPE] = typeName
      typeRep[tag].toString = sum$ctrToString
      typeRep[tag].from = makeConstructorFromObject(fields, tagProto)
    })

    return typeRep
  }

  function sum$cata(this: DaggyObj, fs: DaggyObj) {
    const tags: string[] = this.constructor[TAGS]
    let tag: string

    for (let idx = 0; idx < tags.length; idx += 1) {
      tag = tags[idx]
      if (!fs[tag]) {
        throw new TypeError(
          "Constructors given to cata didn't include: " + tag
        )
      }
    }

    return fs[this[TAG]](...(this[VALUES] as unknown[]))
  }

  function sum$ctrToString(this: DaggyObj) {
    return this[RET_TYPE] + '.' + this[TAG]
  }

  function sum$toString(this: DaggyObj) {
    return (
      this.constructor[TYPE] +
      '.' +
      this[TAG] +
      arrToString(this[VALUES] as unknown[])
    )
  }

  function typeRepToString(this: DaggyObj) {
    return this[TYPE]
  }

  function sum$isVariant(variant: DaggyObj) {
    return function $sum$isVariant(val: unknown) {
      return (
        Boolean(val) &&
        variant[TAG] === (val as DaggyObj)[TAG] &&
        variant[RET_TYPE] === typeof val
      )
    }
  }

  function sum$isUnit(unit: DaggyObj) {
    return function $sum$isUnit(val: unknown) {
      return (
        unit === val ||
        (Boolean(val) &&
          unit[TAG] === (val as DaggyObj)[TAG] &&
          typeof unit === typeof val)
      )
    }
  }

  function isType(typeName: string) {
    return function $isType(val: unknown) {
      return typeName === typeof val
    }
  }

  function makeValue(
    fields: string[],
    proto: DaggyObj,
    values: unknown[],
    argumentsLength: number
  ): DaggyObj {
    if (argumentsLength !== fields.length) {
      throw new TypeError(
        'Expected ' + fields.length + ' arguments, got ' + argumentsLength
      )
    }

    const obj = Object.create(proto) as DaggyObj
    defProp(obj, VALUES, values)

    for (let idx = 0; idx < fields.length; idx += 1) {
      obj[fields[idx]] = values[idx]
    }

    return obj
  }

  function defProp(obj: object, prop: string, val: unknown) {
    if (!cachedDesc) {
      cachedDesc = {
        enumerable: false,
        writable: false,
        configurable: false,
        value: null,
      }
    }

    cachedDesc.value = val
    Object.defineProperty(obj, prop, cachedDesc)
  }

  function arrToString(arr: unknown[]) {
    if (arr.length === 0) {
      return ''
    }

    let str = '(' + String(arr[0])

    for (let idx = 1; idx < arr.length; idx += 1) {
      str = str + ', ' + String(arr[idx])
    }

    return str + ')'
  }

  function makeConstructor(fields: string[], proto: DaggyObj) {
    const ctor = (...args: unknown[]) =>
      makeValue(fields, proto, args, args.length)
    Object.defineProperty(ctor, 'length', { value: fields.length })

    return ctor
  }

  function makeConstructorFromObject(fields: string[], proto: DaggyObj) {
    return function (obj: DaggyObj) {
      const values: unknown[] = []

      for (let idx = 0; idx < fields.length; idx += 1) {
        const field = fields[idx]
        if (!Object.hasOwn(obj, field)) {
          throw new TypeError('Missing field: ' + field)
        }
        values.push(obj[field])
      }

      return makeValue(fields, proto, values, values.length)
    }
  }

  return { taggedSum }
}
