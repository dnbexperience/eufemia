/**
 * Provider/Context Tests
 *
 */

import { useContext } from 'react'
import HelpButton from '../../components/help-button/HelpButton'
import ToggleButton from '../../components/toggle-button/ToggleButton'
import GlobalError from '../../components/global-error/GlobalError'

import type {
  ContextProps,
  TranslationFlat,
  Translations,
  TranslationsLoader,
} from '../Context'
import Context from '../Context'
import type { ProviderProps } from '../Provider'
import Provider from '../Provider'
import { fireEvent, render, waitFor } from '@testing-library/react'
import locales from '../../shared/locales'
import Translation from '../Translation'
import useTranslation from '../useTranslation'
import * as TranslationModule from '../Translation'
import { Form } from '../../extensions/forms'

const en = locales['en-GB']

describe('Provider', () => {
  describe('translations', () => {
    const titleNb = 'Tekst'
    const titleGb = 'Text'

    const nbNO: TranslationFlat = {
      'HelpButton.title': titleNb,
    }
    const enGB: TranslationFlat = {
      'HelpButton.title': titleGb,
    }

    const defaultTranslations: Translations = {
      'nb-NO': nbNO,
      'en-GB': enGB,
    }

    const LocalProvider = (props: ProviderProps) => {
      return <Provider translations={defaultTranslations} {...props} />
    }

    const ChangeLocale = () => {
      const { setLocale, locale } = useContext(Context)

      expect(typeof setLocale).toBe('function')

      return (
        <ToggleButton.Group
          value={locale}
          onChange={({ value }) => {
            setLocale(value as string)
          }}
        >
          <ToggleButton value="nb-NO" className="nb-NO">
            nb-NO
          </ToggleButton>
          <ToggleButton value="sv-SE" className="sv-SE">
            sv-SE
          </ToggleButton>
          <ToggleButton value="da-DK" className="da-DK">
            da-DK
          </ToggleButton>
          <ToggleButton value="en-GB" className="en-GB">
            en-GB
          </ToggleButton>
          <ToggleButton value="en-US" className="en-US">
            en-US
          </ToggleButton>
        </ToggleButton.Group>
      )
    }

    const MagicProvider = ({
      children = null,
      ...props
    }: Partial<ProviderProps>) => {
      return (
        <LocalProvider {...props}>
          <Context.Consumer>
            {(context) => {
              const title = context.translation.HelpButton.title
              return (
                <>
                  <p>{title}</p>
                  <ChangeLocale />
                  {children}
                </>
              )
            }}
          </Context.Consumer>
        </LocalProvider>
      )
    }

    it('should translate component strings', () => {
      const { rerender } = render(
        <LocalProvider>
          <HelpButton>content</HelpButton>
        </LocalProvider>
      )

      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-label')
      ).toBe(titleNb)
      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-roledescription')
      ).toBe('Hjelp-knapp')

      rerender(
        <LocalProvider locale="en-GB">
          <HelpButton>content</HelpButton>
        </LocalProvider>
      )

      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-label')
      ).toBe(titleGb)
      expect(
        document
          .querySelector('button.dnb-help-button')
          .getAttribute('aria-roledescription')
      ).toBe('Help button')
    })

    it('should react on prop change', () => {
      const { rerender } = render(<MagicProvider />)

      expect(document.querySelector('p').textContent).toBe(titleNb)

      rerender(<MagicProvider locale="en-GB" />)

      expect(document.querySelector('p').textContent).toBe(titleGb)
    })

    it('should react on locale change', () => {
      render(<MagicProvider />)

      expect(document.querySelector('p').textContent).toBe(titleNb)

      fireEvent.click(document.querySelector('.en-GB button'))

      expect(document.querySelector('p').textContent).toBe(titleGb)

      fireEvent.click(document.querySelector('.en-US button'))

      expect(document.querySelector('p').textContent).toBe(titleGb)

      fireEvent.click(document.querySelector('.nb-NO button'))

      expect(document.querySelector('p').textContent).toBe(titleNb)
    })

    it('should support nested providers handling locales', () => {
      render(
        <MagicProvider locale="nb-NO">
          <MagicProvider locale="en-GB" />
        </MagicProvider>
      )

      const getRootElement = () => document.querySelectorAll('p')[0]
      const getNestedElement = () => document.querySelectorAll('p')[1]
      const switchRootTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
      }
      const switchNestedTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
      }

      expect(getRootElement().textContent).toBe(titleNb)
      expect(getNestedElement().textContent).toBe(titleGb)

      switchNestedTo('nb-NO')

      expect(getNestedElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // should not have changed
      expect(getRootElement().textContent).toBe(titleNb)

      switchRootTo('en-GB')

      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getRootElement().textContent).toBe(titleGb)

      switchRootTo('en-US')

      expect(
        document
          .querySelectorAll('.en-US button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getRootElement().textContent).toBe(titleGb)

      // should not have changed
      expect(getNestedElement().textContent).toBe(titleNb)
    })

    it('should inherit locale in nested providers', () => {
      const locale = 'nb-NO'
      let receivedLocale = null

      const Consumer = () => {
        receivedLocale = useContext(Context).locale
        return null
      }

      render(
        <MagicProvider locale="nb-NO">
          <MagicProvider>
            <Consumer />
          </MagicProvider>
        </MagicProvider>
      )

      expect(receivedLocale).toBe(locale)
      expect(document.querySelectorAll('p')[0].textContent).toBe(titleNb)
    })

    it('should change locale in root context', () => {
      const Consumer = ({ id }) => {
        const context = useContext(Context)
        const { locale, setLocale } = context

        const handleOnChange = () => {
          setLocale(locale === 'nb-NO' ? 'en-GB' : 'nb-NO')
        }

        return (
          <>
            <p id={id + '-locale'}>{locale}</p>
            <button id={id + '-button'} onClick={handleOnChange}>
              change
            </button>
          </>
        )
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      render(
        <Provider locale="nb-NO">
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('root-button'))

      expect(getRootLocale()).toBe('en-GB')
      expect(getNestedLocale()).toBe('en-GB')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')
    })

    it('should change locale in local context', () => {
      const Consumer = ({ id }) => {
        const context = useContext(Context)
        const { locale, setCurrentLocale } = context

        const handleOnChange = () => {
          setCurrentLocale(locale === 'nb-NO' ? 'en-GB' : 'nb-NO')
        }

        return (
          <>
            <p id={id + '-locale'}>{locale}</p>
            <button id={id + '-button'} onClick={handleOnChange}>
              change
            </button>
          </>
        )
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      render(
        <Provider locale="nb-NO">
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('en-GB')

      fireEvent.click(document.getElementById('nested-button'))

      expect(getRootLocale()).toBe('nb-NO')
      expect(getNestedLocale()).toBe('nb-NO')

      fireEvent.click(document.getElementById('root-button'))

      expect(getRootLocale()).toBe('en-GB')
      expect(getNestedLocale()).toBe('nb-NO')
    })

    it('will support "value" prop in nested contexts', () => {
      type ConsumerContext = {
        myProperty: string
      }

      const Consumer = ({ id }) => {
        const context = useContext<
          ContextProps & Partial<ConsumerContext>
        >(Context)

        return <p id={id + '-locale'}>{context.myProperty}</p>
      }

      const RootConsumer = () => {
        return <Consumer id="root" />
      }

      const NestedConsumer = () => {
        return <Consumer id="nested" />
      }

      const { rerender } = render(
        <Provider value={{ myProperty: 'bar' }}>
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      const getRootLocale = () =>
        document.getElementById('root-locale').textContent
      const getNestedLocale = () =>
        document.getElementById('nested-locale').textContent

      expect(getRootLocale()).toBe('bar')
      expect(getNestedLocale()).toBe('bar')

      const value: ConsumerContext = { myProperty: 'changed' }

      rerender(
        <Provider value={value}>
          <RootConsumer />
          <Provider>
            <NestedConsumer />
          </Provider>
        </Provider>
      )

      expect(getRootLocale()).toBe('changed')
      expect(getNestedLocale()).toBe('changed')
    })

    it('should support nested providers and update the root context', () => {
      render(
        <MagicProvider locale="en-GB">
          <MagicProvider locale="nb-NO" />
        </MagicProvider>
      )

      const getRootElement = () => document.querySelectorAll('p')[0]
      const getNestedElement = () => document.querySelectorAll('p')[1]
      const switchRootTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[0])
      }
      const switchNestedTo = (locale: string) => {
        fireEvent.click(document.querySelectorAll(`.${locale} button`)[1])
      }

      expect(getRootElement().textContent).toBe(titleGb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // First, let's change the inner
      switchNestedTo('nb-NO')

      expect(getRootElement().textContent).toBe(titleGb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      switchNestedTo('en-GB')

      expect(getRootElement().textContent).toBe(titleGb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(titleGb)
      expect(
        document
          .querySelectorAll('.en-GB button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      switchNestedTo('nb-NO')

      expect(getRootElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')

      // Now, let's change the outer
      switchRootTo('en-GB')

      expect(getRootElement().textContent).toBe(titleGb)
      expect(
        document
          .querySelectorAll('.en-GB button')[0]
          .getAttribute('aria-pressed')
      ).toBe('true')
      expect(getNestedElement().textContent).toBe(titleNb)
      expect(
        document
          .querySelectorAll('.nb-NO button')[1]
          .getAttribute('aria-pressed')
      ).toBe('true')
    })

    it('should only override translation provided as a nested object (cascaded)', () => {
      const customText = 'My text'
      const errorCode = '404'

      render(
        <Provider
          locale="en-GB"
          translations={{
            'en-GB': {
              GlobalError: {
                [errorCode]: {
                  text: customText,
                },
              },
              HelpButton: {
                title: customText,
              },
            },
          }}
        >
          <HelpButton />
          <GlobalError statusCode={errorCode} />
        </Provider>
      )

      // HelpButton
      expect(
        document.querySelector('.dnb-button').getAttribute('aria-label')
      ).toBe(customText)
      expect(
        document
          .querySelector('.dnb-button')
          .getAttribute('aria-roledescription')
      ).toBe(en.HelpButton.ariaRole)

      // GlobalError
      expect(
        document.querySelector('.dnb-global-error__inner__content .dnb-p')
          .textContent
      ).toBe(customText)
      expect(
        document.querySelector('.dnb-global-error__inner__content h1')
          .textContent
      ).toBe(en.GlobalError[errorCode].title)
    })

    it('should only override translation provided as a flat object with dot-notation', () => {
      const customText = 'My text'
      const errorCode = '404'

      render(
        <Provider
          locale="en-GB"
          translations={{
            'en-GB': {
              'GlobalError.404.text': customText,
              'HelpButton.title': customText,
            },
          }}
        >
          <HelpButton />
          <GlobalError statusCode={errorCode} />
        </Provider>
      )

      // HelpButton
      expect(
        document.querySelector('.dnb-button').getAttribute('aria-label')
      ).toBe(customText)
      expect(
        document
          .querySelector('.dnb-button')
          .getAttribute('aria-roledescription')
      ).toBe(en.HelpButton.ariaRole)

      // GlobalError
      expect(
        document.querySelector('.dnb-global-error__inner__content .dnb-p')
          .textContent
      ).toBe(customText)
      expect(
        document.querySelector('.dnb-global-error__inner__content h1')
          .textContent
      ).toBe(en.GlobalError[errorCode].title)
    })

    it('should cascade translations from parent to nested provider', () => {
      const rootTranslation = 'Root level'
      const innerTranslation = 'Inner level'

      render(
        <Provider
          locale="en-GB"
          translations={{
            'en-GB': {
              Root: rootTranslation,
            },
          }}
        >
          <span id="root-in-root">
            <Translation id="Root" />
          </span>
          <Provider
            locale="en-GB"
            translations={{
              'en-GB': {
                Inner: innerTranslation,
              },
            }}
          >
            <span id="root-in-inner">
              <Translation id="Root" />
            </span>
            <span id="inner-in-inner">
              <Translation id="Inner" />
            </span>
          </Provider>
        </Provider>
      )

      expect(document.querySelector('#root-in-root').textContent).toBe(
        rootTranslation
      )
      expect(document.querySelector('#root-in-inner').textContent).toBe(
        rootTranslation
      )
      expect(document.querySelector('#inner-in-inner').textContent).toBe(
        innerTranslation
      )
    })

    it('should override translations from parent provider in nested provider', () => {
      const rootTranslation = 'Root level'
      const innerTranslation = 'Inner level'

      render(
        <Provider
          locale="en-GB"
          translations={{
            'en-GB': {
              Root: rootTranslation,
            },
          }}
        >
          <span id="root-in-root">
            <Translation id="Root" />
          </span>
          <Provider
            locale="en-GB"
            translations={{
              'en-GB': {
                Root: innerTranslation,
              },
            }}
          >
            <span id="root-in-inner">
              <Translation id="Root" />
            </span>
          </Provider>
        </Provider>
      )

      expect(document.querySelector('#root-in-root').textContent).toBe(
        rootTranslation
      )
      expect(document.querySelector('#root-in-inner').textContent).toBe(
        innerTranslation
      )
    })

    it('should only merge translations once when Form.Section is nested inside Provider', () => {
      const nbNO = { my: { list: ['y'] } }
      const enGB = { my: { list: ['x'] } }

      const trans = {
        'en-GB': enGB,
        'nb-NO': nbNO,
      }

      const spy = jest.spyOn(TranslationModule, 'mergeTranslations')

      render(
        <Provider locale="en-GB" translations={trans}>
          <span id="root-in-root">
            <Translation id="Root" />
          </span>
          <Form.Section translations={undefined}>
            <span id="root-in-inner">
              <Translation id="Root" />
            </span>
            <span id="inner-in-inner">
              <Translation id="Inner" />
            </span>
          </Form.Section>
        </Provider>
      )

      expect(spy).toHaveBeenCalledTimes(1)

      spy.mockRestore()
    })
  })

  describe('translationsLoader', () => {
    const DisplayTitle = () => {
      const { translation } = useContext(Context)
      return <span>{translation.HelpButton?.title}</span>
    }

    it('should call the loader on mount with the current locale', async () => {
      const loader = jest.fn().mockResolvedValue({
        'nb-NO': { HelpButton: { title: 'Async NB' } },
      })

      render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
        </Provider>
      )

      expect(loader).toHaveBeenCalledTimes(1)
      expect(loader).toHaveBeenCalledWith('nb-NO')
    })

    it('should render loaded translations after async load completes', async () => {
      const loader = jest.fn().mockResolvedValue({
        'nb-NO': { HelpButton: { title: 'Async NB' } },
      })

      const { container } = render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
        </Provider>
      )

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'Async NB'
        )
      })
    })

    it('should call the loader again when locale changes', async () => {
      const loader = jest.fn((locale) => {
        if (locale === 'en-GB') {
          return Promise.resolve({
            'en-GB': { HelpButton: { title: 'Async EN' } },
          })
        }
        return Promise.resolve({
          'nb-NO': { HelpButton: { title: 'Async NB' } },
        })
      })

      const ChangeLocale = () => {
        const { setLocale } = useContext(Context)
        return <button onClick={() => setLocale('en-GB')}>Switch</button>
      }

      const { container } = render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
          <ChangeLocale />
        </Provider>
      )

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'Async NB'
        )
      })

      fireEvent.click(document.querySelector('button'))

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'Async EN'
        )
      })

      expect(loader).toHaveBeenCalledWith('nb-NO')
      expect(loader).toHaveBeenCalledWith('en-GB')
    })

    it('should cancel stale loads when locale switches quickly', async () => {
      let resolveFirst: (v: unknown) => void
      let resolveSecond: (v: unknown) => void

      const firstPromise = new Promise((r) => {
        resolveFirst = r
      })
      const secondPromise = new Promise((r) => {
        resolveSecond = r
      })

      let callCount = 0
      const loader = jest.fn(() => {
        callCount++
        return callCount === 1 ? firstPromise : secondPromise
      }) as unknown as TranslationsLoader & jest.Mock

      const ChangeLocale = () => {
        const { setLocale } = useContext(Context)
        return <button onClick={() => setLocale('en-GB')}>Switch</button>
      }

      const { container } = render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
          <ChangeLocale />
        </Provider>
      )

      // Switch locale before first load completes
      fireEvent.click(document.querySelector('button'))

      // Resolve second (current) first
      resolveSecond({
        'en-GB': { HelpButton: { title: 'Second' } },
      })

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe('Second')
      })

      // Resolve first (stale) after — should be ignored
      resolveFirst({
        'nb-NO': { HelpButton: { title: 'Stale' } },
      })

      // Give time for any unwanted state update
      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe('Second')
      })
    })

    it('should merge loaded translations with static translations', async () => {
      const staticTranslations = {
        'nb-NO': {
          HelpButton: { title: 'Static NB' },
        },
      }

      const loader = jest.fn().mockResolvedValue({
        'nb-NO': {
          Modal: { closeTitle: 'Async Close' },
        },
      })

      const DisplayCloseTitle = () => {
        const { translation } = useContext(Context)
        return (
          <>
            <span id="help">{translation.HelpButton?.title}</span>
            <span id="close">{translation.Modal?.closeTitle}</span>
          </>
        )
      }

      const { container } = render(
        <Provider
          translations={staticTranslations}
          translationsLoader={loader}
        >
          <DisplayCloseTitle />
        </Provider>
      )

      // Static translation should be present immediately
      expect(container.querySelector('#help').textContent).toBe(
        'Static NB'
      )

      await waitFor(() => {
        expect(container.querySelector('#close').textContent).toBe(
          'Async Close'
        )
      })
    })

    it('should handle loader errors gracefully', async () => {
      const loader = jest
        .fn()
        .mockRejectedValue(new Error('Network error'))

      const log = jest.spyOn(console, 'log').mockImplementation(() => {})

      render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
        </Provider>
      )

      // Wait for the async rejection to be handled
      await waitFor(() => {
        expect(log).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('translationsLoader'),
          expect.any(Error)
        )
      })

      log.mockRestore()
    })

    it('should handle loader returning null', async () => {
      const loader = jest.fn().mockResolvedValue(null)

      const { container } = render(
        <Provider translationsLoader={loader}>
          <DisplayTitle />
        </Provider>
      )

      // Should still render with default translations
      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBeTruthy()
      })
    })

    it('should support consumer error handling inside the loader', async () => {
      const onError = jest.fn()

      const errorTranslations = {
        'nb-NO': {
          errorMessage: 'Kunne ikke laste oversettelser',
        },
      }

      type ErrorTranslation =
        (typeof errorTranslations)[keyof typeof errorTranslations]

      const loader = jest.fn(async () => {
        try {
          throw new Error('Network error')
        } catch (error) {
          onError(error)
          return errorTranslations
        }
      })

      const DisplayError = () => {
        const { errorMessage } = useTranslation<ErrorTranslation>()
        return <>{errorMessage}</>
      }

      const { container } = render(
        <Provider translationsLoader={loader}>
          <DisplayError />
        </Provider>
      )

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(expect.any(Error))
        expect(container.textContent).toBe(
          'Kunne ikke laste oversettelser'
        )
      })
    })

    it('should not break when no loader is provided', () => {
      const { container } = render(
        <Provider>
          <DisplayTitle />
        </Provider>
      )

      expect(container.querySelector('span').textContent).toBeTruthy()
    })

    it('should use locale prop for the loader call', async () => {
      const loader = jest.fn().mockResolvedValue({
        'en-GB': { HelpButton: { title: 'Async EN' } },
      })

      render(
        <Provider locale="en-GB" translationsLoader={loader}>
          <DisplayTitle />
        </Provider>
      )

      expect(loader).toHaveBeenCalledWith('en-GB')
    })

    it('should cascade parent static translations to child before loader resolves', async () => {
      const childLoader = jest.fn().mockResolvedValue({
        'nb-NO': { Modal: { closeTitle: 'Child Async Close' } },
      })

      const DisplayBoth = () => {
        const { translation } = useContext(Context)
        return (
          <>
            <span id="help">{translation.HelpButton?.title}</span>
            <span id="close">{translation.Modal?.closeTitle}</span>
          </>
        )
      }

      const { container } = render(
        <Provider
          translations={{
            'nb-NO': { HelpButton: { title: 'Parent Static' } },
          }}
        >
          <Provider translationsLoader={childLoader}>
            <DisplayBoth />
          </Provider>
        </Provider>
      )

      // Parent static translation cascades to child immediately
      expect(container.querySelector('#help').textContent).toBe(
        'Parent Static'
      )

      await waitFor(() => {
        expect(container.querySelector('#close').textContent).toBe(
          'Child Async Close'
        )
      })
    })

    it('should let child loader override parent static translations', async () => {
      const childLoader = jest.fn().mockResolvedValue({
        'nb-NO': { HelpButton: { title: 'Child Override' } },
      })

      const { container } = render(
        <Provider
          translations={{
            'nb-NO': { HelpButton: { title: 'Parent Static' } },
          }}
        >
          <Provider translationsLoader={childLoader}>
            <DisplayTitle />
          </Provider>
        </Provider>
      )

      // Before async load, parent value is used
      expect(container.querySelector('span').textContent).toBe(
        'Parent Static'
      )

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'Child Override'
        )
      })
    })

    it('should handle both parent and child having independent loaders', async () => {
      const parentLoader = jest.fn().mockResolvedValue({
        'nb-NO': { HelpButton: { title: 'Parent Async' } },
      })

      const childLoader = jest.fn().mockResolvedValue({
        'nb-NO': { Modal: { closeTitle: 'Child Async' } },
      })

      const DisplayChildTranslation = () => {
        const { translation } = useContext(Context)
        return <span id="close">{translation.Modal?.closeTitle}</span>
      }

      const { container } = render(
        <Provider translationsLoader={parentLoader}>
          <Provider translationsLoader={childLoader}>
            <DisplayChildTranslation />
          </Provider>
        </Provider>
      )

      expect(parentLoader).toHaveBeenCalledWith('nb-NO')
      expect(childLoader).toHaveBeenCalledWith('nb-NO')

      await waitFor(() => {
        expect(container.querySelector('#close').textContent).toBe(
          'Child Async'
        )
      })
    })

    it('should handle race condition when parent locale changes during child load', async () => {
      let resolveChildFirst: (v: unknown) => void
      let resolveChildSecond: (v: unknown) => void

      let childCallCount = 0
      const childLoader = jest.fn(() => {
        childCallCount++
        if (childCallCount === 1) {
          return new Promise((r) => {
            resolveChildFirst = r
          })
        }
        return new Promise((r) => {
          resolveChildSecond = r
        })
      }) as unknown as TranslationsLoader & jest.Mock

      const ChangeLocale = () => {
        const { setLocale } = useContext(Context)
        return <button onClick={() => setLocale('en-GB')}>Switch</button>
      }

      const { container } = render(
        <Provider>
          <Provider translationsLoader={childLoader}>
            <DisplayTitle />
            <ChangeLocale />
          </Provider>
        </Provider>
      )

      // Switch locale before child's first load completes
      fireEvent.click(document.querySelector('button'))

      // Resolve the second (current locale) load
      resolveChildSecond({
        'en-GB': { HelpButton: { title: 'EN Result' } },
      })

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'EN Result'
        )
      })

      // Resolve the first (stale) load — should be ignored
      resolveChildFirst({
        'nb-NO': { HelpButton: { title: 'Stale NB' } },
      })

      await waitFor(() => {
        expect(container.querySelector('span').textContent).toBe(
          'EN Result'
        )
      })
    })
  })
})
