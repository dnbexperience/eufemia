import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import CancelButton from '../CancelButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('CancelButton', () => {
  it('calls "switchContainerMode"', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <CancelButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('should not call "switchContainerMode" when isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <CancelButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(0)
  })

  it('calls "restoreOriginalValue"', () => {
    const restoreOriginalValue = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{
          restoreOriginalValue,
          containerMode: 'edit',
          index: 0,
          arrayValue: ['original value'],
        }}
      >
        <Toolbar>
          <CancelButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith('original value')
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
            <CancelButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.removeButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
          <Toolbar>
            <CancelButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.cancelButton)
    })
  })
})
