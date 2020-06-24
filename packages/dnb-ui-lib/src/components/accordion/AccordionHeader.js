/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import { warn, isTrue } from '../../shared/component-helper'
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
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.string,
  icon_size: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

const defaultProps = {
  title: null,
  description: null,
  icon: null,
  icon_position: null,
  icon_size: null,

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

function AccordionHeaderIcon(props) {
  return (
    <span className="dnb-accordion__header__icon">
      <IconPrimary {...props} />
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
  icon: 'chevron-down',
  size: 'medium'
}

export default class AccordionHeader extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = AccordionContext

  static Title = AccordionHeaderTitle
  static Description = AccordionHeaderDescription
  static Icon = AccordionHeaderIcon

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

    if (!group || (group && !this.context.expanded)) {
      const expanded = !this.context.expanded
      this.context.callOnChange({ id, group, expanded, event })
    }
  }

  hasHeaderTitle(children) {
    if (!Array.isArray(children)) {
      children = [children]
    }

    return children.reduce((acc, cur) => {
      if (React.isValidElement(cur) && cur.type === AccordionHeaderTitle) {
        return true
      }
      return acc
    }, false)
  }

  render() {
    const { children, description, className, ...rest } = this.props

    const { id, expanded, disabled } = this.context

    const headerParams = {
      disabled,
      className: classnames(
        'dnb-accordion__header',
        // expanded && 'dnb-accordion__content--expanded',
        createSpacingClasses(rest),
        className
      ),
      ...rest
    }

    // legacy borwer support
    headerParams.id = `${id}-header`
    headerParams['aria-controls'] = `${id}-content`

    // use div, only to make it easier to style (legacy borwer support)
    headerParams.role = 'button'
    headerParams.tabIndex = '0'

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
    }

    const defaultParts = [
      <AccordionHeaderIcon key="icon" />,
      <AccordionHeaderTitle key="title">
        {Array.isArray(children)
          ? children.filter((cur) => !React.isValidElement(cur))
          : children}
      </AccordionHeaderTitle>,
      <AccordionHeaderDescription key="description">
        {description}
      </AccordionHeaderDescription>
    ]

    if (Array.isArray(children)) {
      const removeParts = []
      children.forEach((cur) => {
        defaultParts.forEach((part) => {
          if (React.isValidElement(cur) && cur.type === part.type) {
            removeParts.push(part)
            defaultParts.push(cur)
          }
        })
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

    return <div {...headerParams}>{partsToRender}</div>
  }
}
