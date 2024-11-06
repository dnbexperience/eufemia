import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import DoneButton from '../DoneButton'
import nbNO from '../../../constants/locales/nb-NO'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import ToolbarContext from '../../Toolbar/ToolbarContext'

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

  it('should not call "setShowError" when hasError is true and hasVisibleError is false', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasError: true,
          hasVisibleError: false,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    expect(setShowError).toHaveBeenCalledTimes(0)
    expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
    expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
  })

  it('should call "setShowError=true" when hasError and hasVisibleError is true', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasError: true,
          hasVisibleError: true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    expect(setShowError).toHaveBeenCalledTimes(1)
    expect(setShowError).toHaveBeenCalledWith(true)
    expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
    expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
  })

  it('should call "setShowError=false" when hasError is false and hasVisibleError is true', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasError: false,
          hasVisibleError: true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    expect(setShowError).toHaveBeenCalledTimes(1)
    expect(setShowError).toHaveBeenCalledWith(false)
    expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
    expect(setShowBoundaryErrors).toHaveBeenCalledWith(false)
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
