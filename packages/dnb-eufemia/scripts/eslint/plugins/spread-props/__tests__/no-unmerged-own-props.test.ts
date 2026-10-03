import { RuleTester } from 'eslint'
import rule from '../rules/no-unmerged-own-props'

const tester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

tester.run('no-unmerged-own-props', rule, {
  valid: [
    // The handler is taken out of the rest, so the spread cannot contain it
    {
      code: `
        function Comp(props) {
          const { onClick, ...rest } = props
          return <button onClick={handleClick} {...rest} />
        }
      `,
    },
    // className is taken out of the rest and joined
    {
      code: `
        function Comp({ className, ...rest }) {
          return <div className={clsx('dnb-comp', className)} {...rest} />
        }
      `,
    },
    // The handler is taken out in the outer component and used in a nested callback
    {
      code: `
        function Comp(props) {
          const { onFocus, ...attributes } = props
          const render = () => <input onFocus={handleFocus} {...attributes} />
          return render()
        }
      `,
    },
    // Merged props are not reported
    {
      code: `
        function Comp(props) {
          const { myParam, ...rest } = props
          return <button {...mergeProps({ onClick: handleClick }, rest)} />
        }
      `,
    },
    // Spreads of objects that are not destructured consumer props are not reported
    {
      code: `
        function Comp(props) {
          const params = { role: 'button' }
          return <div onClick={handleClick} {...params} />
        }
      `,
    },
    // Props that are not DOM event handlers, className or style are ignored
    {
      code: `
        function Comp({ children, ...rest }) {
          return <Group onInit={handleInit} {...rest} />
        }
      `,
    },
    // An own value set after the spread that already includes the given one
    {
      code: `
        function Comp(props) {
          return <ul {...props} className={clsx('dnb-ul', props.className)} />
        }
      `,
    },
    // The prop is taken out in an earlier destructuring of the same rest
    {
      code: `
        function Comp(props) {
          const { onSubmit, ...attributes } = props
          const { onClick, ...buttonAttributes } = attributes
          return <Button {...buttonAttributes} onSubmit={handleSubmit} />
        }
      `,
    },
    // The rest of a locally built object is not the consumer's props
    {
      code: `
        function Comp(props) {
          const helperParams = {}
          const { onFocus, ...restHelperParams } = helperParams
          return <input {...restHelperParams} onChange={handleChange} />
        }
      `,
    },
    // An own value set after the spread that passes the same prop on from elsewhere
    {
      code: `
        function Comp() {
          const { props, htmlAttributes } = useFilteredProps()
          const { className } = props
          const { ref, ...inputAttributes } = htmlAttributes
          return (
            <Input
              {...inputAttributes}
              className={clsx('dnb-input-masked', className)}
            />
          )
        }
      `,
    },
    // An own handler set after the spread always wins, which fits a props type that omits it
    {
      code: `
        const Comp = ({ help, ...rest }) => {
          return <Button {...rest} onKeyDown={handleKeyDown} />
        }
      `,
    },
    // An own handler set after a spread of a prop bag
    {
      code: `
        function Comp({ buttonProps }) {
          return <Button {...buttonProps} onClick={handleClick} />
        }
      `,
    },
    // A destructured prop that is not a prop bag
    {
      code: `
        function Comp({ data }) {
          return <div onClick={handleClick} {...data} />
        }
      `,
    },
    // A fallback between objects that are not the consumer's props
    {
      code: `
        function Comp(props) {
          const params = { role: 'button' }
          const buttonProps = params || {}
          return <Button onClick={close} {...buttonProps} />
        }
      `,
    },
    // A locally built object kept in a local is not the consumer's props
    {
      code: `
        function Comp(props) {
          const params = { role: 'button' }
          const buttonParams = params
          return <div onClick={handleClick} {...buttonParams} />
        }
      `,
    },
  ],
  invalid: [
    // A given onClick replaces the component's own
    {
      code: `
        function Comp({ children, ...rest }) {
          return <button onClick={handleClick} {...rest} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'onClick', spread: 'rest' },
        },
      ],
    },
    // A given className removes the component's own
    {
      code: `
        function Comp(props) {
          const { children, ...rest } = props
          return <div className="dnb-comp" {...rest} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'className', spread: 'rest' },
        },
      ],
    },
    // The whole props object is spread after the own className
    {
      code: `
        function Comp(props) {
          return <Button className="dnb-comp" {...props} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'className', spread: 'props' },
        },
      ],
    },
    // A given handler in a prop bag replaces the component's own
    {
      code: `
        function Comp({ htmlAttributes, ...rest }) {
          return <input onChange={handleChange} {...htmlAttributes} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'onChange', spread: 'htmlAttributes' },
        },
      ],
    },
    // A prop bag destructured in the function body
    {
      code: `
        function Comp(props) {
          const { closeButtonAttributes } = props
          return <Button onClick={close} {...closeButtonAttributes} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'onClick', spread: 'closeButtonAttributes' },
        },
      ],
    },
    // A prop bag picked from a new and a deprecated prop name
    {
      code: `
        function Comp(props) {
          const { closeButtonProps, closeButtonAttributes } = props
          const buttonProps = closeButtonProps || closeButtonAttributes
          return <Button onClick={close} {...buttonProps} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'onClick', spread: 'buttonProps' },
        },
      ],
    },
    // A given style replaces the component's own
    {
      code: `
        function Comp({ open, ...rest }) {
          return <div style={firstPaintStyle} {...rest} />
        }
      `,
      errors: [
        { messageId: 'replaced', data: { name: 'style', spread: 'rest' } },
      ],
    },
    // Reading the given value before the spread does not help, the spread still replaces it
    {
      code: `
        function Comp({ open, ...rest }) {
          return <div style={{ ...firstPaintStyle, ...rest.style }} {...rest} />
        }
      `,
      errors: [
        { messageId: 'replaced', data: { name: 'style', spread: 'rest' } },
      ],
    },
    // The rest of the consumer's props kept in a local, narrowed with `as`
    {
      code: `
        function Comp({ children, ...rest }) {
          const props = rest as CompProps
          return <div onDrop={handleDrop} {...props} />
        }
      `,
      errors: [
        {
          messageId: 'replaced',
          data: { name: 'onDrop', spread: 'props' },
        },
      ],
    },
  ],
})
