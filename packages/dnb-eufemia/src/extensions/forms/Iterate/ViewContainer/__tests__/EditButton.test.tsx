import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import EditButton from '../EditButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('EditButton', () => {
  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.editButton)
  })

  it('calls "switchContainerMode" when edit button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })
})
