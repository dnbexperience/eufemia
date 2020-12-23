/**
 * Web GlobalError Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  registerElement,
  processChildren
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'
import Button from '../button/Button'
import H1 from '../../elements/H1'
import P from '../../elements/P'

export default class GlobalError extends React.PureComponent {
  static tagName = 'dnb-global-error'
  static contextType = Context

  static propTypes = {
    status: PropTypes.string,

    status_content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    back: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    href: PropTypes.string,
    alt: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),

    class: PropTypes.string
  }

  static defaultProps = {
    status: null,
    status_content: null,
    back: 'Tilbake',

    title: null,
    text: null,
    href: null,
    alt: null,

    className: null,
    children: null,

    class: null
  }

  static enableWebComponent() {
    registerElement(
      GlobalError.tagName,
      GlobalError,
      GlobalError.defaultProps
    )
  }
  static getContent(props) {
    return processChildren(props)
  }

  backHandler = (e) => {
    const count = this.hasHistory()
    try {
      if (!this.props.href && count) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)

        // Try forward first, because
        // const tmp = window.location.href
        // window.history.forward()
        // if (tmp === window.location.href) {
        // }

        window.history.back()
      }
    } catch (e) {
      warn(e)
    }
  }

  getHref() {
    return this.props.href || (this.hasHistory() ? '#' : '/')
  }

  hasHistory = () => {
    return typeof window !== 'undefined' &&
      window.history &&
      /**
       * browser (Chrome) to add more to the history if you:
       *
       * 1. first visit
       * 2. head back
       * 3. head forward again, suddenly there are 3 values in the history
       */
      window.history.length > 2
      ? window.history.length
      : false
  }

  render() {
    const {
      status,
      back,
      href, // eslint-disable-line

      status_content: _status_content, // eslint-disable-line
      title: _title, // eslint-disable-line
      text: _text, // eslint-disable-line
      className,
      class: _className, // eslint-disable-line

      ...attributes
    } = this.props

    let {
      status_content,
      title: useTitle,
      text: useText,
      alt: useAlt
    } = this.props

    if (useTitle) {
      useTitle = renderOrNot(useTitle)
    }
    if (useText) {
      useText = renderOrNot(useText)
    }

    if (typeof status_content === 'string' && status_content[0] === '{') {
      status_content = JSON.parse(status_content)
    }

    if (status_content === null) {
      const {
        translation: { GlobalError: contextContent }
      } = this.context
      status_content = contextContent
    }

    if (status_content && status_content[status]) {
      let { title, text, alt } = status_content[status]
      if (!useTitle && useTitle !== '') {
        useTitle = title
      }
      if (!useText && useText !== '') {
        useText = text
      }
      if (!useAlt && useAlt !== '') {
        useAlt = alt
      }
    }

    if (typeof useText === 'string' && /\[/.test(useText)) {
      try {
        let parts = useText.split(/\[(.*)\](\(\/back\))/g)
        if (parts.length > 1) {
          const backIndex = parts.findIndex((v) => /\/back/.test(v))
          if (backIndex !== -1) {
            // the first one will be
            parts[backIndex - 1] = (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className="dnb-anchor"
                href={this.getHref()}
                onClick={this.backHandler}
              >
                {parts[1]}
              </a>
            )

            useText = parts
              .filter((v) => v && !/\/back/.test(v))
              .map((c, i) => <React.Fragment key={i}>{c}</React.Fragment>)
          }
        }
      } catch (e) {
        warn(e)
      }
    }

    const textParams = {}
    if (typeof useText === 'string') {
      textParams.dangerouslySetInnerHTML = { __html: useText }
    } else {
      textParams.children = useText
    }
    const additionalContent = GlobalError.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-global-error',
        `dnb-global-error--${status}`,
        createSpacingClasses(this.props),
        className,
        _className
      ),
      ...attributes
    }

    return (
      <div {...params}>
        <div className="dnb-global-error__inner">
          {(typeof back === 'string' && (
            <Button
              className="dnb-global-error__back"
              variant="tertiary"
              icon="chevron_left"
              icon_position="left"
              text={back}
              href={this.getHref()}
              on_click={this.backHandler}
            />
          )) ||
            back}
          <Svg
            status={this.props.status}
            title={useAlt}
            role="presentation"
            className="dnb-global-error__gfx"
          />
          <div className="dnb-global-error__inner__content">
            <H1 top="4" bottom="large">
              {useTitle}
            </H1>
            <P bottom="large" {...textParams} />
          </div>
          {additionalContent}
        </div>
      </div>
    )
  }
}

