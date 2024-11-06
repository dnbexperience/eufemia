import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FieldBoundaryContext from '../../../../DataContext/FieldBoundary/FieldBoundaryContext'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar'
import DoneButton from '../DoneButton'
import nbNO from '../../../../constants/locales/nb-NO'
import ToolbarContext from '../../Toolbar/ToolbarContext'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('DoneButton', () => {
  it('calls "switchContainerMode"', () => {
    const switchContainerMode = jest.fn()

    render(
      <SectionContainerContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

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
        <SectionContainerContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
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
        <SectionContainerContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
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
        <SectionContainerContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <DoneButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    expect(setShowError).toHaveBeenCalledTimes(1)
    expect(setShowError).toHaveBeenCalledWith(false)
    expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
    expect(setShowBoundaryErrors).toHaveBeenCalledWith(false)
  })

  it('to have button with correct text', () => {
    render(
      <SectionContainerContext.Provider value={{ containerMode: 'edit' }}>
        <Toolbar>
          <DoneButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.doneButton)
  })
})
