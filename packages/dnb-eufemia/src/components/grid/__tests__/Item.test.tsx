import React from 'react'
import { render } from '@testing-library/react'
import 'mock-match-media/jest-setup'
import Grid from '../Grid'

function getStyleProperties(
  element: HTMLElement,
  properties: Array<string>
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const prop of properties) {
    const value = element.style.getPropertyValue(prop)
    if (value !== '') {
      result[prop] = value
    }
  }

  return result
}

describe('Grid.Item', () => {
  it('should forward HTML attributes', () => {
    render(
      <Grid.Container>
        <Grid.Item aria-label="Aria Label">Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-item')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Grid.Container>
        <Grid.Item top="large">Item</Grid.Item>
      </Grid.Container>
    )
    const element = document.querySelector('.dnb-grid-item ')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <Grid.Container>
        <Grid.Item top="x-large">Item</Grid.Item>
      </Grid.Container>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <Grid.Container>
        <Grid.Item className="custom-class">Item</Grid.Item>
      </Grid.Container>
    )

    const element = document.querySelector('.dnb-grid-item')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-grid-item',
      'custom-class',
    ])
  })

  it('should set given span with media', () => {
    render(
      <Grid.Container>
        <Grid.Item
          span={{
            small: 'full',
            medium: [1, 2],
            large: [1, 12],
          }}
        >
          Item A
        </Grid.Item>

        <Grid.Item
          span={{
            small: [1, 'end'],
            medium: [3, 4],
            large: [1, 4],
          }}
        >
          Item B
        </Grid.Item>

        <Grid.Item
          span={{
            small: [1, 2],
            medium: [3, 4],
            large: [5, 8],
          }}
        >
          Item C
        </Grid.Item>

        <Grid.Item
          span={{
            small: [3, 4],
            medium: [3, 4],
            large: [9, 12],
          }}
        >
          Item D
        </Grid.Item>
      </Grid.Container>
    )

    const elements: NodeListOf<HTMLElement> =
      document.querySelectorAll('.dnb-grid-item')

    const gridProps = [
      '--large-c-s',
      '--large-c-e',
      '--medium-c-s',
      '--medium-c-e',
      '--small-c-s',
      '--small-c-e',
    ]

    expect(getStyleProperties(elements[0], gridProps)).toEqual({
      '--large-c-s': '1',
      '--large-c-e': '13',
      '--medium-c-s': '1',
      '--medium-c-e': '3',
      '--small-c-s': '1',
      '--small-c-e': '-1',
    })
    expect(getStyleProperties(elements[1], gridProps)).toEqual({
      '--large-c-e': '5',
      '--large-c-s': '1',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '-1',
      '--small-c-s': '1',
    })
    expect(getStyleProperties(elements[2], gridProps)).toEqual({
      '--large-c-e': '9',
      '--large-c-s': '5',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '3',
      '--small-c-s': '1',
    })
    expect(getStyleProperties(elements[3], gridProps)).toEqual({
      '--large-c-e': '13',
      '--large-c-s': '9',
      '--medium-c-e': '5',
      '--medium-c-s': '3',
      '--small-c-e': '5',
      '--small-c-s': '3',
    })
  })

  it('should support "end" and "full"', () => {
    render(
      <Grid.Container>
        <Grid.Item
          span={{
            small: 'full',
            medium: [1, 2],
            large: [1, 12],
          }}
        >
          Item A
        </Grid.Item>

        <Grid.Item
          span={{
            small: [2, 4],
            medium: 'full',
            large: [1, 4],
          }}
        >
          Item B
        </Grid.Item>

        <Grid.Item
          span={{
            small: [3, 4],
            medium: [3, 6],
            large: [5, 8],
          }}
        >
          Item C
        </Grid.Item>

        <Grid.Item
          span={{
            small: [4, 'end'],
            medium: [3, 6],
            large: [9, 12],
          }}
        >
          Item D
        </Grid.Item>
      </Grid.Container>
    )

    const elements: NodeListOf<HTMLElement> =
      document.querySelectorAll('.dnb-grid-item')

    const gridProps = [
      '--large-c-s',
      '--large-c-e',
      '--medium-c-s',
      '--medium-c-e',
      '--small-c-s',
      '--small-c-e',
    ]

    expect(getStyleProperties(elements[0], gridProps)).toEqual({
      '--large-c-e': '13',
      '--large-c-s': '1',
      '--medium-c-e': '3',
      '--medium-c-s': '1',
      '--small-c-e': '-1',
      '--small-c-s': '1',
    })
    expect(getStyleProperties(elements[1], gridProps)).toEqual({
      '--large-c-e': '5',
      '--large-c-s': '1',
      '--medium-c-e': '-1',
      '--medium-c-s': '1',
      '--small-c-e': '5',
      '--small-c-s': '2',
    })
    expect(getStyleProperties(elements[2], gridProps)).toEqual({
      '--large-c-e': '9',
      '--large-c-s': '5',
      '--medium-c-e': '7',
      '--medium-c-s': '3',
      '--small-c-e': '5',
      '--small-c-s': '3',
    })
    expect(getStyleProperties(elements[3], gridProps)).toEqual({
      '--large-c-e': '13',
      '--large-c-s': '9',
      '--medium-c-e': '7',
      '--medium-c-s': '3',
      '--small-c-e': '-1',
      '--small-c-s': '4',
    })
  })

  it('should set given span', () => {
    render(
      <Grid.Container>
        <Grid.Item span={[1, 6]}>Item A</Grid.Item>

        <Grid.Item span={[7, 12]}>Item B</Grid.Item>
      </Grid.Container>
    )

    const elements: NodeListOf<HTMLElement> =
      document.querySelectorAll('.dnb-grid-item')

    const gridProps = [
      '--large-c-s',
      '--large-c-e',
      '--medium-c-s',
      '--medium-c-e',
      '--small-c-s',
      '--small-c-e',
    ]

    expect(getStyleProperties(elements[0], gridProps)).toEqual({
      '--small-c-s': '1',
      '--small-c-e': '7',
      '--large-c-s': '1',
      '--large-c-e': '7',
      '--medium-c-s': '1',
      '--medium-c-e': '7',
    })
    expect(getStyleProperties(elements[1], gridProps)).toEqual({
      '--small-c-s': '7',
      '--small-c-e': '13',
      '--large-c-s': '7',
      '--large-c-e': '13',
      '--medium-c-s': '7',
      '--medium-c-e': '13',
    })
  })

  it('should set element', () => {
    render(<Grid.Item element="section">content</Grid.Item>)

    const element = document.querySelector('.dnb-grid-item')

    expect(element.tagName).toBe('SECTION')
  })
})
