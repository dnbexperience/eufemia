import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from '../../../DataContext'
import Visibility from '../Visibility'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'
import { P } from '../../../../../elements'

describe('Visibility', () => {
  it('renders children when no props is given', () => {
    render(<Visibility>Child</Visibility>)
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('should have constant of _supportsSpacingProps="children"', () => {
    expect(Visibility._supportsSpacingProps).toBe('children')
  })

  describe('visibility', () => {
    it('renders children when visible is true', () => {
      render(<Visibility visible={true}>Child</Visibility>)
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when visible is false', () => {
      render(<Visibility visible={false}>Child</Visibility>)
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathDefined', () => {
    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathDefined="/isDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathDefined="/notDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathUndefined', () => {
    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathUndefined="/isDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathUndefined="/notDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })
  })

  describe('pathTruthy', () => {
    it('renders children when target path is truthy', () => {
      render(
        <Provider data={{ isTrue: true }}>
          <Visibility pathTruthy="/isTrue">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not truthy', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathTruthy="/isFalse">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathTruthy="/isNotDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathFalsy', () => {
    it('renders children when target path is falsy', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathFalsy="/isFalse">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('renders children when target path is not defined', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathFalsy="/isNotDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not falsy', () => {
      render(
        <Provider data={{ isTrue: true }}>
          <Visibility pathFalsy="/isTrue">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('inferData', () => {
    it('renders children when infer-function returns true', () => {
      // eslint-disable-next-line no-unused-vars
      const inferData = jest.fn((data) => true)
      render(
        <Provider data={{ foo: 'bar' }}>
          <Visibility inferData={inferData}>Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when infer-function return false', () => {
      // eslint-disable-next-line no-unused-vars
      const inferData = jest.fn((data) => false)
      render(
        <Provider data={{ foo: 'bar' }}>
          <Visibility inferData={inferData}>Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
      expect(inferData.mock.calls).toHaveLength(1)
      expect(inferData.mock.calls[0][0]).toEqual({ foo: 'bar' })
    })
  })

  describe('pathValue', () => {
    it('renders children when target path and value matches', () => {
      render(
        <Provider data={{ myPath: 'checked' }}>
          <Visibility pathValue="/myPath" whenValue="checked">
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path not not value matches', () => {
      render(
        <Provider data={{ myPath: 'checked' }}>
          <Visibility pathValue="/myPath" whenValue="not-checked">
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).toBeNull()
    })
  })

  it('should be supported by Flex.Container', async () => {
    render(
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility pathTrue="/toggleValue">
            <P>This is visible 1</P>
            <P>This is visible 2</P>
          </Form.Visibility>
        </Flex.Stack>
      </Form.Handler>
    )

    const checkbox = document.querySelector('input[type="checkbox"]')

    expect(document.querySelectorAll('p')).toHaveLength(0)

    await userEvent.click(checkbox)

    expect(document.querySelectorAll('p')).toHaveLength(2)

    const [first, second] = Array.from(document.querySelectorAll('p'))
    expect(first).toHaveClass(
      'dnb-p dnb-space__top--zero dnb-space__bottom--zero'
    )
    expect(second).toHaveClass(
      'dnb-p dnb-space__top--small dnb-space__bottom--zero'
    )

    const container = document.querySelector(
      '.dnb-flex-container > .dnb-flex-container'
    )
    expect(container).toMatchInlineSnapshot(`
      <section
        class="dnb-space dnb-space__top--small dnb-space__bottom--zero dnb-flex-container dnb-flex-stack dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-stretch dnb-flex-container--align-self-stretch dnb-flex-container--spacing-small dnb-flex-container--wrap dnb-flex-container--divider-space"
      >
        <p
          class="dnb-p dnb-space__top--zero dnb-space__bottom--zero"
        >
          This is visible 1
        </p>
        <p
          class="dnb-p dnb-space__top--small dnb-space__bottom--zero"
        >
          This is visible 2
        </p>
      </section>
    `)
  })

  it('should have "height-animation" wrapper when animate is true', async () => {
    render(
      <Provider data={{ myPath: 'checked' }}>
        <Visibility pathValue="/myPath" whenValue="checked" animate>
          Child
        </Visibility>
      </Provider>
    )

    const element = document.querySelector('.dnb-height-animation')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass(
      'dnb-space dnb-height-animation dnb-height-animation--is-in-dom dnb-height-animation--parallax'
    )
  })

  it('should use given "element"', () => {
    render(
      <Provider data={{ myPath: 'checked' }}>
        <Visibility
          pathValue="/myPath"
          whenValue="checked"
          animate
          element="span"
        >
          Child
        </Visibility>
      </Provider>
    )

    const element = document.querySelector('.dnb-height-animation')
    expect(element.tagName).toBe('SPAN')
  })
})
