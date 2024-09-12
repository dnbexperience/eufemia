import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import DoneButton from '../DoneButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('DoneButton', () => {
  it('calls "switchContainerMode"', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "switchContainerMode" when isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  describe('to have button with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateItemContext.Provider
          value={{
            containerMode: 'edit',
            isNew: true,
          }}
        >
          <Toolbar>
            <DoneButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.doneButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
          <Toolbar>
            <DoneButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.doneButton)
    })
  })
})
