import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DataContext, Field } from '../../../../'
import FieldBoundaryContext from '../../../../DataContext/FieldBoundary/FieldBoundaryContext'
import ToolbarContext from '../../Toolbar/ToolbarContext'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar'
import CancelButton from '../CancelButton'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('CancelButton', () => {
  it('calls "switchContainerMode"', () => {
    const switchContainerMode = jest.fn()

    render(
      <SectionContainerContext.Provider value={{ switchContainerMode }}>
        <Toolbar>
          <CancelButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
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

  it('should not call "setShowError" when hasSubmitError is true and hasVisibleError is false', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasSubmitError: true,
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
              <CancelButton />
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

  it('should call "setShowError=true" when hasSubmitError and hasVisibleError is true', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasSubmitError: true,
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
              <CancelButton />
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

  it('should call "setShowError=true" when hasError and hasVisibleError is true and initialContainerMode is "auto"', () => {
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
            initialContainerMode: 'auto',
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
    expect(setShowError).toHaveBeenCalledTimes(1)
    expect(setShowError).toHaveBeenCalledWith(true)
    expect(setShowBoundaryErrors).toHaveBeenCalledTimes(1)
    expect(setShowBoundaryErrors).toHaveBeenCalledWith(true)
  })

  it('should call "setShowError=false" when hasSubmitError is false and hasVisibleError is true', () => {
    const setShowError = jest.fn()
    const setShowBoundaryErrors = jest.fn()

    render(
      <FieldBoundaryContext.Provider
        value={{
          hasSubmitError: false,
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
              <CancelButton />
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