const renderOrNot = (C) => (typeof C === 'function' ? C() : C)

const Svg = ({ status, ...props }) => {
  switch (parseFloat(status)) {
    case 404:
    default:
      return <Svg404 {...props} />
    case 500:
      return <Svg500 {...props} />
  }
}
Svg.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
}

const Svg404 = ({ title, ...props }) => (
  <svg
    width="339"
    height="360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{title}</title>
    <path
      d="M104 96s6 16 5 21c0 6 13 4 22-8 9-11-26-14-26-14l-1 1z"
      fill="#00313B"
    />
    <path
      d="M235 282l-15-1-10-63-6-26-5 88-26-24s-3-69-2-90l3-26 10-2 23-27 5 9 3 5 4 5 1-1c7 8 15 18 14 42 0 15-6 60-6 60l7 51z"
      fill="#35AD80"
    />
    <path
      d="M257 87l-12-2V74l13 2-1 11zM111 247c-18-3-38-6-57-2-18 4-37 15-47 33-10 19-9 45 5 60 7 7 17 10 27 11 29 4 58-6 87-7 48 0 95 28 142 14 16-5 30-12 45-22 9-6 19-15 24-26 6-15-2-33-14-42s-27-11-41-12c-15-1-30-1-43-7"
      fill="#A5E1D2"
    />
    <path
      d="M65 288v-1c0-3-2-6-6-6-1-2-3-3-5-3-3 0-5 2-6 4l-2-1c-3 0-6 3-6 6 0 4 3 6 6 6h1c1 2 3 2 5 2s4 0 6-2h9l1-2-3-3z"
      fill="#fff"
    />
    <path d="M181 193L59 180l53-31h1l109 11" fill="#00313B" />
    <path d="M220 279l-41 35 2-122 42-32-2 117-1 2z" fill="#12555A" />
    <path
      d="M239 189l-17-29-41 32 20 29c1 1 2 2 3 1l35-29v-4z"
      fill="#007272"
    />
    <path d="M179 314L64 299v-1l-5-118 122 12-2 122z" fill="#00313B" />
    <path
      d="M181 192l-14 35-3 2-121-15c-2 0-2-2-1-3l17-31 122 12z"
      fill="#12555A"
    />
    <path d="M275 246l-76-11 29-18 2-1 63 8" fill="#007272" />
    <path d="M292 290l-18 28 1-72 18-22-1 65v1z" fill="#12555A" />
    <path d="M274 318l-74-11s-20 16-18 17l74 10 18-16z" fill="#007272" />
    <path d="M274 318l-74-11-1-72 76 11-1 72z" fill="#00313B" />
    <path
      d="M275 245l-12 25-2 1-73-11c-1 0-2-1-1-2l12-23h1l75 10zM136 104c4-23 28-32 30-32 11-3 9 8 13 8 9 2 21 10 29 26l8 16 5 8-14 11c-5 4-12 7-20 8l-15-1v-2c1-4 1-7-2-11l-1-2-2 1c-8 4-16-1-20-7l-4-8s-9-4-7-15z"
      fill="#007272"
    />
    <path
      d="M166 72l39-8h8l35 9 1 2-1 9-1 1-24-1c-2 0-13-2-14-1l-25 8M129 126v36l-5 24 14 2 9-29h1l7-41-14-18-6 2c-6 6-6 16-6 24z"
      fill="#007272"
    />
    <path
      d="M267 84c-5 5-12 5-15 0-3-4 0-14 6-13 5 1 10-5 13-2 3 4 1 11-4 15zM163 94c3 6 3 12-3 16-4 4-11 4-15-3-4-5-5-15 0-18 6-3 11-5 18 5z"
      fill="#A5E1D2"
    />
    <path
      d="M129 71c4 1 5 4 8 6l10 3c5 2 6 8 5 13s-4 9-6 10l-6-2c-2 12-16 11-26 5-13-7-15-13-11-25 3-7 13-13 26-10z"
      fill="#A5E1D2"
    />
    <path
      d="M138 72c-3-6-9-11-19-11-19-1-29 19-23 32 0 0 0 5 4 7 3 2 7 0 10-2 2-3 4-5 7-6l4-3c5-5 8-13 10-10 7 9 12 17 16 4 1-4-7-8-9-11z"
      fill="#00313B"
    />
    <path
      d="M128 74s7 15 7 20c0 6 12 5 18-7 2-4-21-22-21-22l-4 9z"
      fill="#00313B"
    />
    <path
      d="M133 89c-3 2-7 0-10-3-2-4-2-8 0-10 3-1 7 0 9 4 2 3 3 8 1 9z"
      fill="#A5E1D2"
    />
    <path
      d="M312 2c-3-3-7-2-10 0l-1-1c-4-1-7 2-7 5-3 2-4 6-2 9s6 4 9 1l2 1 4-2c2-1 3-4 3-6l2-3V2zM31 133c2-3 7-2 10-1h1c3-2 6 1 7 4 3 1 5 5 3 8s-6 4-9 2h-2c-2 1-3 0-4-1-2-1-4-3-3-6l-3-2v-4zM212 351l-1-1c1-1 0-3-1-4-2-2-5-3-8-3a7 7 0 0 0-5 5h-1c-2-1-4 0-5 1h-2c-3 0-4 1-4 4 0 2 1 4 3 4h1l5 1c1 2 7 3 8 0 0 0 4 2 8 1 3-2 4-5 2-8z"
      fill="#fff"
    />
    <path
      d="M227 283l1-1 1-3c2-3 6-3 8-2 2 0 2 1 3 2l1 3 1-1 5 2h2c2 0 4 2 3 4 0 2-2 4-4 4h-5c-1 1-3 2-5 1-3-2-6-1-10-2-3 0-3-5-1-7z"
      fill="#12555A"
    />
    <path
      d="M146 304c-2-2-5-4-9-4-3 1-5 2-6 4l-3-1c-3 1-6 4-5 8 0 3 3 5 7 5h2l6 2 5-2 4 1a6 6 0 0 0-1-13z"
      fill="#fff"
    />
    <path d="M197 90l-13 1 10-3a232 232 0 0 0 3 2z" fill="#12555A" />
    <path
      d="M326 264c-2 0-5 2-6 4-2 0-4 2-4 4 0 3 2 4 5 4h5c4 0 7-2 7-6 0-3-3-6-7-6z"
      fill="#fff"
    />
    <path
      d="M200 306l22-17-20 18h-2v-1zM250 299l4-2-4-2c-2 0-3 1-3 2s1 2 3 2z"
      fill="#12555A"
    />
    <path
      d="M105 43l-5-11c-1-2-4-1-3 1l7 11c0 1 2 0 1-1zM125 39l1-13c0-2-3-3-3-1v14h2zM147 33l-6 11c-1 1 0 2 1 1l8-10c1-2-1-3-3-2z"
      fill="#007272"
    />
    <path d="M112 101l4 9c0 2 5-2 5-2l-9-7z" fill="#A5E1D2" />
  </svg>
)
Svg404.propTypes = {
  title: PropTypes.string.isRequired
}

