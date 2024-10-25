import keycode, { aliases, names, codes } from '../keycode'

describe('keycode', () => {
  it('should return a char code from a letter', () => {
    expect(keycode('0')).toBe(48)
    expect(keycode('B')).toBe(66)
    expect(keycode('f1')).toBe(112)
    expect(keycode('9')).toBe(57)
    expect(keycode('numpad 0')).toBe(96)
  })

  it('should use aliases from a letter', () => {
    expect(keycode('ctl')).toBe(keycode('ctrl'))
  })

  it('does not use alias name when mapping back from a number', () => {
    for (const key in aliases) {
      expect(keycode(keycode(key))).not.toBe(key)
    }
  })

  it('should work as case insensitive', () => {
    expect(keycode('a')).toBe(65)
    expect(keycode('A')).toBe(65)
    expect(keycode('enter')).toBe(13)
    expect(keycode('ENTER')).toBe(13)
    expect(keycode('enTeR')).toBe(13)
    expect(keycode('Spacebar')).toBe(32)
  })

  it('returns char code for strange chars', () => {
    // TODO: not sure if this is sensible behavior
    expect(keycode('∆')).toBe(8710)
    expect(keycode('漢')).toBe(28450)
  })

  it('returns undefined for unknown strings', () => {
    expect(keycode('ants')).toBeUndefined()
    expect(keycode('Bagels')).toBeUndefined()
    expect(keycode('')).toBeUndefined()
    expect(keycode('JKHG KJG LSDF')).toBeUndefined()
  })

  it('returns undefined for unknown numbers', () => {
    expect(keycode(-1)).toBeUndefined()
    expect(keycode(Infinity)).toBeUndefined()
    expect(keycode(0.3)).toBeUndefined()
    expect(keycode(9999999)).toBeUndefined()
  })

  it('returns code for objects implementing toString function', () => {
    const obj = {
      toString: function () {
        return 'a'
      },
    }
    expect(keycode(obj)).toBe(65)
  })

  it('returns char for objects with a keyCode property', () => {
    const obj = { keyCode: 65 }
    expect(keycode(obj)).toBe('a')
  })

  it('returns undefined for any other passed in type', () => {
    expect(keycode({})).toBeUndefined()
    expect(keycode([])).toBeUndefined()
    expect(keycode([1, 2])).toBeUndefined()
    expect(keycode(null)).toBeUndefined()
    expect(keycode(undefined)).toBeUndefined()
    expect(keycode(/.*/)).toBeUndefined()
    expect(keycode(undefined)).toBeUndefined()
  })

  it('should work as commutative', () => {
    for (const key in codes) {
      expect(keycode(key)).toBe(keycode(keycode(keycode(key))))
    }
  })

  it('exposes keycode/name maps', () => {
    for (const code in codes) {
      expect(keycode(code)).toBe(keycode(names[codes[code]]))
    }
  })

  it('should return shift, ctrl, and alt for 16, 17, and 18', () => {
    expect(keycode(16)).toBe('shift')
    expect(keycode(17)).toBe('ctrl')
    expect(keycode(18)).toBe('alt')
  })

  it('should support "key" property for backwards compatibility', () => {
    expect(keycode({ key: 'a' })).toBe('a')
    expect(keycode({ key: 'A' })).toBe('a')
    expect(keycode({ key: 'enter' })).toBe('enter')
    expect(keycode({ key: 'ENTER' })).toBe('enter')
    expect(keycode({ key: 'enTeR' })).toBe('enter')
    expect(keycode({ key: 'Spacebar' })).toBe('space')
    expect(keycode({ key: 'Down' })).toBe('down')
    expect(keycode({ key: 'Left' })).toBe('left')
    expect(keycode({ key: 'Right' })).toBe('right')
    expect(keycode({ key: 'Up' })).toBe('up')
    expect(keycode({ key: 'ArrowDown' })).toBe('down')
    expect(keycode({ key: 'ArrowLeft' })).toBe('left')
    expect(keycode({ key: 'ArrowRight' })).toBe('right')
    expect(keycode({ key: 'ArrowUp' })).toBe('up')
  })

  it('should support "key" property for backwards compatibility with exception of Tab', () => {
    expect(keycode({ key: 'Tab' })).toBe(9)
  })
})
