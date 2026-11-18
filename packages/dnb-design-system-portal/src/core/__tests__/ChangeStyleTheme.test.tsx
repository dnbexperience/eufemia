import { expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Provider } from '@dnb/eufemia/src/shared'
import ChangeStyleTheme from '../ChangeStyleTheme'

const { setTheme } = vi.hoisted(() => ({
  setTheme: vi.fn((_theme, callback) => callback()),
}))

vi.mock('../../../vite/client/shims/theme-handler', () => ({
  getThemes: () => ({
    ui: { name: 'DNB' },
    sbanken: { name: 'Sbanken' },
    eiendom: { name: 'DNB Eiendom' },
    carnegie: { name: 'DNB Carnegie' },
    hidden: { name: 'Hidden', hide: true },
  }),
  setTheme,
}))

it('shows brand chips and switches the selected brand', () => {
  const { getByRole } = render(
    <Provider theme={{ brand: 'ui' }}>
      <ChangeStyleTheme labelDescription="Read more about theming" />
    </Provider>
  )

  expect(document.querySelectorAll('input[type=radio]')).toHaveLength(4)
  expect(
    Array.from(document.querySelectorAll('.dnb-chip__text'), (chip) =>
      chip.textContent.trim()
    )
  ).toEqual(['DNB', 'Sbanken', 'DNB Eiendom', 'DNB Carnegie'])
  expect(document.querySelector('#change-theme')).toBe(
    getByRole('radio', { name: 'DNB', exact: true })
  )
  expect(
    (getByRole('radio', { name: 'DNB', exact: true }) as HTMLInputElement)
      .checked
  ).toBe(true)
  expect(document.body.textContent).toContain('Read more about theming')

  fireEvent.click(getByRole('radio', { name: 'Sbanken' }))

  expect(setTheme).toHaveBeenCalledExactlyOnceWith(
    { brand: 'sbanken' },
    expect.any(Function)
  )
  expect(
    (getByRole('radio', { name: 'Sbanken' }) as HTMLInputElement).checked
  ).toBe(true)
})
