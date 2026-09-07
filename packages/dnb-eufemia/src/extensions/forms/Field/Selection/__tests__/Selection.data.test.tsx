import { render } from '@testing-library/react'
import type { AutocompleteAllProps } from '../../../../../components/Autocomplete'
import Selection from '../Selection'

const autocompleteProps = vi.hoisted(() => [] as AutocompleteAllProps[])

vi.mock('../../../../../components', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('../../../../../components')>()

  return {
    ...original,
    Autocomplete: (props: AutocompleteAllProps) => {
      autocompleteProps.push(props)
      return <input aria-label="Autocomplete" />
    },
  }
})

describe('Field.Selection data', () => {
  it('keeps normalized Autocomplete data stable between renders', () => {
    const data = [
      { value: 'one', title: 'One' },
      { value: 'two', title: 'Two' },
    ]
    const { rerender } = render(
      <Selection variant="autocomplete" data={data} />
    )
    const firstData = autocompleteProps.at(-1).data

    rerender(<Selection variant="autocomplete" data={data} />)

    expect(autocompleteProps.at(-1).data).toBe(firstData)
  })
})
