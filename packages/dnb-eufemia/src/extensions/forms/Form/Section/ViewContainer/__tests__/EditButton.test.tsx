import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar/Toolbar'
import EditButton from '../EditButton'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

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
    const switchContainerMode = jest.fn()

    render(
      <SectionContainerContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })
})
