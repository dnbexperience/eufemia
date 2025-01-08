import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../Toolbar'
import nbNO from '../../../constants/locales/nb-NO'
import RemoveButton from '../../RemoveButton'
import ArrayItemAreaContext from '../../Array/ArrayItemAreaContext'

const nb = nbNO['nb-NO'].RemoveButton

describe('Toolbar', () => {
  it('supports spacing props', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar top="large">content</Toolbar>
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-iterate-toolbar')
    ).toHaveClass('dnb-space__top--large')
  })

  it('should render Hr by default', () => {
    render(<Toolbar>content</Toolbar>)

    expect(document.querySelector('.dnb-hr')).toBeInTheDocument()
  })

  it('should not render Hr when toolbarVariant is custom', () => {
    render(
      <ArrayItemAreaContext.Provider value={{ toolbarVariant: 'custom' }}>
        <Toolbar>content</Toolbar>
      </ArrayItemAreaContext.Provider>
    )

    expect(document.querySelector('.dnb-hr')).not.toBeInTheDocument()
  })

  it('should not render Hr when divider is line', () => {
    render(
      <ArrayItemAreaContext.Provider value={{ divider: 'line' }}>
        <Toolbar>content</Toolbar>
      </ArrayItemAreaContext.Provider>
    )

    expect(document.querySelector('.dnb-hr')).not.toBeInTheDocument()
  })

  it('has no buttons/tools by default', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar />
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-iterate-toolbar')
    ).not.toBeInTheDocument()
  })

  it('calls "handleRemove" when remove button is clicked and isNew is true', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove, isNew: true }}>
        <Toolbar>
          <RemoveButton />
        </Toolbar>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  describe('to have buttons with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateItemContext.Provider
          value={{
            isNew: true,
          }}
        >
          <Toolbar>
            <RemoveButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(nb.text)
    })

    it('and isNew is false', () => {
      render(
        <IterateItemContext.Provider
          value={{
            isNew: false,
          }}
        >
          <Toolbar>
            <RemoveButton />
          </Toolbar>
        </IterateItemContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(nb.text)
    })
  })
})
