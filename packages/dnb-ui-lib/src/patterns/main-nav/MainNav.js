/**
 * Web MainNav Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-main-nav.scss' // no good solution to import the style here
import Input from '../../components/input/Input'
import Icon from '../../components/icon-primary/IconPrimary'
import Button from '../../components/button/Button'
import Logo from '../../components/logo/Logo'
import Notification from '../../components/notification/Notification'

export default class MainNav extends React.PureComponent {
  static tagName = 'dnb-main-nav'

  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    baseurl: PropTypes.string,
    notification_amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    class: PropTypes.string,
    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    data: [],
    baseurl: '/uilib/demos',
    // baseurl: null,
    notification_amount: 0,
    class: null,
    /** React props */
    className: null,
    children: null
  }

  state = {
    isSubNavActive: false
  }

  static enableWebComponent() {
    registerElement(MainNav.tagName, MainNav, MainNav.defaultProps)
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  constructor(props) {
    super(props)
    this._innerRef = React.createRef()
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isSubNavActive: true
  //     })
  //   }, 1e3)
  // }

  componentWillUnmount() {
    this.setState({
      isSubNavActive: false
    })
  }

  toggleNavHandler = () => {
    const isSubNavActive = !this.state.isSubNavActive
    this.setState({
      isSubNavActive
    })

    if (this._innerRef) {
      this._innerRef.current.setAttribute(
        'tabindex',
        isSubNavActive ? '0' : '-1'
      )
      if (isSubNavActive) {
        this._innerRef.current.focus()
      }
    }
  }

  render() {
    const {
      baseurl,
      notification_amount,
      className,
      class: _className
    } = this.props

    const data = MainNav.getData(this.props)

    const params = {
      role: 'navigation',
      ['aria-label']: 'Main Menu',
      ['data-nav-active']: this.state.isSubNavActive,
      className: classnames('dnb-main-nav', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <nav {...params}>
        <div className="dnb-main-nav__inner">
          <div className="dnb-main-nav__inner__inner">
            <div className="dnb-main-nav__left">
              <div className="dnb-main-nav__item">
                <MainNavTrigger
                  text="Meny"
                  onTrigger={this.toggleNavHandler}
                />
              </div>
              <div className="dnb-main-nav__item dnb-hide-on-mobile">
                <Search />
              </div>
            </div>

            <div className="dnb-main-nav__item dnb-main-nav__logo">
              {(baseurl && (
                <a href={baseurl} title="Links back to front page">
                  <Logo height={80} />
                </a>
              )) || <Logo height={80} />}
            </div>

            <div className="dnb-main-nav__right">
              <div className="dnb-main-nav__item">
                {notification_amount && (
                  <Notification
                    notification_amount={notification_amount}
                    title_text={`Du har ${notification_amount} notifications`}
                  />
                )}
              </div>
              <div className="dnb-main-nav__item">
                <Button variant="secondary" text="Logg ut" />
              </div>
            </div>
          </div>
          <div className="dnb-main-nav__nav">
            <div className="dnb-main-nav__nav__inner">
              <div className="dnb-mobile-exclusive">
                <Search id="nav_search_mobile" />
              </div>
              <div
                className="dnb-main-nav__links dnb-width-limit dnb-tab-focus"
                tabIndex="-1"
                ref={this._innerRef}
              >
                {data.length > 0 && (
                  <ul className="dnb-grid dnb-grid--gutters dnb-grid--center">
                    {data.map(({ title, url }, i) => (
                      <li key={`mn${i}`} className="dnb-grid__cell">
                        <a
                          href={url}
                          className="dnb-main-nav__link"
                          tabIndex="-1"
                        >
                          <span>{title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const MainNavTrigger = (props) => {
  const { text, className, modifier } = props

  const params = {
    className: classnames(
      'dnb-main-nav-trigger',
      className,
      modifier ? `dnb-main-nav-trigger--${modifier}` : null
    )
  }

  const onTriggerHandle = () => {
    if (typeof props.onTrigger === 'function') {
      props.onTrigger()
    }
  }

  return (
    <button onClick={onTriggerHandle} {...params}>
      <span className="dnb-main-nav-trigger__icon">
        <Icon icon="hamburger" />
      </span>
      <span className="dnb-main-nav-trigger__text">{text}</span>
    </button>
  )
}
MainNavTrigger.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  modifier: PropTypes.string,
  onTrigger: PropTypes.func
}
MainNavTrigger.defaultProps = {
  text: null,
  className: null,
  modifier: null,
  onTrigger: null
}

const Search = (props) => {
  return (
    <Input
      type="search"
      id="nav_search"
      label="Label text"
      placeholder="Søk"
      {...props}
    />
  )
}
