// copy of https://github.com/bevacqua/hash-sum/blob/master/hash-sum.js

function pad(hash, len) {
  while (hash.length < len) {
    hash = '0' + hash
  }
  return hash
}

function fold(hash, text) {
  let i
  let chr
  let len
  if (text.length === 0) {
    return hash
  }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash < 0 ? hash * -2 : hash
}

function foldObject(hash, o, seen, deep) {
  return Object.keys(o).sort().reduce(foldKey, hash)
  function foldKey(hash, key) {
    if (
      deep === false &&
      (typeof o[key] === 'object' || typeof o[key] === 'function')
    ) {
      return hash
    }
    return foldValue(hash, o[key], key, seen, deep)
  }
}

function foldValue(input, value, key, seen, deep) {
  const hash = fold(fold(fold(input, key), toString(value)), typeof value)
  if (value === null) {
    return fold(hash, 'null')
  }
  if (value === undefined) {
    return fold(hash, 'undefined')
  }
  if (typeof value === 'object' || typeof value === 'function') {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, '[Circular]' + key)
    }
    seen.push(value)

    const objHash = foldObject(hash, value, seen, deep)

    if (!('valueOf' in value) || typeof value.valueOf !== 'function') {
      return objHash
    }

    try {
      return fold(objHash, String(value.valueOf()))
    } catch (err) {
      return fold(
        objHash,
        '[valueOf exception]' + (err.stack || err.message)
      )
    }
  }
  return fold(hash, value.toString())
}

function toString(o) {
  return Object.prototype.toString.call(o)
}

export default function sum(o, deep = true) {
  return pad(foldValue(0, o, '', [], deep).toString(16), 8)
}
