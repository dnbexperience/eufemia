import { fireEvent, render } from '@testing-library/react'
import Chip from '../Chip'
import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'

describe('Chip', () => {
  it('renders a toggle button with the chip classes', () => {
    render(<Chip text="Housing" />)

    const root = document.querySelector('.dnb-chip')
    const button = document.querySelector('button')

    expect(root).toHaveClass('dnb-toggle-button', 'dnb-chip--default')
    expect(button).toHaveTextContent('Housing')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders children as the text', () => {
    render(<Chip>Housing</Chip>)

    expect(document.querySelector('button')).toHaveTextContent('Housing')
  })

  it('toggles the checked state and calls onChange', () => {
    const onChange = vi.fn()
    render(<Chip text="Housing" value="housing" onChange={onChange} />)

    const button = document.querySelector('button')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-toggle-button--checked'
    )
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ checked: true, value: 'housing' })
    )

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ checked: false, value: 'housing' })
    )
  })

  it('follows the checked property', () => {
    const { rerender } = render(<Chip text="Housing" checked />)

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')

    rerender(<Chip text="Housing" checked={false} />)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders a checkbox for the checkbox variant', () => {
    render(<Chip text="Housing" variant="checkbox" />)

    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-chip--checkbox'
    )
    expect(
      document.querySelector('.dnb-toggle-button__component .dnb-checkbox')
    ).toBeInTheDocument()
    expect(document.querySelector('input')).not.toBeInTheDocument()
  })

  it('renders a radio button for the radio variant', () => {
    render(<Chip text="Housing" variant="radio" />)

    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-chip--radio'
    )
    expect(
      document.querySelector('.dnb-toggle-button__component .dnb-radio')
    ).toBeInTheDocument()
    expect(document.querySelector('input')).not.toBeInTheDocument()
  })

  it('renders a hidden add and remove icon for the add-remove variant', () => {
    render(<Chip text="Housing" variant="add-remove" />)

    const icon = document.querySelector('.dnb-button__icon')

    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-chip--add-remove'
    )
    expect(icon.querySelector('.dnb-icon-close-cross-path')).toBeTruthy()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(document.querySelector('button')).toHaveAccessibleName(
      'Housing'
    )
  })

  it('renders the icon in front of the text', () => {
    render(<Chip text="Housing" icon="home" />)

    const component = document.querySelector(
      '.dnb-toggle-button__component'
    )
    const text = document.querySelector('.dnb-button__text')

    expect(component.querySelector('.dnb-icon')).toBeInTheDocument()
    expect(
      component.compareDocumentPosition(text) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('renders leftComponent instead of the icon', () => {
    render(
      <Chip
        text="Housing"
        icon="home"
        leftComponent={<span id="custom">Flag</span>}
      />
    )

    expect(
      document.querySelector('.dnb-toggle-button__component #custom')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-toggle-button__component .dnb-icon')
    ).not.toBeInTheDocument()
  })

  it('can be disabled', () => {
    const onChange = vi.fn()
    render(<Chip text="Housing" disabled onChange={onChange} />)

    const button = document.querySelector('button')
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('sets the error class on status error', () => {
    render(<Chip text="Housing" variant="checkbox" status="error" />)

    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-toggle-button__status--error'
    )
    expect(
      document.querySelector('.dnb-checkbox__status--error')
    ).toBeInTheDocument()
  })

  it('supports spacing properties and a custom className', () => {
    render(<Chip text="Housing" top="large" className="custom" />)

    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-space__top--large',
      'custom'
    )
  })
})

describe('Chip.Group', () => {
  it('renders a fieldset with a legend', () => {
    render(
      <Chip.Group label="Category">
        <Chip text="Housing" value="housing" />
      </Chip.Group>
    )

    const fieldset = document.querySelector('fieldset')

    expect(document.querySelector('.dnb-chip-group')).toHaveClass(
      'dnb-toggle-button-group'
    )
    expect(fieldset).toHaveAttribute('role', 'group')
    expect(fieldset.querySelector('legend')).toHaveTextContent('Category')
  })

  it('passes the variant on to every chip', () => {
    render(
      <Chip.Group label="Category" variant="add-remove">
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" variant="checkbox" />
      </Chip.Group>
    )

    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-chip')
    )

    expect(first).toHaveClass('dnb-chip--add-remove')
    expect(second).toHaveClass('dnb-chip--checkbox')
  })

  it('lets more than one chip be checked by default', () => {
    const onChange = vi.fn()
    render(
      <Chip.Group
        label="Category"
        values={['housing']}
        onChange={onChange}
      >
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" />
      </Chip.Group>
    )

    const [housing, cars] = Array.from(document.querySelectorAll('button'))

    expect(housing).toHaveAttribute('aria-pressed', 'true')
    expect(cars).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(cars)

    expect(housing).toHaveAttribute('aria-pressed', 'true')
    expect(cars).toHaveAttribute('aria-pressed', 'true')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        value: 'cars',
        values: ['housing', 'cars'],
      })
    )

    fireEvent.click(housing)

    expect(housing).toHaveAttribute('aria-pressed', 'false')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'housing', values: ['cars'] })
    )
  })

  it('lets only one chip be checked with the radio variant', () => {
    const onChange = vi.fn()
    render(
      <Chip.Group
        label="Category"
        variant="radio"
        value="housing"
        onChange={onChange}
      >
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" />
      </Chip.Group>
    )

    const [housing, cars] = Array.from(document.querySelectorAll('button'))

    expect(document.querySelector('fieldset')).toHaveAttribute(
      'role',
      'radiogroup'
    )
    expect(housing).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(cars)

    expect(housing).toHaveAttribute('aria-pressed', 'false')
    expect(cars).toHaveAttribute('aria-pressed', 'true')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'cars' })
    )
  })

  it('can be single-select with multiselect set to false', () => {
    render(
      <Chip.Group label="Category" multiselect={false} value="housing">
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" />
      </Chip.Group>
    )

    const [housing, cars] = Array.from(document.querySelectorAll('button'))

    fireEvent.click(cars)

    expect(housing).toHaveAttribute('aria-pressed', 'false')
    expect(cars).toHaveAttribute('aria-pressed', 'true')
  })

  it('gives every chip the error style when the group has an error status', () => {
    render(
      <Chip.Group label="Category" status="Choose a category">
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" />
      </Chip.Group>
    )

    const chips = Array.from(document.querySelectorAll('.dnb-chip'))

    for (const chip of chips) {
      expect(chip).toHaveClass('dnb-toggle-button__status--error')
      expect(
        chip.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    }
    expect(
      document.querySelectorAll('.dnb-form-status__text')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent('Choose a category')
  })

  it('does not give the chips the error style for other status states', () => {
    render(
      <Chip.Group
        label="Category"
        status="Choose a category"
        statusState="information"
      >
        <Chip text="Housing" value="housing" />
      </Chip.Group>
    )

    expect(document.querySelector('.dnb-chip')).not.toHaveClass(
      'dnb-toggle-button__status--error'
    )
  })

  it('disables every chip', () => {
    render(
      <Chip.Group label="Category" disabled>
        <Chip text="Housing" value="housing" />
        <Chip text="Cars" value="cars" />
      </Chip.Group>
    )

    for (const button of Array.from(document.querySelectorAll('button'))) {
      expect(button).toBeDisabled()
    }
  })
})

describe('Chip aria', () => {
  it.each(['default', 'add-remove', 'checkbox', 'radio'] as const)(
    'should validate the %s variant',
    async (variant) => {
      const Component = render(
        <Chip.Group label="Category" variant={variant} values={['cars']}>
          <Chip text="Housing" value="housing" icon="home" />
          <Chip text="Cars" value="cars" />
          <Chip text="Boats" value="boats" disabled />
        </Chip.Group>
      )

      expect(await axeComponent(Component)).toHaveNoViolations()
    }
  )
})

describe('Chip scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
