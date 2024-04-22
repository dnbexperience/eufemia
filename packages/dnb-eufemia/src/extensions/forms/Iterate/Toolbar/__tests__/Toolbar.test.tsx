import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import Toolbar from '../Toolbar'
import nbNO from '../../../constants/locales/nb-NO'
import RemoveButton from '../../RemoveButton'

const nb = nbNO['nb-NO'].Iterate

describe('Toolbar', () => {
  it('supports spacing props', () => {
    render(
      <IterateElementContext.Provider value={{}}>
        <Toolbar top="large">content</Toolbar>
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector('.dnb-form-iterate-toolbar')
    ).toHaveClass('dnb-space__top--large')
  })

  it('has no buttons/tools by default', () => {
    render(
      <IterateElementContext.Provider value={{}}>
        <Toolbar />
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-form-iterate-toolbar .dnb-flex-container'
      )
    ).toBeEmptyDOMElement()
  })

  it('calls "handleRemove" when remove button is clicked and isNew is true', () => {
    const handleRemove = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{ handleRemove, isNew: true }}
      >
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  describe('to have buttons with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateElementContext.Provider
          value={{
            isNew: true,
          }}
        >
          <Toolbar>
            <RemoveButton />
          </Toolbar>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(nb.remove)
    })

    it('and isNew is false', () => {
      render(
        <IterateElementContext.Provider
          value={{
            isNew: false,
          }}
        >
          <Toolbar>
            <RemoveButton />
          </Toolbar>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(nb.remove)
    })
  })
})
