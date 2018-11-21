'use strict'

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}

var fs = require('fs')
var React = require('react')
var reactDocs = require('react-docgen')

function isFlow(prop) {
  return prop.flowType
}

function getEnum(values) {
  return values[0].value
}

function getUnion(prefix, values, opts) {
  var type = values[0]
  return getFakeProp(prefix, { type: type }, opts)
}

function getArrayOf(prefix, type, opts) {
  return [getFakeProp(prefix, { type: type }, opts)]
}

function getObjectOf(prefix, type, opts) {
  return { prop: getFakeProp(prefix, { type: type }, opts) }
}

function getShape(prefix, object, opts) {
  var res = {}

  Object.keys(object).forEach(function(key) {
    var type = object[key]
    if (type.required || opts.optional) {
      res[key] = getFakeProp(prefix + '.' + key, { type: type })
    }
  })

  return res
}

function fakeString(prefix) {
  return prefix
}

function fakeBool() {
  return true
}

function fakeArray() {
  return []
}

function fakeNumber() {
  return 1
}

function fakeObject() {
  return {}
}

function fakeSymbol() {
  return Symbol('fake symbol')
}

function fakeNode(prefix) {
  return prefix
}

function fakeElement(prefix) {
  return React.createElement('div', [], 'fake ' + prefix + ' element')
}

function fakeInstanceOf(prefix) {
  return (
    'instanceOf type not supported, please set the correct value for ' +
    prefix +
    ' prop'
  )
}

function fakeAny() {
  return 'any'
}

function fakeCustom(prefix) {
  return (
    'custom type not supported, please set the correct value for ' +
    prefix +
    ' prop'
  )
}

function fakeFunction() {
  return function fakeFunction() {}
}

function getFakePropType(prefix, prop, opts) {
  switch (prop.type.name) {
    case 'array':
      return fakeArray()
    case 'bool':
      return fakeBool()
    case 'func':
      return fakeFunction()
    case 'number':
      return fakeNumber()
    case 'object':
      return fakeObject()
    case 'string':
      return fakeString(prefix)
    case 'symbol':
      return fakeSymbol()
    case 'node':
      return fakeNode(prefix)
    case 'element':
      return fakeElement(prefix)
    case 'instanceOf':
      return fakeInstanceOf(prefix)
    case 'enum':
      return getEnum(prop.type.value)
    case 'union':
      return getUnion(prefix, prop.type.value, opts)
    case 'arrayOf':
      return getArrayOf(prefix, prop.type.value, opts)
    case 'objectOf':
      return getObjectOf(prefix, prop.type.value, opts)
    case 'shape':
      return getShape(prefix, prop.type.value, opts)
    case 'any':
      return fakeAny()
    case 'custom':
      return fakeCustom(prefix)
    default:
      return 'Error, unknown type'
  }
}

function fakeFlowFunction(prefix, flowType, opts) {
  if (flowType.signature) {
    return Function.apply(
      null,
      flowType.signature.arguments
        .map(function(arg) {
          return arg.name
        })
        .concat(
          'return ' +
            JSON.stringify(
              getFakeFlow(prefix, flowType.signature.return, opts)
            )
        )
    )
  } else {
    return fakeFunction()
  }
}

function fakeSignature(prefix, flowType, opts) {
  switch (flowType.type) {
    case 'function':
      return fakeFlowFunction(prefix, flowType, opts)
    case 'object':
      // structure:
      // {
      //   signature: {
      //     properties: [
      //       {
      //         key: 'name',
      //         value: {
      //           name: 'string',
      //           required: true
      //         }
      //       },
      //       {
      //         key: 'count',
      //         value: {
      //           name: 'number',
      //           required: false
      //         }
      //       }
      //     ]
      //   }
      // }
      if (flowType.signature.properties) {
        return flowType.signature.properties
          .filter(function(prop) {
            return prop.value.required || opts.optional
          })
          .reduce(function(acc, prop) {
            return Object.assign(
              {},
              acc,
              _defineProperty(
                {},
                prop.key,
                getFakeFlow(prefix + '.' + prop.key, prop.value, opts)
              )
            )
          }, {})
      } else {
        return 'Error: unknown signature'
      }
    default:
      return 'Error, unknown signature'
  }
}

function flowType(prefix, prop, opts) {
  return getFakeFlow(prefix, prop.flowType, opts)
}

function getFakeFlow(prefix, flowType, opts) {
  switch (flowType.name) {
    case 'boolean':
      return fakeBool()
    case 'string':
      return fakeString(prefix)
    case 'number':
      return fakeNumber()
    case 'Function':
      return fakeFunction()
    case 'object':
    case 'Object':
      return fakeObject()
    case 'Array':
      // structure:
      // {
      //   name: 'Array',
      //   elements: [
      //     {
      //       name: 'Object'
      //     }
      //   ],
      //   raw: 'Array<Object>'
      // }
      if (flowType.elements) {
        return flowType.elements.map(function(prop) {
          return getFakeFlow(prefix, prop, opts)
        })
      } else {
        return fakeArray()
      }
    case 'signature':
      return fakeSignature(prefix, flowType, opts)
    case 'unknown':
      return 'unknown'
    default:
      return 'Error, unknown type'
  }
}

function getFakeProp(prefix, prop, opts) {
  return isFlow(prop)
    ? flowType(prefix, prop, opts)
    : getFakePropType(prefix, prop, opts)
}

export function fakeDataForProps() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

  var _ref =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : {},
    _ref$optional = _ref.optional,
    optional = _ref$optional === undefined ? false : _ref$optional

  return Object.keys(props).reduce(function(acc, key) {
    var prop = props[key]
    if (prop.required || optional) {
      return Object.assign(
        {},
        acc,
        _defineProperty(
          {},
          key,
          getFakeProp(key, prop, { optional: optional })
        )
      )
    } else {
      return acc
    }
  }, {})
}

export default function(file) {
  var _ref2 =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : {},
    _ref2$optional = _ref2.optional,
    optional = _ref2$optional === undefined ? false : _ref2$optional

  var source = fs.readFileSync(file)
  var componentInfo = reactDocs.parse(source)

  return fakeDataForProps(componentInfo.props, { optional: optional })
}
