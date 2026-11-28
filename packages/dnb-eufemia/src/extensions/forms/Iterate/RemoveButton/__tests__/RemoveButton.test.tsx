import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import RemoveButton from '../RemoveButton'
import nbNO from '../../../constants/locales/nb-NO'
import { Form, Iterate, Value } from '../../..'
import ArrayItemAreaContext from '../../Array/ArrayItemAreaContext'

const nb = nbNO['nb-NO'].RemoveButton

describe('RemoveButton', () => {
  const handleRemove = vi.fn()

  const wrapper = ({ children }) => (
    <IterateItemContext value={{ handleRemove }}>
      {children}
    </IterateItemContext>
  )

  afterEach(() => {
    handleRemove.mockReset()
  })

  it('should call handleRemove when clicked inside an Iterate element', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleRemove).toHaveBeenCalledWith({ focusAfterRemove: true })
  })

  it('should throw an error if value is not an array', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const invalidValue = 'invalid value'

    expect(() => {
      render(
        <RemoveButton value={invalidValue as unknown as string[]}>
          Remove Button
        </RemoveButton>
      )
    }).toThrow('RemoveButton must be inside an Iterate.Array')

    log.mockRestore()
  })

  it('should render with the correct class name', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-forms-iterate-remove-element-button')
  })

  it('should be a tertiary variant', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have correct text by default', () => {
    render(<RemoveButton />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.text)
  })

  it('should accept "text" prop', () => {
    render(<RemoveButton text="text" />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(<RemoveButton>text</RemoveButton>, {
      wrapper,
    })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(<RemoveButton aria-label="Aria Label">text</RemoveButton>, {
      wrapper,
    })

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "trash" icon', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'trash icon'
    )
  })

  it('supports translations from Form.Handler', () => {
    const remove = 'custom-translation-remove-button-text'

    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            'RemoveButton.text': remove,
          },
          'en-GB': {
            'RemoveButton.text': remove,
          },
        }}
      >
        <RemoveButton />
      </Form.Handler>,
      { wrapper }
    )

    expect(screen.getByText(remove)).toBeInTheDocument()
  })

  it('should call "handleRemoveItem" from ArrayItemAreaContext when given', async () => {
    const handleRemoveItem = vi.fn()
    const handleRemove = vi.fn()

    render(
      <ArrayItemAreaContext
        value={{
          handleRemoveItem,
        }}
      >
        <RemoveButton />
      </ArrayItemAreaContext>,
      {
        wrapper: ({ children }) => (
          <IterateItemContext value={{ handleRemove }}>
            {children}
          </IterateItemContext>
        ),
      }
    )

    await userEvent.click(document.querySelector('button'))

    expect(handleRemoveItem).toHaveBeenCalledTimes(1)
    expect(handleRemove).toHaveBeenCalledTimes(0)
  })

  it.each([false, true])(
    'should keep removal focus in the nested array (animated: %s)',
    async (animated) => {
      render(
        <Form.Handler
          defaultData={{
            groups: [{ items: ['a'] }, { items: ['b', 'c', 'd'] }],
          }}
        >
          <Iterate.Array path="/groups">
            <Iterate.ViewContainer>
              <Iterate.Array itemPath="/items" className="inner" reverse>
                {animated ? (
                  <Iterate.ViewContainer>Inner item</Iterate.ViewContainer>
                ) : (
                  <RemoveButton />
                )}
              </Iterate.Array>
              <Iterate.PushButton
                itemPath="/items"
                pushValue="new"
                text="Add item"
              />
            </Iterate.ViewContainer>
          </Iterate.Array>
        </Form.Handler>
      )

      const [firstGroup, secondGroup] = document.querySelectorAll('.inner')
      const rows = secondGroup.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      const remove = async (row: Element) => {
        await userEvent.click(
          row.querySelector('.dnb-forms-iterate-remove-element-button')
        )
        await waitFor(() => expect(row).not.toBeInTheDocument())
      }
      await remove(rows[0])
      expect(rows[1]).toHaveFocus()
      await remove(rows[2])
      expect(rows[1]).toHaveFocus()
      await remove(rows[1])
      expect(
        document.querySelectorAll('.dnb-forms-iterate-push-button')[1]
      ).toHaveFocus()
      expect(
        firstGroup.querySelectorAll('.dnb-forms-iterate__element')
      ).toHaveLength(1)
    }
  )

  it.each([false, true])(
    'should focus the visible neighbor when "reverse" and "limit" hide items (animated: %s)',
    async (animated) => {
      render(
        <Iterate.Array value={['A', 'B', 'C', 'D']} reverse limit={3}>
          {animated ? (
            <Iterate.ViewContainer>
              <Value.String itemPath="/" />
            </Iterate.ViewContainer>
          ) : (
            <>
              <Value.String itemPath="/" />
              <RemoveButton />
            </>
          )}
        </Iterate.Array>
      )

      const rows = document.querySelectorAll('.dnb-forms-iterate__element')
      expect(Array.from(rows).map((row) => row.textContent)).toEqual([
        expect.stringContaining('C'),
        expect.stringContaining('B'),
        expect.stringContaining('A'),
      ])

      await userEvent.click(
        rows[1].querySelector('.dnb-forms-iterate-remove-element-button')
      )
      await waitFor(() => expect(rows[1]).not.toBeInTheDocument())

      expect(rows[0]).toHaveFocus()
    }
  )

  it('should not focus an open button that hides when the list becomes empty', async () => {
    render(
      <Form.Handler defaultData={{ accounts: ['a'] }}>
        <Iterate.Array path="/accounts" animate>
          <Iterate.ViewContainer>
            <Value.String itemPath="/" />
          </Iterate.ViewContainer>
        </Iterate.Array>
        <Iterate.PushContainer
          path="/accounts"
          openButton={<Iterate.PushContainer.OpenButton text="Add" />}
          showOpenButtonWhen={(list) => list.length > 0}
        >
          New item
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const list = document.querySelector('.dnb-forms-iterate')
    const row = list.querySelector('.dnb-forms-iterate__element')
    await userEvent.click(
      row.querySelector('.dnb-forms-iterate-remove-element-button')
    )
    await waitFor(() => expect(row).not.toBeInTheDocument())

    expect(list).toHaveFocus()
  })

  it('should support "itemNo" in text', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <RemoveButton text="Remove item {itemNo}" />
      </Iterate.Array>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    expect(buttons[0]).toHaveTextContent('Remove item 1')
    expect(buttons[1]).toHaveTextContent('Remove item 2')
  })

  describe('showConfirmDialog', () => {
    it('should show Dialog before removing', async () => {
      render(<RemoveButton showConfirmDialog />, { wrapper })

      await userEvent.click(document.querySelector('button'))

      expect(handleRemove).toHaveBeenCalledTimes(0)

      await userEvent.click(
        document.querySelector(
          '.dnb-dialog__inner button.dnb-button--primary'
        )
      )

      expect(handleRemove).toHaveBeenCalledTimes(1)
    })

    it('should show Dialog with translation before removing', async () => {
      render(<RemoveButton showConfirmDialog />, { wrapper })

      await userEvent.click(document.querySelector('button'))

      expect(
        document.querySelector('.dnb-dialog__inner')
      ).toHaveTextContent(nb.confirmRemoveText)
    })
  })
})
