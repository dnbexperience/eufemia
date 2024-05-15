import React from 'react'
import { MainHeading, SubHeading } from '../../../extensions/forms/Form'
import Heading from '../../Heading'
import { H1, H2, H3, H4, H5, H6 } from '../../../elements'
import {
  isHeadingElement,
  getSpaceVariant,
  pickSpacingProps,
} from '../../flex/utils'

describe('isHeadingElement', () => {
  it('should detect if a heading component is given', () => {
    expect(
      isHeadingElement(<MainHeading>Heading</MainHeading>)
    ).toBeTruthy()
    expect(isHeadingElement(<SubHeading>Heading</SubHeading>)).toBeTruthy()
    expect(isHeadingElement(<H1>Heading</H1>)).toBeTruthy()
    expect(isHeadingElement(<H2>Heading</H2>)).toBeTruthy()
    expect(isHeadingElement(<H3>Heading</H3>)).toBeTruthy()
    expect(isHeadingElement(<H4>Heading</H4>)).toBeTruthy()
    expect(isHeadingElement(<H5>Heading</H5>)).toBeTruthy()
    expect(isHeadingElement(<H6>Heading</H6>)).toBeTruthy()
    expect(isHeadingElement(<Heading>Heading</Heading>)).toBeTruthy()
  })
})

describe('pickSpacingProps', () => {
  it('should return the correct props', () => {
    expect(
      pickSpacingProps({
        top: 'large',
        right: 'large',
        bottom: 'large',
        left: 'large',
        space: 'large',
      })
    ).toEqual({
      top: 'large',
      right: 'large',
      bottom: 'large',
      left: 'large',
      space: 'large',
    })
  })

  it('should return only given props', () => {
    expect(
      pickSpacingProps({
        right: 'large',
        left: 'large',
      })
    ).toEqual({
      right: 'large',
      left: 'large',
    })
  })
})

describe('getSpaceVariant', () => {
  it('should ignore', () => {
    const MockComponent = (props) => <div {...props} />
    MockComponent._supportsSpacingProps = undefined

    expect(getSpaceVariant(<MockComponent />)).toBeFalsy()
    expect(getSpaceVariant(<div>div</div>)).toBeFalsy()
  })

  it('should return true', () => {
    const MockComponent = (props) => <div {...props} />
    MockComponent._supportsSpacingProps = true

    expect(getSpaceVariant(<MockComponent />)).toBe(true)

    MockComponent._supportsSpacingProps = undefined

    expect(getSpaceVariant(<MockComponent top="large" />)).toBe(true)
    expect(getSpaceVariant(<MockComponent right="large" />)).toBe(true)
    expect(getSpaceVariant(<MockComponent bottom="large" />)).toBe(true)
    expect(getSpaceVariant(<MockComponent left="large" />)).toBe(true)
    expect(getSpaceVariant(<MockComponent space={{}} />)).toBe(true)
  })

  it('should return false', () => {
    const MockComponent = (props) => <div {...props} />
    MockComponent._supportsSpacingProps = false

    expect(getSpaceVariant(<MockComponent />)).toBe(false)
  })

  it('should return children', () => {
    const MockComponent = (props) => <div {...props} />
    MockComponent._supportsSpacingProps = 'children'

    expect(getSpaceVariant(<MockComponent />)).toBe('children')
  })
})
