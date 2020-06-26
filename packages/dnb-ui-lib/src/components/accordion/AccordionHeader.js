/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  extendPropsWithContext
} from '../../shared/component-helper'
import IconPrimary from '../../components/icon-primary/IconPrimary'
import classnames from 'classnames'
import keycode from 'keycode'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

const propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  left_component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.string,
  icon_size: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

const defaultProps = {
  id: null, // make sure we have id here, so it gets picked up by extendPropsWithContext
  title: null,
  description: null,
  left_component: null,
  icon: null,
  icon_position: null,
  icon_size: 'medium',
  disabled: null,

  // React props
  className: null,
  children: null
}

function AccordionHeaderTitle({ children }) {
  return <span className="dnb-accordion__header__title">{children}</span>
}
AccordionHeaderTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}
AccordionHeaderTitle.defaultProps = {
  children: null
}

function AccordionHeaderDescription({ children }) {
  return children ? (
    <span className="dnb-accordion__header__description">{children}</span>
  ) : null
}
AccordionHeaderDescription.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}
AccordionHeaderDescription.defaultProps = {
  children: null
}

function AccordionHeaderContainer({ children }) {
  return children ? (
    <span className="dnb-accordion__header__container">{children}</span>
  ) : null
}
AccordionHeaderContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}
AccordionHeaderContainer.defaultProps = {
  children: null
}

function AccordionHeaderIcon({ icon, ...props }) {
  return (
    <span className="dnb-accordion__header__icon">
      {
        <IconPrimary
          {...props}
          icon={icon || 'chevron-down'}
          aria-hidden
        />
      }
    </span>
  )
}
AccordionHeaderIcon.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  size: PropTypes.string
}
AccordionHeaderIcon.defaultProps = {
  icon: null,
  size: 'medium'
}

export default class AccordionHeader extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = AccordionContext

  static Container = AccordionHeaderContainer
  static Icon = AccordionHeaderIcon
  static Title = AccordionHeaderTitle
  static Description = AccordionHeaderDescription

  constructor(props) {
    super(props)
    this.state = {}
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
      case 'space':
        event.preventDefault()
        this.onClickHandler(event)
        break
    }
  }

  onClickHandler = (event) => {
    const { id, group } = this.context

    if (
      !group ||
      (group && !this.context.expanded) ||
      isTrue(this.context.allow_close_all)
    ) {
      const expanded = !this.context.expanded
      this.context.callOnChange({ id, group, expanded, event })
    }

    this.setState({
      hadClick: true
    })
  }

  onMouseOverHandler = () => {
    this.setState({
      hover: true
    })
  }

  onMouseOutHander = () => {
    this.setState({
      hover: false,
      hadClick: false
    })
  }

  render() {
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context
    )

    const {
      id,

      // 1. these props should be the same as ...
      left_component,
      expanded,
      title,
      description,
      icon,
      icon_size,
      disabled
    } = props

    const {
      children,
      className,

      // 2. ... these
      left_component: _left_component, // eslint-disable-line
      expanded: _expanded, // eslint-disable-line
      title: _title, // eslint-disable-line
      description: _description, // eslint-disable-line
      icon: _icon, // eslint-disable-line
      icon_size: _icon_size, // eslint-disable-line
      disabled: _disabled, // eslint-disable-line

      ...rest
    } = this.props

    const { hover, hadClick } = this.state
    let { icon_position } = props

    const defaultParts = [
      <AccordionHeaderIcon key="icon" icon={icon} size={icon_size} />,
      <AccordionHeaderContainer key="container">
        {left_component}
      </AccordionHeaderContainer>,
      <AccordionHeaderTitle key="title">
        {title ||
          (Array.isArray(children)
            ? children.filter((cur) => !React.isValidElement(cur))
            : children)}
      </AccordionHeaderTitle>,
      <AccordionHeaderDescription key="description">
        {description}
      </AccordionHeaderDescription>
    ]

    if (Array.isArray(children)) {
      const removeParts = []
      children.forEach((cur) => {
        if (React.isValidElement(cur)) {
          const part = defaultParts.find((c) => c.type === cur.type)
          if (part) {
            removeParts.push(part)
          }

          // if (cur.type === AccordionHeaderTitle) {
          //   defaultParts.unshift(cur)
          // } else {
          //   defaultParts.push(cur)
          // }

          defaultParts.push(cur)
        }
      })
      removeParts.forEach((part) => {
        const index = defaultParts.findIndex((c) => c === part)
        if (index > -1) {
          defaultParts.splice(index, 1)
        }
      })
    }

    const partsToRender = []
    const wrapperParts = []
    const wrapperComp = (
      <span className="dnb-accordion__header__wrapper" key="wrapper">
        {wrapperParts}
      </span>
    )

    defaultParts.forEach((part) => {
      if (
        React.isValidElement(part) &&
        (part.type === AccordionHeaderTitle ||
          part.type === AccordionHeaderDescription)
      ) {
        wrapperParts.push(part)
        if (partsToRender.findIndex((c) => c === wrapperComp) === -1) {
          partsToRender.push(wrapperComp)
        }
      } else {
        partsToRender.push(part)
      }
    })

    // position the icon to the right, if the element is not in the beginning
    if (icon_position === null) {
      const iconIndex = partsToRender.findIndex(
        (c) => c.type === AccordionHeaderIcon
      )
      // because of the container at the beginning, we use 1
      if (iconIndex > 1) {
        icon_position = 'right'
      }

      // if (
      //   Array.isArray(children) &&
      //   children.findIndex((c) => c.type === AccordionHeaderContainer) !==
      //     -1
      // ) {
      // icon_position = 'right'
      // }

      if (left_component) {
        icon_position = 'right'
      }
    }

    const headerParams = {
      id: `${id}-header`,
      'aria-controls': `${id}-content`,
      role: 'button',
      tabIndex: '0',
      className: classnames(
        'dnb-accordion__header',
        icon_position && `dnb-accordion__header__icon--${icon_position}`,
        hover && hadClick && 'dnb-accordion--hover',
        createSpacingClasses(rest),
        className
      ),
      disabled,
      ...rest
    }

    console.log('disabled', disabled)

    if (expanded) {
      headerParams['aria-expanded'] = true
    }

    if (disabled) {
      headerParams.tabIndex = '-1' // make the "button" not accessible for keyboard?
      headerParams.disabled = true
      headerParams['aria-disabled'] = true
    } else {
      headerParams.onClick = this.onClickHandler
      headerParams.onKeyDown = this.onKeyDownHandler
      headerParams.onMouseOver = this.onMouseOverHandler
      headerParams.onMouseOut = this.onMouseOutHander
    }

    return <div {...headerParams}>{partsToRender}</div>
  }
}
