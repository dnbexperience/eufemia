// import daggy from 'daggy';

const daggy = createDaggy()

const DNB = daggy.taggedSum('DNB', {
  Colored: ['color'],
  Metalic: []
})

const Visa = daggy.taggedSum('Visa', {
  Colored: ['color'],
  Metalic: []
})

const Mastercard = daggy.taggedSum('Mastercard', {
  Default: [],
  DefaultWhite: [],
  Metalic: [],
  BlackMetalic: []
})

const CardType = daggy.taggedSum('CardType', {
  Visa: [],
  Mastercard: [],
  None: []
})

const BankAxept = daggy.taggedSum('BankAxept', {
  White: [],
  Black: []
})

const Saga = daggy.taggedSum('Saga', {
  Gold: [],
  Platinum: [],
  VisaPlatinum: [],
  None: []
})

// PrivateBanking
const PB = daggy.taggedSum('PB', {
  Default: [],
  Platinum: [],
  None: []
})

const ProductType = daggy.taggedSum('ProductType', {
  BankAxept: [],
  Saga: [],
  PrivateBanking: [],
  None: []
})

// const Status = daggy.taggedSum('Status', {
//   Expired: [],
//   Blocked: [],
//   Active: []
// })

export {
  DNB,
  Saga,
  PB,
  Mastercard,
  ProductType,
  CardType,
  BankAxept,
  Visa
  // Status
}

const Types = {
  DNB,
  Saga,
  PB,
  Mastercard,
  ProductType,
  CardType,
  BankAxept,
  Visa
  // Status
}

export default Types

function createDaggy() {
  // Names of prop used to store:
  // * name of variant of a sum type
  const TAG = '@@tag'
  // * array of arguments used to create a value (to speed up `cata`)
  const VALUES = '@@values'
  // * `@@type` of its returned results
  const TYPE = '@@type'
  // * `@@type` of variant constructor's returned results
  const RET_TYPE = '@@ret_type'
  // * names of all variants of a sum type
  const TAGS = '@@tags'

  function taggedSum(typeName, constructors) {
    const proto = { cata: sum$cata, toString: sum$toString }
    const tags = Object.keys(constructors)
    const typeRep = (proto.constructor = {
      toString: typeRepToString,
      prototype: proto,
      is: isType(typeName),
      '@@type': typeName,
      '@@tags': tags
    })
    tags.forEach(function (tag) {
      const fields = constructors[tag]
      const tagProto = Object.create(proto)
      defProp(tagProto, TAG, tag)
      if (fields.length === 0) {
        typeRep[tag] = makeValue(fields, tagProto, [], 0)
        typeRep[tag].is = sum$isUnit(typeRep[tag])
        return
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

  function sum$cata(fs) {
    const tags = this.constructor[TAGS]
    let tag
    for (let idx = 0; idx < tags.length; idx += 1) {
      tag = tags[idx]
      if (!fs[tag]) {
        throw new TypeError(
          "Constructors given to cata didn't include: " + tag
        )
      }
    }
    return fs[this[TAG]].apply(fs, this[VALUES])
  }

  function sum$ctrToString() {
    return this[RET_TYPE] + '.' + this[TAG]
  }

  function sum$toString() {
    return (
      this.constructor[TYPE] + '.' + this[TAG] + arrToString(this[VALUES])
    )
  }

  function typeRepToString() {
    return this[TYPE]
  }

  // function tagged$toString() {
  // return this.constructor[TYPE] + arrToString(this[VALUES])
  // }

  function sum$isVariant(variant) {
    return function $sum$isVariant(val) {
      return (
        Boolean(val) &&
        variant[TAG] === val[TAG] &&
        variant[RET_TYPE] === typeof val
      )
    }
  }

  function sum$isUnit(unit) {
    return function $sum$isUnit(val) {
      return (
        unit === val ||
        (Boolean(val) &&
          unit[TAG] === val[TAG] &&
          typeof unit === typeof val)
      )
    }
  }

  function isType(typeName) {
    return function $isType(val) {
      return typeName === typeof val
    }
  }

  function makeValue(fields, proto, values, argumentsLength) {
    if (argumentsLength !== fields.length) {
      throw new TypeError(
        'Expected ' + fields.length + ' arguments, got ' + argumentsLength
      )
    }
    const obj = Object.create(proto)
    defProp(obj, VALUES, values)
    for (let idx = 0; idx < fields.length; idx += 1) {
      obj[fields[idx]] = values[idx]
    }
    return obj
  }

  // adopted version of withValue from  https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  function defProp(obj, prop, val) {
    const desc =
      defProp.desc ||
      (defProp.desc = {
        enumerable: false,
        writable: false,
        configurable: false,
        value: null
      })
    desc.value = val
    Object.defineProperty(obj, prop, desc)
  }

  // optimised version of `arr.map(toString).join(', ')`
  function arrToString(arr) {
    if (arr.length === 0) return ''
    let str = '(' + window.toString(arr[0])
    for (let idx = 1; idx < arr.length; idx += 1) {
      str = str + ', ' + window.toString(arr[idx])
    }
    return str + ')'
  }

  function makeConstructor(fields, proto) {
    switch (fields.length) {
      /* eslint-disable max-len */
      case 1:
        return function (a) {
          return makeValue(fields, proto, [a], arguments.length)
        }
      case 2:
        return function (a, b) {
          return makeValue(fields, proto, [a, b], arguments.length)
        }
      case 3:
        return function (a, b, c) {
          return makeValue(fields, proto, [a, b, c], arguments.length)
        }
      case 4:
        return function (a, b, c, d) {
          return makeValue(fields, proto, [a, b, c, d], arguments.length)
        }
      case 5:
        return function (a, b, c, d, e) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e],
            arguments.length
          )
        }
      case 6:
        return function (a, b, c, d, e, f) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e, f],
            arguments.length
          )
        }
      case 7:
        return function (a, b, c, d, e, f, g) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e, f, g],
            arguments.length
          )
        }
      case 8:
        return function (a, b, c, d, e, f, g, h) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e, f, g, h],
            arguments.length
          )
        }
      case 9:
        return function (a, b, c, d, e, f, g, h, i) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e, f, g, h, i],
            arguments.length
          )
        }
      case 10:
        return function (a, b, c, d, e, f, g, h, i, j) {
          return makeValue(
            fields,
            proto,
            [a, b, c, d, e, f, g, h, i, j],
            arguments.length
          )
        }
      /* eslint-enable max-len */
      default:
        return Object.defineProperty(
          function () {
            return makeValue(fields, proto, arguments, arguments.length)
          },
          'length',
          { value: fields.length }
        )
    }
  }

  function makeConstructorFromObject(fields, proto) {
    return function (obj) {
      const values = []
      for (let idx = 0; idx < fields.length; idx += 1) {
        const field = fields[idx]
        if (!Object.prototype.hasOwnProperty.call(obj, field)) {
          throw new TypeError('Missing field: ' + field)
        }
        values.push(obj[field])
      }
      return makeValue(fields, proto, values, values.length)
    }
  }

  return { taggedSum }
}
