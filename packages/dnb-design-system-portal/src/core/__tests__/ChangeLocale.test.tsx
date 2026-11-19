import { afterEach, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from '@dnb/eufemia/src/shared'
import ChangeLocale from '../ChangeLocale'

afterEach(() => {
  window.localStorage.removeItem('locale')
})

it('shows language chips in order and persists the selected locale', () => {
  const { getByRole } = render(
    <Provider locale="nb-NO">
      <ChangeLocale labelDescription="Read more about localization" />
    </Provider>
  )

  expect(
    Array.from(document.querySelectorAll('input[type=radio]'), (input) =>
      input.getAttribute('value')
    )
  ).toEqual(['nb-NO', 'sv-SE', 'da-DK', 'en-GB'])
  expect(
    (getByRole('radio', { name: 'Norsk' }) as HTMLInputElement).checked
  ).toBe(true)
  expect(document.body.textContent).toContain(
    'Read more about localization'
  )

  fireEvent.click(getByRole('radio', { name: 'English (GB)' }))

  expect(
    (getByRole('radio', { name: 'English (GB)' }) as HTMLInputElement)
      .checked
  ).toBe(true)
  expect(window.localStorage.getItem('locale')).toBe('en-GB')
})

it('includes the US locale when requested', () => {
  const { getByRole } = render(<ChangeLocale listUSLocale />)

  expect(getByRole('radio', { name: 'English (US)' })).toBeTruthy()
})