const Svg500 = ({ title, ...props }) => (
  <svg
    width="500"
    height="360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{title}</title>
    <path
      opacity=".4"
      d="M154.8 360c23.7 0 60-7 79.5-14.8 32.5-13 56.6-18.3 91-14.2 13.1 1.5 46.2 6.2 60.5 5.9 88.4-1.8 115.9-49 113.2-92.7-2.8-43.8-66.4-75.4-142.2-70.7-5.7.4-11.1.8-16.5 1.6-37 4.9-70.3 6.4-106.6-4.5a257 257 0 0 0-100.5-10.3C63.4 165.7-3.4 207.7.2 265.2 3.6 322.7 45.3 360 154.7 360z"
      fill="#A3DFD0"
    />
    <path
      d="M58.4 313.7c10.2 0 18.5-2.2 18.5-5 0-2.9-8.3-5.1-18.5-5.1-10.1 0-18.4 2.2-18.4 5 0 2.9 8.3 5.1 18.4 5.1zM91.5 313.7c6 0 11-2.2 11-5 0-2.9-5-5.1-11-5.1-6.2 0-11.1 2.2-11.1 5 0 2.9 5 5.1 11 5.1z"
      fill="#A3DFD0"
    />
    <path
      d="M237.2 75l.9-7.8 6.4 1 3.4.4s1.4.3 2.1-.8c.8-1.1 2.4-4.5 2.8-7.3.3-3 32.8 23 32.8 23s-38.7-1.4-42.4-3.6a34 34 0 0 1-6-5z"
      fill="#2BB280"
    />
    <path
      d="M269 97.9c-4.5 8-26.2 23.4-35.2 21.7-7.3-1.4-9.3-5.4-9.2-27.6.1-30 13.8-13.7 21.1-12.4 4.9.9 21.4 2 25.3 4.7 1.9 1.4-1.4 12.6-2 13.6z"
      fill="#00343D"
    />
    <path
      d="M210.5 27.8c6 0 8.9 3.5 14 5.3 3.4 1.1 16.4 0 16.4 0 7.1 2 10.7 9.5 12 17.1 1.2 7.9-.9 17-3.8 18.3-1 .5-10.8-1.2-10.8-1.2-3 32-9.2 24.8-36 17.5-22.5-6-28.4-13.6-26.7-32.8 1-11.7 13.6-23.8 35-24.2z"
      fill="#A3DFD0"
    />
    <path
      d="M223.9 26c-6.6-6.5-18-12-31.8-8.7-28.7 6.8-35.3 35.4-21.8 51.3 0 0 3 8.4 8.8 8.9 4 .4-.5-3.6 9.2-8 2.7-1 6.6-2 8.9-3.9a26 26 0 0 0 6.5-7.1c.4-1.1 3 0 4.3-.1 2.2-.1 6.1-.4 5.4-4.3-.2-1.3-6.8-6.2-6.5-7.3 1-6 2.5-10 10.7-6.6 12.1 5 17-2.1 17-5.7 0-2.5-4.7-2-5.5-3.1-1.2-1.6-3.2-3.3-5.2-5.4z"
      fill="#00343D"
    />
    <path
      d="M229.3 31.4S194.8 45.6 178.8 74l-5 8.8s-4.5 3-2.1-8.7c0 0-26.4-32 2.6-55 29.8-23.5 51.6 8 51.6 8s8.9-1.3 7.4 1.6c-1 1.7-4 2.6-4 2.6z"
      fill="#017272"
    />
    <path
      d="M194.5 80.3s10 11.4 12 14c2 2.6 7.3-6.9 7.3-6.9l-19.3-7.1z"
      fill="#A3DFD0"
    />
    <path
      d="M180.1 19.5h-.2c-1.5 0-2.8-1.2-3.5-3a14.4 14.4 0 0 1 .8-11.5c1.2-1.8 2.6-2.8 4-2.7 1.5.1 2.7 1.3 3.5 3.1a14.4 14.4 0 0 1-.9 11.5c-.8 1.8-2.2 2.6-3.7 2.6zm1-14.5c-.4 0-1 .4-1.5 1.2-.7 1.1-1.1 2.7-1.2 4.5-.1 1.8 0 3.4.4 4.6.4.9.9 1.5 1.3 1.5.3 0 1-.5 1.5-1.2.6-1.1 1-2.7 1.2-4.5 0-1.8-.1-3.4-.7-4.6-.2-.9-.6-1.5-1-1.5z"
      fill="#017272"
    />
    <path
      d="M172 23.1h-1.2c-4.9-.4-8.4-2.9-8.2-5.6 0-1.5 1.2-2.8 3-3.5 1.7-.7 3.8-.9 5.9-.8 4.9.4 8.5 3 8.3 5.7-.1 1.5-1.3 2.7-3.1 3.5-1.3.4-2.9.7-4.6.7zm-1.6-7.4c-1.4 0-2.7.3-3.6.6-.9.4-1.5.9-1.5 1.3-.1.8 2.2 2.5 5.7 2.7 1.8 0 3.4-.1 4.6-.5.9-.4 1.5-.8 1.5-1.2.1-.8-2.2-2.5-5.7-2.7l-1-.2z"
      fill="#017272"
    />
    <path
      d="M220.4 50.7c2.4-3.7 0-9.6-5.4-13.2-5.4-3.6-11.8-3.5-14.2.3-2.5 3.7-.1 9.6 5.3 13.2 5.4 3.6 11.8 3.5 14.3-.3zM186.6 94a49 49 0 0 1 18.8 6.5c3 2 4.7 4.2 4.3 6.2-.8 5-12.3 7-26 5-13.6-2.2-24-8-23.2-12.8 1-4.9 12.6-7 26.1-4.9z"
      fill="#A3DFD0"
    />
    <path
      d="M198 104.2l-.6-.1-.7-.4c-.4-.3-.5-.3-1.5-.6-.8-.3-1.1-1-.9-1.8.3-.8 1-1.2 1.8-.9l2 .8.6.4c.6.3.8 1 .6 1.7-.2.7-.8.9-1.3.9zM167.5 101.7c-.4 0-.8-.2-1-.6-.5-.7-.2-1.5.4-1.9 3.2-2 11-2.3 19.2-1.1 1.1 0 2.2.4 3.2.6.7.1 1.2.9 1 1.6 0 .8-.8 1.3-1.6 1-1-.2-2.2-.3-3.1-.6-8.3-1.4-15-.7-17.3.8a1 1 0 0 1-.8.2z"
      fill="#fff"
    />
    <path
      d="M194.2 114.5c-3.4 0-7-.2-10.7-.8-13.2-2.2-26-8-24.8-15 1.1-7.1 15-8.6 28.3-6.5 8 1.3 15 3.8 19.8 7 4.9 3.1 5.4 6.1 5 8.2-.8 4.9-8.4 7.1-17.6 7.1zm-17.6-19.2c-8.3 0-13.5 2-13.9 4-.4 2.7 7.8 8.3 21.5 10.3 13.7 2.3 23.2-.3 23.7-3 0-1.2-1.1-2.8-3.5-4.3a50 50 0 0 0-18-6.2c-3.6-.6-7-.8-9.8-.8z"
      fill="#00313B"
    />
    <path d="M210.1 106l-.4 3.1 9.7 1.5.5-3.2-9.8-1.4z" fill="#00313B" />
    <path
      d="M253 118.4h-.6l-33-5.5c-2-.3-3.4-2.2-3.1-4.3.3-2 2.2-3.5 4.3-3l33 5.4c2 .3 3.4 2.2 3.1 4.3a3.7 3.7 0 0 1-3.7 3z"
      fill="#017272"
    />
    <path
      d="M249.2 111.8c.5-5.7-5-10.8-12.1-11.3-7.2-.6-13.3 3.6-13.8 9.3-.4 5.7 5 10.7 12.2 11.3 7.1.6 13.3-3.6 13.7-9.3z"
      fill="#A3DFD0"
    />
    <path
      d="M283.3 178.1l-5.5 8.4 20 8.8 6.6-11.2-21-6zM418.2 169.2l8.3 10.2s12.2-3.4 15.3-9l-6.4-10"
      fill="#2BB280"
    />
    <path
      d="M323.5 89L295 122.9c-.7.8-1.2 1.6-1.4 2.5L279 171.1a8 8 0 0 0 2 7.9c4.7 4.3 13.8 11 23.6 9.5a7.6 7.6 0 0 0 5.7-4.5l17.6-40.4c.4-.9 1-1.6 1.6-2.4l22.7-22.2c3-3 7.9-2.9 10.7.3l48.2 52a7.6 7.6 0 0 0 6.5 2.3c4.2-.5 11.4-2.3 18-7.7 3-2.6 3.7-6.8 1.6-10L404 104.4a7.9 7.9 0 0 1-.3-8l4.6-8a7.5 7.5 0 0 0-7.5-11.2l-73.1 9.2c-1.4.2-3 1-4.3 2.6z"
      fill="#00343D"
    />
    <path
      d="M235 29.8s12-28 41.2-29.5c29.2-1.6 42.4 4.7 81 1.8 36.2-3 43.6 9.6 50.4 22.6 5.8 10.7 11.2 43.3 14.5 54a8 8 0 0 1-1 6.8l-43.8 63a4 4 0 0 1-6.4.5l-48.2-57.8 6.1-11.7s-16.3 2.3-40.6 4.8c-3.2.4-6.8-3.3-9.9-4"
      fill="#017272"
    />
    <path
      d="M233.7 35c-.4-2.1-2.4-2.7-2.4-2.7 1.5-1.5 3.4-4.7 5.4-6.8 1.4-1.4 6.6-1.5 11-2.3 1.1 0 2 0 2.2 1 1.5 7.3 10 29 10.8 28 1-.8 3-3.5 6.4-7.2 1.5-1.4 3-.3 3 .8.9 6.5 8.7 28.7 23.8 37.7.9.5-5 1.2-6 1-15-4-42.6-25.3-57-43.8.2-.3 3.3-2.4 2.8-5.6z"
      fill="#12555A"
    />
    <path
      d="M276.4 85.8s-19.5 2.4-26 2c-11.1-1-15.8-2.4-15.8-2.4a40 40 0 0 0 2.6-11v-.1s5.3 3.2 13.9 5.3c3.8 1 15 2.2 19 2.3l12.2.8 6.5.4s3-1.1 3.8-.6c1.5 1 3.9 1.2 3.9 1.2l-20.1 2.1z"
      fill="#12555A"
    />
    <path
      d="M332.4 109c1-6.5-4.3-12.7-11.8-13.7-7.5-1.1-14.3 3.3-15.2 9.9-1 6.5 4.3 12.6 11.8 13.7 7.5 1 14.3-3.3 15.2-9.9z"
      fill="#A3DFD0"
    />
    <path
      d="M333 17.8l25.4 10-22.5 73.3s-5 3-13.6 1.5c-10.9-1.9-11.4-7.3-11.4-7.3l12.9-45-32.2-12.9"
      fill="#017272"
    />
    <path
      d="M312.8 68.7c.6-10-5-15-13.4-20.8l-4-2.9-6.5-4.6 33.4 9.1c.8.4 1.4 1.5 1 2.3L315 81.3l-4.2.5 2-13zM331.8 102.4c2.7-.7 4-1.4 4-1.4l19.4-62.7c1.9-5.9-1.5-12.7-7.3-15.3-3-1.2-12.1-5.4-12.1-5.4s7.3 2.1 12.5 3.4c7.3 2 12.6 10.1 9.7 18l-20.6 69.5-5.6-6.1z"
      fill="#12555A"
    />
    <path
      d="M277.5 182.2c.4-.8 1.2-1.3 2-1 1.6.6 3.4 1.5 3.5 3 .3 1.6-.8 2.4-.8 2.4 3.5 3.7 7.5 6.2 16.2 6 .6 0 1 .4 1.2.8.6 3.4 1.6 14.5-8.7 19.5l-21.4-9.5s-10 .8-18.4-4.3c-12.6-7.6-14.9-13.4-15-15 0-.8.4-2.8 1.2-3.5 2.3-2 3.8-3.2 11.6-.7 2.5.8 8.3 3.1 8.8 3.2 6.2 1 9.2 1.1 13 .8 3.4.1 6.1-.5 6.8-1.7z"
      fill="#017272"
    />
    <path
      d="M289 216.7l-21-9.3 1.6-3.8 21.4 9.5-1.5 3.4c0 .2-.3.2-.4.2z"
      fill="#12555A"
    />
    <path
      d="M236.2 183.8s1.5 10.2 28.8 19c1 .3 3.5.6 4.6.8l-6.2 1.5c-3.8-.8-26.5-8.4-27.2-21.3z"
      fill="#12555A"
    />
    <path
      d="M419.8 179.9c-.4-.8-.3-1.9.5-2.5 1.5-1 3.1-2 4.5-1.3 1.5.8 1.5 2.2 1.5 2.2 5-.8 11.4-3.1 13.7-9.5.3-.7.8-1 1.4-.8 3.4 1 13.6 5 12.3 18L433.2 199c0 .3-3.5 9.7-13 10.2-20 .9-21.4-.8-22.2-1.8a2 2 0 0 1-.5-1.3c-.1-1-1.4-5.4 5.8-9.6 3.2-2 8.3-2 8.3-2 4.9-5.1 4.9-5.4 6.8-8.5 1.6-2.6 2-4.8 1.4-6z"
      fill="#017272"
    />
    <path
      d="M455.2 190.1l-19.1 12.4-2.8-3.6 20.5-12.7 1.8 3c.1.2 0 .7-.4 1z"
      fill="#12555A"
    />
    <path
      d="M397.9 207s6.4 5 28.3-.4c1.1-.3 4.9-4.3 7.2-7.9 0 0-3.6 9.5-5.8 10.3a51.1 51.1 0 0 1-21.8 1.7c-2.8-.2-5.5-1-7.4-3.2-.3-.1-.5-.3-.5-.5z"
      fill="#12555A"
    />
    <path
      d="M300.8 79.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM347.6 111.6a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM362 127a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
      fill="#00343D"
    />
    <path
      d="M232 305.4h-3c-4.2-.3-5.8-2.8-5.4-6 .4-3.6 3.8-5.7 7.1-5.7l-3-35.8c-.4-4.2 12.4-6 16.4-5.1 4 .8 6.9 4.9 5.7 8.7-10.2 35.2-10.2 38.1-11.5 40.8-1.4 3-3.3 3-6.3 3zM111.7 307.1h-1.2c-4-.2-4.6-2.2-4.6-5.6 0-3 4.2-5 7.7-5.6 1.7-6.2-.9-23.8.3-36 .4-4.1 8-6 12.2-5 4 .8 6.6 4.7 5.7 8.7-7.7 37.1-9.3 38.7-11 40.5-2.6 2.5-6.5 3-9.1 3z"
      fill="#12555A"
    />
    <path
      d="M149.5 249.8c0 12.6-8.5 25.2-21 25.2-12.7 0-27-11.1-27-23.7s12.3-24.5 25.1-24.5a22.8 22.8 0 0 1 22.9 23z"
      fill="#017272"
    />
    <path
      d="M127.7 227a65.4 65.4 0 0 0 20 3.4 158 158 0 0 0 57.7 2.6c15.8-2.2 29.6-6.5 41.8-6.2 12.1.3-11.5 40.7-11.5 40.7S194 288 130.5 271.3c-51.6-13.3-2.8-44.4-2.8-44.4z"
      fill="#017272"
    />
    <path
      d="M106.9 265.3c0 7.3-3.6 13.8-9.2 17.9-3.5 2.5-7.7 7.7-16.2 18.4-5.4 6.8-14.5.8-14.1-1.1 4.9-22.7-3.9-21.5-3.9-34.4 0-11.9 9.7-22.5 21.8-22.5 12 0 21.6 9.7 21.6 21.7z"
      fill="#017272"
    />
    <path
      d="M75.2 304.6V302a5 5 0 0 0-3.9-3.8 5.5 5.5 0 0 0-6.8 5.3c0 .8.2 1.6.4 2.3.1.3.3.5.7.7h7c1 0 2.2-.7 2.6-1.9z"
      fill="#00343D"
    />
    <path
      d="M101 258.6a13.3 13.3 0 0 0-26.2-2.9c-.8 4.2.3 8.3 2.7 11.2 1.6 2 2.3 4.6 2.3 7.2a10.3 10.3 0 0 0 9.1 10 10.3 10.3 0 0 0 11-13c-.7-2.5-.7-5 .3-7.5.6-1.4.9-3.1.9-5z"
      fill="#12555A"
    />
    <path
      d="M81.3 244s13.4.3 33.8-14l2.5 33.7-12.1 6.5-1.6-7.5c0 .1.2-19.7-22.6-18.7z"
      fill="#017272"
    />
    <path
      d="M262.3 232.8s17.5 16.5 38.1 7.7c.7-.3 1 .4.7.8-8 6.5-29.8 21.2-43.3-3.8"
      fill="#12555A"
    />
    <path
      d="M270 249.8c0 12.6-7 28.6-15.7 28.6-12.6 0-30.1-16-30.1-28.6a22.9 22.9 0 0 1 22.8-22.9c12.8-.2 23 10 23 22.9zM134.4 310.3h-3.3c-4.2-.3-5.3-2.1-5.4-5.6-.1-3.5 4-5.5 6.4-5.8-1.8-7-9.9-20.6-15.2-32.7-1.6-3.7 3.8-8 7.7-9.3 3.8-1.2 18.3-2.9 19.4 1.2 2 6.4-2.7 19.8-2.7 25.8 0 14.5 1.9 17.7 1.9 19.4-.3 5-2.8 7-8.8 7z"
      fill="#017272"
    />
    <path
      d="M248.7 311c-1.5 0-2.2 0-3.5-.4-4-1.1-5-4.2-4-8 1-3 4.3-4.4 7.3-4.7-.4-5.2-1.8-10.6-3.4-18.2-.8-4 1.6-.7-9.7-12.7-2.7-3 17-10.5 21-10.3 4.2.3 8.8 4.3 8.3 8.3-5 37.7-5.4 41-6.5 42.9-2.5 3.3-6 3.1-9.5 3.1z"
      fill="#017272"
    />
    <path
      d="M185.8 234.5c-.9 1.8-1.4 4.2-1.2 6 .8 8.3 11.8 13.9 24.7 12.7 12.9-1.3 22.6-9 21.7-17.2-.3-2.7-1.5-5-3.5-6.8-7.7 1.5-16 3.2-24.7 4.5-5.6.6-11.2.6-17 .8zM149.5 253.3a7.9 7.9 0 1 0 0-15.8 7.9 7.9 0 0 0 0 15.8z"
      fill="#12555A"
    />
    <path
      d="M114.8 270.3s-.1.3-.3 0l-6.5-1h-.5v-.7c5.4-18.7-8.8-27.1-9.5-27.5l-1-.6s-.4-.1-.4-.5c0-.3.5-.5.5-.5l7-3c0-.2.2-.2.3 0 .5.3.7.4 1.3 1a30.3 30.3 0 0 1 9 32.8z"
      fill="#00343D"
    />
    <path
      d="M162.6 210c10.1 0 18.4-2.3 18.4-5 0-2.9-8.3-5.2-18.4-5.2-10.2 0-18.5 2.3-18.5 5.1s8.3 5 18.5 5zM195.6 210c6.1 0 11-2.3 11-5 0-2.9-4.9-5.2-11-5.2-6.2 0-11.1 2.3-11.1 5.1s5 5 11 5zM331.3 261.2c10.2 0 18.4-2.3 18.4-5.1s-8.2-5.1-18.4-5.1-18.5 2.3-18.5 5c0 2.9 8.3 5.2 18.5 5.2zM364.3 261.2c6.1 0 11-2.3 11-5.1s-4.9-5.1-11-5.1-11.1 2.3-11.1 5c0 2.9 5 5.2 11 5.2z"
      fill="#A3DFD0"
    />
    <path
      d="M201.7 48.2L185.5 31c-1.9-2-1.5-5.3.9-6.8l2.2-1.3c1.5-.8 3.5-.7 4.9.3l17 12.3s-6-2.7-10 2.4c-2.7 3.6.4 8 1.7 10l-.5.3z"
      fill="#12555A"
    />
    <path
      d="M196.9 37.1a3.6 3.6 0 1 0 0-7.1 3.6 3.6 0 0 0 0 7.1zM112.6 257.5a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2z"
      fill="#017272"
    />
    <path
      d="M113 256.2c-1 0-1.7-.8-1.8-1.8 0-1 .8-1.9 1.8-2 141.8-9.7 194.8-144.3 195.3-145.6.4-1 1.5-1.5 2.4-1.1 1 .4 1.5 1.5 1.1 2.3-.5 1.5-54.3 138.3-198.6 148l-.1.2z"
      fill="#2BB280"
    />
    <path
      d="M215.2 81c-1.9 1.6-3 5.3-1.5 7.8 1.6 2.7 6.2 2.3 6.8-.4 1.5-8.4 7.1-5.7 6.6-11.4-.3-2.3-.8 1-4.5 1.2-2.9.4-5.5 1.2-7.4 2.9z"
      fill="#00343D"
    />
  </svg>
)
Svg500.propTypes = {
  title: PropTypes.string.isRequired
}
