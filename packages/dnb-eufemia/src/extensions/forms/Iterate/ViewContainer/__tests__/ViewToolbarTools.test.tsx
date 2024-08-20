import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import ViewToolbarTools from '../ViewToolbarTools'

import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('ViewToolbarTools', () => {
  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar>
          <ViewToolbarTools />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const buttons = document.querySelectorAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent(nb.editButton)
    expect(buttons[1]).toHaveTextContent(nb.removeButton)
  })

  it('calls "handleRemove" when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove, isNew: true }}>
        <Toolbar>
          <ViewToolbarTools />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const buttons = document.querySelectorAll('button')
    fireEvent.click(buttons[1])

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
