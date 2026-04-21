import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import RemoveButton from '../RemoveButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('RemoveButton', () => {
  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext value={{}}>
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateItemContext>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.removeButton)
  })

  it('calls "handleRemove" when remove button is clicked', async () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext value={{ handleRemove, isNew: true }}>
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateItemContext>
    )

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
