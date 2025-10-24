import { Ajv, makeAjvInstance, enhanceAjvInstance } from '../ajv'

describe('makeAjvInstance', () => {
  it('should return a new Ajv instance', () => {
    const ajv = new Ajv({
      allErrors: true,
    })

    const ajvInstance = makeAjvInstance(ajv)

    expect(ajvInstance).toBeDefined()
    expect(ajvInstance).toBeInstanceOf(Ajv)
  })

  it('should return a new Ajv instance with default options if no instance is provided', () => {
    const ajvInstance = makeAjvInstance()

    expect(ajvInstance).toBeDefined()
    expect(ajvInstance).toBeInstanceOf(Ajv)
  })
})

describe('enhanceAjvInstance', () => {
  it('should enhance an existing Ajv instance with ajv-errors plugin', () => {
    const ajv = new Ajv({
      allErrors: true,
    })

    const ajvInstance = enhanceAjvInstance(ajv)

    expect(ajvInstance).toBeDefined()
    expect(ajvInstance).toBeInstanceOf(Ajv)
    expect(ajvInstance).toBe(ajv) // Should return the same instance
    expect(ajvInstance['__ajvErrors__']).toBe(true) // Should be enhanced
  })

  it('should not re-enhance an already enhanced Ajv instance', () => {
    const ajv = new Ajv({
      allErrors: true,
    })

    // First enhancement
    const ajvInstance1 = enhanceAjvInstance(ajv)
    expect(ajvInstance1['__ajvErrors__']).toBe(true)

    // Second enhancement should not cause issues
    const ajvInstance2 = enhanceAjvInstance(ajv)
    expect(ajvInstance2).toBe(ajv)
    expect(ajvInstance2['__ajvErrors__']).toBe(true)
  })
})
