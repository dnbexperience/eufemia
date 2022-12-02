import React from 'react'
import { render } from '@testing-library/react'
import ScrollView from '../ScrollView'

describe('ScrollView', () => {
  it('should contain children content', () => {
    render(<ScrollView>overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')

    expect(element.textContent).toBe('overflow content')
  })

  it('should set tabindex when interactive is set', () => {
    render(<ScrollView interactive>overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'tabindex'])
  })

  it('should include custom classes', () => {
    render(
      <ScrollView className="custom-class">overflow content</ScrollView>
    )

    const element = document.querySelector('.dnb-scroll-view')
    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'custom-class',
    ])
  })

  it('should support spacing', () => {
    render(<ScrollView top="large">overflow content</ScrollView>)

    const element = document.querySelector('.dnb-scroll-view')
    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'dnb-space__top--large',
    ])
  })
})
