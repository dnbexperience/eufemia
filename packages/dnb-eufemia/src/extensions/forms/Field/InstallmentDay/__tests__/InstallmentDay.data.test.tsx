import { render } from '@testing-library/react'
import type { DropdownAllProps } from '../../../../../components/Dropdown'
import InstallmentDay from '../InstallmentDay'

const dropdownProps = vi.hoisted(() => [] as DropdownAllProps[])

vi.mock('../../../../../components', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('../../../../../components')>()

  return {
    ...original,
    Dropdown: (props: DropdownAllProps) => {
      dropdownProps.push(props)
      return <input aria-label="Dropdown" />
    },
  }
})

describe('Field.InstallmentDay data', () => {
  it('keeps the default day options stable between renders', () => {
    const { rerender } = render(<InstallmentDay />)
    const firstData = dropdownProps.at(-1).data

    rerender(<InstallmentDay />)

    expect(dropdownProps.at(-1).data).toBe(firstData)
  })

  it('keeps custom day options stable between renders', () => {
    const days = [1, 5, 10]
    const { rerender } = render(<InstallmentDay days={days} />)
    const firstData = dropdownProps.at(-1).data

    rerender(<InstallmentDay days={days} />)

    expect(dropdownProps.at(-1).data).toBe(firstData)
  })

  it('keeps the options stable when the value changes within range', () => {
    // Only the injected out-of-range day should rebuild the list, so moving
    // between days that are already in the list must not replace it.
    const { rerender } = render(<InstallmentDay value={5} />)
    const firstData = dropdownProps.at(-1).data

    rerender(<InstallmentDay value={12} />)

    expect(dropdownProps.at(-1).data).toBe(firstData)
  })
})
