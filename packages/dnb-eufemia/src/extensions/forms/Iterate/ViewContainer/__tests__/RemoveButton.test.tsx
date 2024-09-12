import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import RemoveButton from '../RemoveButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('RemoveButton', () => {
  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.removeButton)
  })

  it('calls "handleRemove" when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove, isNew: true }}>
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
