import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { Form } from '../../..'
import type {
  CardContextState,
} from '../../../../../components/card/CardContext';
import CardContext from '../../../../../components/card/CardContext'

describe('Form.Card', () => {
  it('should have constant of _supportsSpacingProps', () => {
    expect(Form.Card['_supportsSpacingProps']).toBe(true)
  })

  it('should set "outset" by default', () => {
    const { rerender } = render(<Form.Card />)

    const element = document.querySelector('.dnb-card')

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 1')
    expect(element).toHaveStyle('--outset--large: 1')

    rerender(
      <Form.Card
        outset={{
          small: true,
          medium: false,
          large: false,
        }}
      />
    )

    expect(element).toHaveStyle('--outset--small: 1')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')

    rerender(<Form.Card outset={false} />)

    expect(element).toHaveStyle('--outset--small: 0')
    expect(element).toHaveStyle('--outset--medium: 0')
    expect(element).toHaveStyle('--outset--large: 0')
  })

  it('should set "stack" by default', () => {
    const { rerender } = render(<Form.Card />)

    {
      const element = document.querySelector('.dnb-card')
      const container = element.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
      expect(container).toHaveClass('dnb-flex-container--align-stretch')
      expect(container).toHaveClass(
        'dnb-flex-container--align-self-stretch'
      )
      expect(container).toHaveClass('dnb-flex-container--spacing-medium')
    }

    rerender(<Form.Card stack={false} />)

    {
      const element = document.querySelector('.dnb-card')
      const container = element.querySelector('.dnb-flex-container')

      expect(element).toHaveClass('dnb-flex-item--align-self-stretch')
      expect(container).not.toHaveClass(
        'dnb-flex-container--align-stretch'
      )
      expect(container).toHaveClass(
        'dnb-flex-container--align-self-stretch'
      )
      expect(container).not.toHaveClass(
        'dnb-flex-container--spacing-medium'
      )
    }
  })

  describe('Card.Provider', () => {
    const contextRef: React.MutableRefObject<CardContextState> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = useContext(CardContext)
      return null
    }

    it('should tell children they are nested', () => {
      // Cards set nested context
      render(
        <Form.Card>
          <ContextConsumer />
        </Form.Card>
      )
      expect(contextRef.current.isNested).toBe(true)
    })

    it('provider should tell children they are nested by using "disableCardBreakout"', () => {
      // Provider sets nested context
      const { rerender } = render(
        <Form.Card.Provider disableCardBreakout>
          <ContextConsumer />
        </Form.Card.Provider>
      )
      expect(contextRef.current.isNested).toBe(true)

      // Can set false context
      rerender(
        <Form.Card.Provider disableCardBreakout={false}>
          <ContextConsumer />
        </Form.Card.Provider>
      )
      expect(contextRef.current.isNested).toBe(false)

      // Provider without props are undefined
      rerender(
        <Form.Card.Provider>
          <ContextConsumer />
        </Form.Card.Provider>
      )
      expect(contextRef.current.isNested).toBe(undefined)
    })

    it('provider should inherit if not set', () => {
      // Overrides parent card context if set
      const { rerender } = render(
        <Form.Card>
          <Form.Card.Provider disableCardBreakout={false}>
            <ContextConsumer />
          </Form.Card.Provider>
        </Form.Card>
      )
      expect(contextRef.current.isNested).toBe(false)

      // Overrides parent provider context if set
      rerender(
        <Form.Card.Provider disableCardBreakout>
          <Form.Card.Provider disableCardBreakout={false}>
            <ContextConsumer />
          </Form.Card.Provider>
        </Form.Card.Provider>
      )
      expect(contextRef.current.isNested).toBe(false)

      // Inherits parent context if not set
      rerender(
        <Form.Card>
          <Form.Card.Provider>
            <ContextConsumer />
          </Form.Card.Provider>
        </Form.Card>
      )
      expect(contextRef.current.isNested).toBe(true)
    })
  })
})
