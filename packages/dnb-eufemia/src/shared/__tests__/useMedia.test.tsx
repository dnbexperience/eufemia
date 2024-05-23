/**
 * useMedia Tests
 *
 */

import React from 'react'
import { render, waitFor, act, renderHook } from '@testing-library/react'
import useMedia, { UseMediaProps } from '../useMedia'
import Provider from '../Provider'
import 'mock-match-media/jest-setup'
import { setMedia, matchMedia } from 'mock-match-media'
import { mockMediaQuery } from './helpers/MediaQueryMocker'

const wrapper = ({ children }) => (
  <React.StrictMode>{children}</React.StrictMode>
)

describe('useMedia', () => {
  describe('using mock-match-media mocker', () => {
    const BELOW = '10em'
    const ABOVE = '100em'

    const SMALL = '39em' // 40em
    const MEDIUM = '59em' // 60em
    const LARGE = '79em' // 80em

    beforeEach(() => {
      jest.spyOn(window, 'matchMedia').mockImplementation(matchMedia)
    })

    const matchMediaOriginal = window.matchMedia
    afterEach(() => {
      window.matchMedia = matchMediaOriginal
    })

    it('will return object with', () => {
      setMedia({ type: 'print' })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: false,
          key: null,
        })
      )
    })

    it('will return positive isSmall', async () => {
      setMedia({ width: SMALL })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: true,
          isMedium: false,
          isLarge: false,
          key: 'small',
        })
      )

      act(() => {
        setMedia({ width: ABOVE })
      })

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )
      })
    })

    it('will return positive isMedium', async () => {
      setMedia({ width: MEDIUM })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: true,
          isLarge: false,
          key: 'medium',
        })
      )

      act(() => {
        setMedia({ width: ABOVE })
      })

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )
      })
    })

    it('will return positive isLarge', async () => {
      setMedia({ width: LARGE })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )

      act(() => {
        setMedia({ width: BELOW })
      })

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          })
        )
      })
    })

    it('will react to all possible sizes', async () => {
      setMedia({ width: ABOVE })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )

      const queries = [
        {
          width: BELOW,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
        {
          width: ABOVE,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          }),
        },
        {
          width: MEDIUM,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: true,
            isLarge: false,
            key: 'medium',
          }),
        },
        {
          width: LARGE,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          }),
        },
        {
          width: SMALL,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
        {
          width: BELOW,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
      ]

      for await (const { width, expectResult } of queries) {
        act(() => {
          setMedia({ width })
        })
        await waitFor(() => {
          expect(result.current).toEqual(expectResult)
        })
      }
    })

    it('can be disabled programmatically', async () => {
      setMedia({ width: LARGE })

      const { result, rerender } = renderHook(useMedia, {
        initialProps: { disabled: false },
      })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )

      rerender({ disabled: true })

      await act(async () => {
        setMedia({ width: BELOW })

        await waitFor(() => result.current)

        /**
         * Keep the same state as before
         */
        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )
      })

      rerender({ disabled: false })

      await act(async () => {
        setMedia({ width: SMALL })

        await waitFor(() => result.current)

        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          })
        )

        /**
         * Set state before disable
         */
        setMedia({ width: LARGE })
      })

      rerender({ disabled: true })

      await act(async () => {
        setMedia({ width: BELOW })

        await waitFor(() => result.current)

        /**
         * Keep the same state as before
         */
        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )
      })
    })

    it('will return isSSR=true during SSR', () => {
      setMedia({ width: SMALL })

      window.matchMedia = undefined

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: false,
          isSSR: true,
          key: null,
        })
      )
    })

    it('will re-render component', async () => {
      let count = 0
      const MockComponent = (options: UseMediaProps = null) => {
        const props = useMedia(options)

        count++

        return <>{JSON.stringify(props)}</>
      }
      const getContent = () =>
        JSON.parse(document.querySelector('div').textContent)

      setMedia({ width: SMALL })

      const { rerender } = render(<MockComponent />, { wrapper })

      expect(getContent()).toEqual({
        isSmall: true,
        isMedium: false,
        isLarge: false,
        isSSR: false,
        key: 'small',
      })

      act(() => {
        setMedia({ width: MEDIUM })
      })
      await waitFor(() =>
        expect(getContent()).toEqual({
          isSmall: false,
          isMedium: true,
          isLarge: false,
          isSSR: false,
          key: 'medium',
        })
      )

      act(() => {
        setMedia({ width: LARGE })
      })
      await waitFor(() => {
        expect(getContent()).toEqual({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          isSSR: false,
          key: 'large',
        })
      })

      act(() => {
        setMedia({ width: BELOW })
      })
      await waitFor(() => {
        expect(getContent()).toEqual({
          isSmall: true,
          isMedium: false,
          isLarge: false,
          isSSR: false,
          key: 'small',
        })
      })

      act(() => {
        setMedia({ width: ABOVE })
      })
      await waitFor(() => {
        expect(getContent()).toEqual({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          isSSR: false,
          key: 'large',
        })
      })

      act(() => {
        // reset before re-render
        setMedia({ width: SMALL })
      })

      rerender(<MockComponent disabled={true} />)

      // Now it should use the state it has before

      const disabledState = {
        isSmall: true,
        isMedium: false,
        isLarge: false,
        isSSR: false,
        key: 'small',
      }
      act(() => {
        setMedia({ width: MEDIUM })
      })
      await waitFor(() => expect(getContent()).toEqual(disabledState))

      act(() => {
        setMedia({ width: LARGE })
      })
      await waitFor(() => expect(getContent()).toEqual(disabledState))

      rerender(<MockComponent disabled={false} key="reset-me" />)

      act(() => {
        setMedia({ width: MEDIUM })
      })
      await waitFor(() =>
        expect(getContent()).toEqual({
          isSmall: false,
          isMedium: true,
          isLarge: false,
          isSSR: false,
          key: 'medium',
        })
      )

      act(() => {
        setMedia({ width: LARGE })
      })
      await waitFor(() =>
        expect(getContent()).toEqual({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          isSSR: false,
          key: 'large',
        })
      )

      expect(count).toBe(28)
    })

    it('will return correct key based on size', async () => {
      setMedia({ width: ABOVE })

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )

      const queries = [
        {
          width: BELOW,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
        {
          width: ABOVE,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          }),
        },
        {
          width: MEDIUM,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: true,
            isLarge: false,
            key: 'medium',
          }),
        },
        {
          width: LARGE,
          expectResult: expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          }),
        },
        {
          width: SMALL,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
        {
          width: BELOW,
          expectResult: expect.objectContaining({
            isSmall: true,
            isMedium: false,
            isLarge: false,
            key: 'small',
          }),
        },
      ]

      for await (const { width, expectResult } of queries) {
        act(() => {
          setMedia({ width })
        })
        await waitFor(() => {
          expect(result.current).toEqual(expectResult)
        })
      }
    })

    describe('breakpoints', () => {
      it('will react to all possible sizes', async () => {
        setMedia({ width: ABOVE })

        const SMALL = '40em'
        const MEDIUM = '60em'
        const LARGE = '80em'

        const wrapper = (props) => (
          <Provider
            {...props}
            value={{
              breakpoints: {
                small: '40em',
                medium: '72em',
                large: '80em',
              },
            }}
          />
        )
        const { result } = renderHook(useMedia, { wrapper })

        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )

        const queries = [
          {
            width: BELOW,
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
          {
            width: ABOVE,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: false,
              isLarge: true,
              key: 'large',
            }),
          },
          {
            width: MEDIUM,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: true,
              isLarge: false,
              key: 'medium',
            }),
          },
          {
            width: LARGE,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: false,
              isLarge: true,
              key: 'large',
            }),
          },
          {
            width: SMALL,
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
          {
            width: BELOW,
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
        ]

        for await (const { width, expectResult } of queries) {
          act(() => {
            setMedia({ width })
          })
          await waitFor(() => {
            expect(result.current).toEqual(expectResult)
          })
        }
      })

      it('will use custom breakpoints', async () => {
        setMedia({ width: ABOVE })

        const { result } = renderHook(() =>
          useMedia({
            breakpoints: { small: '30em', medium: SMALL, large: MEDIUM },
          })
        )

        expect(result.current).toEqual(
          expect.objectContaining({
            isSmall: false,
            isMedium: false,
            isLarge: true,
            key: 'large',
          })
        )

        const queries = [
          {
            width: BELOW,
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
          {
            width: ABOVE,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: false,
              isLarge: true,
              key: 'large',
            }),
          },
          {
            width: SMALL,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: true,
              isLarge: false,
              key: 'medium',
            }),
          },
          {
            width: MEDIUM,
            expectResult: expect.objectContaining({
              isSmall: false,
              isMedium: false,
              isLarge: true,
              key: 'large',
            }),
          },
          {
            width: '20rem',
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
          {
            width: BELOW,
            expectResult: expect.objectContaining({
              isSmall: true,
              isMedium: false,
              isLarge: false,
              key: 'small',
            }),
          },
        ]

        for await (const { width, expectResult } of queries) {
          act(() => {
            setMedia({ width })
          })
          await waitFor(() => {
            expect(result.current).toEqual(expectResult)
          })
        }
      })
    })

    describe('queries', () => {
      it('should use custom queries', async () => {
        const CUSTOM_SMALL = '10em'
        const CUSTOM_LARGE = '30em'

        setMedia({ width: ABOVE })

        const { result } = renderHook(() =>
          useMedia({
            queries: {
              customSmall: { max: CUSTOM_SMALL },
              customMedium: { min: CUSTOM_SMALL, max: CUSTOM_LARGE },
              customLarge: { min: CUSTOM_LARGE },
            },
          })
        )

        expect(result.current).toEqual({
          isCustomsmall: false,
          isCustommedium: false,
          isCustomlarge: true,
          isSSR: false,
          key: 'customLarge',
        })

        const queries = [
          {
            width: '9em',
            expectResult: expect.objectContaining({
              isCustomsmall: true,
              isCustommedium: false,
              isCustomlarge: false,
              key: 'customSmall',
            }),
          },
          {
            width: '15em',
            expectResult: expect.objectContaining({
              isCustomsmall: false,
              isCustommedium: true,
              isCustomlarge: false,
              key: 'customMedium',
            }),
          },
          {
            width: '29em',
            expectResult: expect.objectContaining({
              isCustomsmall: false,
              isCustommedium: true,
              isCustomlarge: false,
              key: 'customMedium',
            }),
          },
          {
            width: '31em',
            expectResult: expect.objectContaining({
              isCustomsmall: false,
              isCustommedium: false,
              isCustomlarge: true,
              key: 'customLarge',
            }),
          },
          {
            width: '5em',
            expectResult: expect.objectContaining({
              isCustomsmall: true,
              isCustommedium: false,
              isCustomlarge: false,
              key: 'customSmall',
            }),
          },
          {
            width: '45em',
            expectResult: expect.objectContaining({
              isCustomsmall: false,
              isCustommedium: false,
              isCustomlarge: true,
              key: 'customLarge',
            }),
          },
          {
            width: '25em',
            expectResult: expect.objectContaining({
              isCustomsmall: false,
              isCustommedium: true,
              isCustomlarge: false,
              key: 'customMedium',
            }),
          },
        ]

        for await (const { width, expectResult } of queries) {
          act(() => {
            setMedia({ width })
          })
          await waitFor(() => {
            expect(result.current).toEqual(expectResult)
          })
        }
      })
    })
  })

  describe('using jest-matchmedia-mock mocker', () => {
    const matchMedia = mockMediaQuery()
    const matchMediaMock = window.matchMedia // set in mockMediaQuery

    beforeEach(() => {
      jest.spyOn(window, 'matchMedia').mockImplementation(matchMediaMock)
    })

    it('will return positive isSmall', () => {
      const query = `(min-width: 0em) and (max-width: 40em)`
      matchMedia.useMediaQuery(query)

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: true,
          isMedium: false,
          isLarge: false,
          key: 'small',
        })
      )
    })

    it('will return positive isMedium', () => {
      const query = `(min-width: 40.0625em) and (max-width: 60em)`
      matchMedia.useMediaQuery(query)

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: true,
          isLarge: false,
          key: 'medium',
        })
      )
    })

    it('will return positive isLarge', () => {
      const query = `(min-width: 60.0625em)`
      matchMedia.useMediaQuery(query)

      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSmall: false,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )
    })
  })

  describe('ssr', () => {
    beforeAll(() => {
      global.window['__SSR_TEST__'] = true
    })

    afterAll(() => {
      delete global.window['__SSR_TEST__']
    })

    it('will by default return false on all sizes', () => {
      const { result } = renderHook(useMedia, { wrapper })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSSR: true,
          isSmall: false,
          isMedium: false,
          isLarge: false,
          key: null,
        })
      )
    })

    it('will return positive isSmall when in initialValue', () => {
      const { result } = renderHook(useMedia, {
        wrapper,
        initialProps: {
          initialValue: {
            isSmall: true,
          },
        },
      })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSSR: true,
          isSmall: true,
          isMedium: false,
          isLarge: false,
          key: 'small',
        })
      )
    })

    it('will return both positive isSmall and isLarge', () => {
      const { result } = renderHook(useMedia, {
        wrapper,
        initialProps: {
          initialValue: {
            isSmall: true,
            isLarge: true,
          },
        },
      })

      expect(result.current).toEqual(
        expect.objectContaining({
          isSSR: true,
          isSmall: true,
          isMedium: false,
          isLarge: true,
          key: 'large',
        })
      )
    })
  })
})

describe('useMedia without window.matchMedia', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: undefined,
      writable: true,
    })
  })

  const MockComponent = (options: UseMediaProps = null) => {
    const props = useMedia(options)

    return <>{JSON.stringify(props)}</>
  }

  const getContent = () =>
    JSON.parse(document.querySelector('div').textContent)

  it('should not break', () => {
    render(<MockComponent />)

    expect(getContent()).toEqual({
      isSmall: false,
      isMedium: false,
      isLarge: false,
      isSSR: true,
      key: null,
    })
  })
})
