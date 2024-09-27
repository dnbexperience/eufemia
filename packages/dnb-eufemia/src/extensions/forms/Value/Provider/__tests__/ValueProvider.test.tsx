import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Field, Form, Value } from '../../..'
import userEvent from '@testing-library/user-event'
import ValueProviderContext from '../ValueProviderContext'

describe('Value.Provider', () => {
  it('should merge inheritedContext with props passed to extend', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <ValueProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </ValueProviderContext.Consumer>
      )
    }

    render(
      <Value.Provider inheritVisibility={true}>
        <Collector myProp="value" />
      </Value.Provider>
    )

    expect(collectedProps).toEqual({
      inheritVisibility: true,
      myProp: 'value',
    })
  })

  it('props passed to extend should override inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <ValueProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </ValueProviderContext.Consumer>
      )
    }

    render(
      <Value.Provider inheritVisibility={true}>
        <Collector inheritVisibility={false} myProp="value" />
      </Value.Provider>
    )

    expect(collectedProps).toEqual({
      inheritVisibility: false,
      myProp: 'value',
    })
  })

  it('props passed to extend should override nested inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <ValueProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </ValueProviderContext.Consumer>
      )
    }

    render(
      <Value.Provider inheritVisibility={true}>
        <Value.Provider inheritVisibility={false}>
          <Collector inheritVisibility={true} myProp="value" />
        </Value.Provider>
      </Value.Provider>
    )

    expect(collectedProps).toEqual({
      inheritVisibility: true,
      myProp: 'value',
    })
  })

  it('second provider should override nested inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <ValueProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </ValueProviderContext.Consumer>
      )
    }

    render(
      <Value.Provider inheritVisibility={true}>
        <Value.Provider inheritVisibility={false}>
          <Collector myProp="value" />
        </Value.Provider>
      </Value.Provider>
    )

    expect(collectedProps).toEqual({
      inheritVisibility: false,
      myProp: 'value',
    })
  })

  describe('inheritVisibility', () => {
    it('renders value when visibility of field is initially true', async () => {
      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String path="/foo" defaultValue="Foo" />
            <Field.String path="/bar" defaultValue="Bar" />
          </Form.Visibility>

          <Value.Provider inheritVisibility={true}>
            <Value.SummaryList>
              <Value.String path="/foo" />
              <Value.String path="/bar" />
            </Value.SummaryList>
          </Value.Provider>
        </Form.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(2)
      expect(document.querySelectorAll('dd')).toHaveLength(2)

      const [valueFoo, valueBar] = Array.from(
        document.querySelectorAll('dd')
      )

      expect(valueFoo).toHaveTextContent('Foo')
      expect(valueBar).toHaveTextContent('Bar')

      const button = document.querySelector('.dnb-toggle-button__button')
      await userEvent.click(button)

      await waitFor(() => {
        expect(document.querySelectorAll('input')).toHaveLength(0)
        expect(document.querySelectorAll('dd')).toHaveLength(0)
      })

      await userEvent.click(button)

      await waitFor(() => {
        expect(document.querySelectorAll('input')).toHaveLength(2)
        expect(document.querySelectorAll('dd')).toHaveLength(2)
      })
    })
  })
})
