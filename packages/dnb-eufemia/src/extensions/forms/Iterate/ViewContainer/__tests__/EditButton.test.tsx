import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import EditButton from '../EditButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('EditButton', () => {
  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext value={{}}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </IterateItemContext>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.editButton)
  })

  it('calls "switchContainerMode" when edit button is clicked', async () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext value={{ switchContainerMode }}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </IterateItemContext>
    )

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })
})
