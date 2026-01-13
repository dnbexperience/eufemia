import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import FieldBoundaryProvider from '../../../DataContext/FieldBoundary/FieldBoundaryProvider'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../../Toolbar'
import CancelButton from '../CancelButton'
import nbNO from '../../../constants/locales/nb-NO'
import ToolbarContext from '../../Toolbar/ToolbarContext'
import PushContainerContext from '../../PushContainer/PushContainerContext'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('CancelButton', () => {
  it('calls "switchContainerMode"', async () => {
    const switchContainerMode = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{ verifyFieldError: () => false }}
      >
        <IterateItemContext.Provider value={{ switchContainerMode }}>
          <Toolbar>
            <CancelButton showConfirmDialog={false} />
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    await waitFor(() => {
      expect(switchContainerMode).toHaveBeenCalledTimes(1)
      expect(switchContainerMode).toHaveBeenCalledWith('view')
    })
  })

  it('should not call "switchContainerMode" when isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <Toolbar>
          <CancelButton showConfirmDialog={false} />
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
          <CancelButton showConfirmDialog={false} />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith('original value')
  })

  it('does not show toolbar error when inside push container (no visible error)', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    const SetErrorOnce = () => {
      const { setFieldError } = React.useContext(FieldBoundaryContext)
      React.useEffect(() => {
        setFieldError?.('/x' as any, new Error('err'))
      }, [setFieldError])
      return null
    }

    const MockBoundary = ({
      children,
    }: { children: React.ReactNode }) => (
      <FieldBoundaryProvider>
        <SetErrorOnce />
        <FieldBoundaryContext.Consumer>
          {(ctx) => (
            <FieldBoundaryContext.Provider
              value={{
                ...ctx,
                hasVisibleError: false,
                setShowBoundaryErrors,
              }}
            >
              {children}
            </FieldBoundaryContext.Provider>
          )}
        </FieldBoundaryContext.Consumer>
      </FieldBoundaryProvider>
    )

    render(
      <MockBoundary>
        <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
          <PushContainerContext.Provider
            value={{ some: 'context' } as any}
          >
            <Toolbar>
              <ToolbarContext.Provider value={{ setShowError }}>
                <CancelButton showConfirmDialog={false} />
              </ToolbarContext.Provider>
            </Toolbar>
          </PushContainerContext.Provider>
        </IterateItemContext.Provider>
      </MockBoundary>
    )

    fireEvent.click(document.querySelector('button'))
    const promise = waitFor(() => {
      expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
      expect(setShowBoundaryErrors).toHaveBeenCalledWith(false)
      expect(setShowError).toHaveBeenCalledTimes(1)
      expect(setShowError).toHaveBeenCalledWith(false)
    })
    return promise
  })

  it('sets boundary and toolbar errors when there are field errors and a visible error', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasVisibleError: true,
          verifyFieldError: () => true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton showConfirmDialog={false} />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    return waitFor(() => {
      expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
      expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
      expect(setShowError).toHaveBeenCalledTimes(1)
      expect(setShowError).toHaveBeenCalledWith(true)
    })
  })

  it('respects initialContainerMode but still shows errors when fields have errors and visible error exists', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasVisibleError: true,
          verifyFieldError: () => true,
          setShowBoundaryErrors,
        }}
      >
        <IterateItemContext.Provider
          value={{ containerMode: 'edit', initialContainerMode: 'auto' }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton showConfirmDialog={false} />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    return waitFor(() => {
      expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
      expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
      expect(setShowError).toHaveBeenCalledTimes(1)
      expect(setShowError).toHaveBeenCalledWith(true)
    })
  })

  it('clears errors and switches to view when no field errors exist', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasVisibleError: true,
          verifyFieldError: () => false,
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
              <CancelButton showConfirmDialog={false} />
            </ToolbarContext.Provider>
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    return waitFor(() => {
      expect(setShowError).toHaveBeenCalledTimes(1)
      expect(setShowError).toHaveBeenCalledWith(false)
      expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
      expect(setShowBoundaryErrors).toHaveBeenCalledWith(false)
    })
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
            <CancelButton showConfirmDialog={false} />
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
            <CancelButton showConfirmDialog={false} />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const button = document.querySelector('button')
      expect(button).toHaveTextContent(nb.cancelButton)
    })
  })

  it('shows a confirm dialog by default and proceeds on confirm', async () => {
    const switchContainerMode = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{ verifyFieldError: () => false }}
      >
        <IterateItemContext.Provider value={{ switchContainerMode }}>
          <Toolbar>
            <CancelButton />
          </Toolbar>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    const confirmDialog = document.querySelector('.dnb-dialog')
    expect(confirmDialog).toBeInTheDocument()
    // Ensure the confirm dialog uses cancel-specific title
    expect(confirmDialog).toHaveTextContent(
      nbNO['nb-NO'].SectionEditContainer.confirmCancelText
    )

    await userEvent.click(
      document.querySelector('.dnb-dialog .dnb-button--primary')
    )

    await waitFor(() => {
      expect(switchContainerMode).toHaveBeenCalledWith('view')
    })
  })
})
