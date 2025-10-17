import React from 'react'
import { render } from '@testing-library/react'
import { Iterate } from '../../..'
import { renderWithFormatting } from '../../../../../shared'

describe('Iterate.ItemNo', () => {
  it('should replace {itemNo} in children given as a string', () => {
    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ItemNo>{'Item no. {itemNo} string'}</Iterate.ItemNo>
      </Iterate.Array>
    )
    expect(document.body).toHaveTextContent('Item no. 1 string')
  })

  it('should replace several array items', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ItemNo>{'Item no. {itemNo} string'}</Iterate.ItemNo>
      </Iterate.Array>
    )
    expect(document.body).toHaveTextContent('Item no. 1 string')
    expect(document.body).toHaveTextContent('Item no. 2 string')
  })

  it('should replace {itemNo} inside JSX children while preserving markup', () => {
    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ItemNo>
          <b>{'Item no. {itemNo} string'}</b>
        </Iterate.ItemNo>
      </Iterate.Array>
    )

    expect(document.querySelector('b')?.textContent).toBe(
      'Item no. 1 string'
    )
    expect(document.querySelector('section')).toMatchInlineSnapshot(`
      <section
        class="dnb-space dnb-flex-container dnb-flex-stack dnb-forms-iterate dnb-forms-section dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-stretch dnb-flex-container--align-self-stretch dnb-flex-container--spacing-medium dnb-flex-container--wrap dnb-flex-container--divider-space"
      >
        <div
          class="dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-item dnb-forms-iterate__element"
          tabindex="-1"
        >
          <b>
            Item no. 1 string
          </b>
        </div>
      </section>
    `)
  })

  it('should support renderWithFormatting while preserving markup', () => {
    const label = 'Item no. `{itemNo}` – **ready**'

    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ItemNo>{renderWithFormatting(label)}</Iterate.ItemNo>
      </Iterate.Array>
    )

    expect(document.body).toHaveTextContent('Item no. 1 – ready')
    expect(document.querySelector('code').textContent).toBe('1')
    expect(document.querySelector('strong').textContent).toBe('ready')
    expect(document.querySelector('section')).toMatchInlineSnapshot(`
      <section
        class="dnb-space dnb-flex-container dnb-flex-stack dnb-forms-iterate dnb-forms-section dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-stretch dnb-flex-container--align-self-stretch dnb-flex-container--spacing-medium dnb-flex-container--wrap dnb-flex-container--divider-space"
      >
        <div
          class="dnb-space dnb-space__top--zero dnb-space__bottom--zero dnb-flex-item dnb-forms-iterate__element"
          tabindex="-1"
        >
          Item no. 
          <code
            class="dnb-code"
          >
            1
          </code>
           – 
          <strong>
            ready
          </strong>
        </div>
      </section>
    `)
  })
})
