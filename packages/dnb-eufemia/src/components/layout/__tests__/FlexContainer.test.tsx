import React from 'react'
import { render } from '@testing-library/react'
import FlexContainer from '../FlexContainer'
import FlexItem from '../FlexItem'

describe('Layout.FlexContainer', () => {
  it('should forward HTML attributes', () => {
    render(
      <FlexContainer aria-label="Aria Label">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <FlexContainer top="large">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )
    const element = document.querySelector('.dnb-layout__flex-container ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <FlexContainer top="x-large">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <FlexContainer className="custom-class">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'custom-class',
      'dnb-layout__flex-container--direction-column',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-stretch',
      'dnb-layout__flex-container--divider-space',
      'dnb-layout__flex-container--spacing-small',
    ])
  })

  it('should render children', () => {
    render(
      <FlexContainer>
        <FlexItem>Flex 1</FlexItem>
        <FlexItem>Flex 2</FlexItem>
        <FlexItem>Flex 3</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')
    const children = element.children
    const childredTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childredTextContents).toEqual(['Flex 1', 'Flex 2', 'Flex 3'])
  })

  it('should apply specified width', () => {
    const { rerender } = render(
      <FlexContainer>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')

    expect(element.className).not.toContain(
      'dnb-layout__flex-container--width-'
    )

    rerender(
      <FlexContainer width="small">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--width-small'
    )

    rerender(
      <FlexContainer width="medium">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--width-medium'
    )

    rerender(
      <FlexContainer width="large">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--width-large'
    )
  })

  it('should set flow direction of children', () => {
    const { rerender } = render(
      <FlexContainer direction="column">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')

    expect(element.className).toContain(
      'dnb-layout__flex-container--direction-column'
    )

    rerender(
      <FlexContainer direction="row">
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--direction-row'
    )
  })

  it('should set alignment of content', () => {
    render(
      <FlexContainer align="center">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )
  })

  it('should justify alignment of content', () => {
    const { rerender } = render(
      <FlexContainer align="center">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')

    expect(element.className).toContain(
      'dnb-layout__flex-container--align-center'
    )

    rerender(
      <FlexContainer align="flex-end">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(element.className).toContain(
      'dnb-layout__flex-container--align-flex-end'
    )
  })

  it('should add divider between children', () => {
    const { rerender } = render(
      <FlexContainer divider="space">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout__flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')

    rerender(
      <FlexContainer divider="line">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children.length).toBe(7)
    expect(element.className).toContain(
      'dnb-layout__flex-container--divider-line'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')
    expect(children[0].className).toContain('dnb-layout__flex-item')

    expect(children[1].tagName).toContain('DIV')
    expect(children[1].className).toContain('dnb-space')
    expect(children[1].className).toContain('dnb-space__top--small')

    expect(children[2].tagName).toContain('HR')
    expect(children[2].className).toContain(
      'dnb-layout__flex-container__hr'
    )

    expect(children[3].className).toContain('dnb-space__top--small')
    expect(children[3].className).toContain('dnb-space__bottom--zero')
    expect(children[3].className).toContain('dnb-layout__flex-item')

    expect(children[4].tagName).toContain('DIV')
    expect(children[4].className).toContain('dnb-space')
    expect(children[4].className).toContain('dnb-space__top--small')

    expect(children[5].tagName).toContain('HR')
    expect(children[5].className).toContain(
      'dnb-layout__flex-container__hr'
    )

    expect(children[6].className).toContain('dnb-space__top--small')
    expect(children[6].className).toContain('dnb-space__bottom--zero')
    expect(children[6].className).toContain('dnb-layout__flex-item')
  })

  it('should set spacing between children', () => {
    const { rerender } = render(
      <FlexContainer>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout__flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')

    rerender(
      <FlexContainer spacing="large">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--large')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--large')
    expect(children[2].className).toContain('dnb-space__bottom--zero')

    rerender(
      <FlexContainer spacing="xx-small">
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).toContain('dnb-space__top--xx-small')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).toContain('dnb-space__top--xx-small')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
  })

  it('should not apply spacing if set to false', () => {
    render(
      <FlexContainer spacing={false}>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
        <FlexItem>Flex</FlexItem>
      </FlexContainer>
    )

    const element = document.querySelector('.dnb-layout__flex-container')
    const children = element.children

    expect(children.length).toBe(3)
    expect(element.className).toContain(
      'dnb-layout__flex-container--divider-space'
    )

    expect(children[0].className).toContain('dnb-space__top--zero')
    expect(children[0].className).toContain('dnb-space__bottom--zero')

    expect(children[1].className).not.toContain('dnb-space__top--small')
    expect(children[1].className).toContain('dnb-space__top--zero')
    expect(children[1].className).toContain('dnb-space__bottom--zero')

    expect(children[2].className).not.toContain('dnb-space__top--small')
    expect(children[2].className).toContain('dnb-space__top--zero')
    expect(children[2].className).toContain('dnb-space__bottom--zero')
  })
})
