import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from '../../../DataContext'
import { Iterate } from '../../..'

describe('Iterate.Visibility', () => {
  it('renders children when no props is given', () => {
    render(
      <Iterate.Array value={[{ foo: 'bar' }]}>
        <Iterate.Visibility>Child</Iterate.Visibility>
      </Iterate.Array>
    )
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  describe('visibility', () => {
    it('renders children when visible is true', () => {
      render(
        <Iterate.Array value={[{ foo: 'bar' }]}>
          <Iterate.Visibility visible={true}>Child</Iterate.Visibility>
        </Iterate.Array>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when visible is false', () => {
      render(
        <Iterate.Array value={[{ foo: 'bar' }]}>
          <Iterate.Visibility visible={false}>Child</Iterate.Visibility>
        </Iterate.Array>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathDefined', () => {
    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ myList: [{ isDefined: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathDefined="/isDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ myList: [{ isDefined: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathDefined="/notDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathUndefined', () => {
    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ myList: [{ isDefined: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathUndefined="/isDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ myList: [{ isDefined: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathUndefined="/notDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })
  })

  describe('pathTruthy', () => {
    it('renders children when target path is truthy', () => {
      render(
        <Provider data={{ myList: [{ isTruthy: 'value' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathTruthy="/isTruthy">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not truthy', () => {
      render(
        <Provider data={{ myList: [{ isFalsy: null }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathTruthy="/isFalsy">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ myList: [{ isFalse: false }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathTruthy="/isNotDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathFalsy', () => {
    it('renders children when target path is falsy', () => {
      render(
        <Provider data={{ myList: [{ isFalsy: null }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathFalsy="/isFalsy">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('renders children when target path is not defined', () => {
      render(
        <Provider data={{ myList: [{ isFalse: false }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathFalsy="/isNotDefined">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not falsy', () => {
      render(
        <Provider data={{ myList: [{ isTruthy: 'value' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathFalsy="/isTruthy">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('inferData', () => {
    it('renders children when infer-function returns true', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const inferData = jest.fn((data) => true)
      render(
        <Provider data={{ myList: [{ foo: 'bar' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility inferData={inferData}>
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when infer-function return false', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const inferData = jest.fn((data) => false)
      render(
        <Provider data={{ myList: [{ foo: 'bar' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility inferData={inferData}>
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
      expect(inferData).toHaveBeenCalledTimes(1)
      expect(inferData).toHaveBeenLastCalledWith({
        myList: [{ foo: 'bar' }],
      })
    })
  })

  describe('pathValue', () => {
    it('renders children when target path and value matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'checked' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility pathValue="/myPath" whenValue="checked">
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path not not value matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'checked' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              pathValue="/myPath"
              whenValue="not-checked"
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).toBeNull()
    })
  })

  describe('visibleWhen', () => {
    it('should render children when hasValue matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhen={{ itemPath: '/myPath', hasValue: 'foo' }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('should not render children when hasValue not matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhen={{ itemPath: '/myPath', hasValue: 'bar' }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should not render children when path not matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhen={{
                itemPath: '/nonExistingPath',
                hasValue: 'foo',
              }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should render children when withValue matches', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhen={{
                itemPath: '/myPath',
                withValue: (value) => value === 'foo',
              }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()

      log.mockRestore()
    })

    it('should not render children when withValue does not match', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhen={{
                itemPath: '/myPath',
                withValue: (value) => value === 'bar',
              }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()

      log.mockRestore()
    })
  })

  describe('visibleWhenNot', () => {
    it('should render children when hasValue matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhenNot={{ itemPath: '/myPath', hasValue: 'foo' }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should not render children when hasValue not matches', () => {
      render(
        <Provider data={{ myList: [{ myPath: 'foo' }] }}>
          <Iterate.Array path="/myList">
            <Iterate.Visibility
              visibleWhenNot={{ itemPath: '/myPath', hasValue: 'bar' }}
            >
              Child
            </Iterate.Visibility>
          </Iterate.Array>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })
  })
})
