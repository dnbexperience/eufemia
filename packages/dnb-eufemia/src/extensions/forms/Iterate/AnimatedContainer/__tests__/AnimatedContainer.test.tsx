import React from 'react'
import { render } from '@testing-library/react'
import { Iterate, Value } from '../../..'
import AnimatedContainer from '../AnimatedContainer'
import IterateItemContext from '../../IterateItemContext'

describe('AnimatedContainer', () => {
  it('should render content and without toolbar', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <AnimatedContainer>
          <Value.String itemPath="/" />
        </AnimatedContainer>
      </Iterate.Array>
    )

    const sections = document.querySelectorAll('.dnb-forms-section-block')
    expect(sections).toHaveLength(2)
    expect(sections[0]).toHaveTextContent('foo')
    expect(sections[1]).toHaveTextContent('bar')
    expect(document.querySelector('button')).not.toBeInTheDocument()
  })

  it('should render "title"', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <AnimatedContainer title="Item title">content</AnimatedContainer>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Item title'
    )
  })

  it('should render title with "itemNr"', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <AnimatedContainer title="Item title {itemNr}">
          content
        </AnimatedContainer>
      </Iterate.Array>
    )

    const leads = document.querySelectorAll('.dnb-p')
    expect(leads).toHaveLength(2)
    expect(leads[0]).toHaveTextContent('Item title 1')
    expect(leads[1]).toHaveTextContent('Item title 2')
  })
})
