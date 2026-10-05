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

const replaced = (
  name: string,
  source: string,
  spread = `{...${source}}`
) => ({
  messageId: 'replaced',
  data: { name, spread, source },
})

const replacedRef = (source: string, spread = `{...${source}}`) => ({
  messageId: 'replacedRef',
  data: { spread, source },
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
    // Props that are not DOM event handlers, className, style or ref are ignored
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
    // The prop is taken out in an earlier destructuring, also through a fallback
    {
      code: `
        function Comp(props) {
          const { onClick, ...attributes } = props
          const { role, ...rest } = attributes || {}
          return <button onClick={handleClick} {...rest} />
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
    // The rest of an object built in useMemo or destructured directly is not the consumer's props
    {
      code: `
        function Comp() {
          const { a, ...memoized } = useMemo(() => ({ a: 1, role: 'x' }), [])
          const { b, ...literal } = { b: 1, role: 'x' }
          return (
            <>
              <div className="dnb-comp" {...memoized} />
              <div className="dnb-comp" {...literal} />
            </>
          )
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
    // A bag of data or aria attributes cannot hold own props
    {
      code: `
        function Comp({ dataAttributes, ...rest }) {
          return <div className="dnb-comp" {...dataAttributes} {...rest} className="x" />
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
    // An own handler set after the spread inside an object that is spread into an element
    {
      code: `
        function Comp({ children, ...attributes }) {
          const inputParams = { ...attributes, onKeyDown: handleKeyDown }
          return <input {...inputParams} />
        }
      `,
    },
    // The handler is taken out of the rest that the object spreads
    {
      code: `
        function Comp(props) {
          const { onKeyDown, ...attributes } = props
          const inputParams = { onKeyDown: handleKeyDown, ...attributes }
          return <input {...inputParams} />
        }
      `,
    },
    // An object that is not spread into an element is not checked
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = { onClick: handleClick, ...rest }
          useParams(params)
          return <div />
        }
      `,
    },
    // An own prop in an object is set again after it on the element
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = { className: 'dnb-comp', ...rest }
          return <div {...params} className={clsx('dnb-comp', rest.className)} />
        }
      `,
    },
    // One branch sets the own prop after the consumer's props, the other has none
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = isOpen ? { ...rest, onClick: handleClick } : rest
          return <div {...params} />
        }
      `,
    },
    // The rest of items built locally is not the consumer's props
    {
      code: `
        function Comp() {
          const items = [{ id: 1, role: 'listitem' }]
          return items.map(({ id, ...item }) => (
            <li key={id} className="dnb-comp__item" {...item} />
          ))
        }
      `,
    },
    // A given ref is taken out and combined with the own one
    {
      code: `
        function Comp({ ref, ...rest }) {
          const combinedRef = useCombinedRef(ref, elementRef)
          return <div ref={combinedRef} {...rest} />
        }
      `,
    },
    // An own ref set after the spread wins, which fits a props type that omits it
    {
      code: `
        function Comp({ children, ...rest }) {
          return <div {...rest} ref={elementRef} />
        }
      `,
    },
    // React passes no ref in the props of forwardRef and class components
    {
      code: `
        const Comp = forwardRef((props, ref) => <div ref={ref} {...props} />)
        const Other = forwardRef(({ children, ...rest }, ref) => (
          <div ref={ref} {...rest} />
        ))
        class Legacy extends React.Component {
          render() {
            return <div ref={this.elementRef} {...this.props} />
          }
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
      errors: [replaced('onClick', 'rest')],
    },
    // A given className removes the component's own
    {
      code: `
        function Comp(props) {
          const { children, ...rest } = props
          return <div className="dnb-comp" {...rest} />
        }
      `,
      errors: [replaced('className', 'rest')],
    },
    // The whole props object is spread after the own className
    {
      code: `
        function Comp(props) {
          return <Button className="dnb-comp" {...props} />
        }
      `,
      errors: [replaced('className', 'props')],
    },
    // A given handler in a prop bag replaces the component's own
    {
      code: `
        function Comp({ htmlAttributes, ...rest }) {
          return <input onChange={handleChange} {...htmlAttributes} />
        }
      `,
      errors: [replaced('onChange', 'htmlAttributes')],
    },
    // A prop bag destructured in the function body
    {
      code: `
        function Comp(props) {
          const { closeButtonAttributes } = props
          return <Button onClick={close} {...closeButtonAttributes} />
        }
      `,
      errors: [replaced('onClick', 'closeButtonAttributes')],
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
      errors: [replaced('onClick', 'buttonProps')],
    },
    // A given style replaces the component's own
    {
      code: `
        function Comp({ open, ...rest }) {
          return <div style={firstPaintStyle} {...rest} />
        }
      `,
      errors: [replaced('style', 'rest')],
    },
    // Reading the given value before the spread does not help, the spread still replaces it
    {
      code: `
        function Comp({ open, ...rest }) {
          return <div style={{ ...firstPaintStyle, ...rest.style }} {...rest} />
        }
      `,
      errors: [replaced('style', 'rest')],
    },
    // The rest of the consumer's props kept in a local, narrowed with `as`
    {
      code: `
        function Comp({ children, ...rest }) {
          const props = rest as CompProps
          return <div onDrop={handleDrop} {...props} />
        }
      `,
      errors: [replaced('onDrop', 'props')],
    },
    // An object kept in a local and spread into an element later
    {
      code: `
        function Comp(props) {
          const { onFocus, ...attributes } = props
          const inputParams = {
            className: 'dnb-comp__input',
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            ...attributes,
          }
          return <input {...(inputParams as Record<string, unknown>)} />
        }
      `,
      errors: [
        replaced('className', 'attributes', '...attributes'),
        replaced('onKeyDown', 'attributes', '...attributes'),
      ],
    },
    // An object literal spread directly into an element
    {
      code: `
        function Comp({ open, ...rest }) {
          return <div {...{ style: firstPaintStyle, ...rest }} />
        }
      `,
      errors: [replaced('style', 'rest', '...rest')],
    },
    // A destructured prop that is spread is a prop bag, whatever its name
    {
      code: `
        function Comp({ data }) {
          return <div onClick={handleClick} {...data} />
        }
      `,
      errors: [replaced('onClick', 'data')],
    },
    // A destructured prop bag with a default value
    {
      code: `
        function Comp({ postalCode = {} }) {
          return <Field className="dnb-comp__postal-code" {...postalCode} />
        }
      `,
      errors: [replaced('className', 'postalCode')],
    },
    {
      code: `
        function Comp(props) {
          const { buttonProps = {} } = props
          return <Button onClick={close} {...buttonProps} />
        }
      `,
      errors: [replaced('onClick', 'buttonProps')],
    },
    // A prop bag read from the props, directly or through a local
    {
      code: `
        function Comp(props) {
          const buttonProps = props.buttonProps
          return (
            <>
              <Button onClick={close} {...props.buttonProps} />
              <Button onClick={close} {...buttonProps} />
            </>
          )
        }
      `,
      errors: [
        replaced('onClick', 'props.buttonProps'),
        replaced('onClick', 'buttonProps'),
      ],
    },
    // The props of a class component
    {
      code: `
        class Comp extends React.Component {
          render() {
            return <div className="dnb-comp" {...this.props} />
          }
        }
      `,
      errors: [replaced('className', 'this.props')],
    },
    // Components wrapped in forwardRef or memo, or assigned to a member
    {
      code: `
        const Comp = forwardRef((props, ref) => <div className="dnb-comp" {...props} />)
        const Memoized = React.memo((props) => <div className="dnb-comp" {...props} />)
        List.Item = (props) => <li className="dnb-comp" {...props} />
      `,
      errors: [
        replaced('className', 'props'),
        replaced('className', 'props'),
        replaced('className', 'props'),
      ],
    },
    // A fallback or a condition in the spread itself
    {
      code: `
        function Comp({ closeButtonProps, closeButtonAttributes, ...rest }) {
          return (
            <>
              <Button onClick={close} {...(closeButtonProps || closeButtonAttributes)} />
              <div onClick={handleClick} {...(isOpen ? rest : {})} />
            </>
          )
        }
      `,
      errors: [
        replaced('onClick', 'closeButtonProps || closeButtonAttributes'),
        replaced('onClick', 'isOpen ? rest : {}'),
      ],
    },
    // The props merged with the context
    {
      code: `
        function Comp(ownProps) {
          const props = extendPropsWithContext(ownProps, defaultProps, context)
          return <div className="dnb-comp" {...props} />
        }
      `,
      errors: [replaced('className', 'props')],
    },
    // The rest of a locally built object that holds the consumer's props
    {
      code: `
        function Comp(externalProps) {
          const props = { ...defaultProps, ...externalProps }
          const { open, ...attributes } = props
          return <div onFocus={handleFocus} {...attributes} />
        }
      `,
      errors: [replaced('onFocus', 'attributes')],
    },
    // An own prop before a local object that spreads the consumer's props
    {
      code: `
        function Comp({ src, imgProps }) {
          const imageProps = { src, ...imgProps }
          return <Img className="dnb-comp__image" {...imageProps} />
        }
      `,
      errors: [replaced('className', 'imageProps')],
    },
    // An own prop in an earlier spread, inline or kept in a local
    {
      code: `
        function Comp({ children, ...rest }) {
          const ownParams = { onKeyDown: handleKeyDown }
          return (
            <>
              <input {...ownParams} {...rest} />
              <input {...{ onFocus: handleFocus }} {...rest} />
            </>
          )
        }
      `,
      errors: [replaced('onKeyDown', 'rest'), replaced('onFocus', 'rest')],
    },
    // An object built by useSpacing
    {
      code: `
        function Comp({ className, ...rest }) {
          const attributes = useSpacing(rest, {
            className: clsx('dnb-comp', className),
            onMouseEnter,
            ...rest,
          })
          return <span {...attributes} />
        }
      `,
      errors: [replaced('onMouseEnter', 'rest', '...rest')],
    },
    // An object built in useMemo
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = useMemo(() => ({ onClick: handleClick, ...rest }), [rest])
          return <div {...params} />
        }
      `,
      errors: [replaced('onClick', 'rest', '...rest')],
    },
    // An object spread into another object that is spread into an element
    {
      code: `
        function Comp({ children, ...rest }) {
          const ownParams = { onClick: handleClick }
          const params = { ...ownParams, ...rest }
          return <div {...params} />
        }
      `,
      errors: [replaced('onClick', 'rest', '...rest')],
    },
    // A ternary or an object assigned later
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = isOpen ? { onClick: handleClick, ...rest } : rest
          let laterParams = {}
          laterParams = { onFocus: handleFocus, ...rest }
          return (
            <>
              <div {...params} />
              <div {...laterParams} />
            </>
          )
        }
      `,
      errors: [
        replaced('onClick', 'rest', '...rest'),
        replaced('onFocus', 'rest', '...rest'),
      ],
    },
    // The props given to createElement, cloneElement or Object.assign
    {
      code: `
        function Comp({ children, ...rest }) {
          const params = Object.assign({ onFocus: handleFocus }, rest)
          return (
            <>
              {createElement('div', { onClick: handleClick, ...rest })}
              {cloneElement(children, { className: 'dnb-comp', ...rest })}
            </>
          )
        }
      `,
      errors: [
        replaced('onFocus', 'rest', 'Object.assign(…, rest)'),
        replaced('onClick', 'rest', '...rest'),
        replaced('className', 'rest', '...rest'),
      ],
    },
    // The rest passes on the given handler that was taken out
    {
      code: `
        function Comp({ onClick, ...rest }) {
          const attributes = { ...rest, onClick }
          return <button onClick={handleClick} {...attributes} />
        }
      `,
      errors: [replaced('onClick', 'attributes')],
    },
    // The rest of items given by the consumer
    {
      code: `
        function Comp({ items }) {
          return items.map(({ id, ...item }) => (
            <li key={id} className="dnb-comp__item" {...item} />
          ))
        }
      `,
      errors: [replaced('className', 'item')],
    },
    // DOM events of media, images, dialogs and pointer capture
    {
      code: `
        function Comp({ children, ...rest }) {
          return (
            <>
              <img onError={handleError} onLoad={handleLoad} {...rest} />
              <dialog onClose={handleClose} {...rest} />
              <div onScrollEnd={handleScrollEnd} onGotPointerCapture={handleCapture} {...rest} />
            </>
          )
        }
      `,
      errors: [
        replaced('onError', 'rest'),
        replaced('onLoad', 'rest'),
        replaced('onClose', 'rest'),
        replaced('onScrollEnd', 'rest'),
        replaced('onGotPointerCapture', 'rest'),
      ],
    },
    // A given ref replaces the component's own, as React passes ref as a prop
    {
      code: `
        function Comp({ children, ...rest }) {
          return <input ref={inputRef} {...rest} />
        }
      `,
      errors: [replacedRef('rest')],
    },
  ],
})
