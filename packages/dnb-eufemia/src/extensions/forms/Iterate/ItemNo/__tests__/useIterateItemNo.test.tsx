import React from 'react'
import { render, screen } from '@testing-library/react'
import { useIterateItemNo } from '../useIterateItemNo'
import IterateItemContext from '../../IterateItemContext'
import { Field, Iterate } from '../../..'
import { renderWithFormatting } from '../../../../../shared'

function TestComponent(props: any) {
  const content = useIterateItemNo(props)
  return <>{content}</>
}

describe('useIterateItemNo', () => {
  it('should replace {itemNo} with index + 1', () => {
    render(
      <IterateItemContext.Provider value={{ index: 0 }}>
        <TestComponent label="Hello {itemNo}" />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Hello 1')).toBeInTheDocument()
  })

  it('should not append suffix if required is true', () => {
    render(
      <IterateItemContext.Provider value={{ index: 1 }}>
        <TestComponent label="Item {itemNo}" required />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.queryByText('(optional)')).toBeNull()
  })

  it('should append default suffix if required is false', () => {
    render(
      <IterateItemContext.Provider value={{ index: 2 }}>
        <TestComponent label="Label {itemNo}" required={false} />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Label 3 (valgfritt)')).toBeInTheDocument()
  })

  it('should use custom suffix if labelSuffix is provided', () => {
    render(
      <IterateItemContext.Provider value={{ index: 3 }}>
        <TestComponent
          label="Custom {itemNo}"
          labelSuffix="(custom)"
          required={false}
        />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Custom 4 (custom)')).toBeInTheDocument()
  })

  it('should not append custom suffix when labelSuffix has value true', () => {
    render(
      <IterateItemContext.Provider value={{ index: 3 }}>
        <TestComponent
          label="Custom {itemNo}"
          labelSuffix={true}
          required={false}
        />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Custom 4')).toBeInTheDocument()
  })

  it('should not append custom suffix when labelSuffix has value false', () => {
    render(
      <IterateItemContext.Provider value={{ index: 3 }}>
        <TestComponent
          label="Custom {itemNo}"
          labelSuffix={false}
          required={false}
        />
      </IterateItemContext.Provider>
    )
    expect(screen.getByText('Custom 4')).toBeInTheDocument()
  })

  it('should support renderWithFormatting', () => {
    const label = 'Item no. `{itemNo}` – **ready**'

    const Item = () => {
      const str = useIterateItemNo({ label })
      return <Field.String label={renderWithFormatting(str)} />
    }

    render(
      <Iterate.Array value={['foo']}>
        <Item />
      </Iterate.Array>
    )

    expect(document.querySelector('label').textContent).toContain(
      'Item no. 1 – ready'
    )
    expect(
      document.querySelector('.dnb-forms-field-block__label__content')
        .innerHTML
    ).toMatchInlineSnapshot(
      `"Item no. <code class="dnb-code">1</code> – <strong>ready</strong>"`
    )
  })
})
