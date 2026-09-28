import { renderHook } from '@testing-library/react'
import useId from '../useId'

const reactId = vi.hoisted(() => ({ current: null as string | null }))

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    useId: () => reactId.current ?? actual.useId(),
  }
})

afterEach(() => {
  reactId.current = null
})

describe('useId', () => {
  it('should return given id', () => {
    const { result } = renderHook(() => useId('test'))
    expect(result.current).toBe('test')
  })

  it('should return id from React.useId', () => {
    const { result } = renderHook(() => useId())
    expect(result.current).toMatch(/^id-/)
  })

  it.each([
    [':r1:', 'React 19.0'],
    ['«r1»', 'React 19.1'],
    ['_r_1_', 'React 19.2'],
  ])('should return a valid CSS identifier for %s (%s)', (id) => {
    reactId.current = id

    const { result } = renderHook(() => useId())

    expect(result.current).toBe('id-r1')
    expect(() =>
      document.querySelector(`#${result.current}`)
    ).not.toThrow()
  })
})
