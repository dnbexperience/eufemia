import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import ResetButton from '../ResetButton'
import nbNO from '../../../constants/locales/nb-NO'
import ToolbarContext from '../../Toolbar/ToolbarContext'
import userEvent from '@testing-library/user-event'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('ResetButton', () => {
  it('should not call "switchContainerMode"', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <ResetButton showConfirmDialog={false} />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(0)
  })

  it('should not call "switchContainerMode" when isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <ResetButton showConfirmDialog={false} />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(0)
  })

  it('should call "restoreOriginalValue" with undefined', () => {
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
          <ResetButton showConfirmDialog={false} />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith()
  })

  it('should show a confirm dialog by default', async () => {
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
          <ResetButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(0)

    const confirmDialog = document.querySelector('.dnb-dialog')
    expect(confirmDialog).toBeInTheDocument()

    await userEvent.click(
      document.querySelector('.dnb-dialog .dnb-button--primary')
    )

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith()
  })

  it('should call "setShowError=false" when hasError is true and hasVisibleError is false', () => {
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
              <ResetButton showConfirmDialog={false} />
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

  it('should call "setShowError=false" when hasError and hasVisibleError is true', () => {
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
              <ResetButton showConfirmDialog={false} />
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

  it('should call "setShowError=false" when hasError and hasVisibleError is true and initialContainerMode is "auto"', () => {
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
            initialContainerMode: 'auto',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <ResetButton showConfirmDialog={false} />
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
              <ResetButton showConfirmDialog={false} />
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

  it('to have button with correct text', () => {
    render(
      <IterateItemContext.Provider
        value={{
          containerMode: 'edit',
          isNew: true,
        }}
      >
        <Toolbar>
          <ResetButton showConfirmDialog={false} />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.resetButton)
  })
})
