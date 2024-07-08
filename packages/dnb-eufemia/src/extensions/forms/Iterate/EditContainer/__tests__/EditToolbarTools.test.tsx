import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import Toolbar from '../../Toolbar'
import EditToolbarTools from '../EditToolbarTools'

import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('EditToolbarTools', () => {
  it('calls "switchContainerMode" when remove button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateElementContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <EditToolbarTools />
        </Toolbar>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "switchContainerMode" when remove button is clicked and isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <EditToolbarTools />
        </Toolbar>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "restoreOriginalValue" when cancel button is clicked', () => {
    const restoreOriginalValue = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{
          restoreOriginalValue,
          containerMode: 'edit',
          index: 0,
          arrayValue: ['original value'],
        }}
      >
        <Toolbar>
          <EditToolbarTools />
        </Toolbar>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith('original value')
  })

  describe('to have buttons with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateElementContext.Provider
          value={{
            containerMode: 'edit',
            isNew: true,
          }}
        >
          <Toolbar>
            <EditToolbarTools />
          </Toolbar>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.doneButton)
      expect(buttons[1]).toHaveTextContent(nb.removeButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
          <Toolbar>
            <EditToolbarTools />
          </Toolbar>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.doneButton)
      expect(buttons[1]).toHaveTextContent(nb.cancelButton)
    })
  })
})
