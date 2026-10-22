import { StrictMode, Suspense } from 'react'
import type { ReactNode } from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { Field, FieldBlock, Form } from '../../..'
import type { FieldStatus } from '../../..'
import { FormError } from '../../../utils'

type Messages = Pick<FieldStatus, 'error' | 'warning' | 'info'>

function expectReferences(container: HTMLElement, expected: string[]) {
  const input = container.querySelector('input')
  expect(input).not.toBeNull()
  const ids = input.getAttribute('aria-describedby')?.split(' ') ?? []
  expect(ids).toEqual(expected)
  for (const id of ids) {
    expect(container.querySelector(`[id="${id}"]`)).not.toBeNull()
  }
}

const emptyMessages: Array<[string, Messages]> = [
  ['empty Error', { error: new Error('') }],
  ['empty FormError errors', { error: new FormError('', { errors: [] }) }],
  ['empty error array', { error: [] }],
  ['empty nested errors', { error: [new Error('')] }],
  ['empty warning array', { warning: [] }],
  ['empty warning messages', { warning: ['', null, false] }],
  ['empty info array', { info: [] }],
  ['empty info messages', { info: ['', null, false] }],
]

function composition(
  messages: Messages,
  statusPosition: 'above' | 'below'
) {
  return (
    <StrictMode>
      <FieldBlock
        id="composition"
        composition
        statusPosition={statusPosition}
      >
        <Field.String id="string" {...messages} />
      </FieldBlock>
    </StrictMode>
  )
}

