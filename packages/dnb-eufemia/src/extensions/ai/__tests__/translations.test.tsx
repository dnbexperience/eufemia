import { render, waitFor } from '@testing-library/react'
import Provider from '../../../shared/Provider'
import sharedNb from '../../../shared/locales/nb-NO'
import sharedGb from '../../../shared/locales/en-GB'
import sharedUs from '../../../shared/locales/en-US'
import sharedSv from '../../../shared/locales/sv-SE'
import sharedDa from '../../../shared/locales/da-DK'
import { Loader, PromptInput, Tool } from '..'
import nbNO from '../constants/locales/nb-NO'
import enGB from '../constants/locales/en-GB'
import enUS from '../constants/locales/en-US'
import svSE from '../constants/locales/sv-SE'
import daDK from '../constants/locales/da-DK'

function Labels() {
  return (
    <>
      <Loader />
      <PromptInput />
    </>
  )
}

const loading = () =>
  document.querySelector('[role="status"]')?.textContent
const placeholder = () =>
  document.querySelector('textarea')?.getAttribute('aria-placeholder')

describe('Ai translations', () => {
  it.each([
    ['en-US', enUS, 'Writing a reply …', 'Write a message', 'Canceled'],
    ['sv-SE', svSE, 'Skriver svar …', 'Skriv ett meddelande', 'Avbruten'],
    ['da-DK', daDK, 'Skriver svar …', 'Skriv en besked', 'Annulleret'],
  ] as const)(
    'loads the extension locale %s',
    (locale, translations, label, prompt, canceled) => {
      render(
        <Provider locale={locale} translations={translations}>
          <Labels />
          <Tool status="canceled" />
        </Provider>
      )
      expect(loading()).toBe(label)
      expect(placeholder()).toBe(prompt)
      expect(
        document.querySelector('.dnb-ai-tool__state')
      ).toHaveTextContent(canceled)
    }
  )

  it('keeps the same keys in every extension locale', () => {
    const keys = Object.keys(nbNO['nb-NO'].Ai).sort()
    for (const bundle of [enGB, enUS, svSE, daDK]) {
      expect(Object.keys(Object.values(bundle)[0].Ai).sort()).toEqual(keys)
    }
  })

  it('preserves defaults while translations load asynchronously', async () => {
    const translationsLoader = vi.fn(async () => ({
      'en-GB': { Ai: { loading: 'Loaded …' } },
    }))
    render(
      <Provider locale="en-GB" translationsLoader={translationsLoader}>
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Writing a reply …')
    await waitFor(() => expect(loading()).toBe('Loaded …'))
    expect(placeholder()).toBe('Write a message')
  })
  it('keeps AI strings outside the base component locales', () => {
    for (const bundle of [
      sharedNb,
      sharedGb,
      sharedUs,
      sharedSv,
      sharedDa,
    ]) {
      for (const locale of Object.values(bundle)) {
        expect(locale).not.toHaveProperty('Ai')
      }
    }
  })

  it('uses Norwegian defaults without a Provider', () => {
    render(<Labels />)
    expect(loading()).toBe('Skriver svar …')
    expect(placeholder()).toBe('Skriv en melding')
  })

  it('switches locale and falls back for English variants and unknown locales', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Writing a reply …')
    rerender(
      <Provider locale="en">
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Writing a reply …')
    rerender(
      <Provider locale="en-AU">
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Writing a reply …')
    rerender(
      <Provider locale="fr-FR">
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Skriver svar …')
    rerender(
      <Provider locale="nb-NO">
        <Labels />
      </Provider>
    )
    expect(placeholder()).toBe('Skriv en melding')
  })

  it('supports partial nested and flat Provider overrides', () => {
    const { rerender } = render(
      <Provider
        locale="en-GB"
        translations={{ 'en-GB': { Ai: { loading: 'Checking …' } } }}
      >
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Checking …')
    expect(placeholder()).toBe('Write a message')
    rerender(
      <Provider
        locale="en-GB"
        translations={{ 'en-GB': { 'Ai.loading': 'Updated …' } }}
      >
        <Labels />
      </Provider>
    )
    expect(loading()).toBe('Updated …')
    expect(placeholder()).toBe('Write a message')
  })

  it('isolates sibling Providers and inherits nested overrides', () => {
    render(
      <>
        <Provider
          locale="en-GB"
          translations={{ 'en-GB': { Ai: { loading: 'Custom …' } } }}
        >
          <Loader />
          <Provider>
            <Loader />
          </Provider>
        </Provider>
        <Provider locale="en-GB">
          <Loader />
        </Provider>
      </>
    )
    expect(
      Array.from(
        document.querySelectorAll('[role="status"]'),
        (el) => el.textContent
      )
    ).toEqual(['Custom …', 'Custom …', 'Writing a reply …'])
  })
})
