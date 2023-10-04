import React from 'react'
import { MainHeading, SubHeading } from '../../../extensions/forms/Form'
import Heading from '../../Heading'
import { H1, H2, H3, H4, H5, H6 } from '../../../elements'
import { isHeadingElement, isSpacePropsComponent } from '../utils'

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

describe('isSpacePropsComponent', () => {
  it('should detect if a component supports space props', () => {
    expect(
      isSpacePropsComponent(<MainHeading>Heading</MainHeading>)
    ).toBeTruthy()
    expect(
      isSpacePropsComponent(<SubHeading>Heading</SubHeading>)
    ).toBeTruthy()
    expect(isSpacePropsComponent(<H1>Heading</H1>)).toBeTruthy()
    expect(isSpacePropsComponent(<H2>Heading</H2>)).toBeTruthy()
    expect(isSpacePropsComponent(<H3>Heading</H3>)).toBeTruthy()
    expect(isSpacePropsComponent(<H4>Heading</H4>)).toBeTruthy()
    expect(isSpacePropsComponent(<H5>Heading</H5>)).toBeTruthy()
    expect(isSpacePropsComponent(<H6>Heading</H6>)).toBeTruthy()
    expect(isSpacePropsComponent(<Heading>Heading</Heading>)).toBeTruthy()
  })
})
