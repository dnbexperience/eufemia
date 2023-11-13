import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from '../../DataContext'
import Visibility from '../Visibility'

describe('Visibility', () => {
  it('renders children when no props is given', () => {
    render(<Visibility>Child</Visibility>)
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  describe('visibility-prop', () => {
    it('renders children when visible is true', () => {
      render(<Visibility visible={true}>Child</Visibility>)
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when visible is false', () => {
      render(<Visibility visible={false}>Child</Visibility>)
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathDefined-prop', () => {
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

  describe('pathUndefined-prop', () => {
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

  describe('pathTruthy-prop', () => {
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

  describe('pathFalsy-prop', () => {
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

  describe('inferData-prop', () => {
    it('renders children when infer-function return true', () => {
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
})
