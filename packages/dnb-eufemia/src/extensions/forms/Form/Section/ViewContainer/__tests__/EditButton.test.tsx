import { fireEvent, render } from '@testing-library/react'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar/Toolbar'
import EditButton from '../EditButton'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].SectionViewContainer

describe('EditButton', () => {
  it('to have buttons with correct text', () => {
    render(
      <Toolbar>
        <EditButton />
      </Toolbar>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.editButton)
  })

  it('calls "switchContainerMode" when edit button is clicked', () => {
    const switchContainerMode = vi.fn()

    render(
      <SectionContainerContext value={{ switchContainerMode }}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </SectionContainerContext>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })

  it('does not render when editing is disabled', () => {
    render(
      <SectionContainerContext value={{ disableEditing: true }}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </SectionContainerContext>
    )

    expect(document.querySelector('button')).not.toBeInTheDocument()
  })

  it('calls "switchContainerMode" when an onClick is given', () => {
    const switchContainerMode = vi.fn()
    const onClick = vi.fn()

    render(
      <SectionContainerContext value={{ switchContainerMode }}>
        <Toolbar>
          <EditButton onClick={onClick} />
        </Toolbar>
      </SectionContainerContext>
    )

    fireEvent.click(document.querySelector('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })

  it('supports custom properties', () => {
    render(
      <Toolbar>
        <EditButton
          className="custom-class"
          aria-label="Custom edit label"
        />
      </Toolbar>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveAttribute('aria-label', 'Custom edit label')
  })
})
