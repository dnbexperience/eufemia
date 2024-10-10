import React from 'react'
import { render } from '@testing-library/react'
import { Iterate } from '../../..'

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

  it('should remove jsx and return only a string', () => {
    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ItemNo>
          <b>{'Item no. {itemNo} string'}</b>
        </Iterate.ItemNo>
      </Iterate.Array>
    )
    expect(document.body).toHaveTextContent('Item no. 1 string')
  })
})
