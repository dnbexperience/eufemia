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
      <IterateItemContext value={{ switchContainerMode }}>
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </IterateItemContext>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "switchContainerMode" when isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </IterateItemContext>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('should not call "setShowError" when hasError is true and hasVisibleError is false', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext
        value={{
          hasError: true,
          hasVisibleError: false,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext>
          </Toolbar>
        </IterateItemContext>
      </FieldBoundaryContext>
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
      <FieldBoundaryContext
        value={{
          hasError: true,
          hasVisibleError: true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext>
          </Toolbar>
        </IterateItemContext>
      </FieldBoundaryContext>
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
      <FieldBoundaryContext
        value={{
          hasError: false,
          hasVisibleError: true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext>
          </Toolbar>
        </IterateItemContext>
      </FieldBoundaryContext>
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
        <IterateItemContext
          value={{
            containerMode: 'edit',
            isNew: true,
          }}
        >
          <Toolbar>
            <DoneButton />
          </Toolbar>
        </IterateItemContext>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.doneButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateItemContext value={{ containerMode: 'edit' }}>
          <Toolbar>
            <DoneButton />
          </Toolbar>
        </IterateItemContext>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.doneButton)
    })
  })
})
