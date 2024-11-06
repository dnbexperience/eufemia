import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import Toolbar from '../Toolbar'
import nbNO from '../../../constants/locales/nb-NO'
import RemoveButton from '../../RemoveButton'

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

  it('hides divider when hideDivider is true', () => {
    render(
      <IterateItemContext.Provider value={{}}>
        <Toolbar hideDivider>content</Toolbar>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('dnb-hr')).not.toBeInTheDocument()
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