describe('Field.Composition status references', () => {
  describe.each(['above', 'below'] as const)(
    'statusPosition=%s',
    (position) => {
      it.each(emptyMessages)(
        'should not link %s on the client',
        (_, messages) => {
          const { container } = render(composition(messages, position))
          expect(container.querySelector('.dnb-form-status')).toBeNull()
          expectReferences(container, [])
        }
      )

      it.each(emptyMessages)(
        'should not link %s on the server or during hydration',
        (_, messages) => {
          const element = composition(messages, position)
          const container = document.createElement('div')
          container.innerHTML = renderToString(element)
          expect(container.querySelector('.dnb-form-status')).toBeNull()
          expectReferences(container, [])
          const onRecoverableError = vi.fn()
          const { unmount } = render(element, {
            container,
            hydrate: true,
            onRecoverableError,
          })
          expectReferences(container, [])
          expect(onRecoverableError).not.toHaveBeenCalled()
          unmount()
        }
      )

      it.each([
        [
          'Error',
          { error: new Error('Actual error') },
          'error',
          'Actual error',
        ],
        [
          'JSX error',
          { error: <strong>Actual error</strong> },
          'error',
          'Actual error',
        ],
        [
          'formatted error',
          {
            error: new FormError('', {
              formattedMessage: <strong>Actual error</strong>,
            }),
          },
          'error',
          'Actual error',
        ],
        [
          'mixed errors',
          { error: [new Error(''), new Error('Actual error')] },
          'error',
          'Actual error',
        ],
        [
          'JSX warning',
          { warning: <strong>Actual warning</strong> },
          'warning',
          'Actual warning',
        ],
        [
          'mixed info',
          { info: ['', <strong key="info">Actual info</strong>] },
          'information',
          'Actual info',
        ],
      ] satisfies Array<[string, Messages, string, string]>)(
        'should link rendered %s on the client, server and after hydration',
        (_, messages, type, text) => {
          const element = composition(messages, position)
          const ids = [`composition-form-status--${type}`]
          const client = render(element)
          expectReferences(client.container, ids)
          expect(
            client.container.querySelector('.dnb-form-status')
          ).toHaveTextContent(text)
          client.unmount()

          const container = document.createElement('div')
          container.innerHTML = renderToString(element)
          expectReferences(container, position === 'below' ? ids : [])
          const onRecoverableError = vi.fn()
          const { unmount } = render(element, {
            container,
            hydrate: true,
            onRecoverableError,
          })
          expectReferences(container, ids)
          expect(
            container.querySelector('.dnb-form-status')
          ).toHaveTextContent(text)
          expect(onRecoverableError).not.toHaveBeenCalled()
          unmount()
        }
      )

      it('should clear and restore all status links without another interaction', () => {
        const ids = [
          'composition-form-status--error',
          'composition-form-status--warning',
          'composition-form-status--information',
        ]
        const full = {
          error: new Error('Actual error'),
          warning: 'Actual warning',
          info: 'Actual info',
        }
        const { container, rerender } = render(composition(full, position))
        expectReferences(container, ids)
        rerender(
          composition(
            { error: new Error(''), warning: [], info: [''] },
            position
          )
        )
        expect(container.querySelector('.dnb-form-status')).toBeNull()
        expectReferences(container, [])
        rerender(composition(full, position))
        expectReferences(container, ids)
        rerender(composition({}, position))
        expect(container.querySelector('.dnb-form-status')).toBeNull()
        expectReferences(container, [])
      })
    }
  )

  it('should keep one shared status for duplicate messages and shared paths', () => {
    const element = (showSecond: boolean) => (
      <Form.Handler>
        <Field.Composition id="composition">
          <Field.String path="/shared" error={new Error('Actual error')} />
          {showSecond && (
            <Field.String
              path="/shared"
              error={new Error('Actual error')}
            />
          )}
        </Field.Composition>
      </Form.Handler>
    )
    const { container, rerender } = render(element(true))
    expect(container.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    for (const input of Array.from(container.querySelectorAll('input'))) {
      expect(input).toHaveAttribute(
        'aria-describedby',
        'composition-form-status--error'
      )
    }
    rerender(element(false))
    expectReferences(container, ['composition-form-status--error'])
    expect(container.querySelector('.dnb-form-status')).toHaveTextContent(
      'Actual error'
    )
  })

  it('should not link hidden validation errors until they are shown', async () => {
    const { container } = render(
      <Field.Composition id="composition">
        <Field.String required />
      </Field.Composition>
    )
    expectReferences(container, [])
    expect(container.querySelector('.dnb-form-status--error')).toBeNull()
    await userEvent.type(container.querySelector('input'), 'a{Backspace}')
    fireEvent.blur(container.querySelector('input'))
    expectReferences(container, ['composition-form-status--error'])
  })

  it.each([false, true])(
    'should keep links valid when a field is hidden with keepInDOM=%s',
    (keepInDOM) => {
      const element = (visible: boolean) => (
        <Form.Handler>
          <Field.Composition id="composition">
            <Field.String
              id="visible"
              error={new Error('Visible error')}
            />
            <Form.Visibility visible={visible} keepInDOM={keepInDOM}>
              <Field.String
                id="hidden"
                error={new Error('Hidden error')}
                warning={[]}
                info={['']}
              />
            </Form.Visibility>
          </Field.Composition>
        </Form.Handler>
      )
      const { container, rerender } = render(element(true))
      expectReferences(container, ['composition-form-status--error'])
      rerender(element(false))
      expectReferences(container, ['composition-form-status--error'])
      for (const input of Array.from(
        container.querySelectorAll('input')
      )) {
        const ids =
          input.getAttribute('aria-describedby')?.split(' ') ?? []
        expect(ids).not.toContain('composition-form-status--warning')
        expect(ids).not.toContain('composition-form-status--information')
        for (const id of ids) {
          expect(container.querySelector(`[id="${id}"]`)).not.toBeNull()
        }
      }
      rerender(element(true))
      expectReferences(container, ['composition-form-status--error'])
      expect(
        container.querySelector('.dnb-form-status--error')
      ).toHaveTextContent('Hidden error')
    }
  )

  it.each(emptyMessages)(
    'should not link %s outside a composition',
    (_, messages) => {
      const { container } = render(<Field.String {...messages} />)
      expect(container.querySelector('.dnb-form-status')).toBeNull()
      expectReferences(container, [])
    }
  )

  it('should not link a standalone function error before it is revealed', () => {
    const { container } = render(
      <Field.String
        id="string"
        validateInitially={false}
        error={() => 'Actual error'}
      />
    )
    expect(container.querySelector('.dnb-form-status--error')).toBeNull()
    expectReferences(container, [])
  })

  it('should link a standalone function Error that is shown immediately', () => {
    const { container } = render(
      <Field.String
        id="string"
        validateInitially={false}
        error={() => new Error('Actual error')}
      />
    )
    expect(
      container.querySelector('.dnb-form-status--error')
    ).toHaveTextContent('Actual error')
    expectReferences(container, ['string-form-status--error'])
  })

  it.each(emptyMessages)(
    'should keep %s unlinked while a deferred field hydrates',
    async (_, messages) => {
      const element = (
        <StrictMode>
          <Field.Composition id="composition" info="Visible info">
            <Suspense fallback="Loading">
              <Field.String id="string" {...messages} />
            </Suspense>
          </Field.Composition>
        </StrictMode>
      )
      const container = document.createElement('div')
      container.innerHTML = renderToString(element)
      const onRecoverableError = vi.fn()
      expectReferences(container, [])
      const { unmount } = render(element, {
        container,
        hydrate: true,
        onRecoverableError,
      })
      await waitFor(() => {
        expect(container.querySelector('input')).not.toBeNull()
        expectReferences(container, [])
        expect(
          container.querySelectorAll('.dnb-form-status')
        ).toHaveLength(1)
      })
      expect(
        container.querySelector('.dnb-form-status')
      ).toHaveTextContent('Visible info')
      expect(onRecoverableError).not.toHaveBeenCalled()
      unmount()
    }
  )

  it('should link a nonempty message only after a suspended field commits', async () => {
    let ready = false
    let resolve: () => void
    const pending = new Promise<void>((done) => {
      resolve = done
    })
    function Pending() {
      if (!ready) {
        throw pending
      }
      return null
    }
    const { container } = render(
      <StrictMode>
        <Field.Composition id="composition" info="Visible info">
          <Suspense fallback="Loading">
            <Field.String id="string" warning="Actual warning" />
            <Pending />
          </Suspense>
        </Field.Composition>
      </StrictMode>
    )
    expect(container.querySelector('input')).toBeNull()
    expect(container.querySelector('.dnb-form-status--warning')).toBeNull()
    await act(async () => {
      ready = true
      resolve()
      await pending
    })
    expectReferences(container, ['composition-form-status--warning'])
    expect(
      container.querySelector('.dnb-form-status--warning')
    ).toHaveTextContent('Actual warning')
  })

  it('should preserve user descriptions when clearing status messages', () => {
    const element = (error: Messages['error']): ReactNode => (
      <>
        <span id="description">Description</span>
        <Field.Composition id="composition">
          <Field.String aria-describedby="description" error={error} />
        </Field.Composition>
      </>
    )
    const { container, rerender } = render(
      element(new Error('Actual error'))
    )
    expectReferences(container, [
      'description',
      'composition-form-status--error',
    ])
    rerender(element(new Error('')))
    expectReferences(container, ['description'])
    expect(container.querySelector('.dnb-form-status--error')).toBeNull()
  })
})
