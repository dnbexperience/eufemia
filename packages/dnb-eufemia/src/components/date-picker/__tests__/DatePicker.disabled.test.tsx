import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from '../DatePicker'

it('preserves the date when the open picker becomes disabled', async () => {
  const onChange = vi.fn()
  const user = userEvent.setup()
  const picker = (disabled: boolean) => (
    <DatePicker
      date="2026-11-12"
      disabled={disabled}
      noAnimation
      onChange={onChange}
    />
  )
  const { container, rerender } = render(picker(false))
  const trigger = container.querySelector<HTMLButtonElement>(
    '.dnb-date-picker button.dnb-input__submit-button__button, .dnb-date-picker button.dnb-button'
  )
  await user.click(trigger!)
  const day = screen.getByRole('button', { name: /16.*november/i })

  rerender(picker(true))
  fireEvent.click(day)
  expect(onChange).not.toHaveBeenCalled()

  rerender(picker(false))
  expect(trigger?.getAttribute('aria-expanded')).toBe('false')
})
