import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { DataContext, Field } from '../../../../'
import FieldBoundaryContext from '../../../../DataContext/FieldBoundary/FieldBoundaryContext'
import ToolbarContext from '../../Toolbar/ToolbarContext'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar'
import CancelButton from '../CancelButton'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].SectionEditContainer

describe('CancelButton', () => {
  it('calls "switchContainerMode"', async () => {
    const switchContainerMode = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{ verifyFieldError: () => false }}
      >
        <SectionContainerContext.Provider value={{ switchContainerMode }}>
          <Toolbar>
            <CancelButton />
          </Toolbar>
        </SectionContainerContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    await waitFor(() => {
      expect(switchContainerMode).toHaveBeenCalledTimes(1)
      expect(switchContainerMode).toHaveBeenCalledWith('view')
    })
  })

  it('to have button with correct text', () => {
    render(
      <SectionContainerContext.Provider
        value={{
          containerMode: 'edit',
        }}
      >
        <Toolbar>
          <CancelButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.cancelButton)
  })

  it('sets boundary errors but not toolbar error when there are field errors and no visible error', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasVisibleError: false,
          verifyFieldError: () => true,
          setShowBoundaryErrors,
        }}
      >
        <SectionContainerContext.Provider
          value={{ containerMode: 'edit' }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))
    return waitFor(() => {
      expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
      expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
      expect(setShowError).toHaveBeenCalledTimes(0)
    })
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
        <SectionContainerContext.Provider
          value={{ containerMode: 'edit' }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
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
        <SectionContainerContext.Provider
          value={{ containerMode: 'edit', initialContainerMode: 'auto' }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
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
        <SectionContainerContext.Provider
          value={{
            containerMode: 'edit',
          }}
        >
          <Toolbar>
            <ToolbarContext.Provider value={{ setShowError }}>
              <CancelButton />
            </ToolbarContext.Provider>
          </Toolbar>
        </SectionContainerContext.Provider>
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

  it('will restore the original value', () => {
    const onSubmit = jest.fn()
    let submitData = null

    render(
      <DataContext.Provider
        data={{ foo: 'original value' }}
        onSubmit={onSubmit}
      >
        <Field.String path="/foo" />
        <DataContext.Consumer>
          {({ internalDataRef }) => {
            submitData = internalDataRef.current
            return null
          }}
        </DataContext.Consumer>
        <SectionContainerContext.Provider
          value={{ containerMode: 'edit' }}
        >
          <Toolbar>
            <CancelButton />
          </Toolbar>
        </SectionContainerContext.Provider>
      </DataContext.Provider>
    )

    fireEvent.change(document.querySelector('input'), {
      target: { value: 'changed value' },
    })
    expect(submitData).toEqual({ foo: 'changed value' })

    fireEvent.click(document.querySelector('button'))
    expect(submitData).toEqual({ foo: 'original value' })
  })
})
