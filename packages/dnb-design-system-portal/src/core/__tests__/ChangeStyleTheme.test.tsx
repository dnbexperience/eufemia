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
      <ChangeStyleTheme
        id="change-theme"
        labelDescription="Read more about theming"
      />
    </Provider>
  )

  expect(document.querySelectorAll('input[type=radio]')).toHaveLength(4)
  expect(
    Array.from(document.querySelectorAll('.dnb-chip__text'), (chip) =>
      chip.textContent.trim()
    )
  ).toEqual(['DNB', 'Sbanken', 'DNB Eiendom', 'DNB Carnegie'])
  expect(document.querySelector('#change-theme')).toBe(
    getByRole('radio', { name: /^DNB$/ })
  )
  expect(
    (getByRole('radio', { name: /^DNB$/ }) as HTMLInputElement).checked
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

it('gives the legend and the selected chip different ids', () => {
  const { getByRole } = render(
    <Provider theme={{ brand: 'sbanken' }}>
      <ChangeStyleTheme id="change-theme" />
    </Provider>
  )

  const ids = Array.from(document.querySelectorAll('[id]'), ({ id }) => id)
  expect(ids).toEqual([...new Set(ids)])
  expect(getByRole('radiogroup', { name: 'Change Brand' })).toBeTruthy()
  expect(document.querySelector('#change-theme')).toBe(
    getByRole('radio', { name: 'Sbanken' })
  )
})

it('keeps the ids unique when the drawer and a page show the selector', () => {
  render(
    <Provider theme={{ brand: 'sbanken' }}>
      <ChangeStyleTheme />
      <ChangeStyleTheme id="change-theme" />
    </Provider>
  )

  const ids = Array.from(document.querySelectorAll('[id]'), ({ id }) => id)
  expect(ids).toEqual([...new Set(ids)])
  expect(document.querySelectorAll('#change-theme')).toHaveLength(1)
})
