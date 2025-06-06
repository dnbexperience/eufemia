import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'

describe('Indeterminate', () => {
  it('should set aria-controls to be ids of dependence paths', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()

    render(
      <Form.Handler onChange={onChange} onSubmit={onSubmit}>
        <Field.Indeterminate
          dependencePaths={['/child1', '/child2', '/child3']}
          path="/parent"
        />
        <Field.Toggle
          path="/child1"
          id="a"
          valueOn="checked"
          valueOff="unchecked"
        />
        <Field.Toggle
          path="/child2"
          id="b"
          valueOn="checked"
          valueOff="unchecked"
        />
        <Field.Toggle
          path="/child3"
          id="c"
          valueOn="checked"
          valueOff="unchecked"
        />
      </Form.Handler>
    )

    const [parent] = Array.from(document.querySelectorAll('input'))
    expect(parent).toHaveAttribute('aria-controls', 'a b c')
  })

  it('should set aria-controls without specifying ids for child components', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()

    render(
      <Form.Handler onChange={onChange} onSubmit={onSubmit}>
        <Field.Indeterminate
          dependencePaths={['/child1', '/child2']}
          path="/parent"
        />
        <Field.Toggle
          path="/child1"
          valueOn="checked"
          valueOff="unchecked"
        />
        <Field.Toggle
          path="/child2"
          valueOn="checked"
          valueOff="unchecked"
        />
      </Form.Handler>
    )
    const [parent] = Array.from(document.querySelectorAll('input'))
    expect(parent).toHaveAttribute('aria-controls')

    const value = parent.getAttribute('aria-controls')
    const ids = value?.split(' ').filter(Boolean)

    expect(ids).toHaveLength(2)
    ids?.forEach((id) => expect(id).toMatch(/^id-/))
  })

  it('should not set aria-controls when dependence paths is an empty array', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()

    render(
      <Form.Handler onChange={onChange} onSubmit={onSubmit}>
        <Field.Indeterminate dependencePaths={[]} path="/parent" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-controls'
    )
  })

  describe('with propagateIndeterminateState="checked"', () => {
    it('should handle dependencePaths state', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="checked"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: undefined,
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      await userEvent.click(child1)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      expect(child1).toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: false,
        }),
        expect.anything()
      )

      await userEvent.click(child1)

      expect(child1).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(6)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: false,
        }),
        expect.anything()
      )
    })

    it('should set/toggle state of its parent', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="checked"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(child3).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: true,
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(child3).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(10)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: true,
        }),
        expect.anything()
      )
    })

    it('should accept custom valueOn and valueOff value', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2']}
            propagateIndeterminateState="checked"
            valueOn="what-ever"
            valueOff="you-name-it"
            path="/parent"
          />
          <Field.Boolean path="/child1" />
          <Field.Toggle
            path="/child2"
            valueOn="custom-on"
            valueOff="custom-off"
          />
        </Form.Handler>
      )

      const [parent, child1, child2] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: true,
          child2: 'custom-on',
          parent: 'what-ever',
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(8)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: true,
          child2: 'custom-on',
          parent: 'what-ever',
        }),
        expect.anything()
      )
    })
  })

  describe('with propagateIndeterminateState="unchecked"', () => {
    it('should handle dependencePaths state', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="unchecked"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: undefined,
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      await userEvent.click(child1)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      expect(child1).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: true,
        }),
        expect.anything()
      )

      await userEvent.click(child1)

      expect(child1).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(6)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: true,
        }),
        expect.anything()
      )
    })

    it('should set/toggle state of its parent', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="unchecked"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: false,
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).not.toBeChecked()
      expect(child2).toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(10)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: false,
        }),
        expect.anything()
      )
    })

    it('should accept custom valueOn and valueOff value', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2']}
            propagateIndeterminateState="unchecked"
            valueOn="what-ever"
            valueOff="you-name-it"
            path="/parent"
          />
          <Field.Boolean path="/child1" />
          <Field.Toggle
            path="/child2"
            valueOn="custom-on"
            valueOff="custom-off"
          />
        </Form.Handler>
      )

      const [parent, child1, child2] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: false,
          child2: 'custom-off',
          parent: 'you-name-it',
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).not.toBeChecked()
      expect(child2).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(8)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: false,
          child2: 'custom-off',
          parent: 'you-name-it',
        }),
        expect.anything()
      )
    })
  })

  describe('with propagateIndeterminateState="auto"', () => {
    it('should handle dependencePaths state', async () => {
      const onChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onChange={onChange} onSubmit={onSubmit}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="auto"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: undefined,
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      await userEvent.click(child1)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: undefined,
          child3: undefined,
          parent: undefined,
        }),
        expect.anything()
      )

      expect(child1).toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: undefined,
        }),
        expect.anything()
      )

      await userEvent.click(child1)

      expect(child1).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child2)

      expect(child2).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(child3)

      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)
      expect(onChange).toHaveBeenCalledTimes(6)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: true,
        }),
        expect.anything()
      )
    })

    it('should set/toggle state of its parent', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            propagateIndeterminateState="auto"
            path="/parent"
          />
          <Field.Toggle
            path="/child1"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child2"
            valueOn="checked"
            valueOff="unchecked"
          />
          <Field.Toggle
            path="/child3"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Handler>
      )

      const [parent, child1, child2, child3] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(child3).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'checked',
          child2: 'checked',
          child3: 'checked',
          parent: true,
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(child3).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(10)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: 'unchecked',
          child2: 'unchecked',
          child3: 'unchecked',
          parent: false,
        }),
        expect.anything()
      )
    })

    it('should accept custom valueOn and valueOff value', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2']}
            propagateIndeterminateState="auto"
            valueOn="what-ever"
            valueOff="you-name-it"
            path="/parent"
          />
          <Field.Boolean path="/child1" />
          <Field.Toggle
            path="/child2"
            valueOn="custom-on"
            valueOff="custom-off"
          />
        </Form.Handler>
      )

      const [parent, child1, child2] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(child1)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent).not.toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).toBeChecked()
      expect(child2).toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: true,
          child2: 'custom-on',
          parent: 'what-ever',
        }),
        expect.anything()
      )

      await userEvent.click(child2)

      expect(child1).toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent).toBeChecked()
      expect(parent.indeterminate).toBe(true)

      await userEvent.click(parent)

      expect(child1).not.toBeChecked()
      expect(child2).not.toBeChecked()
      expect(parent.indeterminate).toBe(false)

      expect(onChange).toHaveBeenCalledTimes(8)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          child1: false,
          child2: 'custom-off',
          parent: 'you-name-it',
        }),
        expect.anything()
      )
    })
  })

  it('should support required property', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Indeterminate
          dependencePaths={['/child1', '/child2']}
          propagateIndeterminateState="auto"
          valueOn="what-ever"
          valueOff="you-name-it"
          path="/parent"
          required
        />
        <Field.Boolean path="/child1" />
        <Field.Toggle
          path="/child2"
          valueOn="custom-on"
          valueOff="custom-off"
        />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const [parent, child1] = Array.from(document.querySelectorAll('input'))

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(child1)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(parent)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should change internal required state when indeterminate state changes', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Indeterminate
          dependencePaths={['/child1', '/child2']}
          propagateIndeterminateState="auto"
          valueOn="what-ever"
          valueOff="you-name-it"
          path="/parent"
          required
        />
        <Field.Boolean path="/child1" />
        <Field.Toggle
          path="/child2"
          valueOn="custom-on"
          valueOff="custom-off"
        />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const [, child1, child2] = Array.from(
      document.querySelectorAll('input')
    )

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(child1)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.click(child2)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
