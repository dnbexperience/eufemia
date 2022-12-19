import { act, renderHook } from '@testing-library/react-hooks'
import useHandleSortState from '../useHandleSortState'

describe('useHandleSortState', () => {
  it('should return empty sortHandler and sortState', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {},
    })

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler: {},
      sortState: {},
    })
  })

  it('should return default state', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: null,
      },
    })

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler: {
        one: expect.any(Function),
      },
      sortState: {
        one: {
          active: false,
          reversed: undefined,
          direction: 'off',
        },
      },
    })
  })

  it('should return false on active', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: false, direction: 'desc' },
      },
    })

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler: {
        one: expect.any(Function),
      },
      sortState: {
        one: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })
  })

  it('should return false on active', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: false, direction: 'desc' },
      },
    })

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler: {
        one: expect.any(Function),
      },
      sortState: {
        one: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })
  })

  it('should return active with reverted direction', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true, direction: 'desc' },
      },
    })

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler: {
        one: expect.any(Function),
      },
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
      },
    })
  })

  it('should return active with default direction', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true },
      },
    })

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler: {
        one: expect.any(Function),
      },
      sortState: {
        one: {
          active: true,
          reversed: undefined,
          direction: 'off',
        },
      },
    })
  })

  it('should cycle through all two given stages when dispatching handler', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true, modes: ['asc', 'desc'] },
      },
    })

    const sortHandler = {
      one: expect.any(Function),
    }

    const simulate = () => act(() => result.current.sortHandler.one())

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
      },
    })
  })

  it('should not cycle through stages when dispatching handler', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true, modes: ['asc'] },
      },
    })

    const sortHandler = {
      one: expect.any(Function),
    }

    const simulate = () => act(() => result.current.sortHandler.one())

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })
  })

  it('should cycle through "asc" and "off"', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true, modes: ['asc', 'off'] },
      },
    })

    const sortHandler = {
      one: expect.any(Function),
    }

    const simulate = () => act(() => result.current.sortHandler.one())

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })

    simulate()

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: undefined,
          direction: 'off',
        },
      },
    })

    simulate()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })
  })

  it('should cycle through all three stages when dispatching handler', () => {
    const { result } = renderHook(useHandleSortState, {
      initialProps: {
        one: { active: true },
        two: { active: false, direction: 'desc', modes: ['asc', 'desc'] },
      },
    })

    const sortHandler = {
      one: expect.any(Function),
      two: expect.any(Function),
    }

    const simulateOne = () => act(() => result.current.sortHandler.one())
    const simulateTwo = () => act(() => result.current.sortHandler.two())

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: undefined,
          direction: 'off',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          direction: 'asc',
          reversed: false,
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          direction: 'desc',
          reversed: true,
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateTwo()

    expect(result.current).toEqual({
      activeSortName: 'two',
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateTwo()

    expect(result.current).toEqual({
      activeSortName: 'two',
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
      },
    })

    simulateTwo()

    expect(result.current).toEqual({
      activeSortName: 'two',
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: null,
      sortHandler,
      sortState: {
        one: {
          active: false,
          reversed: undefined,
          direction: 'off',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: false,
          direction: 'asc',
        },
        two: {
          active: false,
          reversed: true,
          direction: 'desc',
        },
      },
    })

    simulateOne()

    expect(result.current).toEqual({
      activeSortName: 'one',
      sortHandler,
      sortState: {
        one: {
          active: true,
          reversed: true,
          direction: 'desc',
        },
        two: {
          active: false,
          direction: 'desc',
          reversed: true,
        },
      },
    })
  })
})
