import decodeHashId from '../decodeHashId'

describe('decodeHashId', () => {
  it('should decode percent-encoded characters', () => {
    expect(decodeHashId('s%C3%B8knad')).toBe('søknad')
  })

  it('should return an id without escapes unchanged', () => {
    expect(decodeHashId('unique-id')).toBe('unique-id')
  })

  it('should return the input when it is not valid percent-encoding', () => {
    expect(decodeHashId('50%off')).toBe('50%off')
  })
})
